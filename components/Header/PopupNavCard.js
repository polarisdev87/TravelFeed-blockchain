import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { slugFromCC } from '../../helpers/countryCodes';
import { imageProxy } from '../../helpers/getImage';
import Link from '../../lib/Link';

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 12,
  },
  skeletoncard: {
    borderRadius: 12,
    minWidth: '250px',
  },
}));

const PopupNavCard = props => {
  const classes = useStyles();

  let href = '';
  let as = '';
  let key = '';

  if (!props.data)
    return (
      <div className="col-6 p-1">
        <Card className={classes.skeletoncard}>
          <Skeleton height="105px" width="100%" variant="rect" />
        </Card>
      </div>
    );

  if (props.data.tag) {
    href = `/tag?tags=${props.data.tag}`;
    as = `/topics/${props.data.tag}`;
    key = props.data.tag;
  } else if (props.data.subdivision) {
    const slug = slugFromCC(props.data.country_code);
    href = `/destinations?country=${slug}${
      !props.data.subdivision ? '' : `&subdivision=${props.data.subdivision}`
    }${!props.data.city ? '' : `&city=${props.data.city}`}`;
    as = `/destinations/${slug}${
      !props.data.subdivision ? '' : `/${props.data.subdivision}`
    }${!props.data.city ? '' : `/${props.data.city}`}`;
  } else {
    const slug = slugFromCC(props.data.country_code);
    href = `/destinations?country=${slug}`;
    as = `/destinations/${slug}`;
    key = slug;
  }
  return (
    <>
      <div className="col-6 p-1">
        <Link color="textPrimary" key={key} href={href} as={as}>
          <Card className={classes.card}>
            <CardActionArea>
              {props.data.image && (
                <CardMedia
                  className="h-100"
                  style={{ minHeight: '105px' }}
                  image={imageProxy(props.data.image, undefined, 150, 'fit')}
                />
              )}
              <CardContent
                style={{
                  height: '45px',
                  marginTop: '-45px',
                  background:
                    'linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0,0.8))',
                }}
              >
                <Typography
                  className="font-weight-bold text-light"
                  variant="body1"
                  color="inherit"
                >
                  {props.data.title}
                  {props.data.subdivision &&
                    ` (${props.data.country_code.toUpperCase()})`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default PopupNavCard;
