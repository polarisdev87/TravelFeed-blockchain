import { ServerStyleSheets } from '@material-ui/core/styles';
import * as Sentry from '@sentry/node';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { GMAPS_API_KEY } from '../config';
import theme from '../lib/theme';

if (process.env.NODE_ENV === 'production')
  process.on('unhandledRejection', err => {
    Sentry.captureException(err);
  });

if (process.env.NODE_ENV === 'production')
  process.on('uncaughtException', err => {
    Sentry.captureException(err);
  });

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color={theme.palette.primary.dark}
          />
          <meta
            name="msapplication-TileColor"
            content={theme.palette.primary.dark}
          />
          <meta name="theme-color" content={theme.palette.primary.dark} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://steemitimages.com" />
          <link rel="preconnect" href="https://maps.googleapis.com" />
          <link rel="preconnect" href="https://matomo.travelfeed.io" />
          <script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}&libraries=places`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            <img
              alt=""
              src="https://matomo.travelfeed.io/matomo.php?idsite=1&amp;rec=1"
            />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
