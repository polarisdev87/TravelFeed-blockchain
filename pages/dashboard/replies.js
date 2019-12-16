import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Replies from '../../components/Dashboard/Replies';

const RepliesPage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="replies" content={<Replies />} />;
};

RepliesPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

RepliesPage.propTypes = {
  open: PropTypes.string,
};

export default RepliesPage;
