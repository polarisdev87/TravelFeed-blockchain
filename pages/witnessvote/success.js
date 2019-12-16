import { teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import FixedBackgroundImage from '../../components/General/FixedBackgroundImage';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import NewsLetterSubscribe from '../../components/Sidebar/NewsLetterSubscribe';

const WitnessvoteSuccessPage = () => {
  return (
    <>
      <Header subheader="Witness" />
      <Head title="Witness" noIndex />
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T184750380Z-easysignup-3.jpg"
        component={
          <>
            <Grid
              container
              spacing={0}
              alignItems="center"
              justify="center"
              className="pt-4 pb-4"
            >
              <Grid item lg={7} md={8} sm={11} xs={12}>
                <HeaderCard
                  title="Thank you for Your Witness Vote!"
                  background={teal[600]}
                  content={
                    <>
                      <Typography gutterBottom variant="body1">
                        On behalf of the entire team and the TravelFeed
                        community, we would like to thank you for your witness
                        vote!
                      </Typography>
                      <Typography gutterBottom variant="body1">
                        As a Steem witness, we help to operate the decentralised
                        Steem blockchain that we are proud to build upon as one
                        of the largest apps. In order to support other projects
                        building on Steem, we are publishing large parts of our
                        code base open source on{' '}
                        <a
                          target="_blank"
                          rel="nofollow noreferrer noopener"
                          href="https://github.com/travelfeed-io"
                        >
                          Github
                        </a>
                        .
                      </Typography>
                      <Typography gutterBottom variant="body1">
                        We invite you to subscribe to our newsletter to be the
                        first to receive updates!
                      </Typography>
                    </>
                  }
                />
                <NewsLetterSubscribe />
              </Grid>
            </Grid>
          </>
        }
      />
    </>
  );
};

WitnessvoteSuccessPage.getInitialProps = () => {};

export default WitnessvoteSuccessPage;
