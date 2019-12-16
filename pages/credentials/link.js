import { teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import ErrorPage from '../../components/General/ErrorPage';
import FixedBackgroundImage from '../../components/General/FixedBackgroundImage';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import SetEasyLogInPassword from '../../components/Header/SetEasyLogInPassword';
import { CHECK_ADD_ACCOUNT_PASSWORD } from '../../helpers/graphql/onboarding';

const LinkEmailPage = props => {
  const { linkToken, isNewsletter } = props;

  return (
    <>
      <Header subheader="EasyLogIn" />
      <Head title="EasyLogIn" noIndex />
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T184750380Z-easysignup-3.jpg"
        component={
          <>
            {(linkToken && (
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                className="pt-4 pb-4"
              >
                <Grid item lg={7} md={8} sm={11} xs={12}>
                  <HeaderCard
                    title="Choose your EasyLogIn password"
                    background={teal[600]}
                    content={
                      <Query
                        query={CHECK_ADD_ACCOUNT_PASSWORD}
                        variables={{
                          linkToken,
                          isNewsletter: isNewsletter === 'true',
                        }}
                      >
                        {({ data }) => {
                          if (
                            data &&
                            data.checkAddAccountPassword &&
                            data.checkAddAccountPassword.success
                          ) {
                            return (
                              <SetEasyLogInPassword linkToken={linkToken} />
                            );
                          }
                          return 'The link you followed is invalid or has been used already.';
                        }}
                      </Query>
                    }
                  />
                </Grid>
              </Grid>
            )) || <ErrorPage statusCode={404} />}
          </>
        }
      />
    </>
  );
};

LinkEmailPage.getInitialProps = props => {
  const { linkToken, isNewsletter } = props.query;
  return { linkToken, isNewsletter };
};

LinkEmailPage.propTypes = {
  linkToken: PropTypes.string,
};

export default LinkEmailPage;
