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
import SetNewPasswordResetForm from '../../components/Header/SetNewPasswordResetForm';
import { CHECK_PASSWORD_RESET_TOKEN } from '../../helpers/graphql/onboarding';

const ResetPasswordPage = props => {
  const { resetToken } = props;

  return (
    <>
      <Header subheader="Password Reset" />
      <Head title="Password Reset" noIndex />
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T184750380Z-easysignup-3.jpg"
        component={
          <>
            {(resetToken && (
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                className="pt-4 pb-4"
              >
                <Grid item lg={7} md={8} sm={11} xs={12}>
                  <HeaderCard
                    title="Choose a new password"
                    background={teal[600]}
                    content={
                      <Query
                        query={CHECK_PASSWORD_RESET_TOKEN}
                        variables={{ resetToken }}
                      >
                        {({ data }) => {
                          if (
                            data &&
                            data.checkPassWordResetToken &&
                            data.checkPassWordResetToken.success
                          ) {
                            return (
                              <SetNewPasswordResetForm
                                resetToken={resetToken}
                              />
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

ResetPasswordPage.getInitialProps = props => {
  const { resetToken } = props.query;
  return { resetToken };
};

ResetPasswordPage.propTypes = {
  resetToken: PropTypes.string,
};

export default ResetPasswordPage;
