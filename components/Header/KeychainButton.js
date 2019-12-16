import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import steemconnect from 'steemconnect';
import api from '../../helpers/steemConnectAPI';
import KcLogo from '../../images/keychain.png';
import HrCaption from './HrCaption';

const KeychainButton = props => {
  const [username, setUsername] = useState(undefined);
  const [isKeychain, setKeychain] = useState(false);

  useEffect(() => {
    if (window && window.steem_keychain) setKeychain(true);
  });

  const handleUsernameInput = () => event => {
    setUsername(event.target.value.toLowerCase());
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

  const handleLogin = () => {
    let params = {};
    if (steemconnect.useSteemKeychain) {
      params = { username };
    }

    api.login(params, (err, token) => {
      if (token) {
        Router.push({
          pathname: '/login',
          query: { access_token: token, expires_in: 604800 },
        });
      }
      if (err) {
        newNotification({
          success: false,
          message: `Could not login: ${err}`,
        });
      }
    });
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') handleLogin();
  };

  const handleKeychainClick = () => {
    if (username && username.length > 2) handleLogin();
    else
      newNotification({
        success: false,
        message: 'Enter your username first',
      });
  };

  return (
    <>
      {isKeychain && (
        <>
          <DialogContentText>
            To log in with Steem Keychain, please enter your Steem username and
            click the Keychain button
          </DialogContentText>
          <TextField
            autoFocus
            value={username}
            onChange={handleUsernameInput()}
            margin="dense"
            id="username"
            label="Steem username"
            fullWidth
            onKeyPress={handleKeyPress}
          />
          <div className="row pt-4">
            <div className="col-12">
              <Button
                size="large"
                fullsize
                onClick={handleKeychainClick}
                color="primary"
                variant="contained"
              >
                <img src={KcLogo} alt="Login with Steem Keychain" height={30} />
              </Button>
            </div>
          </div>
          <div className="container">
            <div className="row pt-4">
              <div className="col-12 pt-2">
                <HrCaption text="OR LOGIN WITH" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

KeychainButton.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(KeychainButton);
