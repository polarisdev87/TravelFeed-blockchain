import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { imageProxy } from '../../../helpers/getImage';
import Link from '../../../lib/Link';

const LinkTool = props => {
  const { title, description, image, author, permlink } = props;
  let titleUri = '';
  try {
    titleUri = encodeURIComponent(title);
  } catch {
    console.log('Could not encode URI');
  }
  return (
    <>
      <Card className="mb-3 mb3">
        <CardContent>
          <div className="container">
            <div className="row">
              {image && (
                <div
                  className="col-12 col-xl-4 col-lg-4 cl-md-4 col-sm-4 p-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0,0.5)),
            url("${imageProxy(image, undefined, 400, 'fit')}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    minHeight: '150px',
                  }}
                >
                  <Link
                    as={`/@${author}/${permlink}`}
                    href={`/post?author=${author}&permlink=${permlink}&title=${titleUri}&img_url=${encodeURIComponent(
                      image,
                    )}`}
                  >
                    <div className="w-100 h-100" />
                  </Link>
                </div>
              )}
              <div
                className={`col-12 ${
                  image ? 'col-xl-8 col-lg-8 cl-md-8 col-sm-8' : ''
                }`}
              >
                <Typography gutterBottom variant="h6">
                  <Link
                    as={`/@${author}/${permlink}`}
                    href={`/post?author=${author}&permlink=${permlink}&title=${encodeURIComponent(
                      title,
                    )}&img_url=${encodeURIComponent(image)}`}
                  >
                    {title}
                  </Link>

                  <em>
                    {' '}
                    by{' '}
                    <Link
                      color="textPrimary"
                      as={`/@${author}`}
                      href={`/blog?author=${author}`}
                    >
                      {author}
                    </Link>
                  </em>
                </Typography>{' '}
                <Typography gutterBottom variant="body1">
                  {description}
                </Typography>
                <Link
                  as={`/@${author}/${permlink}`}
                  href={`/post?author=${author}&permlink=${permlink}&title=${encodeURIComponent(
                    title,
                  )}&img_url=${encodeURIComponent(image)}`}
                >
                  <Button color="primary" variant="contained">
                    {' '}
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LinkTool;
