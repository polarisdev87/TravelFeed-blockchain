import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import isEmail from 'validator/lib/isEmail';
import { REFERRAL_MAIL } from '../../../helpers/graphql/contest';

const ReferAFriend = props => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [querying, setQuerying] = useState(false);

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
    <>
      <Mutation
        mutation={REFERRAL_MAIL}
        variables={{
          email,
          message,
        }}
      >
        {(
          referralMail,
          // eslint-disable-next-line no-shadow
          { data, loading },
        ) => {
          if (loading) {
            setQuerying(true);
            return <CircularProgress />;
          }
          if (data && data.referralMail && querying) {
            if (data.referralMail.success) {
              setEmail('');
              setMessage('');
            }
            newNotification(data.referralMail);
            setQuerying(false);
          }
          return (
            <>
              <div className="pt-1 pb-1">
                <TextField
                  label="Email"
                  fullWidth
                  multiline
                  value={email}
                  onChange={val => setEmail(val.target.value)}
                />
              </div>
              <div className="pt-1 pb-1">
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  value={message}
                  onChange={val => setMessage(val.target.value)}
                />
              </div>
              <div className="pt-1 pb-1">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={email ? referralMail : undefined}
                  disabled={!isEmail(email)}
                >
                  Invite
                </Button>
              </div>
            </>
          );
        }}
      </Mutation>
    </>
  );
};

export default withSnackbar(ReferAFriend);
