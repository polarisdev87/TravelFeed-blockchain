import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { imageProxy } from '../../helpers/getImage';
import supportsWebp from '../../helpers/webp';

const FixedBackgroundImage = props => {
  const { component } = props;

  const [windowWidth, setWindowWidth] = useState(10);
  const [opacity, setOpacity] = useState(0);
  const [webpSupport, setWebpSupport] = useState(undefined);

  useEffect(() => {
    const getWebpSupport = async () => {
      const isWebp = await supportsWebp();
      return isWebp;
    };
    const webp = getWebpSupport();
    setWebpSupport(webp);
    setWindowWidth((Math.ceil(window.innerWidth / 640) + 1) * 640);
    setOpacity(1);
  }, []);

  return (
    <>
      <div
        className="w-100"
        style={{
          height: '100%',
          position: 'fixed',
          marginTop: '0px',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.3)), url("${imageProxy(
            props.backgroundImage,
            undefined,
            10,
            'fit',
          )}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="w-100"
          style={{
            height: '100%',
            position: 'absolute',
            marginTop: '0px',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.3)), url("${imageProxy(
              props.backgroundImage,
              windowWidth,
              undefined,
              undefined,
              webpSupport ? 'webp' : undefined,
            )}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity,
            transition: 'opacity 2s linear',
          }}
        />
      </div>
      <div className="w-100" style={{ position: 'relative' }}>
        {component}
      </div>
    </>
  );
};

FixedBackgroundImage.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
};

export default FixedBackgroundImage;
