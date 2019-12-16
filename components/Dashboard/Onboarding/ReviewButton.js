import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { ONBOARD_REVIEW } from '../../../helpers/graphql/onboarding';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

class onboardReviewButton extends Component {
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
    const { email, isApproved, text, onDelete } = this.props;

    const { open } = this.state;
    return (
      <Mutation
        mutation={ONBOARD_REVIEW}
        variables={{
          email,
          isApproved,
        }}
      >
        {(onboardReview, data) => {
          if (data.data && data.data.onboardReview && open) {
            this.handleClose();
            this.newNotification({
              success: data.data.onboardReview.success,
              message: data.data.onboardReview.message,
            });
            if (data.data.onboardReview.success) {
              onDelete();
            }
          }
          return (
            <Fragment>
              <a className="text-light">
                <Button
                  onClick={this.handleClickOpen}
                  className="p-0 pr-2 pl-2"
                >
                  <span className="textPrimary pr-1">{text}</span>
                </Button>
              </a>
              <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {text} application?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to {text} this application?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Cancel
                  </Button>
                  <MuiThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      onClick={onboardReview}
                      color="primary"
                    >
                      {text}
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

onboardReviewButton.propTypes = {
  email: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  isApproved: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withSnackbar(onboardReviewButton);
