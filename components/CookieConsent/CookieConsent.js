import Typography from '@material-ui/core/Typography';
import React, { Component, Fragment } from 'react';
import {
  CHANGE_SETTINGS,
  GET_COOKIES_ACCEPTED,
} from '../../helpers/graphql/settings';
import graphQLClient from '../../helpers/graphQLClient';
import {
  getUser,
  hasCookieConsent,
  setCookieConsent,
} from '../../helpers/token';
import Link from '../../lib/Link';
import CookiePopup from './CookiePopup';

class CookieConsent extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const cookie = hasCookieConsent() !== 'true';
    if (cookie && getUser())
      graphQLClient(GET_COOKIES_ACCEPTED).then(res => {
        if (res.preferences.hasAcceptedCookies) this.accept();
        else this.setState({ open: cookie });
      });
    else this.setState({ open: cookie });
  }

  accept = () => {
    setCookieConsent('true');
    this.setState({ open: false });
    if (getUser()) graphQLClient(CHANGE_SETTINGS, { hasAcceptedCookies: true });
  };

  decline = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    if (open === false) return <Fragment />;
    return (
      <CookiePopup
        open={open}
        accept={this.accept}
        decline={this.decline}
        allowtext="Allow cookies"
        // Set containerid only for this consent since some browser
        // plugins block this
        containerid="cookieconsent"
        content={
          <Typography variant="p" className="text-light">
            We use cookies to improve your experience and to analyze how our
            site is used.
            <br />
            <Link color="textPrimary" href="/about/cookies">
              <a className="text-light text-decoration-underline">Learn more</a>
            </Link>
          </Typography>
        }
      />
    );
  }
}

export default CookieConsent;
