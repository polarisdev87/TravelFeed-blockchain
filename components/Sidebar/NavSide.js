import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import BookmarkIcon from '@material-ui/icons/Bookmarks';
import PublishIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DraftIcon from '@material-ui/icons/FileCopy';
import ProfileIcon from '@material-ui/icons/Person';
import RepliesIcon from '@material-ui/icons/Reply';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../helpers/token';
import Link from '../../lib/Link';
import JoinNow from './JoinNow';

const NavSide = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <>
      {(user && (
        <div className="row">
          <div className="col-9">
            <MenuList>
              <Link color="textPrimary" href="/dashboard">
                <MenuItem>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </MenuItem>
              </Link>
              <Link color="textPrimary" href="/dashboard/publish">
                <MenuItem>
                  <ListItemIcon>
                    <PublishIcon />
                  </ListItemIcon>
                  <ListItemText primary="Publish" />
                </MenuItem>
              </Link>
              <Link color="textPrimary" href="/dashboard/replies">
                <MenuItem>
                  <ListItemIcon>
                    <RepliesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Replies" />
                </MenuItem>
              </Link>
              <Link color="textPrimary" href="/dashboard/drafts">
                <MenuItem>
                  <ListItemIcon>
                    <DraftIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </MenuItem>
              </Link>
              <Divider />
              <Link color="textPrimary" href="/bookmarks">
                <MenuItem>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bookmarks" />
                </MenuItem>
              </Link>
              <Link
                color="textPrimary"
                as={`@${user}`}
                href={`/blog?author=${user}`}
              >
                <MenuItem>
                  <ListItemIcon>
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </MenuItem>
              </Link>
            </MenuList>
          </div>
          <div className="col-3" />
        </div>
      )) || <JoinNow />}
    </>
  );
};

NavSide.propTypes = {
  user: PropTypes.string.isRequired,
};

export default NavSide;
