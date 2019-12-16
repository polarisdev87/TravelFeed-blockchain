import gql from 'graphql-tag';

export const CONTEST_GET = gql`
  query contestGet {
    contestGet {
      type
      tickets
      date
    }
  }
`;

export const REFERRALS = gql`
  query referrals {
    referrals
  }
`;

export const CONTEST_SOCIAL = gql`
  mutation contestSocial {
    contestSocial {
      success
      message
    }
  }
`;

export const CONTEST_IS_OPTED_IN = gql`
  query contestIsOptedIn {
    contestIsOptedIn
  }
`;

export const CONTEST_OPT_IN = gql`
  mutation contestOptIn($optedIn: Boolean!, $transactionId: String) {
    contestOptIn(optedIn: $optedIn, transactionId: $transactionId) {
      success
      message
    }
  }
`;

export const REFERRAL_MAIL = gql`
  mutation referralMail($email: String!, $message: String) {
    referralMail(email: $email, message: $message) {
      success
      message
    }
  }
`;
