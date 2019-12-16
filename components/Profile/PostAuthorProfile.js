import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import { GET_SHORT_PROFILE } from '../../helpers/graphql/profile';
import { getAccount } from '../../helpers/steem';
import Link from '../../lib/Link';
import FollowButton from './FollowButton';

const PostAuthorProfile = props => {
  const [displayName, setDisplayName] = useState(props.author);
  const [about, setAbout] = useState('');

  useEffect(() => {
    getAccount(props.author).then(profile => {
      setDisplayName(profile.display_name);
      if (profile.about) setAbout(profile.about);
    });
  }, []);

  return (
    <Fragment>
      <Query query={GET_SHORT_PROFILE} variables={props}>
        {({ data, loading, error }) => {
          if (loading || error || data.post === null) {
            return <Fragment />;
          }
          return (
            <div className="text-center">
              <div className="pb-2">
                <Link
                  color="textPrimary"
                  as={`/@${props.author}`}
                  href={`/blog?author=${props.author}`}
                >
                  <img
                    style={{ cursor: 'pointer' }}
                    src={`https://steemitimages.com/u/${props.author}/avatar/medium`}
                    alt={props.author}
                    width="80"
                    height="80"
                    className="rounded-circle"
                  />
                </Link>
              </div>
              <Fragment>
                <div>
                  <Link
                    color="textPrimary"
                    as={`/@${props.author}`}
                    href={`/blog?author=${props.author}`}
                  >
                    <Typography variant="h6" className="textPrimary cpointer">
                      {displayName}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle">
                      @{props.author}
                    </Typography>
                  </Link>
                  {data.profile.isCurator && (
                    <p className="h5 pt-1">
                      <span className="badge badge-success">Curator</span>
                    </p>
                  )}
                </div>
                <p className="p-2">{about}</p>
              </Fragment>
              <div>
                <FollowButton author={props.author} btnstyle="default" />
              </div>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default PostAuthorProfile;
