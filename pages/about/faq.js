import { teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import AboutSelect from '../../components/About/AboutSelect';
import FAQ from '../../components/About/FAQAccordion';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';

const FaqPage = () => {
  const title = 'FAQ';
  return (
    <Fragment>
      <Header subheader={title} />
      <Head title={`${title}`} />
      <AboutSelect selection={4} />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className="pt-4 pb-4"
      >
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <HeaderCard title={title} background={teal[600]} content={<FAQ />} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

FaqPage.getInitialProps = () => {};

export default FaqPage;
