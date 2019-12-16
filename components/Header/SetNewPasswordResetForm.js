import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import owasp from 'owasp-password-strength-test';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { CONFIRM_PASSWORD_RESET } from '../../helpers/graphql/onboarding';
import EasyLogin from '../Onboarding/EasyLogin';

const SetNewPasswordResetForm = props => {
  const [password, setPassword] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState(undefined);
  const pwstrength = password ? owasp.test(password) : {};

  const { resetToken } = props;

  return (
    <>
      <Mutation
        mutation={CONFIRM_PASSWORD_RESET}
        variables={{
          resetToken,
          password,
        }}
      >
        {(confirmPassWordReset, data) => {
          if (data && data.data && data.data.confirmPassWordReset) {
            if (data.data.confirmPassWordReset.success) {
              return (
                <Typography>
                  Your password has been reset successfully. You can now log in.
                </Typography>
              );
            }
            return (
              <Typography>{data.data.confirmPassWordReset.message}</Typography>
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
                onClick={confirmPassWordReset}
                disabled={
                  !password ||
                  password !== passwordConfirm ||
                  (pwstrength.errors && pwstrength.errors.length > 0)
                }
              >
                Set new password
              </Button>
            </>
          );
        }}
      </Mutation>
    </>
  );
};

export default SetNewPasswordResetForm;
