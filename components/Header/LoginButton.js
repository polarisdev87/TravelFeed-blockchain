import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import LoginIcon from '@material-ui/icons/VpnKey';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import JoinDialog from './JoinDialog';
import LoginDialog from './LoginDialog';
import PasswordResetDialog from './PasswordResetDialog';

const styles = () => ({
  whitebutton: {
    color: grey[200],
    borderColor: grey[200],
  },
});

const LoginButton = props => {
  const [open, setOpen] = useState(props.loginOpen);
  const [joinOpen, setJoinOpen] = useState(props.open);
  const [resetOpen, setResetOpen] = useState(false);

  const handleSwitchDialog = () => {
    setJoinOpen(!joinOpen);
    setOpen(!open);
  };

  const handleLoginResetSwitch = () => {
    setResetOpen(!resetOpen);
    setOpen(!open);
  };

  const handleJoinClickOpen = () => {
    setJoinOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMenuClickOpen = () => {
    props.onClickOpen();
    handleClickOpen();
  };

  const handleJoinMenuClickOpen = () => {
    props.onClickOpen();
    handleJoinClickOpen();
  };

  const handleClose = () => {
    if (props.onClickClose) props.onClickClose();
    setOpen(false);
  };

  const handleJoinClose = () => {
    if (props.onClickClose) props.onClickClose();
    setJoinOpen(false);
  };

  const handleResetClose = () => {
    if (props.onClickClose) props.onClickClose();
    setResetOpen(false);
  };

  const { classes } = props;
  return (
    <Fragment>
      {(props.hideButtons && <></>) ||
        (props.isMenu && (
          <>
            <MenuItem onClick={handleJoinMenuClickOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </MenuItem>
            <MenuItem onClick={handleMenuClickOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
          </>
        )) ||
        (props.isList && (
          <>
            <ListItem onClick={handleJoinMenuClickOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
            <ListItem onClick={handleMenuClickOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </>
        )) || (
          <>
            <Button
              color={props.usePrimaryBtn ? 'primary' : 'secondary'}
              variant="contained"
              className={`ml-1 p-2 ${classes.whitebutton}`}
              onClick={handleJoinClickOpen}
            >
              Join Now
            </Button>
            <Button
              color="default"
              className={`ml-1 p-2 ${classes.whitebutton}`}
              onClick={handleClickOpen}
            >
              Login
            </Button>
          </>
        )}
      <LoginDialog
        switch={handleSwitchDialog}
        handleLoginResetSwitch={handleLoginResetSwitch}
        open={open}
        handleClose={handleClose}
      />
      <JoinDialog
        switch={handleSwitchDialog}
        open={joinOpen}
        handleClose={handleJoinClose}
        text={props.text}
      />
      <PasswordResetDialog
        switch={handleLoginResetSwitch}
        open={resetOpen}
        handleClose={handleResetClose}
        text={props.text}
      />
    </Fragment>
  );
};

LoginButton.defaultProps = {
  isMenu: false,
  onClickOpen: undefined,
  onClickClose: undefined,
};

LoginButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isMenu: PropTypes.bool,
  onClickOpen: PropTypes.func,
  onClickClose: PropTypes.func,
};

export default withStyles(styles)(LoginButton);
