import PropTypes from 'prop-types';
import React from 'react';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Newsletter from '../../components/Dashboard/Newsletter';

const NewsletterPage = props => {
  const { open } = props;

  return (
    <DashboardPage open={open} label="newsletter" content={<Newsletter />} />
  );
};

NewsletterPage.getInitialProps = props => {
  const { open } = props.query;
  return { open };
};

NewsletterPage.propTypes = {
  open: PropTypes.string,
};

export default NewsletterPage;
