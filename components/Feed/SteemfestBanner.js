import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { hasSteemFestCookie, removeSteemfestCookie } from '../../helpers/token';
import AppBanner from '../../images/thailand-banner.jpg';
import Link from '../../lib/Link';

const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: 0,
  },
}));

const SteemfestBanner = () => {
  const classes = useStyles();

  const [isSteemfest, setIsSteemfest] = useState(false);

  useEffect(() => {
    setIsSteemfest(hasSteemFestCookie());
  }, []);

  const closeBanner = () => {
    setIsSteemfest(false);
    removeSteemfestCookie();
  };

  return (
    <>
      {isSteemfest && (
        <div className="d-block d-xl-none d-lg-none d-md-none d-sm-none">
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '2px',
            }}
          >
            <IconButton onClick={closeBanner} className="text-light">
              <CloseIcon />
            </IconButton>
          </div>
          <Card className={classes.paper}>
            <Link
              href="/destinations?country=thailand"
              as="/destinations/thailand"
            >
              <CardActionArea>
                <CardMedia style={{ minHeight: '160px' }} image={AppBanner} />
              </CardActionArea>{' '}
            </Link>
          </Card>
        </div>
      )}
    </>
  );
};

export default SteemfestBanner;
