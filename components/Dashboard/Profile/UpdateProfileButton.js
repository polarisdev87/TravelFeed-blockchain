import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { accountUpdate } from '../../../helpers/actions';
import {
  ACCOUNT_UPDATE,
  PAST_ACCOUNT_UPDATE,
} from '../../../helpers/graphql/broadcast';
import graphQLClient from '../../../helpers/graphQLClient';
import { getRoles, getUser } from '../../../helpers/token';

const UpdateProfileButton = props => {
  const user = getUser();

  const { profile } = props;

  const [changing, setChanging] = useState(false);

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
    if (roles && roles.indexOf('easylogin') !== -1) {
      const variables = {
        profile,
      };
      graphQLClient(ACCOUNT_UPDATE, variables)
        .then(res => {
          if (res && res.accountUpdate) newNotification(res.accountUpdate);
          setChanging(false);
        })
        .catch(err => {
          newNotification({
            success: false,
            message:
              err.message === 'Failed to fetch'
                ? 'Network Error. Are you online?'
                : `Profile update failed: ${err.message}`,
          });
        });
    } else {
      accountUpdate(user, profile).then(res => {
        if (res) {
          newNotification(res);
          if (res.success) graphQLClient(PAST_ACCOUNT_UPDATE);
        }
        setChanging(false);
      });
    }
  };

  return (
    <Button
      fullWidth
      color="primary"
      variant="contained"
      onClick={broadcast}
      disabled={changing}
    >
      <SaveIcon />
      <span className="pl-2">Update Profile </span>
      {changing && <CircularProgress className="ml-2" size={24} />}
    </Button>
  );
};

UpdateProfileButton.propTypes = {
  author: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(UpdateProfileButton);
