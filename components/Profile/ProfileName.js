import Typography from '@material-ui/core/Typography';
import React from 'react';
import Link from '../../lib/Link';

const ProfileName = props => {
  const { author, displayName } = props;

  if (props.authorNotClickable)
    return (
      <span className="textPrimary">
        <strong>{displayName}</strong>
      </span>
    );
  return (
    <Link
      color="textPrimary"
      as={`/@${author}`}
      href={`/blog?author=${author}`}
    >
      <a className="textPrimary cpointer hoverline">
        <strong>{displayName}</strong>
        <Typography color="textSecondary" variant="subtitle" display="inline">
          {' '}
          @{author}
        </Typography>
      </a>
    </Link>
  );
};

export default ProfileName;
