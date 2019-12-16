import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const PostTitle = props => {
  return (
    <div className="container">
      <div
        className="row"
        style={{
          backgroundImage: `url("${props.img_url}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          minHeight: props.img_url ? '300px' : '500px',
          padding: '10px',
        }}
      >
        <div className="text-center col my-auto">
          <Typography
            variant="h3"
            className="text-light font-weight-bold"
            style={{
              textShadow: '1px 1px 20px #343A40',
            }}
            component="h1"
          >
            {props.title}
          </Typography>
        </div>
      </div>
    </div>
  );
};

PostTitle.propTypes = {
  img_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostTitle;
