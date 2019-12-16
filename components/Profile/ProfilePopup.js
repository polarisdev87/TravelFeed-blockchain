// FIXME: Profile Popup feature is currently removed since
// the timers used to open and close the popup create a very buggy experience
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import PostAuthorProfile from './PostAuthorProfile';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: '300px',
    borderRadius: 16,
    boxShadow:
      '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23),  0 -1px 3px -1px rgba(0, 0, 0, 0.2)',
  },
}));

const ProfilePopup = props => {
  const { author } = props;

  const id = `${author}-popup`;

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openTimer, setOpenTimer] = useState(undefined);
  const [closeTimer, setCloseTimer] = useState(false);

  const startOpenTimer = e => {
    //  Only open if no popup with the same id is open
    if (document.getElementById(id) === null) {
      setAnchorEl(anchorEl ? null : e.currentTarget);
      setOpenTimer(
        setTimeout(() => {
          setOpen(true);
          setOpenTimer(undefined);
        }, 400),
      );
    }
  };

  const startCloseTimer = () => {
    if (!closeTimer)
      setCloseTimer(
        setTimeout(() => {
          setOpen(false);
          setCloseTimer(undefined);
        }, 1000),
      );
  };

  const clearOpenTimer = () => {
    clearTimeout(openTimer);
    setOpenTimer(undefined);
    startCloseTimer();
  };

  const clearCloseTimer = () => {
    clearTimeout(closeTimer);
    setCloseTimer(undefined);
  };

  return (
    <>
      <>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="top"
          disablePortal={false}
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={1000}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Paper
                  id={id}
                  className={classes.root}
                  onMouseLeave={startCloseTimer}
                  onMouseOver={clearCloseTimer}
                >
                  <PostAuthorProfile author={author} />
                </Paper>
              </ClickAwayListener>
            </Fade>
          )}
        </Popper>
      </>
      <div
        style={{ position: 'relative' }}
        onMouseOver={startOpenTimer}
        onMouseLeave={clearOpenTimer}
      >
        {props.component}
      </div>
    </>
  );
};

export default ProfilePopup;
