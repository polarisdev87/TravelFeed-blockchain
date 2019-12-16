import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import React, { useState } from 'react';
import PostSocialShares from '../Post/PostSocialShares';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '17px 5px 4px 5px',
    borderRadius: 16,
    boxShadow:
      '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23),  0 -1px 3px -1px rgba(0, 0, 0, 0.2)',
  },
}));

const ShareButton = props => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const { author, permlink, tags, title, img_url } = props.socialShare;
  let tagString = '';
  if (tags)
    tags.forEach((t, i) => {
      if (i > 0) tagString += ', ';
      tagString += `#${t}`;
    });

  const browserShare = e => {
    //   Use native sharing if available
    if (navigator.share)
      navigator.share({
        title,
        text: `${title} ${tagString}`,
        url: window.location.href,
      });
    else {
      setAnchorEl(anchorEl ? null : e.currentTarget);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="text-light">
        <IconButton color="inherit" onClick={browserShare} edge="end">
          <ShareIcon />
        </IconButton>
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
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
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper className={classes.paper}>
            <PostSocialShares
              author={author}
              permlink={permlink}
              tags={tags}
              title={title}
              img_url={img_url}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default ShareButton;
