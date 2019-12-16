/* eslint-disable react/no-unescaped-entities */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import readingTime from 'reading-time';
import sanitize from 'sanitize-html';
import { imageProxy } from '../../helpers/getImage';
import { GET_BOOKMARKS } from '../../helpers/graphql/bookmarks';
import parseBody from '../../helpers/parseBody';
import GridPostCard from '../Grid/GridPostCard';

class Bookmarks extends Component {
  state = {
    hasMore: true,
    postslength: 9,
  };

  noMore() {
    this.setState({ hasMore: false });
  }

  render() {
    const { hasMore, postslength } = this.state;
    return (
      <Fragment>
        <Query
          query={GET_BOOKMARKS}
          variables={{ limit: 9 }}
          fetchPolicy="network-only"
        >
          {({ data, loading, error, fetchMore }) => {
            if (loading) {
              return (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="p-5 text-center">
                    <CircularProgress />
                  </div>
                </Grid>
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
            if (data.bookmarks.length < 9 && hasMore)
              this.setState({ hasMore: false });
            return (
              <InfiniteScroll
                loadMore={() => {
                  if (postslength === data.bookmarks.length) {
                    fetchMore({
                      variables: {
                        offset: data.bookmarks.length,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (fetchMoreResult.bookmarks.length < 9) {
                          this.noMore();
                        }
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                          bookmarks: [
                            ...prev.bookmarks,
                            ...fetchMoreResult.bookmarks,
                          ],
                        });
                      },
                    });
                    this.setState({ postslength: postslength + 9 });
                  }
                }}
                hasMore={hasMore}
                threshold={1000}
                loader={
                  <Grid item lg={12} md={12} sm={12} xs={12} key="loader">
                    <div className="p-5 text-center">
                      <CircularProgress />
                    </div>
                  </Grid>
                }
              >
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                >
                  {data.bookmarks.length > 0 &&
                    data.bookmarks.map(post => {
                      const imgHeight = 600;
                      const htmlBody = parseBody(post.body, {});
                      const sanitized = sanitize(htmlBody, { allowedTags: [] });
                      const readtime = readingTime(sanitized);
                      const image = imageProxy(
                        post.img_url,
                        undefined,
                        imgHeight,
                      );
                      const { title } = post;
                      return (
                        <Grid
                          item
                          lg={4}
                          md={6}
                          sm={12}
                          xs={12}
                          key={post.permlink}
                        >
                          <GridPostCard
                            isBookmark
                            cardHeight={220}
                            post={{
                              author: post.author,
                              display_name: post.display_name,
                              permlink: post.permlink,
                              title,
                              img_url: image,
                              created_at: post.created_at,
                              readtime,
                              excerpt: sanitized,
                              votes: post.votes,
                              total_votes: post.total_votes,
                              tags: post.tags,
                              curation_score: post.curation_score,
                              app: post.app,
                              depth: post.depth,
                              children: post.children,
                            }}
                          />
                        </Grid>
                      );
                    })}
                  {data.bookmarks && data.bookmarks.length === 0 && (
                    <Card className="mt-5 m-2">
                      <CardContent>
                        You don't have any bookmarks yet. Click the bookmark
                        icon on the top right of a post to bookmark it.
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              </InfiniteScroll>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Bookmarks;
