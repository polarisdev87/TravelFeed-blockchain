import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import LazyLoad from 'vanilla-lazyload';
import parseBody from '../../helpers/parseBody';
import parseHtmlToReact from '../../helpers/parseHtmlToReact';
import { getUser } from '../../helpers/token';
import Link from '../../lib/Link';
import ProfileAvatar from '../Profile/ProfileAvatar';
import ProfileName from '../Profile/ProfileName';
import DotMenu from './DotMenu';
import PostComments from './PostComments';
import SubHeader from './SubHeader';
import VoteSlider from './VoteSlider';

const styles = theme => ({
  areabg: {
    background: theme.palette.background.light,
  },
});

class PostCommentItem extends Component {
  state = {
    isEdit: false,
    showEditor: false,
    userComment: undefined,
    body: undefined,
  };

  componentDidMount() {
    const user = getUser();
    if (user === this.props.post.author) {
      this.setState({ isEdit: true });
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

  onCommentEdit = userComment => {
    this.setState({ body: userComment.body, showEditor: false });
  };

  onCommentAdd = userComment => {
    this.setState({ userComment });
  };

  handleClick = () => {
    this.setState({
      showEditor: true,
    });
  };

  render() {
    const { classes } = this.props;

    let bodyUri = '';
    let displayNameUri = '';
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

    const htmlBody = parseBody(this.state.body || this.props.post.body, {});
    const bodyText = parseHtmlToReact(htmlBody, {});
    let children = <Fragment />;
    if (this.props.post.children !== 0 && this.props.loadreplies === true) {
      children = (
        <PostComments
          hideCommentNumber={this.props.hideCommentNumber}
          post_id={this.props.post.post_id}
          orderby={this.props.orderby}
          orderdir={this.props.orderdir}
        />
      );
    }
    let depth = 0;
    if (this.props.post.depth > 1 && this.props.loadreplies === true) {
      depth = `${String(this.props.post.depth * 10)}px`;
    }
    let title = <Fragment />;
    // Set the caninical URL to travelfeed.io if the post was authored through
    // the dApp
    let parent = <Fragment />;
    if (this.props.post.depth > 1) {
      parent = (
        <div>
          <Link
            color="textPrimary"
            as={`/@${this.props.post.parent_author}/${this.props.post.parent_permlink}`}
            href={`/post?author=${this.props.post.parent_author}&permlink=${this.props.post.parent_permlink}`}
          >
            <strong className="ablue hoverline">Go to parent comment</strong>
          </Link>
        </div>
      );
    }
    if (this.props.title === true) {
      title = (
        <div
          className={`border p-3 mb-2 
        ${classNames(classes.areabg)}`}
        >
          <Link
            color="textPrimary"
            as={`/@${this.props.post.author}/${this.props.post.permlink}`}
            href={`/post?author=${this.props.post.author}&permlink=${
              this.props.post.permlink
            }&depth=${
              this.props.post.depth
            }&display_name=${displayNameUri}&created_at=${encodeURIComponent(
              this.props.post.created_at,
            )}&body=${bodyUri}`}
          >
            <Typography gutterBottom variant="h6" component="h4">
              {`Re: ${this.props.post.root_title || ''}`}
            </Typography>
          </Link>
          <div>
            <Link
              color="textPrimary"
              as={`/@${this.props.post.root_author}/${this.props.post.root_permlink}`}
              href={`/post?author=${this.props.post.root_author}&permlink=${this.props.post.root_permlink}&depth=0`}
            >
              <strong className="ablue hoverline">Go to original post</strong>
            </Link>
          </div>
          {parent}
        </div>
      );
    }
    let cardcontent = (
      // eslint-disable-next-line react/no-danger
      <div className="postcontent postCardContent">{bodyText}</div>
    );
    if (this.state.showEditor) {
      const CommentEditor = dynamic(() => import('../Editor/CommentEditor'), {
        ssr: false,
      });
      cardcontent = (
        <CommentEditor
          editMode
          permlink={this.props.post.permlink}
          parent_author={this.props.post.parent_author}
          parent_permlink={this.props.post.parent_permlink}
          defaultValue={this.props.post.body}
          onCommentEdit={this.onCommentEdit}
          onClose={() => this.setState({ showEditor: false })}
        />
      );
    }
    return (
      <div>
        <Card
          style={{ marginLeft: depth, borderRadius: 12 }}
          id={this.props.post.permlink}
        >
          <CardHeader
            avatar={<ProfileAvatar author={this.props.post.author} />}
            action={
              <Fragment>
                <DotMenu
                  onEditClick={this.state.isEdit ? this.handleClick : undefined}
                  isEdit={this.state.isEdit}
                  author={this.props.post.author}
                  permlink={this.props.post.permlink}
                  title={`Re: ${this.props.post.root_title || ''}`}
                />
              </Fragment>
            }
            title={
              <ProfileName
                author={this.props.post.author}
                displayName={this.props.post.display_name}
              />
            }
            subheader={<SubHeader created_at={this.props.post.created_at} />}
          />
          <>
            {title}
            {cardcontent}
          </>
          <VoteSlider
            hideCommentNumber={this.props.hideCommentNumber}
            author={this.props.post.author}
            permlink={this.props.post.permlink}
            votes={this.props.post.votes}
            total_votes={this.props.post.total_votes}
            children={this.props.post.children}
            mode="comment"
            handleClick={this.handleClick}
            isEdit={this.state.isEdit}
            depth={this.props.post.depth}
            onCommentAdd={this.onCommentAdd}
          />
        </Card>
        {// "Fake" display new user comment after submitting comment without refreshing from the API
        this.state.userComment && (
          <div className="pt-2 pr-2 pl-2">
            <PostCommentItem
              post={{
                body: this.state.userComment.body,
                created_at: new Date(),
                children: 0,
                author: getUser(),
                display_name: '',
                permlink: this.state.userComment.permlink,
                depth: this.props.post.depth + 1,
                total_votes: 0,
                votes: '',
                parent_author: this.props.post.author,
                parent_permlink: this.props.post.permlink,
                root_title: '',
              }}
            />
          </div>
        )}
        {children}
      </div>
    );
  }
}

PostCommentItem.defaultProps = {
  loadreplies: true,
  title: false,
  orderby: undefined,
  orderdir: undefined,
};

PostCommentItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  loadreplies: PropTypes.bool,
  title: PropTypes.bool,
  orderby: PropTypes.string,
  orderdir: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(PostCommentItem);
