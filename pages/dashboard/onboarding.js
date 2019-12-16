import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Onboarding from '../../components/Dashboard/Onboarding';

const OnboardingPage = props => {
  const { open } = props;

  return (
    <DashboardPage open={open} label="onboarding" content={<Onboarding />} />
  );
};

OnboardingPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

OnboardingPage.propTypes = {
  open: PropTypes.string,
};

export default OnboardingPage;
