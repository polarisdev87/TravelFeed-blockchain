import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import OnboardStart from '../Onboarding/OnboardStart';
import HrCaption from './HrCaption';

const JoinDialog = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { open, handleClose } = props;
  return (
    <Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className="text-center" id="form-dialog-title">
          Join TravelFeed{props.text}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '2px',
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <FormLabel component="legend">
            Create a free account to start your travel blog, join the TravelFeed
            community and follow your favourite authors.
          </FormLabel>
          <OnboardStart />
          <HrCaption text="Already have a Steem account?" />
          <div className="pb-3">
            <Typography
              color="primary"
              align="center"
              onClick={props.switch}
              onKeyPress={props.switch}
              role="link"
              tabIndex={0}
              className="cpointer"
            >
              Sign in instead
            </Typography>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

JoinDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default JoinDialog;
