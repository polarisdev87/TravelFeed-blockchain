import Button from '@material-ui/core/Button';
import MapIcon from '@material-ui/icons/Map';
import { useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { MAPBOX_TOKEN } from '../../config';
import Link from '../../lib/Link';

const PostMap = props => {
  const theme = useTheme();
  const dark = theme.palette.type === 'dark';

  const { latitude, longitude, cardWidth } = props;

  const map_image = `https://api.mapbox.com/styles/v1/mapbox/${
    dark ? 'dark' : 'light'
  }-v9/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${longitude}%2C${latitude}%5D%7D)/${longitude},${latitude},6/${cardWidth}x250?access_token=${MAPBOX_TOKEN}`;

  return (
    // Important! Always set the container height explicitly
    <Fragment>
      <div style={{ padding: '0 24px 0 24px' }}>
        <div
          style={{
            height: '250px',
            width: '100%',
            backgroundImage: `
          url("${map_image}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', bottom: 20 }} className="w-100">
            <div className="text-center">
              <Link
                href={`/map?zoom=6&latitude=${encodeURIComponent(
                  latitude,
                )}&longitude=${encodeURIComponent(longitude)}`}
              >
                <Button variant="contained" color="primary">
                  <span className="pr-1">Explore the map</span>
                  <MapIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostMap.propTypes = {
  location: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)).isRequired,
};

export default PostMap;
