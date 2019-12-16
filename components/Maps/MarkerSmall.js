// https://github.com/uber/react-map-gl/blob/4.1-release/examples/controls/src/city-pin.js
// Copyright (c) 2015 Uber Technologies, Inc.
import { teal } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: teal[500],
  stroke: 'none',
};

const MarkerSmall = props => {
  const theme = useTheme();

  const { size = 20, onClick } = props;

  useEffect(() => {
    // Create our stylesheet
    const style = document.createElement('style');
    style.innerHTML = `
    .mapboxgl-popup-content { background: ${theme.palette.background.light} !important; }

    .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
      border-bottom-color: ${theme.palette.background.light} !important;
  }
  
  .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
      border-bottom-color: ${theme.palette.background.light} !important;
  }
  
  .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
      border-bottom-color: ${theme.palette.background.light} !important;;
  }
  
  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
      border-top-color: ${theme.palette.background.light} !important;;
  }
  
  .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
      border-top-color: ${theme.palette.background.light} !important;;
  }
  
  .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
      border-top-color: ${theme.palette.background.light} !important;;
  }
  
  .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
      border-right-color: ${theme.palette.background.light} !important;
  }
  
  .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
      border-left-color: ${theme.palette.background.light} !important;;
  }`;

    // Get the first script tag
    const ref = document.querySelector('script');

    // Insert our new styles before the first script tag
    ref.parentNode.insertBefore(style, ref);
  }, []);

  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      style={{
        ...pinStyle,
        transform: `translate(${-size / 2}px,${-size}px)`,
      }}
      onClick={onClick}
    >
      <path d={ICON} />
    </svg>
  );
};

MarkerSmall.propTypes = {
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MarkerSmall;
