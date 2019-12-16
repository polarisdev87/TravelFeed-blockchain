import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';

const ConfirmBtn = props => {
  const { onConfirm, btnText, dialogText, icon, btntheme } = props;

  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      {(icon && (
        <MuiThemeProvider theme={btntheme}>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            {icon}
          </IconButton>
        </MuiThemeProvider>
      )) || (
        <Button
          className="m-1"
          variant="contained"
          onClick={() => setOpen(true)}
          color="primary"
        >
          {btnText}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{btnText}?</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm} color="primary">
            {btnText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmBtn;
