import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Drafts from '../../components/Dashboard/Drafts';

const DraftsPage = props => {
  const { open } = props;

  return (
    <DashboardPage
      open={open}
      label="drafts"
      content={<Drafts sortby={props.sortby} />}
    />
  );
};

DraftsPage.getInitialProps = props => {
  const { open, sortby } = props.query;
  return { open, sortby };
};

DraftsPage.propTypes = {
  open: PropTypes.string,
};

export default DraftsPage;
