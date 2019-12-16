import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Notifications from '../../components/Dashboard/Notifications';

const NotificationsPage = props => {
  const { open } = props;

  return (
    <DashboardPage
      open={open}
      label="notifications"
      content={<Notifications />}
    />
  );
};

NotificationsPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

NotificationsPage.propTypes = {
  open: PropTypes.string,
};

export default NotificationsPage;
