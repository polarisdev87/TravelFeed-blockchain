import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';
import sanitize from 'sanitize-html';
import isURL from 'validator/lib/isURL';
import FeaturedImageUpload from '../../Editor/FeaturedImageUpload';

const UpdatesSelectorItem = props => {
  const [title, setTitle] = useState(props.title || '');
  const [image, setImage] = useState(props.image || '');
  const [text, setText] = useState(props.text || '');
  const [link, setLink] = useState(props.link || '');
  const [button, setButton] = useState(props.button || '');
  const [open, setOpen] = useState(false);

  const { updates, setUpdates, loading, setLoading, isEdit } = props;

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const addUpdate = () => {
    setLoading(true);
    if (!text || !title || (link && !button) || (button && !link)) {
      newNotification({
        message: 'Data incomplete',
        success: false,
      });
      setLoading(false);
      return;
    }
    if (link && !isURL(link, { protocols: ['http', 'https'] })) {
      newNotification({
        message: 'Link is invalid',
        success: false,
      });
      setLoading(false);
      return;
    }
    const sanitized = sanitize(text, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
    });
    if (isEdit) {
      const index = updates
        .map(el => {
          return el.title;
        })
        .indexOf(title);
      updates[index] = { title, image, text: sanitized, link, button };
    } else updates.push({ title, image, text: sanitized, link, button });
    setUpdates(updates);
    setOpen(false);
    setTimeout(() => setLoading(false), 1);
    setTitle('');
    setImage('');
    setText('');
    setLink('');
    setButton('');
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        {(isEdit && <EditIcon />) || <AddIcon />}
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          {isEdit ? 'Edit' : 'Add'} Update{isEdit ? `: ${title}` : ''}
        </DialogTitle>
        <DialogContent>
          {!isEdit && (
            <TextField
              autoFocus
              margin="dense"
              value={title}
              onChange={event => setTitle(event.target.value)}
              label="Title*"
              fullWidth
            />
          )}
          <DialogContentText className="pt-3 pb-0">
            You can use some basic HTML to format the text ('b', 'i', 'em',
            'strong', 'a', 'br', 'p'):{' '}
          </DialogContentText>
          <TextField
            margin="dense"
            value={text}
            onChange={event => setText(event.target.value)}
            label="Text*"
            fullWidth
            multiline
          />
          <TextField
            margin="dense"
            value={link}
            onChange={event => setLink(event.target.value)}
            label="Button Link (optional)"
            fullWidth
          />
          <TextField
            margin="dense"
            value={button}
            onChange={event => setButton(event.target.value)}
            label="Button Text (optional)"
            className="pb-3"
            fullWidth
          />
          <FeaturedImageUpload
            featuredImage={image}
            setFeaturedImage={input => setImage(input)}
            placeholder="Drag 'n drop or click to upload an image for this update (optional)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={addUpdate}
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

export default withSnackbar(UpdatesSelectorItem);
