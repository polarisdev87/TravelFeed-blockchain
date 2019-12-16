import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import * as Sentry from '@sentry/browser';
import Cookie from 'js-cookie';
import { unregister } from 'next-offline/runtime';
import App from 'next/app';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactPiwik from 'react-piwik';
import CookieConsent from '../components/CookieConsent/CookieConsent';
import NewUserMessage from '../components/General/NewUserMessage';
import UserContext from '../components/General/UserContext';
import { registerServiceWorker } from '../helpers/notifications';
import { getUser, hasCookieConsent } from '../helpers/token';
import { getTheme } from '../lib/theme';
import withApollo from '../lib/withApollo';
import '../styles/bootstrap.min.css';
import '../styles/style.css';

if (process.env.NODE_ENV === 'production')
  Sentry.init({
    dsn: 'https://599c03493c8248a992f0d4c2eface5be@sentry.io/1457776',
  });

// eslint-disable-next-line no-unused-vars
const Piwik = new ReactPiwik({
  url: 'https://matomo.travelfeed.io',
  siteId: 1,
  trackErrors: true,
  jsFilename: 'matomo.js',
  phpFilename: 'matomo.php',
});

Router.events.on('routeChangeStart', () => {
  if (!hasCookieConsent === 'true') ReactPiwik.push(['requireConsent']);
  ReactPiwik.push(['setDocumentTitle', document.title]);
  ReactPiwik.push(['trackPageView']);
});

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let cookies = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      cookies = parseCookies(ctx);
    }

    return { pageProps, cookies };
  }

  componentDidMount() {
    const theme = Cookie.get('use_dark_mode') !== 'true' ? 'light' : 'dark';
    this.setState({ theme });
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    if (process.env.NODE_ENV === 'production') registerServiceWorker();
    if (!hasCookieConsent === 'true') ReactPiwik.push(['requireConsent']);
    const user = getUser();
    if (user) ReactPiwik.push(['setUserId', user]);
    ReactPiwik.push(['trackPageView']);
  }

  componentWillUnmount() {
    if (process.env.NODE_ENV === 'production') unregister();
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });

        Sentry.captureException(error);
      });
      super.componentDidCatch(error, errorInfo);
    }
  }

  setDarkMode = () => {
    const expires = new Date(new Date().getTime() + 3600 * 1000 * 24 * 365);
    Cookie.set('use_dark_mode', true, { expires });
    this.setState({
      theme: 'dark',
    });
  };

  setLightMode = () => {
    Cookie.remove('use_dark_mode');
    this.setState({
      theme: 'light',
    });
  };

  render() {
    const { Component, pageProps, apollo, cookies } = this.props;
    let colorscheme = cookies.use_dark_mode !== 'true' ? 'light' : 'dark';
    if (this.state && this.state.theme) colorscheme = this.state.theme;
    const theme = getTheme({
      paletteType: colorscheme,
    });
    return (
      <UserContext.Provider
        value={{
          theme: colorscheme,
          setDarkMode: this.setDarkMode,
          setLightMode: this.setLightMode,
          // React Hooks: https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook/
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
          <SnackbarProvider maxSnack={3}>
            <ApolloProvider client={apollo}>
              <CookieConsent />
              <NewUserMessage />
              <Component pageContext={this.pageContext} {...pageProps} />
            </ApolloProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </UserContext.Provider>
    );
  }
}

export default withApollo(MyApp);
