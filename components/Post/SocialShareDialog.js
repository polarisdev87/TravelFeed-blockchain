import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import React, { useState } from 'react';
import PostSocialShares from './PostSocialShares';

const SocialShareDialog = props => {
  const [open, setOpen] = useState(false);

  const { author, permlink, tags, title, img_url, setListenClickAway } = props;
  let tagString = '';
  if (tags)
    tags.forEach((t, i) => {
      if (i > 0) tagString += ', ';
      tagString += `#${t}`;
    });

  const handleOpen = () => {
    if (navigator.share)
      navigator.share({
        title,
        text: `${title} ${tagString}`,
        url: window.location.href,
      });
    else {
      setListenClickAway(false);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setListenClickAway(true);
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <ShareIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="text-center" id="form-dialog-title">
          Share
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
          <PostSocialShares
            author={author}
            permlink={permlink}
            tags={tags}
            title={title}
            img_url={img_url}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialShareDialog;
