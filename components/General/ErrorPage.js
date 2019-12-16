import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import Link from '../../lib/Link';
import Head from '../Header/Head';
import FixedBackgroundImage from './FixedBackgroundImage';

const ErrorPage = props => {
  const { statusCode } = props;

  let error = {
    title: `Error: ${statusCode}`,
    message: 'An error occured.',
  };
  if (statusCode === 'logged_out')
    error = {
      title: 'Error: Logged Out',
      message:
        'You need to log in to view this page. Use the "Login" button on the top right to log in to your account.',
    };
  else if (statusCode === 'network_error')
    error = {
      title: 'Network Error',
      message: 'Are you online?',
    };
  else if (statusCode === 404)
    error = {
      title: '404: Not Found',
      message: 'This page could not be found.',
    };
  else if (statusCode === 'invalid_login')
    error = {
      title: 'Invalid login credentials',
      message:
        'The login credentials you provided are not valid. Please log in again.',
    };
  else if (statusCode === 'exit_url')
    error = {
      title: 'Warning: External Link',
      message:
        'This is an external link. Please check it carefully before proceeding.',
      footer: (
        <>
          <div className="text-center pb-3">
            <em>{props.url}</em>
          </div>
          <Button
            onClick={() => Router.back()}
            color="primary"
            variant="outlined"
            className="m-1"
          >
            Go back
          </Button>
          <a
            rel="nofollow noopener noreferrer"
            target="_blank"
            href={props.url}
          >
            <Button color="primary" variant="contained" className="m-1">
              Visit this Website
            </Button>
          </a>
        </>
      ),
    };
  else if (statusCode === 'invalid_post')
    error = {
      title: 'Not a TravelFeed Post',
      message:
        'This is not a valid TravelFeed post, but it does exist on the Steem blockchain. Proceed to Steempeak to view the post anyway?',
      footer: (
        <>
          <Button
            onClick={() => Router.back()}
            color="primary"
            variant="outlined"
            className="m-1"
          >
            Go back
          </Button>
          <a
            rel="nofollow noopener noreferrer"
            target="_blank"
            href={props.url}
          >
            <Button color="primary" variant="contained" className="m-1">
              View on Steempeak
            </Button>
          </a>
        </>
      ),
    };
  return (
    <>
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T190403125Z-easysignup-2.jpg"
        component={
          <>
            <Head title={`${error.title} | TravelFeed`} noIndex />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '100vh', marginTop: '-65px' }}
            >
              <Grid item lg={7} md={8} sm={11} xs={11}>
                <Card>
                  <CardContent>
                    <div className="text-center">
                      <Typography variant="h4" gutterBottom>
                        {error.title}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {error.message}
                      </Typography>
                      <div className="pt-2">
                        {error.footer || (
                          <Link href="/">
                            <Button color="primary" variant="contained">
                              Back to Homepage
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        }
      />
    </>
  );
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default ErrorPage;
