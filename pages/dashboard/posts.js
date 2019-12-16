import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Posts from '../../components/Dashboard/Posts';

const PostsPage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="posts" content={<Posts />} />;
};

PostsPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

PostsPage.propTypes = {
  open: PropTypes.string,
};

export default PostsPage;
