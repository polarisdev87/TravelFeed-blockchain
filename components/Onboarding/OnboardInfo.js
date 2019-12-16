import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import WarnIcon from '@material-ui/icons/Warning';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import readingTime from 'reading-time';
import sanitize from 'sanitize-html';
import { ONBOARD_INFO } from '../../helpers/graphql/onboarding';
import json2md from '../../helpers/json2md';
import parseBody from '../../helpers/parseBody';
import { setInfoToken } from '../../helpers/token';
import Checks from '../Editor/Checks';
import EasyEditor from '../Editor/EasyEditor';
import EditorPreview from '../Editor/EditorPreview';
import FeaturedImageUpload from '../Editor/FeaturedImageUpload';
import AuthorProfileHeader from '../Profile/AuthorProfileHeader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const OnboardInfo = props => {
  const classes = useStyles();

  const defaultTags = ['travelfeed', 'introduceyourself'];
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState(undefined);
  const [profile_image, setProfileImage] = useState(undefined);
  const [cover_image, setCoverImage] = useState(undefined);
  const [activeStep, setActiveStep] = React.useState(0);

  const sanitized = sanitize(
    parseBody(json2md(content), {
      lazy: false,
      hideimgcaptions: true,
    }),
    { allowedTags: [] },
  );
  const readingtime = content
    ? readingTime(sanitized)
    : { words: 0, text: '0 min read' };

  const handleEditorChange = value => {
    setContent(value);
  };

  function getSteps() {
    return ['Your profile', 'Your first post', 'Review'];
  }

  const checklist = [
    {
      label: (
        <span>
          <WarnIcon /> You need to write at least 10 words
        </span>
      ),
      hide: readingtime.words > 9,
      checked: readingtime.words > 9,
    },
    {
      label:
        'If you are using any media or text that are not your own, please make sure to get permission from the owner and name the source in the post',
    },
  ];

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <FormLabel component="legend">
              Now it is time to complete your TravelFeed profile. Select your
              blog name, slogan, cover image and profile image to proceed with
              setting up your account. They can all be changed later.
            </FormLabel>
            <TextField
              label="Blog name"
              inputProps={{
                maxLength: 20,
              }}
              placeholder="A cool name for your blog"
              margin="normal"
              value={name}
              onChange={res => setName(res.target.value)}
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
              onChange={res => setAbout(res.target.value)}
              fullWidth
            />
            <div className="p-2">
              <FeaturedImageUpload
                rounded
                featuredImage={profile_image}
                setFeaturedImage={res => setProfileImage(res)}
                placeholder="To upload your profile image (required), drag 'n' drop an image here, or click to select one. Recommended dimensions: 400x400"
              />
            </div>
            <div className="p-2">
              <FeaturedImageUpload
                featuredImage={cover_image}
                setFeaturedImage={res => setCoverImage(res)}
                placeholder="To upload your cover image, drag 'n' drop an image here, or click to select one. Recommended dimensions: 2880x600"
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <FormLabel component="legend">
              Now it is time write your first TravelFeed post! In this post you
              should introduce yourself to the TravelFeed community. We
              recommend to write at least 100 words.
            </FormLabel>
            <FormLabel component="legend">
              <em>
                Tip: Don't forget to add some images to your post! You can drag
                'n' drop them into the editor or add images and other elements
                using the + symbol. Select text to use the formatting options.
              </em>
            </FormLabel>
            <div className="border">
              <EasyEditor onChange={handleEditorChange} data={content} />
            </div>
            <div className="pt-5 pb-2">
              <Checks checklist={checklist} />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Typography
              variant="h4"
              className="textSecondary"
              align="center"
              gutterBottom
            >
              Your profile
            </Typography>
            <div>
              <AuthorProfileHeader
                data={{
                  display_name: name,
                  about,
                  cover_image,
                  profile_image,
                }}
              />
            </div>
            <Typography
              variant="h4"
              className="textSecondary pt-5"
              align="center"
              gutterBottom
            >
              Your post
            </Typography>
            <EditorPreview
              authorAvatar={profile_image}
              authorNotClickable
              fullsize
              author={name}
              img_url={cover_image}
              title={`Introducing myself to TravelFeed: ${name}`}
              // permlink={permlink}
              readtime={readingtime}
              content={json2md(content)}
            />
          </>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const { infoToken } = props;

  setInfoToken(infoToken);

  return (
    <>
      <Mutation
        mutation={ONBOARD_INFO}
        variables={{
          infoToken,
          post: json2md(content),
          tags: defaultTags,
          accountMetadata: JSON.stringify({
            name,
            about,
            cover_image,
            profile_image,
          }),
        }}
      >
        {(onboardInformation, data) => {
          if (data && data.data && data.data.onboardInformation) {
            if (data.data.onboardInformation.success) {
              return (
                <Typography className={classes.instructions}>
                  You will receive an Email once your account has been approved
                </Typography>
              );
            }
            return (
              <Typography className={classes.instructions}>
                data.data.onboardInformation.message
              </Typography>
            );
          }
          return (
            <>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                <>
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                  </div>
                  <div className="w-100 text-right pt-2">
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep === steps.length - 1
                          ? onboardInformation
                          : handleNext
                      }
                      disabled={
                        (activeStep === 1 && readingtime.words < 10) ||
                        (activeStep === 0 &&
                          (!name || !about || !profile_image))
                      }
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </>
              </div>
            </>
          );
        }}
      </Mutation>
    </>
  );
};

export default OnboardInfo;
