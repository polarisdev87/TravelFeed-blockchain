import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import owasp from 'owasp-password-strength-test';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import { ONBOARD_CREATE } from '../../helpers/graphql/onboarding';
import steem from '../../helpers/steem';
import generateSteemPassphrase from '../../helpers/steeminvite/generateSteemPassphrase';
import Link from '../../lib/Link';
import EasyLogin from './EasyLogin';
import PasswordPicker from './PasswordPicker';
import SteemKeys from './SteemKeys';
import UsernamePicker from './UsernamePicker';

owasp.config({
  maxLength: 72,
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const OnboardCreate = props => {
  const classes = useStyles();

  const [username, setUserName] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [passPhrase, setPassPhrase] = useState(undefined);
  const [passPhraseConfirm, setPassPhraseConfirm] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState(undefined);

  const pwstrength = password ? owasp.test(password) : {};

  const getPubKeys = () => {
    const roles = ['active', 'owner', 'posting', 'memo'];
    return steem.auth.generateKeys(username, passPhrase, roles);
  };

  useEffect(() => {
    setPassPhrase(generateSteemPassphrase());
  }, []);

  const pubKeys = getPubKeys();

  function getSteps() {
    return [
      'Pick a username',
      'Choose your password',
      'Save your keys',
      'Confirm',
    ];
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <FormLabel component="legend">
              {(username && (
                <span>
                  You have chosen the username @<strong>{username}</strong>
                </span>
              )) ||
                'Choose a username below. Unlike your blog name, your username cannot be changed once your account has been created.'}
            </FormLabel>
            <div className="pb-3">
              <UsernamePicker
                data={username}
                placeholder="Pick a username"
                onChange={res => setUserName(res)}
              />
            </div>
          </>
        );
      case 1:
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
          </>
        );
      case 2:
        return (
          <>
            <FormLabel component="legend" className="pt-2 pb-2">
              TravelFeed is built on the Steem blockchain, a next-generation
              technology powered by a decentralised ledger and strong
              encryption. Thanks to TravelFeed EasyLogin, you can use TravelFeed
              with the password that you picked in the previous step, but you
              will need your Steem wallet keys to perform advanced actions such
              as transferring your earnings. Like a physical wallet, your Steem
              keys <strong>cannot be recovered</strong> - if you forget them,
              you will lose access to your account and any funds that are on it{' '}
              <strong>forever</strong>. This is why it is extremely important
              that you <strong>store them securely</strong>. We recommend to
              download your Steem wallet keys and store them offline and/or
              print them out.
            </FormLabel>
            <SteemKeys username={username} passPhrase={passPhrase} />
            <FormLabel component="legend" className="pt-5">
              Want to know more about your Steem keys? Watch this video by
              TravelFeed user{' '}
              <Link as="/@coruscate" href="/blog?author=coruscate">
                @coruscate
              </Link>
              .
            </FormLabel>
            <div className="pb-3 pt-3">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Steem Onboarding - Passwords, Keys and Security"
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/HSxYKW9X8_I"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <FormLabel component="legend" className="pb-2">
              To confirm that you have stored your Steem passphrase securely,
              please reenter it below. Remember, if you ever lose your
              passphrase, <strong>we cannot recover it</strong> and you will
              lose access to your account and all funds on it permanently!
            </FormLabel>
            <div className="pb-2">
              <PasswordPicker
                autofocus
                label="Confirm Passphrase"
                password={passPhraseConfirm}
                setPassword={setPassPhraseConfirm}
                isValid={!passPhraseConfirm || passPhraseConfirm === passPhrase}
                helper={
                  passPhraseConfirm &&
                  passPhraseConfirm !== passPhrase &&
                  'This does not match your passphrase'
                }
              />
            </div>
          </>
        );
      default:
        return 'Uknown stepIndex';
    }
  }

  const steps = getSteps();

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const { claimToken } = props;

  return (
    <>
      <Mutation
        mutation={ONBOARD_CREATE}
        variables={{
          claimToken,
          username,
          postingPubKey: pubKeys.posting,
          activePubKey: pubKeys.active,
          memoPubKey: pubKeys.memo,
          ownerPubKey: pubKeys.owner,
          password,
        }}
      >
        {(onboardCreate, { data, loading, error }) => {
          if (loading) {
            return (
              <>
                <FormLabel component="legend">
                  Please wait a few seconds while we set up your account...
                </FormLabel>
                <div className="pt-3 text-center">
                  <CircularProgress />
                </div>
              </>
            );
          }
          if (data && data.onboardCreate) {
            if (data.onboardCreate.success) {
              return (
                <FormLabel component="legend">
                  Your account has been created! You can now log in.
                </FormLabel>
              );
            }
            return (
              <FormLabel component="legend">
                Account could not be created: {data.onboardCreate.message}
              </FormLabel>
            );
          }
          if (error) {
            console.log(error);
            return (
              <FormLabel component="legend">
                Account could not be created :(
              </FormLabel>
            );
          }
          return (
            <>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => {
                  const stepProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                <>
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                  </div>
                  <div className="w-100 text-right">
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep === steps.length - 1
                          ? onboardCreate
                          : handleNext
                      }
                      disabled={
                        (activeStep === 0 && username === '') ||
                        (activeStep === 1 &&
                          (!password ||
                            password !== passwordConfirm ||
                            (pwstrength.errors &&
                              pwstrength.errors.length > 0))) ||
                        (activeStep === 3 && passPhrase !== passPhraseConfirm)
                      }
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </>
              </div>
            </>
          );
        }}
      </Mutation>
    </>
  );
};

export default OnboardCreate;
