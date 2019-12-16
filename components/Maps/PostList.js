import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PostPreview from '../Post/PostPreview';

const PostList = props => {
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const [clusterId, setClusterId] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    if (posts.length === props.info.pointCount) {
      setHasMore(false);
      return;
    }
    if (props.info.superCluster) {
      const newposts = await props.info.superCluster.getLeaves(
        props.info.clusterId,
        10,
        posts.length,
      );
      if (props.info.clusterId !== clusterId) setPosts(newposts);
      else setPosts(posts.concat(newposts));
      setClusterId(props.info.clusterId);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.info.clusterId !== clusterId) {
      setPosts([]);
      getPosts();
      if (props.info.pointCount > 10) setHasMore(true);
    }
  });

  return (
    <InfiniteScroll
      useWindow={false}
      loadMore={() => {
        if (!loading) {
          getPosts();
        }
      }}
      hasMore={hasMore}
      threshold={100}
      loader={<PostPreview />}
    >
      {posts.length > 0 &&
        posts.map((post, i) => (
          <PostPreview
            author={post.properties.props.author}
            permlink={post.properties.props.permlink}
            title={post.properties.props.title}
            img_url={post.properties.props.img_url}
            divider={i < posts.length - 1}
          />
        ))}
    </InfiniteScroll>
  );
};

PostList.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostList;
