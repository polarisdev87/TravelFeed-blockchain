import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Wallet from '../../components/Dashboard/Wallet';

const WalletPage = props => {
  const { open } = props;

  return <DashboardPage open={open} label="wallet" content={<Wallet />} />;
};

WalletPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

WalletPage.propTypes = {
  open: PropTypes.string,
};

export default WalletPage;
