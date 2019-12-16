import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import ReCAPTCHA from 'react-google-recaptcha';
import isEmail from 'validator/lib/isEmail';
import { RECAPTCHA_SITE_KEY } from '../../config';
import { ONBOARD_START } from '../../helpers/graphql/onboarding';
import Link from '../../lib/Link';
import CustomSnackbar from '../Dashboard/Notifications/CustomSnackbar';

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
  },
}));

const OnboardStart = props => {
  const classes = useStyles();

  const [referrer, setReferrer] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [newsletter, setNewsletter] = useState(false);
  const [tos, setTos] = useState(false);
  const [isMailValid, setMailValid] = useState(true);
  const [isTosValid, setTosValid] = useState(true);
  const [captcha, setCaptcha] = useState(undefined);

  useEffect(() => {
    if (props.referrer) {
      setReferrer(props.referrer);
    } else {
      setReferrer(Cookie.get('referrer'));
    }
  }, [props]);

  const CssTextField = props.isWhite
    ? withStyles({
        root: {
          '& label': {
            color: 'white',
          },
          '& label.Mui-focused': {
            color: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        },
      })(TextField)
    : TextField;

  const handleEmailChange = () => event => {
    setEmail(event.target.value);
    if (event.target.value) setMailValid(isEmail(event.target.value));
  };

  return (
    <>
      <Mutation
        mutation={ONBOARD_START}
        variables={{
          email,
          isNewsletter: newsletter,
          referrer,
          captcha,
        }}
      >
        {(onboardStart, data) => {
          if (
            data &&
            data.data &&
            data.data.onboardStart &&
            data.data.onboardStart.success
          ) {
            return (
              <CustomSnackbar
                variant="success"
                message="Welcome to TravelFeed! We just sent you an email. Follow the instructions to create your TravelFeed account!"
              />
            );
          }
          return (
            <>
              {data && data.data && data.data.onboardStart && (
                <CustomSnackbar
                  variant="error"
                  message={`${data.data.onboardStart.message}. Reload the page to try again.`}
                />
              )}
              <FormGroup>
                <FormControl required error={!isTosValid}>
                  <CssTextField
                    InputProps={
                      props.isWhite
                        ? {
                            classes: {
                              input: classes.root,
                            },
                          }
                        : undefined
                    }
                    id="custom-css-outlined-input"
                    autoFocus={props.autoFocus}
                    className={props.isWhite ? classes.margin : undefined}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      color={props.isWhite ? 'inherit' : 'primary'}
                      className={props.isWhite ? classes.root : undefined}
                      checked={newsletter}
                      onChange={() => setNewsletter(!newsletter)}
                    />
                  }
                  label="Subscribe to the TravelFeed newsletter and never miss any news about feature updates, competitions and our upcoming airdrop and token sale"
                />
                <FormControl required error={!isTosValid}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color={props.isWhite ? 'inherit' : 'primary'}
                        className={props.isWhite ? classes.root : undefined}
                        checked={tos}
                        error={!isTosValid}
                        onChange={() => {
                          setTos(!tos);
                          setTosValid(!tos);
                        }}
                      />
                    }
                    label={
                      <>
                        I have read and accept the{' '}
                        <Link href="/about/tos">terms of service</Link>, the{' '}
                        <Link href="/about/privacy">privacy policy</Link> and
                        the <Link href="/about/cookies">cookie policy</Link>{' '}
                        (required)
                      </>
                    }
                  />
                  {!isTosValid && (
                    <FormHelperText>
                      You need to accept our terms of service, privacy policy
                      and cookie policy to continue
                    </FormHelperText>
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
                  color={props.isWhite ? 'secondary' : 'primary'}
                  onClick={onboardStart}
                  disabled={!captcha || !email || !isMailValid || !isTosValid}
                >
                  Sign Up
                  {data.loading && (
                    <>
                      {' '}
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

OnboardStart.defaultProps = {
  autoFocus: true,
};

export default OnboardStart;
