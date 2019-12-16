import gql from 'graphql-tag';

export const GET_LOCATION_DETAILS = gql`
  query locationDetails(
    $country_code: String
    $subdivision: String
    $city: String
    $search: String
    $tag: String
  ) {
    locationDetails(
      country_code: $country_code
      subdivision: $subdivision
      city: $city
      search: $search
      tag: $tag
    ) {
      title
      description
      image
      attribution
      unsplashUser
      budget_score
      isFeatured
      subtitle
      url
      license
      sublocations {
        subdivision
        city
      }
      topics
    }
  }
`;

export const GET_FEATURED_LOCATIONS = gql`
  query featuredLocations(
    $tags: Boolean
    $countries: Boolean
    $places: Boolean
  ) {
    featuredLocations(tags: $tags, countries: $countries, places: $places) {
      title
      image
      tag
      country_code
      subdivision
      city
      suburb
    }
  }
`;

export const ADD_LOCATION_DETAILS = gql`
  mutation addLocationDetails(
    $country_code: String
    $subdivision: String
    $city: String
    $image: String
    $attribution: String
    $description: String
    $budget_score: Int
    $tag: String
    $title: String
    $isFeatured: Boolean
    $topics: String
  ) {
    addLocationDetails(
      country_code: $country_code
      subdivision: $subdivision
      city: $city
      image: $image
      attribution: $attribution
      description: $description
      budget_score: $budget_score
      tag: $tag
      title: $title
      isFeatured: $isFeatured
      topics: $topics
    ) {
      success
      message
    }
  }
`;
