import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Stats from '../../components/Dashboard/Stats';

const StatsPage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="dashboard" content={<Stats />} />;
};

StatsPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

StatsPage.propTypes = {
  open: PropTypes.string,
};

export default StatsPage;
