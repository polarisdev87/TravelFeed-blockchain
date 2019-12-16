import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const MobileGeocoderButton = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const MobileGeocoder = dynamic(() => import('./MobileGeocoder'), {
    ssr: false,
  });

  return (
    <>
      {(show && (
        <>
          <MobileGeocoder />
          <div id="closebtn">
            <IconButton onClick={toggleShow}>
              <CloseIcon className="text-light" />
            </IconButton>
          </div>
          <style>{`
        #closebtn {
          position: fixed; 
          padding-top: 8px;
          top: 0;
          right: 0;
        }
          `}</style>
        </>
      )) || (
        <span className="text-light">
          <IconButton color="inherit" onClick={toggleShow} edge="end">
            <SearchIcon />
          </IconButton>
        </span>
      )}
    </>
  );
};

export default MobileGeocoderButton;
