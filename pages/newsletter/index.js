import Grid from '@material-ui/core/Grid';
import React from 'react';
import FixedBackgroundImage from '../../components/General/FixedBackgroundImage';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import NewsLetterSubscribe from '../../components/Sidebar/NewsLetterSubscribe';

const NewsletterSubscribePage = () => {
  return (
    <>
      <Header subheader="Newsletter" />
      <Head title="Newsletter" />
      <FixedBackgroundImage
        backgroundImage="https://img.travelfeed.io/jpphotography%2F20190928T184750380Z-easysignup-3.jpg"
        component={
          <>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '100vh', marginTop: '-65px' }}
            >
              <Grid item lg={7} md={8} sm={11} xs={11}>
                <NewsLetterSubscribe />
              </Grid>
            </Grid>
          </>
        }
      />
    </>
  );
};

NewsletterSubscribePage.getInitialProps = () => {};

export default NewsletterSubscribePage;
