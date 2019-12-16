import gql from 'graphql-tag';

export const REPORT_POST = gql`
  mutation reportPost(
    $author: String!
    $permlink: String!
    $reason: String!
    $details: String
  ) {
    reportPost(
      author: $author
      permlink: $permlink
      reason: $reason
      details: $details
    ) {
      success
      message
    }
  }
`;
