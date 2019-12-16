import React from 'react';
import Link from '../lib/Link';

const notificationTypes = {
  FOLLOW: 'follow',
  REPLY: 'reply',
  MENTION: 'mention',
  HONOUR: 'honour',
  CURATION: 'curation',
};

export const messageFromNotification = notifiication => {
  const { type, author, permlink, message } = notifiication;
  let res;
  switch (type) {
    case notificationTypes.CURATION:
      res = (
        <span className="text-light">
          Your post{' '}
          <Link
            color="inherit"
            as={`/@${author}/${permlink}`}
            href={`/post?author=${author}&permlink=${permlink}`}
          >
            {permlink}
          </Link>{' '}
          was chosen to be featured on the front page!
        </span>
      );
      break;
    case notificationTypes.HONOUR:
      res = (
        <span className="text-light">
          We have chosen your post{' '}
          <Link
            color="inherit"
            as={`/@${author}/${permlink}`}
            href={`/post?author=${author}&permlink=${permlink}`}
          >
            {permlink}
          </Link>{' '}
          for a small upvote.
        </span>
      );
      break;
    case notificationTypes.REPLY:
      res = (
        <span className="text-light">
          <Link
            color="inherit"
            as={`/@${author}`}
            href={`/blog?author=${author}`}
          >
            {author}
          </Link>{' '}
          replied to your post{' '}
          <Link
            color="inherit"
            as={`/@${author}/${permlink}`}
            href={`/post?author=${author}&permlink=${permlink}`}
          >
            {permlink}
          </Link>
        </span>
      );
      break;
    case notificationTypes.FOLLOW:
      res = (
        <span className="text-light">
          <Link
            color="inherit"
            as={`/@${author}`}
            href={`/blog?author=${author}`}
          >
            {author}
          </Link>{' '}
          follows you
        </span>
      );
      break;
    case notificationTypes.MENTION:
      res = (
        <span className="text-light">
          <Link
            color="inherit"
            as={`/@${author}`}
            href={`/blog?author=${author}`}
          >
            {author}
          </Link>{' '}
          mentioned you in{' '}
          <Link
            color="inherit"
            as={`/@${author}/${permlink}`}
            href={`/post?author=${author}&permlink=${permlink}`}
          >
            {permlink}
          </Link>
        </span>
      );
      break;
    default:
      res = message;
  }
  return res;
};
