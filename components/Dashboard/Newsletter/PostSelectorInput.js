import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';
import sanitize from 'sanitize-html';
import postExists from '../../../helpers/postExists';

const PostSelectorItem = props => {
  const [title, setTitle] = useState(props.title || '');
  const [author, setAuthor] = useState(props.author || '');
  const [permlink, setPermlink] = useState(props.permlink || '');
  const [excerpt, setExcerpt] = useState(props.excerpt || '');
  const [open, setOpen] = useState(false);

  const { posts, setPosts, loading, setLoading, isEdit } = props;

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const addPost = () => {
    setLoading(true);
    if (!author || !permlink || !title || !excerpt) {
      newNotification({
        message: 'Data incomplete',
        success: false,
      });
      setLoading(false);
      return;
    }
    postExists(author, permlink).then(res => {
      if (res) {
        const sanitized = sanitize(excerpt, {
          allowedTags: [],
        });
        if (isEdit) {
          const index = posts
            .map(el => {
              return el.title;
            })
            .indexOf(title);
          posts[index] = { title, author, permlink, excerpt: sanitized };
        } else posts.push({ title, author, permlink, excerpt: sanitized });
        setPosts(posts);
        setOpen(false);
        setTitle('');
        setPermlink('');
        setExcerpt('');
        setAuthor('');
      } else
        newNotification({
          message: 'Post does not exist',
          success: false,
        });
      setLoading(false);
    });
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
          {isEdit ? 'Edit' : 'Add'} post{isEdit ? `: ${title}` : ''}
        </DialogTitle>
        <DialogContent>
          {!isEdit && (
            <TextField
              autoFocus
              margin="dense"
              value={title}
              onChange={event => setTitle(event.target.value)}
              label="Title"
              fullWidth
            />
          )}
          <TextField
            margin="dense"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            label="Author"
            fullWidth
          />
          <TextField
            margin="dense"
            value={permlink}
            onChange={event => setPermlink(event.target.value)}
            label="Permlink"
            fullWidth
          />
          <TextField
            margin="dense"
            value={excerpt}
            onChange={event => setExcerpt(event.target.value)}
            label="Excerpt"
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
            onClick={addPost}
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

export default withSnackbar(PostSelectorItem);
