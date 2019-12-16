import { indigo } from '@material-ui/core/colors';
import React from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../../helpers/graphql/posts';
import HeaderCard from '../General/HeaderCard';
import PostPreview from '../Post/PostPreview';

const NewUsers = () => {
  return (
    <>
      <Query
        query={GET_POSTS}
        variables={{
          tags: ['introduceyourself'],
          min_curation_score: 1,
          limit: 3,
        }}
      >
        {({ data, loading, error }) => {
          if (loading || error || data.post === null) {
            return <></>;
          }
          return (
            <>
              <HeaderCard
                noborder
                title="New Travelers"
                titlesize="h5"
                background={indigo[600]}
                content={
                  <div>
                    {data.posts.map((post, i) => {
                      return (
                        <>
                          {!post.is_blacklisted && (
                            <PostPreview
                              isSmall
                              author={post.author}
                              permlink={post.permlink}
                              img_url={`https://steemitimages.com/u/${post.author}/avatar/small`}
                              title={post.title.replace(
                                /Introducing myself to TravelFeed: /,
                                '',
                              )}
                              divider={i < data.posts.length - 1}
                            />
                          )}
                        </>
                      );
                    })}
                  </div>
                }
              />
            </>
          );
        }}
      </Query>
    </>
  );
};

export default NewUsers;
