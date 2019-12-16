import Avatar from '@material-ui/core/Avatar';
import { teal } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PublishIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DiscoverIcon from '@material-ui/icons/Explore';
import FeedIcon from '@material-ui/icons/Favorite';
import HotIcon from '@material-ui/icons/FlightTakeoff';
import TopicIcon from '@material-ui/icons/FolderSpecial';
import CookieIcon from '@material-ui/icons/GroupWork';
import PrivacyIcon from '@material-ui/icons/Lock';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';
import NewIcon from '@material-ui/icons/Restore';
import SettingsIcon from '@material-ui/icons/Settings';
import FeaturedIcon from '@material-ui/icons/Star';
import TermsIcon from '@material-ui/icons/Toc';
import React, { useState } from 'react';
import capitalize from '../../helpers/capitalize';
import { getUser, logout } from '../../helpers/token';
import Link from '../../lib/Link';
import Logout from '../Login/LogoutButton';
import LoginButton from './LoginButton';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    background: teal[600],
    padding: theme.spacing(3, 2),
  },
  avatar: {
    width: 50,
    height: 50,
  },
  typography: {
    fontWeight: 500,
  },
}));

export default function MenuDrawer(props) {
  const [user, setUser] = useState(getUser());
  const { active } = props;

  const handleLogout = () => {
    logout();
    setUser(undefined);
    props.handleLogout();
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = state => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(state);
  };

  const feedList = [
    {
      label: 'featured',
      link: '/',
      icon: <FeaturedIcon />,
    },
    {
      label: 'taking Off',
      link: '/hot',
      icon: <HotIcon />,
    },
    {
      label: 'new',
      link: '/created',
      icon: <NewIcon />,
    },
    {
      label: 'discover',
      link: '/discover',
      icon: <DiscoverIcon />,
    },
  ];

  const legalList = [
    { label: 'privacy', href: '/about/privacy', icon: <PrivacyIcon /> },
    { label: 'terms', href: '/about/terms', icon: <TermsIcon /> },
    { label: 'cookies', href: '/about/cookies', icon: <CookieIcon /> },
  ];

  if (user) {
    legalList.unshift({
      label: 'settings',
      as: `/dashboard/settings`,
      href: '/dashboard/settings',
      icon: <SettingsIcon />,
    });
    feedList.unshift({
      label: 'feed',
      link: '/feed',
      icon: <FeedIcon />,
    });
    feedList.push({
      label: 'bookmarks',
      link: '/bookmarks',
      icon: <BookmarkIcon />,
    });
  }

  const sideList = () => (
    <div className={classes.list} role="presentation">
      {(user && (
        <>
          <Paper square className={classes.paper}>
            <Link
              color="textPrimary"
              as={`/@${user}`}
              href={`/blog?author=${user}`}
            >
              <Avatar
                className={`cpointer ${classes.avatar}`}
                src={`https://steemitimages.com/u/${user}/avatar/small`}
              />
              <div className="text-light">
                <Typography
                  variant="h6"
                  className={`pl-1 pt-2 ${classes.typography}`}
                  color="inherit"
                >
                  {user}
                </Typography>
              </div>
            </Link>
          </Paper>
        </>
      )) || (
        <LoginButton
          isList
          isMenu
          onClickOpen={() => {}}
          onClickClose={() => {}}
        />
      )}
      <Divider />
      <List>
        {feedList.map(el => (
          <Link color="textPrimary" href={el.link}>
            <ListItem selected={active === el.label} button key={el.label}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText primary={capitalize(el.label)} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {[
          {
            label: 'topics',
            link: '/topics',
            icon: <TopicIcon />,
          },
          {
            label: 'destinations',
            link: '/destinations',
            icon: <DiscoverIcon />,
          },
          { label: 'map', link: '/map', icon: <MapIcon /> },
        ].map(el => (
          <Link color="textPrimary" href={el.link}>
            <ListItem selected={active === el.label} button key={el.label}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText primary={capitalize(el.label)} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {user && (
        <>
          <List>
            {[
              {
                label: 'TravelBlog',
                link: '/dashboard',
                icon: <DashboardIcon />,
              },
              {
                label: 'New Post',
                link: '/dashboard/publish',
                icon: <PublishIcon />,
              },
            ].map(el => (
              <Link color="textPrimary" href={el.link}>
                <ListItem button key={el.label}>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <ListItemText primary={el.label} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </>
      )}
      <List>
        {legalList.map(el => (
          <Link color="textPrimary" href={el.href} as={el.as}>
            <ListItem selected={active === el.label} button key={el.label}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText primary={capitalize(el.label)} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {user && <Logout listItem handleLogout={handleLogout} />}
    </div>
  );

  return (
    <>
      {!props.hidden && (
        <span className="text-light">
          <IconButton color="inherit" onClick={toggleDrawer(true)} edge="start">
            <MenuIcon />
          </IconButton>
        </span>
      )}
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </>
  );
}
