import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Profile from '../../components/Dashboard/Profile';

const ProfilePage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="profile" content={<Profile />} />;
};

ProfilePage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

ProfilePage.propTypes = {
  open: PropTypes.string,
};

export default ProfilePage;
