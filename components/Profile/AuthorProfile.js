import '@fortawesome/fontawesome-svg-core/styles.css';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_SHORT_PROFILE } from '../../helpers/graphql/profile';
import ErrorPage from '../General/ErrorPage';
import Head from '../Header/Head';
import Header from '../Header/Header';
import AuthorProfileBar from './AuthorProfileBar';
import AuthorProfileHeader from './AuthorProfileHeader';
import FollowButton from './FollowButton';

const AuthorProfile = props => {
  const {
    name,
    display_name,
    cover_image,
    about,
    location,
    website,
    twitter,
    facebook,
    instagram,
    youtube,
    couchsurfing,
    pinterest,
  } = props.profile;

  return (
    <Fragment>
      <Query query={GET_SHORT_PROFILE} variables={{ author: name }}>
        {({ data, error }) => {
          if (error || (data && data.profile === null)) {
            return (
              <Fragment>
                <Header />
                <ErrorPage statusCode={error ? 'network_error' : 404} />
              </Fragment>
            );
          }
          let { isBlacklisted, isCurator } = false;
          if (data && data.profile) {
            isBlacklisted = data.profile.isBlacklisted;
            isCurator = data.profile.isCurator;
          }

          return (
            <Fragment>
              <Head
                shorttitle={`${display_name || name}'s Travel Blog`}
                image={cover_image}
                description={`${display_name}'s Travel Blog: ${about}`}
                type={{
                  type: 'profile',
                  display_name,
                  username: name,
                }}
                includeMapbox
              />
              <Header active="blog" subheader={display_name} author={name} />
              <AuthorProfileHeader
                data={{
                  name,
                  display_name,
                  isBlacklisted,
                  isCurator,
                  about,
                  cover_image,
                }}
                moreContent={
                  <>
                    <div className="col-12 pt-3 d-none d-sm-none d-md-block d-lg-block d-xl-block">
                      <FollowButton author={name} btnstyle="solid" />
                    </div>
                    <div className="col-12 pt-4 pb-3">
                      <AuthorProfileBar
                        location={location}
                        website={website}
                        facebook={facebook}
                        twitter={twitter}
                        instagram={instagram}
                        youtube={youtube}
                        couchsurfing={couchsurfing}
                        pinterest={pinterest}
                      />
                    </div>
                  </>
                }
              />
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

AuthorProfile.propTypes = {
  profile: PropTypes.objectOf({
    name: PropTypes.string,
    display_name: PropTypes.string,
    cover_image: PropTypes.string,
    about: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    youtube: PropTypes.string,
    couchsurfing: PropTypes.string,
    pinterest: PropTypes.string,
  }),
};

export default AuthorProfile;
