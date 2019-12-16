import detectIt from 'detect-it';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { imageProxy } from '../../helpers/getImage';
import supportsWebp from '../../helpers/webp';
import PostSocialShares from './PostSocialShares';

class PostImageHeader extends Component {
  state = {
    bgpos: 'fixed',
    bgheight: '100%',
    bgmargin: '0px',
    windowWidth: 10,
    opacity: 0,
    webpSupport: undefined,
    shareOpacity: 0,
  };

  async componentDidMount() {
    window.addEventListener(
      'scroll',
      this.listenScrollEvent,
      // better scroll performance: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
      detectIt.passiveEvents ? { passive: true } : false,
    );
    const webpSupport = await supportsWebp();
    this.setState({
      windowWidth: (Math.ceil(window.innerWidth / 640) + 1) * 640,
      opacity: 1,
      webpSupport,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  listenScrollEvent = () => {
    if (window.scrollY > 500) {
      this.setState({
        bgpos: 'absolute',
        bgheight: window.innerHeight,
        bgmargin: '500px',
      });
    } else {
      this.setState({
        bgpos: 'fixed',
        bgheight: window.innerHeight,
        bgmargin: '0px',
      });
    }
    if (window.scrollY > 900) {
      this.setState({
        shareOpacity: 1,
      });
    } else {
      this.setState({
        shareOpacity: 0,
      });
    }
  };

  render() {
    const { author, permlink, tags, title, img_url, children } = this.props;

    return (
      <>
        <div
          className="d-none d-sm-none d-md-none d-xl-block d-lg-block container"
          style={{
            position: 'fixed',
            top: 65,
            left: 0,
            width: '25px',
            height: 'calc(100% - 65px)',
            zIndex: '900',
            opacity: this.state.shareOpacity,
            transition: 'opacity 0.5s linear',
          }}
        >
          <div className="row h-100">
            <div className="my-auto">
              <PostSocialShares
                author={author}
                permlink={permlink}
                tags={tags}
                title={title}
                img_url={img_url}
                comments={children}
              />
            </div>
          </div>
        </div>
        <div
          className="w-100"
          style={{
            height: this.state.bgheight,
            position: this.state.bgpos,
            marginTop: this.state.bgmargin,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.3)), url("${this.props.lazyImage}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        >
          <div
            className="w-100"
            style={{
              height: '100%',
              position: 'absolute',
              marginTop: '0px',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0,0.3)), url("${imageProxy(
                this.props.backgroundImage,
                this.state.windowWidth,
                undefined,
                undefined,
                this.state.webpSupport ? 'webp' : undefined,
              )}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              opacity: this.state.opacity,
              transition: 'opacity 2s linear',
            }}
          />
        </div>
      </>
    );
  }
}

PostImageHeader.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  lazyImage: PropTypes.string.isRequired,
};

export default PostImageHeader;
