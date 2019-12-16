import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ErrorPage from '../components/General/ErrorPage';
import Head from '../components/Header/Head';
import Header from '../components/Header/Header';

class ExitPage extends Component {
  static async getInitialProps(props) {
    const { url } = props.query;
    return { url };
  }

  render() {
    const { url } = this.props;
    return (
      <Fragment>
        <Head title="External Link | TravelFeed" noIndex />
        <Header active="page" />
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className="pt-4 pb-4"
        >
          {(url === 'undefined' && <ErrorPage statusCode={404} />) || (
            <ErrorPage statusCode="exit_url" url={url} />
          )}
        </Grid>
      </Fragment>
    );
  }
}

ExitPage.defaultProps = {
  url: undefined,
};

ExitPage.propTypes = {
  url: PropTypes.string,
};

export default ExitPage;
