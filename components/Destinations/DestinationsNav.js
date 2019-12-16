import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import DestinationsIcon from '@material-ui/icons/Explore';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { popularCountries, slugFromCC } from '../../helpers/countryCodes';
import HeaderPopupNav from '../Header/HeaderPopupNav';

const styles = () => ({
  whitebutton: {
    color: grey[200],
  },
});

class DestinationsNav extends Component {
  state = {
    random: undefined,
    showDest: false,
    anchorEl: null,
  };

  closeDest = () => {
    this.setState({ showDest: false });
  };

  newRandom = () => {
    this.setState({ random: undefined });
    this.toggleDest();
  };

  toggleDest = event => {
    this.setState(state => ({
      showDest: !state.showDest,
    }));
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { classes } = this.props;
    if (this.state.random === undefined) {
      const randomCountry =
        popularCountries[Math.floor(Math.random() * popularCountries.length)];
      this.setState({ random: slugFromCC(randomCountry) });
    }
    return (
      <Fragment>
        {(this.props.isSmall && (
          <IconButton className="text-light p-2" onClick={this.toggleDest}>
            <DestinationsIcon />
          </IconButton>
        )) || (
          <Button
            color="default"
            className={classes.whitebutton}
            onClick={this.toggleDest}
          >
            Discover <DownIcon />
          </Button>
        )}
        <HeaderPopupNav
          anchorEl={this.state.anchorEl}
          showDest={this.state.showDest}
          closeDest={this.closeDest}
        />
      </Fragment>
    );
  }
}

DestinationsNav.defaultProps = {
  isSmall: false,
};

DestinationsNav.propTypes = {
  isSmall: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(DestinationsNav);
