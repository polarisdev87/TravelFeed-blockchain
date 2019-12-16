import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import PropTypes from 'prop-types';
import React from 'react';

const HelpTooltip = props => {
  return (
    <Tooltip
      disableFocusListener
      disableTouchListener
      title={props.title}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '10px',
      }}
    >
      <IconButton>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
};

HelpTooltip.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HelpTooltip;
