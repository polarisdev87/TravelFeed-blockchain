import PropTypes from 'prop-types';
import React from 'react';
import Comments from '../../components/Dashboard/Comments';
import DashboardPage from '../../components/Dashboard/DashboardPage';

const CommentsPage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="comments" content={<Comments />} />;
};

CommentsPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

CommentsPage.propTypes = {
  open: PropTypes.string,
};

export default CommentsPage;
