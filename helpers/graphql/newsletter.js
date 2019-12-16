import gql from 'graphql-tag';

export const NEWSLETTER_SUBSCRIBE = gql`
  mutation newsletterSubscribe($email: String!, $captcha: String!) {
    newsletterSubscribe(email: $email, captcha: $captcha) {
      success
      message
    }
  }
`;

export const NEWSLETTER_CONFIRM_SUBSCRIBE = gql`
  mutation newsletterConfirmSubscribe($subscribeToken: String!) {
    newsletterConfirmSubscribe(subscribeToken: $subscribeToken) {
      success
      message
    }
  }
`;

export const IS_NEWSLETTER_SUBSCRIBED = gql`
  query isNewsletterSubscribed {
    isNewsletterSubscribed
  }
`;
