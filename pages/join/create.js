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
import OnboardCreate from '../../components/Onboarding/OnboardCreate';
import { ONBOARD_VERIFY_TOKEN } from '../../helpers/graphql/onboarding';

const RegisterCreatePage = props => {
  const { claimToken } = props;

  return (
    <>
      <Header subheader="Register" />
      <Head title="Register" noIndex />
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T174359871Z-easysignup-1.jpg"
        component={
          <>
            {(claimToken && (
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                className="pt-4 pb-4"
              >
                <Grid item lg={7} md={8} sm={11} xs={12}>
                  <HeaderCard
                    title="Create your TravelFeed Account"
                    background={teal[600]}
                    content={
                      <Query
                        query={ONBOARD_VERIFY_TOKEN}
                        variables={{ claimToken }}
                      >
                        {({ data }) => {
                          if (
                            data &&
                            data.onboardingVerifyToken &&
                            data.onboardingVerifyToken.success
                          ) {
                            return (
                              <>
                                <OnboardCreate claimToken={claimToken} />
                              </>
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

RegisterCreatePage.getInitialProps = props => {
  const { claimToken } = props.query;
  return { claimToken };
};

RegisterCreatePage.propTypes = {
  claimToken: PropTypes.string,
};

export default RegisterCreatePage;
