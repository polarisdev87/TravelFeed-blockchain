import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import dayjs from 'dayjs';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { requestPostingAuthority } from '../../helpers/actions';
import hasPostingAuthority from '../../helpers/hasPostingAuthority';
import { getUser } from '../../helpers/token';

const ScheduleBtn = props => {
  const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'hour'));
  const [open, setOpen] = useState(false);

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const triggerSchedule = () => {
    props
      .checkBeforeSchedule()
      .then(isValid => {
        if (isValid) {
          hasPostingAuthority(getUser()).then(res => {
            if (res)
              props.schedulePost({
                scheduledDate: selectedDate,
                showNotification: true,
              });
            else if (window && !window.steem_keychain) {
              newNotification({
                message:
                  'You need to give posting authority to @travelfeed.app to enable automated rewards claiming.',
                success: false,
              });
            } else {
              newNotification({
                message:
                  'This action requires you to authorize @travelfeed.app to post on your behalf.',
                success: false,
              });
              requestPostingAuthority().then(postAuthRes => {
                if (postAuthRes.success)
                  props.schedulePost({
                    scheduledDate: selectedDate,
                    showNotification: true,
                  });
                else newNotification(res);
              });
            }
          });
        }
      })
      .catch(err => console.warn(err));
  };

  return (
    <>
      <span className="text-light">
        <Button
          fullWidth
          onClick={() => setOpen(true)}
          color="primary"
          variant="contained"
        >
          <span>
            Schedule <ScheduleIcon />
          </span>
        </Button>
      </span>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Schedule Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your post will be automatically published at the specified date and
            time. The time will be rounded up to the next quarter hour.
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              disablePast
              margin="normal"
              id="date-picker-dialog"
              label="Select date and time"
              ampm={false}
              format="yyyy/MM/dd HH:mm"
              value={selectedDate}
              onChange={date => setSelectedDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date and time',
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={triggerSchedule} color="primary">
            <span className="textPrimary pr-2"> Schedule</span>
            <ScheduleIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ScheduleBtn.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(ScheduleBtn);
