import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import sanitize from 'sanitize-html';

const IntroSelector = props => {
  const { intro, setIntro, loading } = props;
  const [open, setOpen] = useState(false);
  const [introText, setIntroText] = useState(intro || '');

  const isEdit = intro !== '';

  const handleEdit = () => {
    setIntroText(intro);
    setOpen(true);
  };

  const handleSave = () => {
    const sanitized = sanitize(introText, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
    });
    setIntro(sanitized);
    setOpen(false);
  };

  return (
    <>
      <Typography gutterBottom variant="h6" className="pt-2" display="inline">
        Intro
      </Typography>
      <IconButton color="primary" onClick={handleEdit}>
        {(isEdit && <EditIcon />) || <AddIcon />}
      </IconButton>
      <p>{intro}</p>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          {isEdit ? 'Edit' : 'Add'} Intro
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can use some basic HTML to format the text ('b', 'i', 'em',
            'strong', 'a', 'br', 'p'):{' '}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={introText}
            onChange={event => setIntroText(event.target.value)}
            label="Intro"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            color="primary"
            disabled={loading}
          >
            {(isEdit && (
              <>
                <span className="textPrimary pr-2"> Edit</span>
                <EditIcon />
              </>
            )) || (
              <>
                <span className="textPrimary pr-2"> Add</span>
                <AddIcon />
              </>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IntroSelector;
