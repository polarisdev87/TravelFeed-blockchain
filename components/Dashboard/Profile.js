import Button from '@material-ui/core/Button';
import { green, indigo, purple, teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import React, { Fragment, useEffect, useState } from 'react';
import { getAccount } from '../../helpers/steem';
import { getUser } from '../../helpers/token';
import Link from '../../lib/Link';
import FeaturedImageUpload from '../Editor/FeaturedImageUpload';
import HeaderCard from '../General/HeaderCard';
import UpdateProfileButton from './Profile/UpdateProfileButton';

const Profile = () => {
  const author = getUser();

  const [displayName, setDisplayName] = useState('');
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYouTube] = useState('');
  const [couchsurfing, setCouchsurfing] = useState('');
  const [pinterest, setPinterest] = useState('');

  useEffect(() => {
    getAccount(author).then(profile => {
      if (profile.name && !displayName) setDisplayName(profile.display_name);
      if (profile.about && !about) setAbout(profile.about);
      if (profile.profile_image && !profileImage)
        setProfileImage(profile.profile_image);
      if (profile.cover_image && !coverImage)
        setCoverImage(profile.cover_image);
      if (profile.location && !location) setLocation(profile.location);
      if (profile.website && !website) setWebsite(profile.website);
      if (profile.facebook && !facebook) setFacebook(profile.facebook);
      if (profile.twitter && !twitter) setTwitter(profile.twitter);
      if (profile.instagram && !instagram) setInstagram(profile.instagram);
      if (profile.youtube && !youtube) setYouTube(profile.youtube);
      if (profile.couchsurfing && !couchsurfing)
        setCouchsurfing(profile.couchsurfing);
      if (profile.pinterest && !pinterest) setPinterest(profile.pinterest);
    });
  }, []);

  const handleInput = changeThis => event => {
    changeThis(event.target.value);
  };

  return (
    <Grid container spacing={0} justify="center" className="p-1">
      <Grid item lg={7} md={8} sm={11} xs={12} className="p-1">
        <HeaderCard
          title="Edit your Profile"
          background={indigo[600]}
          content={
            <Fragment>
              <TextField
                label="Blog name"
                inputProps={{
                  maxLength: 20,
                }}
                placeholder="A cool name for your blog"
                margin="normal"
                value={displayName}
                onChange={handleInput(setDisplayName)}
                fullWidth
              />
              <TextField
                multiline
                label="Blog slogan"
                inputProps={{
                  maxLength: 160,
                }}
                placeholder="Your one-line biography goes here"
                margin="normal"
                value={about}
                onChange={handleInput(setAbout)}
                fullWidth
              />
              <TextField
                label="Location"
                inputProps={{
                  maxLength: 30,
                }}
                placeholder="Where are you based?"
                margin="normal"
                value={location}
                onChange={handleInput(setLocation)}
                fullWidth
              />
              <TextField
                label="Website"
                inputProps={{
                  maxLength: 100,
                }}
                placeholder="Link to your website"
                margin="normal"
                value={website}
                onChange={handleInput(setWebsite)}
                fullWidth
              />
              <TextField
                label="Facebook"
                inputProps={{
                  maxLength: 50,
                }}
                placeholder="Your Facebook username or fanpage"
                margin="normal"
                value={facebook}
                onChange={handleInput(setFacebook)}
                fullWidth
              />
              <TextField
                label="Twitter"
                inputProps={{
                  maxLength: 50,
                }}
                placeholder="Your Twitter username"
                margin="normal"
                value={twitter}
                onChange={handleInput(setTwitter)}
                fullWidth
              />
              <TextField
                label="Instagram"
                inputProps={{
                  maxLength: 30,
                }}
                placeholder="Your Instagram username"
                margin="normal"
                value={instagram}
                onChange={handleInput(setInstagram)}
                fullWidth
              />
              <TextField
                label="Youtube"
                inputProps={{
                  maxLength: 20,
                }}
                placeholder="Your Youtube username"
                margin="normal"
                value={youtube}
                onChange={handleInput(setYouTube)}
                fullWidth
              />
              <TextField
                label="Couchsurfing"
                inputProps={{
                  maxLength: 50,
                }}
                placeholder="Your Couchsurfing username"
                margin="normal"
                value={couchsurfing}
                onChange={handleInput(setCouchsurfing)}
                fullWidth
              />
              <TextField
                label="Pinterest"
                inputProps={{
                  maxLength: 50,
                }}
                placeholder="Your Pinterest username"
                margin="normal"
                value={pinterest}
                onChange={handleInput(setPinterest)}
                fullWidth
              />
            </Fragment>
          }
        />
      </Grid>
      <Grid item lg={5} md={8} sm={11} xs={12} className="p-1">
        <HeaderCard
          title="Profile Image"
          background={purple[600]}
          content={
            <FeaturedImageUpload
              rounded
              featuredImage={profileImage}
              setFeaturedImage={input => setProfileImage(input)}
              placeholder="To upload your profile image, drag 'n' drop an image here, or click to select one. Recommended dimensions: 400x400"
            />
          }
        />
        <div className="pt-2">
          <HeaderCard
            title="Cover Image"
            background={teal[600]}
            content={
              <FeaturedImageUpload
                featuredImage={coverImage}
                setFeaturedImage={input => setCoverImage(input)}
                placeholder="To upload your cover image, drag 'n' drop an image here, or click to select one. Recommended dimensions: 2880x600"
              />
            }
          />
        </div>
        <div className="pt-2">
          <HeaderCard
            title="Save Changes"
            background={green[600]}
            content={
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-1">
                    <UpdateProfileButton
                      profile={JSON.stringify({
                        profile: {
                          name: displayName,
                          cover_image: coverImage,
                          profile_image: profileImage,
                          about,
                          location,
                          website,
                          twitter,
                          facebook,
                          instagram,
                          youtube,
                          couchsurfing,
                          pinterest,
                        },
                      })}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-1">
                    <Link
                      color="textPrimary"
                      as={`/@${getUser()}`}
                      href={`/blog?author=${getUser()}`}
                    >
                      <Button fullWidth color="primary" variant="outlined">
                        <ViewIcon />
                        <span className="pl-2"> View profile </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Profile;
