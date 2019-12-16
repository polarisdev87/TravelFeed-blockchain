import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { imageProxy } from '../../helpers/getImage';
import Link from '../../lib/Link';
import Excerpt from '../Grid/Excerpt';

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 12,
  },
}));

const SimilarPostCard = props => {
  const classes = useStyles();

  return (
    <>
      <div className={props.padding}>
        <Link
          color="textPrimary"
          as={`/@${props.post.author}/${props.post.permlink}`}
          href={`/post?author=${props.post.author}&permlink=${
            props.post.permlink
          }&title=${encodeURIComponent(
            props.post.title,
          )}&img_url=${encodeURIComponent(props.post.img_url)}&depth=0`}
        >
          <Card key={props.post.permlink} className={classes.card}>
            <CardActionArea>
              {props.post.img_url && (
                <CardMedia
                  className="h-100"
                  style={{ minHeight: '200px' }}
                  image={imageProxy(props.post.img_url, 300)}
                />
              )}
              <CardContent>
                <div className="container" style={{ height: '150px' }}>
                  <div className="row h-100">
                    <div className="my-auto col-12 text-center">
                      {(props.post.subdivision || props.post.city) && (
                        <Link
                          href={`/destinations?country=${props.slug}${
                            !props.post.subdivision
                              ? ''
                              : `&subdivision=${props.post.subdivision}`
                          }${
                            !props.post.city ? '' : `&city=${props.post.city}`
                          }`}
                          as={`/destinations/${props.slug}${
                            !props.post.subdivision
                              ? ''
                              : `/${props.post.subdivision}`
                          }${!props.post.city ? '' : `/${props.post.city}`}`}
                        >
                          {props.post.city || props.post.subdivision}
                        </Link>
                      )}
                      <Excerpt title={props.post.title} />
                      <em>
                        <Link
                          color="textSecondary"
                          as={`/@${props.post.author}`}
                          href={`/blog?author=${props.post.author}`}
                        >
                          by @{props.post.author}
                        </Link>
                      </em>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default SimilarPostCard;
