import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Settings from '../../components/Dashboard/Settings';

const SettingsPage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="settings" content={<Settings />} />;
};

SettingsPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

SettingsPage.propTypes = {
  open: PropTypes.string,
};

export default SettingsPage;
