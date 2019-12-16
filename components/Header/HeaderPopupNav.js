import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import RandomIcon from '@material-ui/icons/Explore';
import TopicIcon from '@material-ui/icons/FolderSpecial';
import CountryIcon from '@material-ui/icons/Landscape';
import CityIcon from '@material-ui/icons/LocationCity';
import MapIcon from '@material-ui/icons/Map';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { popularCountries, slugFromCC } from '../../helpers/countryCodes';
import Link from '../../lib/Link';
import DestinationMenuItem from '../Destinations/DestinationMenuItem';
import PopupNavItems from './PopupNavItems';

const styles = () => ({
  root: {
    maxWidth: '1200px',
  },
});

class HeaderPopupNav extends Component {
  state = {
    selection: 'Popular Countries',
    random: undefined,
  };

  onMenuClick = selection => {
    this.setState({ selection });
  };

  newRandom = () => {
    this.setState({ random: undefined });
    this.props.closeDest();
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
        <Popover
          className={classes.root}
          open={this.props.showDest}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={this.props.closeDest}
        >
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4">
              <MenuList>
                <DestinationMenuItem
                  onClick={this.onMenuClick}
                  icon={<CountryIcon />}
                  text="Popular Countries"
                  active={this.state.selection === 'Popular Countries'}
                />
                <DestinationMenuItem
                  onClick={this.onMenuClick}
                  icon={<CityIcon />}
                  text="Popular Places"
                  active={this.state.selection === 'Popular Places'}
                />
                <DestinationMenuItem
                  onClick={this.onMenuClick}
                  icon={<TopicIcon />}
                  text="Popular Topics"
                  active={this.state.selection === 'Popular Topics'}
                />
                <Link color="textPrimary" href="/map">
                  <DestinationMenuItem
                    onClick={this.props.closeDest}
                    icon={<MapIcon />}
                    text="Map"
                  />
                </Link>
                <Link
                  color="textPrimary"
                  href={`/destinations?country=${this.state.random}`}
                  as={`/destinations/${this.state.random}`}
                >
                  <DestinationMenuItem
                    onClick={this.newRandom}
                    icon={<RandomIcon />}
                    text="Random Destination"
                  />
                </Link>
              </MenuList>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-8 pr-4">
              {(this.state.selection === 'Popular Places' && (
                <PopupNavItems places />
              )) ||
                (this.state.selection === 'Popular Countries' && (
                  <PopupNavItems countries />
                )) || <PopupNavItems tags />}
            </div>
          </div>
        </Popover>
      </Fragment>
    );
  }
}

HeaderPopupNav.propTypes = {
  closeDest: PropTypes.func.isRequired,
  showDest: PropTypes.bool.isRequired,
};

export default withStyles(styles)(HeaderPopupNav);
