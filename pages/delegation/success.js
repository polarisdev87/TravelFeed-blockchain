import { teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import FixedBackgroundImage from '../../components/General/FixedBackgroundImage';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import NewsLetterSubscribe from '../../components/Sidebar/NewsLetterSubscribe';

const DelegationSuccessPage = () => {
  return (
    <>
      <Header subheader="Delegation" />
      <Head title="Delegation" noIndex />
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
                  title="Thank you for your delegation!"
                  background={teal[600]}
                  content={
                    <>
                      <Typography gutterBottom variant="body1">
                        On behalf of the entire team and the TravelFeed
                        community, we would like to thank you for your
                        delegation!
                      </Typography>
                      <Typography gutterBottom variant="body1">
                        Your delegation does not only support the growth of this
                        incredible project, but also helps the entire travel
                        community on TravelFeed.io and the Steem blockchain. Our
                        Steem Power is fully used for curation of the best
                        TravelFeed posts, helping the growth of TravelFeed.io by
                        supporting the authors who contribute to making
                        TravelFeed a great place.
                      </Typography>
                      <Typography gutterBottom variant="body1">
                        As a delegator, you will be eligible to receive our
                        exclusive airdrop to delegators once we launch our SMT.
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

DelegationSuccessPage.getInitialProps = () => {};

export default DelegationSuccessPage;
