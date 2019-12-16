import { useAmp } from 'next/amp';
import PropTypes from 'prop-types';
import React from 'react';
import SinglePostAmp from '../components/Amp/SinglePostAmp';
import SinglePost from '../components/Post/SinglePost';

export const config = { amp: 'hybrid' };

const PostPage = props => {
  const isAmp = useAmp();

  return (
    <>{isAmp ? <SinglePostAmp post={props} /> : <SinglePost post={props} />}</>
  );
};

PostPage.getInitialProps = props => {
  const {
    author,
    permlink,
    title,
    body,
    display_name,
    img_url,
    lazy_img_url,
    created_at,
    depth,
    country_code,
    subdivision,
    app,
    scrollToComments,
    curation_score,
  } = props.query;
  return {
    author,
    permlink,
    title,
    body,
    display_name,
    img_url,
    lazy_img_url,
    created_at,
    depth,
    country_code,
    subdivision,
    app,
    scrollToComments,
    curation_score,
  };
};

PostPage.defaultProps = {
  query: undefined,
};

PostPage.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.arrayOf(PropTypes.string),
};

export default PostPage;
