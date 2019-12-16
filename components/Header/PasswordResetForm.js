import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReCAPTCHA from 'react-google-recaptcha';
import isEmail from 'validator/lib/isEmail';
import { RECAPTCHA_SITE_KEY } from '../../config';
import { START_PASSWORD_RESET } from '../../helpers/graphql/onboarding';
import CustomSnackbar from '../Dashboard/Notifications/CustomSnackbar';

const PasswordResetForm = () => {
  const [email, setEmail] = useState(undefined);
  const [captcha, setCaptcha] = useState(undefined);
  const [isMailValid, setMailValid] = useState(true);

  const handleEmailChange = () => event => {
    setEmail(event.target.value);
    if (event.target.value) setMailValid(isEmail(event.target.value));
  };

  return (
    <>
      <Mutation
        mutation={START_PASSWORD_RESET}
        variables={{
          email,
          captcha,
        }}
      >
        {(startPassWordReset, data) => {
          if (
            data &&
            data.data &&
            data.data.startPassWordReset &&
            data.data.startPassWordReset.success
          ) {
            return (
              <CustomSnackbar
                variant="success"
                message="We just sent you an email to reset your password."
              />
            );
          }
          return (
            <>
              {data && data.data && data.data.startPassWordReset && (
                <CustomSnackbar
                  variant="error"
                  message={`${data.data.startPassWordReset.message}. Reload the page to try again.`}
                />
              )}
              <FormGroup>
                <FormControl required error={!isMailValid}>
                  <TextField
                    id="custom-css-outlined-input"
                    autoFocus
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange()}
                    error={!isMailValid}
                  />
                  {!isMailValid && (
                    <FormHelperText>A valid email is required</FormHelperText>
                  )}
                </FormControl>
                <div className="pb-2">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={token => setCaptcha(token)}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startPassWordReset}
                  disabled={!captcha || !email || !isMailValid}
                >
                  Send password mail
                  {data.loading && (
                    <>
                      <CircularProgress className="ml-2" size={24} />
                    </>
                  )}
                </Button>
              </FormGroup>
            </>
          );
        }}
      </Mutation>
    </>
  );
};

PasswordResetForm.defaultProps = {
  autoFocus: true,
};

export default PasswordResetForm;
