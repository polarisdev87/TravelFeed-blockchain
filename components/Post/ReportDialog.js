import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ReportIcon from '@material-ui/icons/Flag';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';
import { REPORT_POST } from '../../helpers/graphql/curation';
import graphQLClient from '../../helpers/graphQLClient';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ReportDialog = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const { author, permlink, setListenClickAway } = props;

  const handleOpen = () => {
    setListenClickAway(false);
    setOpen(true);
  };

  const handleClose = () => {
    setListenClickAway(true);
    setOpen(false);
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

  const handleReport = () => {
    graphQLClient(REPORT_POST, {
      author,
      permlink,
      reason,
      details,
    })
      .then(res => {
        newNotification(res.reportPost);
        if (res.reportPost.success) handleClose();
      })
      .catch(() => {
        newNotification({
          success: false,
          message: 'Report could not be sent. Please try again!',
        });
      });
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <ReportIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </MenuItem>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="text-center" id="form-dialog-title">
          Report Post
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Reason</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reason}
              onChange={event => setReason(event.target.value)}
            >
              <MenuItem value="spam">Spam</MenuItem>
              <MenuItem value="image plagiarism">Image Plagiarism</MenuItem>
              <MenuItem value="plagiarism">Plagiarism / Copy-Paste</MenuItem>
              <MenuItem value="identity theft">Identity Theft</MenuItem>
            </Select>
            <TextField
              fullWidth
              multiline
              onChange={event => setDetails(event.target.value)}
              value={details}
              label="Details"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleReport}
            color="primary"
            variant="contained"
            disabled={!reason}
            autoFocus
          >
            Send Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withSnackbar(ReportDialog);
