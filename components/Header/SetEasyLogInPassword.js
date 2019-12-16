import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import owasp from 'owasp-password-strength-test';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { CONFIRM_ADD_ACCOUNT_PASSWORD } from '../../helpers/graphql/onboarding';
import EasyLogin from '../Onboarding/EasyLogin';

const SetEasyLogInPassword = props => {
  const [password, setPassword] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState(undefined);
  const pwstrength = password ? owasp.test(password) : {};

  const { linkToken } = props;

  return (
    <>
      <Mutation
        mutation={CONFIRM_ADD_ACCOUNT_PASSWORD}
        variables={{
          linkToken,
          password,
        }}
      >
        {(confirmAddAccountPassword, data) => {
          if (data && data.data && data.data.confirmAddAccountPassword) {
            if (data.data.confirmAddAccountPassword.success) {
              return (
                <Typography>
                  EasyLogIn has been set up successfully for your account. You
                  can now log in.
                </Typography>
              );
            }
            return (
              <Typography>
                {data.data.confirmAddAccountPassword.message}
              </Typography>
            );
          }
          return (
            <>
              <FormLabel component="legend" className="pb-3">
                Choose your TravelFeed EasyLogin password here. Your password
                should be at least 10 characters long.
              </FormLabel>
              <div className="pb-2">
                <EasyLogin
                  pwstrength={pwstrength}
                  password={password}
                  setPassword={setPassword}
                  passwordConfirm={passwordConfirm}
                  setPasswordConfirm={setPasswordConfirm}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={confirmAddAccountPassword}
                disabled={
                  !password ||
                  password !== passwordConfirm ||
                  (pwstrength.errors && pwstrength.errors.length > 0)
                }
              >
                Set password
              </Button>
            </>
          );
        }}
      </Mutation>
    </>
  );
};

export default SetEasyLogInPassword;
