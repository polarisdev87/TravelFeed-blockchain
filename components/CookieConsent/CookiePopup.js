import { indigo, teal } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

class CookiePopup extends Component {
  state = {
    acceptColor: 700,
    declineColor: 700,
  };

  render() {
    const { open, containerid, content, allowtext } = this.props;
    if (open === false) return <Fragment />;
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '0px',
          left: '0px',
          zIndex: 1299,
        }}
      >
        <div className="container" id={containerid}>
          <div className="row">
            <div
              style={{ width: '20px' }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block"
            />
            <div
              className="col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12 text-light p-3"
              style={{ background: indigo[700] }}
            >
              {content}
            </div>
          </div>
          <div className="row">
            <div
              style={{ width: '20px' }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block"
            />
            <Typography
              variant="p"
              onClick={() => this.props.decline()}
              className="text-light col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 cpointer text-light text-center font-weight-bold p-2"
              style={{ background: indigo[this.state.declineColor] }}
              onMouseEnter={() => this.setState({ declineColor: 800 })}
              onMouseLeave={() => this.setState({ declineColor: 700 })}
            >
              Decline
            </Typography>
            <Typography
              variant="p"
              onClick={() => this.props.accept()}
              className="text-light col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 cpointer text-light text-center font-weight-bold p-2"
              onMouseEnter={() => this.setState({ acceptColor: 800 })}
              onMouseLeave={() => this.setState({ acceptColor: 700 })}
              style={{ background: teal[this.state.acceptColor] }}
            >
              {allowtext}
            </Typography>
            <div
              style={{ height: '20px' }}
              className="d-none d-xl-block d-lg-block d-md-block d-sm-block col-12 text-light"
            />
          </div>
        </div>
      </div>
    );
  }
}

CookiePopup.defaultProps = {
  containerid: '',
};

CookiePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  containerid: PropTypes.string,
  allowtext: PropTypes.string.isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  accept: PropTypes.func.isRequired,
  decline: PropTypes.func.isRequired,
};

export default CookiePopup;
