import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import EditIcon from '@material-ui/icons/Edit';
import CuratorIcon from '@material-ui/icons/MoreVert';
import React, { useEffect, useState } from 'react';
import { getRoles, getUser } from '../../helpers/token';
import Link from '../../lib/Link';
import AuthorBlacklist from '../CuratorMenu/Actions/AuthorBlacklist';
import CustomJson from '../CuratorMenu/Actions/CustomJson';
import JsonAndMutate from '../CuratorMenu/Actions/JsonAndMutate';
import PostBlacklist from '../CuratorMenu/Actions/PostBlacklist';
import FollowButton from '../Profile/FollowButton';
import BookmarkIcon from './BookmarkIcon';
import ReportDialog from './ReportDialog';
import SocialShareDialog from './SocialShareDialog';

const DotMenu = props => {
  const {
    onBmChange,
    author,
    permlink,
    tags,
    title,
    img_url,
    onEditClick,
    alwaysShowSaveBtn,
    editLink,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listenClickAway, setListenClickAway] = React.useState(true);
  const [roles, setRoles] = useState(undefined);

  useEffect(() => {
    setRoles(getRoles());
  }, []);

  const isCurator = roles && roles.indexOf('curator') !== -1;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleClose();
    onEditClick();
  };

  const menuItems = [];

  if (onEditClick)
    menuItems.push(
      <div className="d-block d-xl-none d-lg-none d-md-none d-sm-none">
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      </div>,
    );

  if (editLink) {
    menuItems.push(
      <Link as="/dashboard/publish" href={editLink}>
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ color: 'textPrimary' }}
          />
        </MenuItem>
      </Link>,
    );
  }

  menuItems.push(
    <div
      className={`d-block ${
        alwaysShowSaveBtn ? '' : 'd-xl-none d-lg-none d-md-none d-sm-none'
      }`}
    >
      <BookmarkIcon
        onBmChange={onBmChange}
        isMenuItem
        author={author}
        permlink={permlink}
      />
    </div>,
  );

  menuItems.push(
    <SocialShareDialog
      setListenClickAway={setListenClickAway}
      author={author}
      permlink={permlink}
      tags={tags}
      title={title}
      img_url={img_url}
    />,
  );

  if (getUser() !== author)
    menuItems.push(<FollowButton author={author} btnstyle="menuItem" />);

  if (props.showCuratorOptions && isCurator) {
    menuItems.push(
      <>
        <CustomJson
          author={author}
          permlink={permlink}
          action="curate"
          title="Are you sure that you want to curate this post?"
          desc="This post will be upvoted with 100% by @travelfeed and it's curation trail, resteemed and will receive a congratulation comment."
        />
        <CustomJson
          author={author}
          permlink={permlink}
          action="honour"
          title="Are you sure that you want to honour this post?"
          desc="This post will be upvoted with 50% by @travelfeed and will receive a congratulation comment."
        />
        <JsonAndMutate
          author={author}
          permlink={permlink}
          action="short"
          title="Are you sure that you want to mark this post as too short?"
          desc="This post will be blacklisted and receive a comment."
          reason="Post is under the threshold of 250 words."
        />
        <JsonAndMutate
          author={author}
          permlink={permlink}
          action="language"
          title="Are you sure that you want to mark this post as having less than 250 words in English?"
          desc="This post will be blacklisted and receive a comment."
          reason="Post is under the threshold of 250 English words."
        />
        <JsonAndMutate
          author={author}
          permlink={permlink}
          action="copyright"
          title="Are you sure that you want to mark this post as violating copyright?"
          desc="This post will be blacklisted and receive a comment."
          reason="Post is violating copyright."
        />
      </>,
    );
  }

  if (isCurator) {
    menuItems.push(
      <AuthorBlacklist
        setListenClickAway={setListenClickAway}
        author={author}
      />,
    );
    menuItems.push(
      <PostBlacklist
        setListenClickAway={setListenClickAway}
        author={author}
        permlink={permlink}
      />,
    );
  } else {
    menuItems.push(
      <>
        <ReportDialog
          setListenClickAway={setListenClickAway}
          author={author}
          permlink={permlink}
        />
      </>,
    );
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <CuratorIcon className="textPrimary" />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener
                onClickAway={listenClickAway ? handleClose : undefined}
              >
                <MenuList>
                  {menuItems.map(item => {
                    return item;
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default DotMenu;
