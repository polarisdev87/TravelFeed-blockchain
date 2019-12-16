import { teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React, { Fragment } from 'react';
import AboutSelect from '../../components/About/AboutSelect';
import PrivacyText from '../../components/About/Texts/Privacy';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';

const PrivacyPage = () => {
  const title = 'Privacy';
  return (
    <Fragment>
      <Header subheader={title} active="privacy" />
      <Head title={`${title}`} />
      <AboutSelect selection={2} />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        className="pt-4 pb-4"
      >
        <Grid item lg={7} md={8} sm={11} xs={12}>
          <HeaderCard
            title={title}
            background={teal[600]}
            content={<PrivacyText />}
          />
        </Grid>
        <Grid id="matomo" item lg={7} md={8} sm={11} xs={12} className="pt-3">
          <HeaderCard
            title="Opt Out of Matomo Analytics"
            background={teal[600]}
            content={
              <div>
                <iframe
                  title="Opt Out of Matomo Analytics"
                  style={{ border: 0, height: '100%', width: '100%' }}
                  src="https://matomo.travelfeed.io/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=ffffff&fontColor=212121&fontSize=1.2rem&fontFamily=Roboto"
                />
              </div>
            }
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

PrivacyPage.getInitialProps = () => {};

export default PrivacyPage;
