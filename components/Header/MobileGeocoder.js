import { teal } from '@material-ui/core/colors';
import React from 'react';
import Geocoder from './Geocoder';

const MobileGeocoder = () => {
  return (
    <>
      <>
        <div id="search">
          <Geocoder autoFocus width={window.innerWidth} />
        </div>
      </>
      <style>{`
        #search {
          position: fixed; 
          top: 0;
          left: 0;
          width: 100%; 
          height: 65px; 
          background: ${teal[800]};
        }
        `}</style>
    </>
  );
};

export default MobileGeocoder;
