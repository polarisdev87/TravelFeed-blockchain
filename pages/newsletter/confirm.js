import { teal } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ErrorPage from '../../components/General/ErrorPage';
import FixedBackgroundImage from '../../components/General/FixedBackgroundImage';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import { NEWSLETTER_CONFIRM_SUBSCRIBE } from '../../helpers/graphql/newsletter';
import graphQLClient from '../../helpers/graphQLClient';

const NewsletterConfirmPage = props => {
  const [success, setSuccess] = useState(undefined);

  const { subscribeToken } = props;

  useEffect(() => {
    graphQLClient(NEWSLETTER_CONFIRM_SUBSCRIBE, { subscribeToken }).then(
      res => {
        if (res.newsletterConfirmSubscribe.success) setSuccess(true);
        else setSuccess(false);
      },
    );
  }, []);

  return (
    <>
      <Header subheader="Newsletter" />
      <Head title="Newsletter" noIndex />
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T184750380Z-easysignup-3.jpg"
        component={
          <>
            {(subscribeToken && (
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                className="pt-4 pb-4"
              >
                <Grid item lg={7} md={8} sm={11} xs={12}>
                  <HeaderCard
                    title="TravelFeed Newsletter"
                    background={teal[600]}
                    content={
                      <FormLabel component="div">
                        {(success &&
                          `You have been successfully subscribed to the TravelFeed newsletter! We can't wait to send you updates from TravelFeed!`) ||
                          (success === false &&
                            'The link you followed is invalid or has been used already')}
                      </FormLabel>
                    }
                  />
                </Grid>
              </Grid>
            )) || <ErrorPage statusCode={404} />}
          </>
        }
      />
    </>
  );
};

NewsletterConfirmPage.getInitialProps = props => {
  const { subscribeToken } = props.query;
  return { subscribeToken };
};

NewsletterConfirmPage.propTypes = {
  subscribeToken: PropTypes.string,
};

export default NewsletterConfirmPage;
