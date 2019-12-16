import gql from 'graphql-tag';

export const ONBOARD_START = gql`
  mutation onboardStart(
    $email: String!
    $isNewsletter: Boolean
    $referrer: String
    $captcha: String!
  ) {
    onboardStart(
      email: $email
      isNewsletter: $isNewsletter
      referrer: $referrer
      captcha: $captcha
    ) {
      success
      message
    }
  }
`;

export const ONBOARD_VERIFY_TOKEN = gql`
  query onboardingVerifyToken($infoToken: String, $claimToken: String) {
    onboardingVerifyToken(infoToken: $infoToken, claimToken: $claimToken) {
      success
    }
  }
`;

export const ONBOARD_INFO = gql`
  mutation onboardInformation(
    $infoToken: String!
    $post: String!
    $tags: [String]
    $accountMetadata: String
  ) {
    onboardInformation(
      infoToken: $infoToken
      post: $post
      tags: $tags
      accountMetadata: $accountMetadata
    ) {
      success
      message
    }
  }
`;

export const ONBOARD_CREATE = gql`
  mutation onboardCreate(
    $claimToken: String!
    $username: String!
    $postingPubKey: String!
    $activePubKey: String!
    $memoPubKey: String!
    $ownerPubKey: String!
    $password: String
  ) {
    onboardCreate(
      claimToken: $claimToken
      username: $username
      postingPubKey: $postingPubKey
      activePubKey: $activePubKey
      memoPubKey: $memoPubKey
      ownerPubKey: $ownerPubKey
      password: $password
    ) {
      success
      message
    }
  }
`;

export const ONBOARD_GET_REVIEWABLE = gql`
  query onboardingGetReviewable {
    onboardingGetReviewable {
      email
      post
      tags
      accountMetadata
    }
  }
`;

export const ONBOARD_REVIEW = gql`
  mutation onboardReview($email: String!, $isApproved: Boolean!) {
    onboardReview(email: $email, isApproved: $isApproved) {
      success
      message
    }
  }
`;

export const START_PASSWORD_RESET = gql`
  mutation startPassWordReset($email: String!, $captcha: String!) {
    startPassWordReset(email: $email, captcha: $captcha) {
      success
      message
    }
  }
`;

export const CHECK_PASSWORD_RESET_TOKEN = gql`
  query checkPassWordResetToken($resetToken: String!) {
    checkPassWordResetToken(resetToken: $resetToken) {
      success
    }
  }
`;

export const CONFIRM_PASSWORD_RESET = gql`
  mutation confirmPassWordReset($resetToken: String!, $password: String!) {
    confirmPassWordReset(resetToken: $resetToken, password: $password) {
      success
      message
    }
  }
`;

export const START_ADD_ACCOUNT_PASSWORD = gql`
  mutation startAddAccountPassword($email: String!, $isNewsletter: Boolean) {
    startAddAccountPassword(email: $email, isNewsletter: $isNewsletter) {
      success
      message
    }
  }
`;

export const CHECK_ADD_ACCOUNT_PASSWORD = gql`
  query checkAddAccountPassword($linkToken: String!, $isNewsletter: Boolean) {
    checkAddAccountPassword(
      linkToken: $linkToken
      isNewsletter: $isNewsletter
    ) {
      success
    }
  }
`;

export const CONFIRM_ADD_ACCOUNT_PASSWORD = gql`
  mutation confirmAddAccountPassword($linkToken: String!, $password: String!) {
    confirmAddAccountPassword(linkToken: $linkToken, password: $password) {
      success
      message
    }
  }
`;

export const IS_EASY_LOGIN = gql`
  query isEasyLogIn {
    isEasyLogIn
  }
`;
