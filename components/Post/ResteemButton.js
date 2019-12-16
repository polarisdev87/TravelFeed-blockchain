import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ResteemIcon from '@material-ui/icons/Autorenew';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { customJson } from '../../helpers/actions';
import { CUSTOM_JSON } from '../../helpers/graphql/broadcast';
import graphQLClient from '../../helpers/graphQLClient';
import { getRoles, getUser } from '../../helpers/token';
import SteemLogo from '../../images/steem-logo.svg';

const ResteemButton = props => {
  const user = getUser();

  const { author, permlink } = props;

  const [changing, setChanging] = useState(false);
  const [open, setOpen] = useState(false);

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

  const broadcast = () => {
    setChanging(true);
    const roles = getRoles();
    const id = 'follow';
    const payload = ['reblog', { account: user, author, permlink }];
    const variables = {
      id,
      payload: JSON.stringify(payload),
    };
    if (roles && roles.indexOf('easylogin') !== -1) {
      graphQLClient(CUSTOM_JSON, variables)
        .then(res => {
          if (res && res.accountUpdate) newNotification(res.accountUpdate);
          setChanging(false);
          setOpen(false);
        })
        .catch(err => {
          newNotification({
            success: false,
            message:
              err.message === 'Failed to fetch'
                ? 'Network Error. Are you online?'
                : `Resteem failed: ${err.message}`,
          });
        });
    } else {
      customJson(payload, id).then(result => {
        newNotification(result);
        setChanging(false);
        setOpen(false);
      });
    }
  };

  return (
    <>
      {user && (
        <>
          <IconButton onClick={() => setOpen(true)}>
            <img src={SteemLogo} alt="Steem logo" width={22} height={22} />
          </IconButton>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Resteem this post?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure that you want to resteem this post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                Cancel
              </Button>
              <Button variant="contained" onClick={broadcast} color="primary">
                {(changing && (
                  <span className="text-light">
                    <CircularProgress color="inherit" size={20} />
                  </span>
                )) || (
                  <>
                    <ResteemIcon />
                  </>
                )}
                <span className="pl-2">Resteem</span>
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

ResteemButton.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(ResteemButton);
