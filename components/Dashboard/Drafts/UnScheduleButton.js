import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CancelScheduleIcon from '@material-ui/icons/CancelScheduleSend';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { SAVE_DRAFT } from '../../../helpers/graphql/drafts';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

class UnScheduleButton extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  newNotification(notification) {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      const { enqueueSnackbar } = this.props;
      enqueueSnackbar(notification.message, { variant });
    }
  }

  render() {
    const { id, onDelete } = this.props;
    const { open } = this.state;
    return (
      <Mutation
        mutation={SAVE_DRAFT}
        variables={{
          id,
          scheduledDate: null,
        }}
      >
        {(addDraft, data) => {
          if (data.data && data.data.addDraft && open) {
            this.handleClose();
            if (!data.data.addDraft.success) {
              this.newNotification({
                success: data.data.addDraft.success,
                message: data.data.addDraft.message,
              });
            }
            if (data.data.addDraft.success) {
              onDelete();
            }
          }
          return (
            <Fragment>
              <span className="text-light">
                <Button
                  onClick={this.handleClickOpen}
                  className="p-0 pr-2 pl-2"
                >
                  <span className="textPrimary pr-1">Unschedule</span>
                  <CancelScheduleIcon />
                </Button>
              </span>
              <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Revert Scheduled Post to Draft?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to cancel the scheduled post?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Cancel
                  </Button>
                  <MuiThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      onClick={addDraft}
                      color="primary"
                    >
                      <span className="textPrimary pr-1">Revert</span>
                      <CancelScheduleIcon />
                    </Button>
                  </MuiThemeProvider>
                </DialogActions>
              </Dialog>
            </Fragment>
          );
        }}
      </Mutation>
    );
  }
}

UnScheduleButton.propTypes = {
  id: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withSnackbar(UnScheduleButton);
