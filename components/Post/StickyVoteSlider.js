import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import detectIt from 'detect-it';
import React, { Component } from 'react';
import VoteSlider from './VoteSlider';

const styles = () => ({
  relative: {
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginTop: '-40px',
  },
  fixed: {
    borderRadius: 0,
  },
});

class StickyVoteSlider extends Component {
  state = {
    opacity: 0,
    votePos: 'reative',
  };

  componentDidMount() {
    window.addEventListener(
      'scroll',
      this.listenScrollEvent,
      // better scroll performance: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
      detectIt.passiveEvents ? { passive: true } : false,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  listenScrollEvent = () => {
    const post = document.getElementById('post');
    const voteOffset = post.clientHeight - 123;
    if (window.scrollY > 500) {
      this.setState({
        opacity: 1,
      });
    } else {
      this.setState({
        opacity: 0,
      });
    }
    if (window.scrollY > voteOffset) {
      this.setState({
        votePos: 'relative',
      });
    } else {
      this.setState({
        votePos: 'fixed',
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div
          style={{
            position: this.state.votePos,
            bottom: 0,
            right: 0,
            width: '100%',
            zIndex: '900',
            opacity: this.state.opacity,
            transition: 'opacity 0.1s linear',
          }}
        >
          <Grid container spacing={0} alignItems="center" justify="center">
            <Grid item lg={7} md={9} sm={11} xs={12}>
              <Card
                className={
                  this.state.votePos === 'relative'
                    ? classes.relative
                    : classes.fixed
                }
              >
                <VoteSlider
                  author={this.props.author}
                  permlink={this.props.permlink}
                  votes={this.props.votes}
                  total_votes={this.props.total_votes}
                  children={this.props.children}
                  depth={this.props.depth}
                  onCommentAdd={this.props.onCommentAdd}
                  noDivider
                  mode="sticky"
                />
              </Card>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(StickyVoteSlider);
