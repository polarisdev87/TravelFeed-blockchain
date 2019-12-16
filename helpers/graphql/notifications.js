import gql from 'graphql-tag';

export const ADD_PUSH_SUBSCRIPTION = gql`
  mutation addPushSubscription($pushSubscription: String!) {
    addPushSubscription(pushSubscription: $pushSubscription) {
      success
      message
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query notifications($limit: Int) {
    notifications(limit: $limit) {
      author
      permlink
      type
      message
    }
  }
`;
