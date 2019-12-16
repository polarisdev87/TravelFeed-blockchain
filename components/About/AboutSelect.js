import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SupportIcon from '@material-ui/icons/Favorite';
import CookieIcon from '@material-ui/icons/GroupWork';
import AboutIcon from '@material-ui/icons/Info';
import PrivacyIcon from '@material-ui/icons/Lock';
import FAQIcon from '@material-ui/icons/QuestionAnswer';
import TermsIcon from '@material-ui/icons/Toc';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

class AboutSelect extends React.Component {
  render() {
    const { selection } = this.props;
    return (
      <Paper square>
        <Tabs
          value={selection}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Link href="/about">
            <Tab icon={<AboutIcon />} label="ABOUT" />
          </Link>
          <Link href="/about/terms">
            <Tab icon={<TermsIcon />} label="TERMS" />
          </Link>
          <Link href="/about/privacy">
            <Tab icon={<PrivacyIcon />} label="PRIVACY" />
          </Link>
          <Link href="/about/cookies">
            <Tab icon={<CookieIcon />} label="COOKIES" />
          </Link>
          <Link href="/about/faq">
            <Tab icon={<FAQIcon />} label="FAQ" />
          </Link>
          <Link href="/about/support-us">
            <Tab icon={<SupportIcon />} label="SUPPORT US" />
          </Link>
        </Tabs>
      </Paper>
    );
  }
}

AboutSelect.propTypes = {
  selection: PropTypes.number.isRequired,
};

export default AboutSelect;
