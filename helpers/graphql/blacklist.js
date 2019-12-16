import gql from 'graphql-tag';

export const BLACKLIST_AUTHOR = gql`
  mutation blacklistAuthor(
    $author: String!
    $reason: String
    $isOnlyCommentBlacklisted: Boolean
  ) {
    blacklistAuthor(
      author: $author
      reason: $reason
      isOnlyCommentBlacklisted: $isOnlyCommentBlacklisted
    ) {
      success
      message
    }
  }
`;

export const UNBLACKLIST_AUTHOR = gql`
  mutation unblacklistAuthor(
    $author: String!
    $reason: String
    $isOnlyCommentBlacklisted: Boolean
  ) {
    unblacklistAuthor(
      author: $author
      reason: $reason
      isOnlyCommentBlacklisted: $isOnlyCommentBlacklisted
    ) {
      success
      message
    }
  }
`;

export const BLACKLIST_POST = gql`
  mutation blacklistPost(
    $author: String!
    $permlink: String!
    $reason: String
  ) {
    blacklistPost(author: $author, permlink: $permlink, reason: $reason) {
      success
      message
    }
  }
`;

export const UNBLACKLIST_POST = gql`
  mutation unblacklistPost(
    $author: String!
    $permlink: String!
    $reason: String
  ) {
    unblacklistPost(author: $author, permlink: $permlink, reason: $reason) {
      success
      message
    }
  }
`;

export const IS_BLACKLISTED_POST = gql`
  query isBlacklistedPost($author: String!, $permlink: String!) {
    isBlacklistedPost(author: $author, permlink: $permlink) {
      isBlacklisted
      reason
    }
  }
`;

export const IS_BLACKLISTED_AUTHOR = gql`
  query isBlacklistedAuthor($author: String!) {
    isBlacklistedAuthor(author: $author) {
      isBlacklisted
      reason
      isOnlyCommentBlacklisted
    }
  }
`;
