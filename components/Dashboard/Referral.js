import { indigo } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import React, { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getUser } from '../../helpers/token';
import HeaderCard from '../General/HeaderCard';
import ReferAFriend from './Contest/ReferAFriend';
import Referrals from './Contest/Referrals';

const Contest = props => {
  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  return (
    <Fragment>
      <Grid container spacing={0} justify="center" className="p-1">
        <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
          <HeaderCard
            title="Refer a Friend"
            background={indigo[600]}
            content={
              <>
                <FormLabel component="legend" className="pt-4">
                  Invite your friends to TravelFeed! Fill out the form to send
                  an email to your friends to invite them:
                </FormLabel>
                <ReferAFriend />
                <FormLabel component="legend" className="pt-4">
                  Or use your referral link:
                </FormLabel>
                <div>
                  <CopyToClipboard
                    text={`https://travelfeed.io/join?ref=${getUser()}`}
                    onCopy={() =>
                      newNotification({
                        success: true,
                        message: 'Copied your referral link to your clipboard',
                      })
                    }
                  >
                    <TextField
                      variant="filled"
                      fullWidth
                      margin="dense"
                      multiline
                      value={`https://travelfeed.io/join?ref=${getUser()}`}
                    />
                  </CopyToClipboard>
                </div>
              </>
            }
          />
        </Grid>
        <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
          <Referrals />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withSnackbar(Contest);
