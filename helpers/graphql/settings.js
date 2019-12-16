import gql from 'graphql-tag';

export const CHANGE_SETTINGS = gql`
  mutation updatePreferences(
    $showNSFW: Boolean
    $useTfBlacklist: Boolean
    $trackFollows: Boolean
    $trackMentions: Boolean
    $trackReplies: Boolean
    $trackCuration: Boolean
    $trackUpdates: Boolean
    $useDarkMode: Boolean
    $hasAcceptedCookies: Boolean
    $useAdvancedEditorOptions: Boolean
    $claimRewards: Boolean
  ) {
    updatePreferences(
      showNSFW: $showNSFW
      useTfBlacklist: $useTfBlacklist
      trackFollows: $trackFollows
      trackMentions: $trackMentions
      trackReplies: $trackReplies
      trackCuration: $trackCuration
      trackUpdates: $trackUpdates
      useDarkMode: $useDarkMode
      hasAcceptedCookies: $hasAcceptedCookies
      useAdvancedEditorOptions: $useAdvancedEditorOptions
      claimRewards: $claimRewards
    ) {
      success
      message
    }
  }
`;

export const GET_COOKIES_ACCEPTED = gql`
  query preferences {
    preferences {
      hasAcceptedCookies
    }
  }
`;

export const USE_ADVANCED_EDITOR_OPTIONS = gql`
  query preferences {
    preferences {
      useAdvancedEditorOptions
    }
  }
`;

export const GET_SETTINGS = gql`
  query preferences {
    preferences {
      showNSFW
      useDarkMode
      useTfBlacklist
      trackFollows
      trackMentions
      trackReplies
      trackCuration
      trackUpdates
      useAdvancedEditorOptions
      claimRewards
    }
  }
`;
