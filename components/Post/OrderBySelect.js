import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import PropTypes from 'prop-types';
import React from 'react';

class OrderBySelect extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="text-right pb-2">
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <SortIcon /> <span className="pl-2">{this.props.selection}</span>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              this.props.handleClick({
                title: 'Newest',
                orderby: 'created_at',
                orderdir: 'DESC',
              });
              this.handleClose();
            }}
          >
            Newest
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.handleClick({
                title: 'Oldest',
                orderby: 'created_at',
                orderdir: 'ASC',
              });
              this.handleClose();
            }}
          >
            Oldest
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.handleClick({
                title: 'Most Smiles',
                orderby: 'total_votes',
                orderdir: 'DESC',
              });
              this.handleClose();
            }}
          >
            Most Smiles
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.handleClick({
                title: 'Least Smiles',
                orderby: 'total_votes',
                orderdir: 'ASC',
              });
              this.handleClose();
            }}
          >
            Least Smiles
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.handleClick({
                title: 'Taking Off',
                orderby: 'sc_hot',
                orderdir: 'DESC',
              });
              this.handleClose();
            }}
          >
            Taking Off
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.handleClick({
                title: 'Trending',
                orderby: 'sc_trend',
                orderdir: 'DESC',
              });
              this.handleClose();
            }}
          >
            Trending
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

OrderBySelect.propTypes = {
  selection: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default OrderBySelect;
