import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_DRAFT } from '../../../helpers/graphql/drafts';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

class DeleteDraftButton extends Component {
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
        mutation={DELETE_DRAFT}
        variables={{
          id,
        }}
      >
        {(deleteDraft, data) => {
          if (data.data && data.data.deleteDraft && open) {
            this.handleClose();
            if (!data.data.deleteDraft.success) {
              this.newNotification({
                success: data.data.deleteDraft.success,
                message: data.data.deleteDraft.message,
              });
            }
            if (data.data.deleteDraft.success) {
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
                  <span className="textPrimary pr-1">Delete</span>
                  <DeleteIcon />
                </Button>
              </span>
              <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Delete Draft?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to delete this draft? Deleted
                    drafts cannot be restored.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Cancel
                  </Button>
                  <MuiThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      onClick={deleteDraft}
                      color="primary"
                    >
                      <DeleteForeverIcon /> Delete
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

DeleteDraftButton.propTypes = {
  id: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withSnackbar(DeleteDraftButton);
