import Button from '@material-ui/core/Button';
import { indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React, { Component, Fragment } from 'react';
import AboutSelect from '../../components/About/AboutSelect';
import CookiesText from '../../components/About/Texts/Cookies';
import HeaderCard from '../../components/General/HeaderCard';
import Head from '../../components/Header/Head';
import Header from '../../components/Header/Header';
import {
  deleteCookieConsent,
  hasCookieConsent,
  setCookieConsent,
} from '../../helpers/token';

class CookiesPage extends Component {
  state = {
    optin: false,
  };

  componentDidMount() {
    const cookie = hasCookieConsent() === 'true';
    this.setState({ optin: cookie });
  }

  decline() {
    this.setState({ optin: false });
    deleteCookieConsent();
  }

  accept() {
    setCookieConsent('true');
    this.setState({ optin: true });
  }

  render() {
    const { optin } = this.state;
    const title = 'Cookies';
    return (
      <Fragment>
        <Header subheader={title} active="cookies" />
        <Head title={`${title}`} />
        <AboutSelect selection={3} />
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
              background={indigo[600]}
              content={<CookiesText />}
            />
          </Grid>
          <Grid item lg={7} md={8} sm={11} xs={12} className="pt-3">
            <HeaderCard
              title="Change Cookie Consent"
              background={indigo[600]}
              content={
                <Fragment>
                  <p>
                    {' '}
                    Your current cookie Settings are:{' '}
                    {(optin && (
                      <Fragment>
                        <strong>You are opted in.</strong>{' '}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.decline()}
                        >
                          Opt out
                        </Button>{' '}
                        <br />
                        <em>
                          Cookies that are already set will not be removed by
                          changing this setting.
                        </em>
                      </Fragment>
                    )) || (
                      <Fragment>
                        <strong>You are opted out.</strong>{' '}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.accept()}
                        >
                          Opt in
                        </Button>
                      </Fragment>
                    )}
                  </p>
                  <p>
                    These option only applies to EU-users. If you are accessing
                    this page from outside the EU, pressing the &quot;opt
                    out&quot; button will have no effect since you are opted in
                    by default on every page load. Instead, you can opt-out by
                    updating your browser&apos;s cookie settings.
                  </p>
                </Fragment>
              }
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

CookiesPage.getInitialProps = () => {};

export default CookiesPage;
