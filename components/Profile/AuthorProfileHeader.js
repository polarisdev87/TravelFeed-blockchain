import '@fortawesome/fontawesome-svg-core/styles.css';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { imageProxy } from '../../helpers/getImage';
import BlogMenu from '../CuratorMenu/BlogMenu';
import AuthorProfileImage from './AuthorProfileImage';

const AuthorProfileHeader = props => {
  const about = props.data.about !== '' ? props.data.about : '';

  const cover_image =
    props.data.cover_image && props.data.cover_image !== ''
      ? imageProxy(props.data.cover_image, 1500)
      : '';
  const divStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0,0.5)),
    url("${cover_image}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '300px',
  };
  return (
    <>
      <div className="text-center p-4 mb-3" style={divStyle} />
      <div className="container-fluid">
        <div className="row justify-content-center text-center">
          <div className="col-12 p-0" style={{ marginTop: '-115px' }}>
            <AuthorProfileImage
              image={props.data.profile_image}
              user={props.data.name}
            />
          </div>
          <div className="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-8 pt-2">
            <Typography variant="h5" className="textSecondary">
              <strong>{props.data.display_name}</strong>
              {props.data.isBlacklisted && (
                <Fragment>
                  {' '}
                  <span className="h5 pt-1 badge badge-danger">
                    Blacklisted
                  </span>
                </Fragment>
              )}
              {props.data.isCurator && (
                <Fragment>
                  {' '}
                  <span className="h5 pt-1 badge badge-success">Curator</span>
                </Fragment>
              )}
            </Typography>
            {props.data.name && (
              <Typography variant="h6" className="textSecondary">
                <em>@{props.data.name}</em>
              </Typography>
            )}
            <Typography variant="subtitle1" className="textSecondary pt-2">
              {about}
            </Typography>
            <BlogMenu
              author={props.data.name}
              isCurator={props.data.isCurator}
            />
          </div>
          {props.moreContent}
        </div>
      </div>
    </>
  );
};

AuthorProfileHeader.defaultProps = {
  name: '',
  isBlacklisted: false,
  isCurator: false,
};

export default AuthorProfileHeader;
