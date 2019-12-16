import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import LazyLoad from 'vanilla-lazyload';
import { imageProxy } from '../../helpers/getImage';
import Link from '../../lib/Link';
import DotMenu from '../Post/DotMenu';
import SubHeader from '../Post/SubHeader';
import VoteSlider from '../Post/VoteSlider';
import ProfileAvatar from '../Profile/ProfileAvatar';
import ProfileName from '../Profile/ProfileName';
import Excerpt from './Excerpt';

const styles = () => ({
  card: {
    borderRadius: 12,
  },
  cardHeader: {
    padding: 12,
  },
});

class GridPostCard extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }

  state = { show: true, cardWidth: 800 };

  componentDidMount() {
    if (this.myInput.current) {
      const cardWidth = Math.ceil(this.myInput.current.offsetWidth / 100) * 100;
      this.setState({ cardWidth });
    }
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazy',
        threshold: 1200,
      });
    }
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }

  hide = () => {
    this.setState({ show: false });
  };

  render() {
    const { classes } = this.props;

    // Hide if deleted (for bookmarks)
    if (!this.state.show) {
      return <Fragment />;
    }
    const cardImage = this.props.post.img_url
      ? imageProxy(
          this.props.post.img_url,
          this.state.cardWidth,
          undefined,
          'fit',
          'webp',
        )
      : undefined;
    let titleUri = '';
    let bodyUri = '';
    let displayNameUri = '';
    try {
      titleUri = encodeURIComponent(this.props.post.title);
    } catch {
      console.log('Could not encode URI');
    }
    try {
      bodyUri = encodeURIComponent(this.props.post.body);
    } catch {
      console.log('Could not encode URI');
    }
    try {
      displayNameUri = encodeURIComponent(this.props.post.display_name);
    } catch {
      console.log('Could not encode URI');
    }

    const linkHref = `/post?author=${this.props.post.author}&permlink=${
      this.props.post.permlink
    }&title=${titleUri}&display_name=${displayNameUri}&img_url=${encodeURIComponent(
      this.props.post.img_url,
    )}&lazy_img_url=${encodeURIComponent(
      cardImage,
    )}&created_at=${encodeURIComponent(
      this.props.post.created_at,
    )}&depth=0&country_code=${
      this.props.post.country_code
    }&subdivision=${encodeURIComponent(
      this.props.post.subdivision,
    )}&app=${encodeURIComponent(
      this.props.post.app,
    )}&curation_score=${encodeURIComponent(
      this.props.post.curation_score,
    )}&body=${bodyUri}`;

    return (
      <Card
        key={this.props.post.permlink}
        className={`mb-0 mt-2 mr-2 ml-2 ${classes.card}`}
      >
        <CardHeader
          className={classes.cardHeader}
          avatar={<ProfileAvatar author={this.props.post.author} />}
          action={
            <Fragment>
              <DotMenu
                alwaysShowSaveBtn={this.props.hideSaveBtn}
                author={this.props.post.author}
                permlink={this.props.post.permlink}
                title={this.props.post.title}
                img_url={this.props.post.img_url}
                tags={this.props.post.tags}
                onBmChange={this.props.isBookmark ? this.hide : undefined}
              />
            </Fragment>
          }
          title={
            <ProfileName
              author={this.props.post.author}
              displayName={this.props.post.display_name}
            />
          }
          subheader={
            <SubHeader
              created_at={this.props.post.created_at}
              readtime={this.props.post.readtime}
              location={{
                country_code: this.props.post.country_code,
                subdivision: this.props.post.subdivision,
              }}
              tags={this.props.post.tags}
              isTf={
                this.props.post.app &&
                this.props.post.app.split('/')[0] === 'travelfeed'
              }
              curationScore={this.props.post.curation_score}
            />
          }
        />
        <Link
          color="textPrimary"
          as={`/@${this.props.post.author}/${this.props.post.permlink}`}
          href={linkHref}
        >
          <CardActionArea>
            {this.props.post.img_url !== undefined &&
              this.props.post.img_url !== '' && (
                <picture ref={this.myInput} className="lazyImage">
                  <source
                    className="lazyImage"
                    height={this.props.cardHeight}
                    type="image/webp"
                    data-srcset={`${cardImage}`}
                    data-sizes="100w"
                  />
                  <img
                    height={this.props.cardHeight}
                    width="100%"
                    alt={this.props.post.title}
                    className="lazy img-fluid"
                    style={{
                      maxHeight: this.props.cardHeight,
                      minHeight: this.props.cardHeight / 1.7,
                    }}
                    src={`${imageProxy(
                      this.props.post.img_url,
                      this.state.cardWidth * 0.1,
                      undefined,
                      'fit',
                    )}`}
                    data-src={`${imageProxy(
                      this.props.post.img_url,
                      this.state.cardWidth,
                      undefined,
                      'fit',
                    )}`}
                    data-sizes="100w"
                  />
                </picture>
              )}
            <CardContent>
              <Excerpt
                title={this.props.post.title}
                text={this.props.post.excerpt}
              />
            </CardContent>
          </CardActionArea>
        </Link>
        <VoteSlider
          hideSaveBtn={this.props.hideSaveBtn}
          commentLink={linkHref}
          onBmChange={this.props.isBookmark ? this.hide : undefined}
          author={this.props.post.author}
          permlink={this.props.post.permlink}
          votes={this.props.post.votes}
          total_votes={this.props.post.total_votes}
          children={this.props.post.children}
          mode="gridcard"
          depth={this.props.post.depth}
        />{' '}
      </Card>
    );
  }
}

GridPostCard.defaultProps = {
  showBookmark: false,
  isBookmark: false,
};

GridPostCard.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  cardHeight: PropTypes.number.isRequired,
  showBookmark: PropTypes.bool,
  isBookmark: PropTypes.bool,
};

export default withStyles(styles)(GridPostCard);
