import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Cookie from 'js-cookie';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { ACCEPT_TOS, GET_LOGIN_TOKEN } from '../../helpers/graphql/token';
import { setAccessToken } from '../../helpers/token';
import LoginDialog from '../Login/LoginDialog';
import PasswordPicker from '../Onboarding/PasswordPicker';

const EasyLoginButton = props => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [mutate, setMutate] = useState(false);
  const [referrer, setReferrer] = useState(undefined);

  useEffect(() => {
    setReferrer(Cookie.get('referrer'));
  });

  const handleUsernameEmailInput = () => event => {
    setUsernameOrEmail(event.target.value);
  };

  const handleEasyKeyPress = event => {
    if (event.key === 'Enter') handleEasyLogin();
  };

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      const { enqueueSnackbar } = props;
      enqueueSnackbar(notification.message, { variant });
    }
  };

  const handleEasyLogin = () => {
    if (usernameOrEmail && password) setMutate(true);
    else
      newNotification({
        success: false,
        message: 'Enter your username and password first',
      });
  };
  return (
    <>
      {(mutate && (
        <Query
          query={GET_LOGIN_TOKEN}
          variables={{
            usernameOrEmail,
            password,
          }}
        >
          {({ data }) => {
            if (data && data.login) {
              if (!data.login.success) {
                newNotification({
                  success: false,
                  message: `The login credentials you provided are not valid. Please log in again.`,
                });
                setMutate(false);
                props.setShowReset(true);
              }
              // If tos are not accepted, display tos dialogue
              if (data.login.hasAcceptedTos) {
                if (data.login.jwt) {
                  setAccessToken(data.login.jwt, 604800);
                  // Force hard reload on login to update apollo context with new access token
                  window.open('/dashboard', '_self', undefined, true);
                  return <CircularProgress />;
                }
              }
              if (data.login.success && !data.login.hasAcceptedTos) {
                return (
                  <Mutation
                    mutation={ACCEPT_TOS}
                    variables={{
                      usernameOrEmail,
                      password,
                      acceptTos: true,
                      referrer,
                    }}
                  >
                    {(acceptTos, { data: mutatedata }) => {
                      // If successful
                      if (mutatedata && mutatedata.login) {
                        if (
                          mutatedata.login &&
                          mutatedata.login.hasAcceptedTos
                        ) {
                          if (mutatedata.login.jwt) {
                            setAccessToken(mutatedata.login.jwt, 604800);
                            window.open('/dashboard', '_self', undefined, true);
                            return <CircularProgress />;
                          }
                          newNotification({
                            success: false,
                            message: `The login credentials you provided are not valid. Please log in again.`,
                          });
                          setMutate(false);
                        }
                      }
                      return <LoginDialog acceptTos={acceptTos} />;
                    }}
                  </Mutation>
                );
              }
            }
            return <CircularProgress />;
          }}
        </Query>
      )) || (
        <>
          <TextField
            autoFocus
            onChange={handleUsernameEmailInput()}
            margin="dense"
            id="username"
            label="Username or Email"
            fullWidth
            onKeyPress={handleEasyKeyPress}
          />
          <PasswordPicker
            label="Password"
            setPassword={setPassword}
            onKeyPress={handleEasyKeyPress}
          />
          <div className="pt-4 pb-2">
            <Button
              fullsize
              onClick={handleEasyLogin}
              color="primary"
              variant="contained"
              size="large"
            >
              Login with TravelFeed
            </Button>
          </div>
        </>
      )}
    </>
  );
};

EasyLoginButton.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(EasyLoginButton);
