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
import OnboardInfo from '../../components/Onboarding/OnboardInfo';
import { ONBOARD_VERIFY_TOKEN } from '../../helpers/graphql/onboarding';

const RegisterInfoPage = props => {
  const { infoToken } = props;

  return (
    <>
      <Header subheader="Register" />
      <Head title="Register" noIndex />
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T184750380Z-easysignup-3.jpg"
        component={
          <>
            {(infoToken && (
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                className="pt-4 pb-4"
              >
                <Grid item lg={7} md={8} sm={11} xs={12}>
                  <HeaderCard
                    title="Complete your TravelFeed Profile"
                    background={teal[600]}
                    content={
                      <Query
                        query={ONBOARD_VERIFY_TOKEN}
                        variables={{ infoToken }}
                      >
                        {({ data }) => {
                          if (
                            data &&
                            data.onboardingVerifyToken &&
                            data.onboardingVerifyToken.success
                          ) {
                            return <OnboardInfo infoToken={infoToken} />;
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

RegisterInfoPage.getInitialProps = props => {
  const { infoToken } = props.query;
  return { infoToken };
};

RegisterInfoPage.propTypes = {
  infoToken: PropTypes.string,
};

export default RegisterInfoPage;
