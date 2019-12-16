import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { grey, teal } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/styles';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ReactPiwik from 'react-piwik';
import { getUser } from '../../helpers/token';
import Link from '../../lib/Link';
import BookmarkIcon from '../Post/BookmarkIcon';
import FollowButton from '../Profile/FollowButton';
import BackButton from './BackButton';
import GeoCoder from './Geocoder';
import HeaderMenu from './HeaderMenu';
import LoginButton from './LoginButton';
import MenuDrawer from './MenuDrawer';
import MobileGeocoderButton from './MobileGeocoderButton';
import ShareButton from './ShareButton';

const styles = () => ({
  root: {
    backgroundColor: teal[800],
  },
  heading: {
    fontWeight: 'bold',
    color: grey[200],
  },
  whitebutton: {
    color: grey[200],
  },
});

class Header extends Component {
  state = {
    user: undefined,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    this.setState({ user: getUser() });
  }

  handleLogout = () => {
    this.setState({ user: undefined });
    ReactPiwik.push(['resetUserId']);
  };

  render() {
    const { classes, active } = this.props;
    const DestinationsNav = dynamic(
      () => import('../Destinations/DestinationsNav'),
      {
        loading: () => (
          <Link color="textPrimary" href="/destinations">
            <Button color="default" className={classes.whitebutton}>
              Discover <DownIcon />
            </Button>
          </Link>
        ),
        ssr: false,
      },
    );
    return (
      <Fragment>
        <div style={{ paddingTop: '65px' }} />
        <div style={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="secondary" className={classes.root}>
            <div className="container" style={{ height: '65px' }}>
              <div className="row h-100 p-2">
                <div className="my-auto col-2 col-sm-1 d-xl-none d-lg-none d-md-none">
                  {([
                    'post',
                    'blog',
                    'destination',
                    'location',
                    'tag',
                    'page',
                  ].indexOf(active) !== -1 && (
                    <>
                      <BackButton />
                      <MenuDrawer
                        hidden
                        active={active}
                        handleLogout={this.handleLogout}
                      />
                    </>
                  )) || (
                    <MenuDrawer
                      active={active}
                      handleLogout={this.handleLogout}
                    />
                  )}
                </div>
                <div
                  className={`my-auto col-xl-4 col-lg-3 col-md-4 ${(active ===
                    'post' &&
                    'col-6 col-sm-9') ||
                    'col-8 col-sm-10'}`}
                >
                  <Link color="textPrimary" href="/">
                    <a style={{ flexGrow: 1 }} className="textPrimary">
                      <Typography
                        variant="h6"
                        className={classes.heading}
                        noWrap
                      >
                        <span className="d-none d-xl-block d-sm-block d-lg-none d-md-none">
                          TravelFeed{' '}
                          {this.props.subheader && (
                            <span>{`| ${this.props.subheader}`}</span>
                          )}
                        </span>
                        <span className="d-none d-lg-block d-xl-none d-md-none d-sm-none">
                          {(this.props.subheader && (
                            <span>{`TF | ${this.props.subheader}`}</span>
                          )) ||
                            'TravelFeed'}
                        </span>
                        <span className="d-block d-md-block d-xl-none d-lg-none d-sm-none">
                          {(this.props.subheader && (
                            <span>{this.props.subheader}</span>
                          )) ||
                            'TravelFeed'}
                        </span>
                      </Typography>
                    </a>
                  </Link>
                </div>
                <div className="col-xl-2 col-lg-2 d-xl-block d-lg-block d-md-none d-sm-none d-none my-auto text-center">
                  <DestinationsNav />
                </div>
                <div
                  className={`d-xl-none d-lg-none d-md-block d-sm-none d-none ${(this
                    .state.user &&
                    'col-md-2') ||
                    'col-md-3'} my-auto text-center`}
                >
                  <DestinationsNav isSmall />
                </div>
                <div
                  className={`${(this.state.user &&
                    'col-xl-4 col-lg-5 col-md-4') ||
                    'col-xl-3 col-lg-3 col-md-3'} d-none d-xl-block d-lg-block d-md-block my-auto text-center`}
                >
                  <GeoCoder />
                </div>
                {!this.state.user && (
                  <div className="my-auto col-xl-2 col-lg-3 d-md-none d-sm-none d-none d-xl-block d-lg-block text-right">
                    <LoginButton />
                  </div>
                )}
                <div
                  className={`my-auto ${(active === 'post' &&
                    'col-4 col-sm-2') ||
                    'col-2 col-sm-1'} d-xl-none d-lg-none d-md-none`}
                >
                  {(active === 'post' && (
                    <>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-6">
                            <BookmarkIcon
                              isHeader
                              author={this.props.socialShare.author}
                              permlink={this.props.socialShare.permlink}
                            />
                          </div>
                          <div className="col-6">
                            <ShareButton socialShare={this.props.socialShare} />
                          </div>
                        </div>
                      </div>
                    </>
                  )) ||
                    (active === 'blog' && (
                      <FollowButton
                        author={this.props.author}
                        btnstyle="icon"
                      />
                    )) || <MobileGeocoderButton />}
                </div>
                <div
                  className={`my-auto ${(this.state.user &&
                    'col-xl-2 col-lg-2 col-md-2') ||
                    'col-xl-1 col-lg-1 col-md-2'} d-none d-xl-block d-lg-block d-md-block text-right`}
                >
                  <HeaderMenu
                    isDashboard={false}
                    handleLogout={this.handleLogout}
                  />
                </div>
              </div>
            </div>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}

Header.defaultProps = {
  subheader: undefined,
};

Header.propTypes = {
  subheader: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Header);
