import gql from 'graphql-tag';

export const VOTE = gql`
  mutation vote($author: String!, $permlink: String!, $weight: Int!) {
    vote(author: $author, permlink: $permlink, weight: $weight) {
      success
      message
    }
  }
`;

export const POST = gql`
  mutation post(
    $title: String!
    $body: String!
    $parentPermlink: String!
    $parentAuthor: String!
    $jsonMetadata: String!
    $permlink: String!
    $commentOptions: String
  ) {
    post(
      title: $title
      body: $body
      parentPermlink: $parentPermlink
      parentAuthor: $parentAuthor
      jsonMetadata: $jsonMetadata
      permlink: $permlink
      commentOptions: $commentOptions
    ) {
      success
      message
    }
  }
`;

export const CUSTOM_JSON = gql`
  mutation customJson($id: String!, $payload: String!) {
    customJson(id: $id, payload: $payload) {
      success
      message
    }
  }
`;

export const ACCOUNT_UPDATE = gql`
  mutation accountUpdate($profile: String!) {
    accountUpdate(profile: $profile) {
      success
      message
    }
  }
`;

export const FOLLOW = gql`
  mutation follow($following: String!) {
    follow(following: $following) {
      success
      message
    }
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($following: String!) {
    unfollow(following: $following) {
      success
      message
    }
  }
`;

export const PAST_PUBLISH = gql`
  mutation pastPublish($permlink: String!) {
    pastPublish(permlink: $permlink) {
      success
      message
    }
  }
`;

export const PAST_ACCOUNT_UPDATE = gql`
  mutation pastAccountUpdate {
    pastAccountUpdate {
      success
      message
    }
  }
`;
