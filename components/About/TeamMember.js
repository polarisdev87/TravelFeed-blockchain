import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { imageProxy } from '../../helpers/getImage';
import Link from '../../lib/Link';

const TeamMember = props => {
  return (
    <div className="text-center">
      <Link
        color="textPrimary"
        as={`/@${props.username}`}
        href={`/blog?author=${props.username}`}
      >
        <Typography variant="h5" className="pt-4">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h6">
          @{props.username}
        </Typography>
        <div
          className="mx-auto d-block pb-3"
          style={{ maxHeight: '250px', maxWidth: '250px' }}
        >
          <img
            className="rounded-circle w-100 h-100"
            alt={props.name}
            src={
              props.photo
                ? imageProxy(props.photo, 250, 250)
                : `https://steemitimages.com/u/${props.username}/avatar/large`
            }
          />
        </div>
      </Link>
      <p>{props.content}</p>
    </div>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TeamMember;
