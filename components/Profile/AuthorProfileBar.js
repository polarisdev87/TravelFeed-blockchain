import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCouch,
  faLink,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const AuthorProfileBar = props => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {props.location && props.location !== '' && (
          <div className="col-12 pb-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <span className="textPrimary h1">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
            <Typography variant="subtitle2" className="textPrimary">
              {props.location}
            </Typography>
          </div>
        )}
        {props.website && props.website !== '' && (
          <div className="col-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <a
              href={props.website}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <span className="textPrimary h1">
                <FontAwesomeIcon icon={faLink} />
              </span>
              <Typography
                variant="subtitle2"
                className="textPrimary d-none d-xl-block d-lg-block d-md-block d-xs-block"
              >
                Website
              </Typography>
            </a>
          </div>
        )}
        {props.facebook && props.facebook !== '' && (
          <div className="col-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <a
              href={`https://facebook.com/${props.facebook}`}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <span className="textPrimary h1">
                <FontAwesomeIcon icon={faFacebookF} />
              </span>
              <Typography
                variant="subtitle2"
                className="textPrimary d-none d-xl-block d-lg-block d-md-block d-xs-block"
              >
                Facebook
              </Typography>
            </a>
          </div>
        )}
        {props.twitter && props.twitter !== '' && (
          <div className="col-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <a
              href={`https://twitter.com/${props.twitter}`}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <span className="textPrimary h1">
                <FontAwesomeIcon icon={faTwitter} />
              </span>
              <Typography
                variant="subtitle2"
                className="textPrimary d-none d-xl-block d-lg-block d-md-block d-xs-block"
              >
                Twitter
              </Typography>
            </a>
          </div>
        )}
        {props.instagram && props.instagram !== '' && (
          <div className="col-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <a
              href={`https://instagram.com/${props.instagram}`}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <span className="textPrimary h1">
                <FontAwesomeIcon icon={faInstagram} />
              </span>
              <Typography
                variant="subtitle2"
                className="textPrimary d-none d-xl-block d-lg-block d-md-block d-xs-block"
              >
                Instagram
              </Typography>
            </a>
          </div>
        )}
        {props.youtube && props.youtube !== '' && (
          <div className="col-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <a
              href={`https://youtube.com/user/${props.youtube}`}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <span className="textPrimary h1">
                <FontAwesomeIcon icon={faYoutube} />
              </span>
              <Typography
                variant="subtitle2"
                className="textPrimary d-none d-xl-block d-lg-block d-md-block d-xs-block"
              >
                Youtube
              </Typography>
            </a>
          </div>
        )}
        {props.couchsurfing && props.couchsurfing !== '' && (
          <div className="col-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <a
              href={`https://couchsurfing.com/people/${props.couchsurfing}`}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <span className="textPrimary h1">
                <FontAwesomeIcon icon={faCouch} />
              </span>
              <Typography
                variant="subtitle2"
                className="textPrimary d-none d-xl-block d-lg-block d-md-block d-xs-block"
              >
                Couchsurfing
              </Typography>
            </a>
          </div>
        )}
        {props.pinterest && props.pinterest !== '' && (
          <div className="col-2 col-xl-1 col-lg-1 col-md-2 col-sm-2 text-center">
            <a
              href={`https://pinterest.com/${props.pinterest}`}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              <span className="textPrimary h1">
                <FontAwesomeIcon icon={faPinterest} />
              </span>
              <Typography
                variant="subtitle2"
                className="textPrimary d-none d-xl-block d-lg-block d-md-block d-xs-block"
              >
                Pinterest
              </Typography>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

AuthorProfileBar.propTypes = {
  location: PropTypes.string,
  website: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  youtube: PropTypes.string,
  couchsurfing: PropTypes.string,
  pinterest: PropTypes.string,
};

export default AuthorProfileBar;
