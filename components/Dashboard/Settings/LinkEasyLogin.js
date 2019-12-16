import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { indigo } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import isEmail from 'validator/lib/isEmail';
import { requestPostingAuthority } from '../../../helpers/actions';
import {
  IS_EASY_LOGIN,
  START_ADD_ACCOUNT_PASSWORD,
} from '../../../helpers/graphql/onboarding';
import hasPostingAuthority from '../../../helpers/hasPostingAuthority';
import { getUser } from '../../../helpers/token';
import HeaderCard from '../../General/HeaderCard';
import CustomSnackbar from '../Notifications/CustomSnackbar';

const LinkEasyLogin = props => {
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isMailValid, setMailValid] = useState(true);

  const handleEmailChange = () => event => {
    setEmail(event.target.value);
    if (event.target.value) setMailValid(isEmail(event.target.value));
  };

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const linkEasy = startAddAccountPassword => () => {
    hasPostingAuthority(getUser()).then(res => {
      if (res) startAddAccountPassword();
      else if (window && !window.steem_keychain) {
        newNotification({
          message:
            'You need to give posting authority to @travelfeed.app to enable EasyLogIn.',
          success: false,
        });
      } else {
        newNotification({
          message:
            'You need to give posting authority to @travelfeed.app to enable EasyLogIn.',
          success: false,
        });
        requestPostingAuthority().then(postAuthRes => {
          if (postAuthRes.success) startAddAccountPassword();
        });
      }
    });
  };

  return (
    <Query query={IS_EASY_LOGIN}>
      {({ data }) => {
        if (data && !data.isEasyLogIn)
          return (
            <div className="pt-2">
              <HeaderCard
                title="EasyLogIn"
                background={indigo[600]}
                content={
                  <>
                    <FormLabel component="legend" className="pt-4">
                      Link your email address to your Steem account to easily
                      log in with email+password instead of your Steem login for
                      future logins on TravelFeed.
                    </FormLabel>
                    <Mutation
                      mutation={START_ADD_ACCOUNT_PASSWORD}
                      variables={{
                        email,
                        isNewsletter: newsletter,
                      }}
                    >
                      {(
                        startAddAccountPassword,
                        // eslint-disable-next-line no-shadow
                        { data, loading },
                      ) => {
                        if (loading) {
                          return <CircularProgress />;
                        }
                        if (data && data.startAddAccountPassword) {
                          newNotification(data.startAddAccountPassword);
                          return (
                            <CustomSnackbar
                              variant={
                                data.startAddAccountPassword.success
                                  ? 'success'
                                  : 'error'
                              }
                              message={
                                data.startAddAccountPassword.success
                                  ? 'We just sent you an email to link set up EasyLogIn.'
                                  : data.startAddAccountPassword.message
                              }
                            />
                          );
                        }
                        return (
                          <>
                            <div className="pt-1 pb-1">
                              <FormControl
                                fullWidth
                                required
                                error={!isMailValid}
                              >
                                <TextField
                                  label="Email"
                                  fullWidth
                                  multiline
                                  value={email}
                                  onChange={handleEmailChange()}
                                />
                                {!isMailValid && (
                                  <FormHelperText>
                                    A valid email is required
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </div>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={newsletter}
                                  onChange={() => setNewsletter(!newsletter)}
                                />
                              }
                              label="Subscribe to the TravelFeed newsletter and never miss any news about feature updates, competitions and our upcoming airdrop and token sale"
                            />
                            <div className="pt-1 pb-1">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={linkEasy(startAddAccountPassword)}
                                disabled={!isEmail(email)}
                              >
                                Link email
                              </Button>
                            </div>
                          </>
                        );
                      }}
                    </Mutation>
                  </>
                }
              />
            </div>
          );
        return <></>;
      }}
    </Query>
  );
};

export default withSnackbar(LinkEasyLogin);
