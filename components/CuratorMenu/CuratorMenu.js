import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import CuratorIcon from '@material-ui/icons/MoreVert';
import React from 'react';

const CuratorMenu = props => {
  const { component } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <CuratorIcon className="textPrimary" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
        }}
      >
        <MenuList>{component}</MenuList>
      </Popover>
    </>
  );
};

export default CuratorMenu;
