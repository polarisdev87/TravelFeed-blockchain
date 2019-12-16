import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import Router from 'next/router';
import React from 'react';

const BackButton = () => {
  return (
    <span className="text-light">
      <IconButton color="inherit" onClick={() => Router.back()} edge="start">
        <BackIcon />
      </IconButton>
    </span>
  );
};

export default BackButton;
