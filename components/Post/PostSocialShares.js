import {
  faFacebookF,
  faPinterest,
  faReddit,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/AddComment';
import { withSnackbar } from 'notistack';
import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CONTEST_SOCIAL } from '../../helpers/graphql/contest';
import ResteemButton from './ResteemButton';

const PostSocialShares = props => {
  const {
    author,
    permlink,
    title,
    img_url,
    tags,
    enqueueSnackbar,
    comments,
  } = props;

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      enqueueSnackbar(notification.message, { variant });
    }
  };

  const link = `https://travelfeed.io/@${author}/${permlink}`;
  let tagString = '';
  if (tags && tags.length > 0)
    tags.forEach((t, i) => {
      if (i > 0) tagString += ',';
      tagString += t;
    });

  const social = [
    {
      name: 'Facebook',
      color: '#355899',
      link: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(link)}`,
      icon: (
        <FontAwesomeIcon
          style={{ width: '22px', height: '22px' }}
          icon={faFacebookF}
          className="textPrimary"
        />
      ),
    },
    {
      name: 'Twitter',
      color: '#55ACEE',
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        link,
      )}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(
        tagString,
      )}&via=travelfeedio`,
      icon: (
        <FontAwesomeIcon
          style={{ width: '22px', height: '22px' }}
          icon={faTwitter}
        />
      ),
    },
    {
      name: 'Pinterest',
      color: '#E50123',
      link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        link,
      )}&media=${encodeURIComponent(img_url)}&description=${encodeURIComponent(
        title,
      )}`,
      icon: (
        <FontAwesomeIcon
          style={{ width: '22px', height: '22px' }}
          icon={faPinterest}
        />
      ),
    },
    {
      name: 'Reddit',
      color: '#FF4500',
      link: `https://www.reddit.com/submit?title=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(link)}`,
      icon: (
        <FontAwesomeIcon
          style={{ width: '22px', height: '22px' }}
          icon={faReddit}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <div className="p-1">
        <Mutation mutation={CONTEST_SOCIAL}>
          {(
            contestSocial,
            // eslint-disable-next-line no-shadow
          ) => (
            <div className="text-center">
              {social.map(s => {
                return (
                  <a
                    onClick={contestSocial}
                    href={s.link}
                    title={s.name}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    style={{ color: s.color }}
                  >
                    <IconButton color="inherit">{s.icon}</IconButton>
                  </a>
                );
              })}
              <ResteemButton author={author} permlink={permlink} />
              <CopyToClipboard
                text={link}
                onCopy={() =>
                  newNotification({
                    success: true,
                    message: 'Link copied to your clipboard',
                  })
                }
              >
                <IconButton>
                  <FontAwesomeIcon
                    style={{ width: '20px', height: '20px' }}
                    icon={faLink}
                  />
                </IconButton>
              </CopyToClipboard>
              <a href="#comments">
                {comments && (
                  <IconButton>
                    <CommentIcon />
                  </IconButton>
                )}
              </a>
            </div>
          )}
        </Mutation>
      </div>
    </Fragment>
  );
};

export default withSnackbar(PostSocialShares);
