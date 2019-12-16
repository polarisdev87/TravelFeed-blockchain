import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import PublishedIcon from '@material-ui/icons/Check';
import DraftIcon from '@material-ui/icons/FileCopy';
import ScheduledIcon from '@material-ui/icons/Schedule';
import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import readingTime from 'reading-time';
import sanitize from 'sanitize-html';
import { GET_DRAFTS } from '../../helpers/graphql/drafts';
import json2md from '../../helpers/json2md';
import parseBody from '../../helpers/parseBody';
import { getUser } from '../../helpers/token';
import PostListItem from '../Grid/PostListItem';

const sortingOptions = [
  {
    label: 'Unpublished',
    icon: <DraftIcon />,
  },
  {
    label: 'Scheduled',
    icon: <ScheduledIcon />,
  },
  {
    label: 'Published',
    icon: <PublishedIcon />,
  },
];

const Drafts = props => {
  let sortByNr = 0;
  if (props.sortby === 'scheduled') sortByNr = 1;
  else if (props.sortby === 'published') sortByNr = 2;

  const [hasMore, setHasMore] = useState(true);
  const [postslength, setPostsLength] = useState(10);
  const [sortby, setSortBy] = useState(sortByNr);

  const noMore = () => {
    setHasMore(false);
  };

  const user = getUser();
  return (
    <Fragment>
      <BottomNavigation
        value={sortby}
        onChange={(event, newValue) => {
          setSortBy(newValue);
        }}
        showLabels
      >
        {sortingOptions.map(topic => {
          return (
            <BottomNavigationAction label={topic.label} icon={topic.icon} />
          );
        })}
      </BottomNavigation>
      <Query
        fetchPolicy="network-only"
        query={GET_DRAFTS}
        variables={{
          limit: 10,
          isScheduled: sortby === 1,
          isPublished: sortby === 2,
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) {
            return (
              <div className="col-12 p-5 text-center">
                <CircularProgress />
              </div>
            );
          }
          if (error) {
            return (
              <Card className="m-5 text-center" key="noposts">
                <CardContent>
                  {error && 'Network Error. Are you online?'}
                </CardContent>
              </Card>
            );
          }
          if (data && data.drafts && data.drafts.length < 10 && hasMore)
            setHasMore(false);
          return (
            <InfiniteScroll
              loadMore={() => {
                if (postslength === data.drafts.length) {
                  fetchMore({
                    variables: {
                      offset: data.drafts.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (fetchMoreResult.drafts.length < 10) {
                        noMore();
                      }
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        drafts: [...prev.drafts, ...fetchMoreResult.drafts],
                      });
                    },
                  });
                  setPostsLength(postslength + 10);
                }
              }}
              hasMore={hasMore}
              threshold={1000}
              loader={
                <div className="col-12 p-5 text-center" key="loader">
                  <CircularProgress />
                </div>
              }
            >
              <Grid container spacing={0} alignItems="center" justify="center">
                <Grid item lg={8} md={10} sm={11} xs={12}>
                  {data.drafts.length > 0 &&
                    data.drafts.map(draft => {
                      const htmlBody = parseBody(
                        draft.isCodeEditor === false
                          ? json2md(JSON.parse(draft.body))
                          : draft.body,
                        {},
                      );
                      const sanitized = sanitize(htmlBody, {
                        allowedTags: [],
                      });
                      const readtime = readingTime(sanitized);
                      return (
                        <PostListItem
                          key={draft.id}
                          post={{
                            author: user,
                            body: draft.body,
                            display_name: user,
                            title: draft.title,
                            isCodeEditor: draft.isCodeEditor,
                            json: draft.json,
                            created_at: draft.savedate,
                            readtime,
                            excerpt: sanitized,
                            id: draft.id,
                          }}
                          id={draft.id}
                          isDraftMode
                          isPublished={sortby === 2}
                          isScheduled={
                            draft.scheduledDate !== null &&
                            draft.scheduledDate !== undefined
                          }
                          scheduledDate={draft.scheduledDate}
                          publishedDate={draft.publishedDate}
                          isScheduleFailed={draft.isScheduleFailed}
                        />
                      );
                    })}
                  {data.drafts && data.drafts.length === 0 && (
                    <Card className="mt-2 text-center">
                      <CardContent>There&apos;s nothing here yet.</CardContent>
                    </Card>
                  )}
                </Grid>
              </Grid>
            </InfiniteScroll>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default Drafts;
