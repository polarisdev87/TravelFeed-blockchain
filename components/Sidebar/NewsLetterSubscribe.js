import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReCAPTCHA from 'react-google-recaptcha';
import isEmail from 'validator/lib/isEmail';
import { RECAPTCHA_SITE_KEY } from '../../config';
import { NEWSLETTER_SUBSCRIBE } from '../../helpers/graphql/newsletter';
import CustomSnackbar from '../Dashboard/Notifications/CustomSnackbar';

const NewsLetterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [isMailValid, setMailValid] = useState(true);
  const [captcha, setCaptcha] = useState(undefined);

  const handleEmailChange = () => event => {
    setEmail(event.target.value);
    if (event.target.value) setMailValid(isEmail(event.target.value));
  };

  return (
    <>
      <div className="text-center pt-2">
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              className="pt-2 textPrimary"
            >
              Stay up to date!
            </Typography>
            <Mutation
              mutation={NEWSLETTER_SUBSCRIBE}
              variables={{
                email,
                captcha,
              }}
            >
              {(
                newsletterSubscribe,
                // eslint-disable-next-line no-shadow
                { data, loading },
              ) => {
                if (loading) {
                  return <CircularProgress />;
                }
                if (data && data.newsletterSubscribe) {
                  return (
                    <CustomSnackbar
                      variant={
                        data.newsletterSubscribe.success ? 'success' : 'error'
                      }
                      message={
                        data.newsletterSubscribe.success
                          ? 'We just sent you an email.'
                          : data.newsletterSubscribe.message
                      }
                    />
                  );
                }
                return (
                  <>
                    <div>
                      <FormControl fullWidth required error={!isMailValid}>
                        <TextField
                          label="Your Email"
                          fullWidth
                          multiline
                          value={email}
                          onChange={handleEmailChange()}
                        />
                        {!isMailValid && (
                          <FormHelperText>
                            A valid email is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    {email && (
                      <div className="pt-3 text-center">
                        <ReCAPTCHA
                          size="compact"
                          style={{ display: 'inline-block' }}
                          sitekey={RECAPTCHA_SITE_KEY}
                          onChange={token => setCaptcha(token)}
                        />
                      </div>
                    )}
                    <div className="pt-3">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={newsletterSubscribe}
                        disabled={!captcha || !email || !isMailValid}
                      >
                        Get the newsletter
                      </Button>
                    </div>
                  </>
                );
              }}
            </Mutation>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewsLetterSubscribe;
