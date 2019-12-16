import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Contest from '../../components/Dashboard/Referral';

const ContestPage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="contest" content={<Contest />} />;
};

ContestPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

ContestPage.propTypes = {
  open: PropTypes.string,
};

export default ContestPage;
