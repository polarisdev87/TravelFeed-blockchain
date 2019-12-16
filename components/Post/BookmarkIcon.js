import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import BookmarkIconFilled from '@material-ui/icons/Bookmark';
import BookmarkIconBorder from '@material-ui/icons/BookmarkBorder';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import {
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
  IS_BOOKMARKED,
} from '../../helpers/graphql/bookmarks';
import { getUser } from '../../helpers/token';
import LoginButton from '../Header/LoginButton';

const BookmarkIcon = props => {
  const { isHeader, isButton, isMenuItem } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      {open && (
        <LoginButton
          open={open}
          hideButtons
          onClickClose={() => setOpen(false)}
          text=" and bookmark your favorite posts"
        />
      )}
      <Query
        fetchPolicy="network-only"
        query={IS_BOOKMARKED}
        variables={{
          author: props.author,
          permlink: props.permlink,
        }}
      >
        {({ data }) => {
          if (data && data.isBookmarked) {
            return (
              <IsBookmarked
                isHeader={isHeader}
                isButton={isButton}
                isMenuItem={isMenuItem}
                author={props.author}
                permlink={props.permlink}
                onBmChange={props.onBmChange}
                setOpen={() => setOpen(true)}
              />
            );
          }
          return (
            <IsNotBookmarked
              isHeader={isHeader}
              isButton={isButton}
              isMenuItem={isMenuItem}
              author={props.author}
              permlink={props.permlink}
              onBmChange={props.onBmChange}
              setOpen={() => setOpen(true)}
            />
          );
        }}
      </Query>
    </Fragment>
  );
};

const IsBookmarked = props => {
  const { isHeader, isButton, isMenuItem } = props;
  return (
    <Mutation
      mutation={DELETE_BOOKMARK}
      variables={{
        author: props.author,
        permlink: props.permlink,
      }}
    >
      {(deleteBookmark, data) => {
        if (data.data && data.data.deleteBookmark.success) {
          if (props.onBmChange !== undefined) {
            props.onBmChange();
          }
          return (
            <IsNotBookmarked
              isHeader={isHeader}
              isButton={isButton}
              isMenuItem={isMenuItem}
              author={props.author}
              permlink={props.permlink}
              onBmChange={props.onBmChange}
            />
          );
        }
        if (props.isHeader)
          return (
            <div className="text-light">
              <IconButton
                color="inherit"
                onClick={getUser() ? deleteBookmark : props.setOpen}
                edge="end"
              >
                <BookmarkIconFilled />
              </IconButton>
            </div>
          );
        if (props.isButton)
          return (
            <Button
              fullWidth
              size="small"
              color="inherit"
              onClick={getUser() ? deleteBookmark : props.setOpen}
            >
              <BookmarkIconFilled />
              <Typography noWrap variant="inherit" className="p-1">
                Unsave
              </Typography>
            </Button>
          );
        if (props.isMenuItem)
          return (
            <>
              <MenuItem onClick={getUser() ? deleteBookmark : props.setOpen}>
                <ListItemIcon>
                  <BookmarkIconFilled fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Unsave" />
              </MenuItem>
            </>
          );
        return (
          <IconButton onClick={getUser() ? deleteBookmark : props.setOpen}>
            <BookmarkIconFilled />
          </IconButton>
        );
      }}
    </Mutation>
  );
};

const IsNotBookmarked = props => {
  const { isHeader, isButton, isMenuItem } = props;
  return (
    <Mutation
      mutation={ADD_BOOKMARK}
      variables={{
        author: props.author,
        permlink: props.permlink,
      }}
    >
      {(addBookmark, data) => {
        if (data.data && data.data.addBookmark.success) {
          if (props.onBmChange !== undefined) {
            props.onBmChange();
          }
          return (
            <IsBookmarked
              isHeader={isHeader}
              isButton={isButton}
              isMenuItem={isMenuItem}
              author={props.author}
              permlink={props.permlink}
              onBmChange={props.onBmChange}
            />
          );
        }
        if (props.isHeader)
          return (
            <div className="text-light">
              <IconButton
                color="inherit"
                onClick={getUser() ? addBookmark : props.setOpen}
                edge="end"
              >
                <BookmarkIconBorder />
              </IconButton>
            </div>
          );
        if (props.isButton)
          return (
            <Button
              fullWidth
              size="small"
              color="inherit"
              onClick={getUser() ? addBookmark : props.setOpen}
            >
              <BookmarkIconBorder />
              <Typography noWrap variant="inherit" className="p-1">
                Save
              </Typography>
            </Button>
          );
        if (props.isMenuItem)
          return (
            <>
              <MenuItem onClick={getUser() ? addBookmark : props.setOpen}>
                <ListItemIcon>
                  <BookmarkIconBorder fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Save" />
              </MenuItem>
            </>
          );
        return (
          <IconButton onClick={getUser() ? addBookmark : props.setOpen}>
            <BookmarkIconBorder />
          </IconButton>
        );
      }}
    </Mutation>
  );
};

BookmarkIcon.defaultProps = {
  onBmChange: undefined,
};

BookmarkIcon.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  onBmChange: PropTypes.func,
};

IsNotBookmarked.defaultProps = {
  onBmChange: undefined,
};

IsNotBookmarked.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  onBmChange: PropTypes.func,
};

IsBookmarked.defaultProps = {
  onBmChange: undefined,
};

IsBookmarked.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  onBmChange: PropTypes.func,
};

export default BookmarkIcon;
