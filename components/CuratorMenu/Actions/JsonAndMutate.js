import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';
import { customJson } from '../../../helpers/actions';
import { BLACKLIST_POST } from '../../../helpers/graphql/blacklist';

class JsonAndMutate extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    this.setState({ open: false });
    const payload = {
      author: this.props.author,
      permlink: this.props.permlink,
      action: this.props.action,
    };
    customJson(payload, 'travelfeed').then(result => {
      this.newNotification(result);
    });
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
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>{this.props.action}</MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.desc}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Mutation
              mutation={BLACKLIST_POST}
              variables={{
                author: this.props.author,
                permlink: this.props.permlink,
                reason: this.props.reason,
              }}
            >
              {(blacklistPost, data) => {
                if (
                  data &&
                  data.data &&
                  data.data.blacklistPost &&
                  this.state.open === true
                ) {
                  this.newNotification({
                    success: data.data.blacklistPost.success,
                    message: data.data.blacklistPost.message,
                  });
                  this.handleConfirm();
                }
                return (
                  <Button
                    onClick={blacklistPost}
                    variant="contained"
                    color="primary"
                    autoFocus
                  >
                    Do it!
                  </Button>
                );
              }}
            </Mutation>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

JsonAndMutate.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
};

export default withSnackbar(JsonAndMutate);
