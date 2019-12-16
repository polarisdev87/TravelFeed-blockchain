import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ErrorPage from '../components/General/ErrorPage';
import Header from '../components/Header/Header';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    let statusCode = null;
    if (res) ({ statusCode } = res);
    else if (err) ({ statusCode } = err);
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <Fragment>
        <Header active="page" />
        <ErrorPage statusCode={statusCode} />
      </Fragment>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};
