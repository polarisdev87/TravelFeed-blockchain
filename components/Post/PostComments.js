// https://sysgears.com/articles/how-to-implement-infinite-scroll-with-graphql-and-react/
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import { commentQuery } from '../../helpers/graphql/comments';
import PostCommentItem from './PostCommentItem';

class PostComments extends Component {
  state = {
    hasMore: true,
    postslength: 10,
  };

  noMore() {
    this.setState({ hasMore: false });
  }

  render() {
    return (
      <Fragment>
        <Query
          query={commentQuery}
          variables={{
            parent_id: this.props.post_id,
            orderby: this.props.orderby,
            orderdir: this.props.orderdir,
            limit: 10,
          }}
        >
          {({ data, fetchMore }) => {
            if (
              data &&
              data.posts &&
              data.posts.length < 10 &&
              this.state.hasMore
            )
              this.setState({ hasMore: false });
            if (data && data.posts) {
              return (
                <InfiniteScroll
                  initialLoad={false}
                  loadMore={() => {
                    if (this.state.postslength === data.posts.length) {
                      fetchMore({
                        variables: {
                          offset: data.posts.length,
                          limit: 10,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (fetchMoreResult.posts.length < 10) {
                            this.noMore();
                          }
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            posts: [...prev.posts, ...fetchMoreResult.posts],
                          });
                        },
                      });
                      this.setState(prevState => ({
                        postslength: prevState.postslength + 10,
                      }));
                    }
                  }}
                  hasMore={this.state.hasMore}
                  threshold={1000}
                  loader={
                    // don't show loadoing indicator for loading subcomments
                    this.props.ismain && (
                      <Grid item lg={12} md={12} sm={12} xs={12} key="loader">
                        <div className="p-5 text-center">
                          <CircularProgress />
                        </div>
                      </Grid>
                    )
                  }
                >
                  {data.posts &&
                    data.posts.length > 0 &&
                    data.posts.map(post => (
                      <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        key={post.post_id}
                      >
                        <div className="pt-2">
                          <PostCommentItem
                            hideCommentNumber={this.props.hideCommentNumber}
                            post={{
                              post_id: post.post_id,
                              body: post.body,
                              created_at: post.created_at,
                              children: post.children,
                              author: post.author,
                              display_name: post.display_name,
                              permlink: post.permlink,
                              depth: post.depth,
                              total_votes: post.total_votes,
                              votes: post.votes,
                              parent_author: post.parent_author,
                              parent_permlink: post.parent_permlink,
                            }}
                            orderby={this.props.orderby}
                            orderdir={this.props.orderdir}
                          />
                        </div>
                      </Grid>
                    ))}
                </InfiniteScroll>
              );
            }
            return <Fragment />;
          }}
        </Query>
      </Fragment>
    );
  }
}

PostComments.defaultProps = {
  ismain: false,
};

PostComments.propTypes = {
  post_id: PropTypes.number.isRequired,
  orderby: PropTypes.string.isRequired,
  orderdir: PropTypes.string.isRequired,
  ismain: PropTypes.bool,
};

export default PostComments;
