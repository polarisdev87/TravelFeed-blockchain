import gql from 'graphql-tag';

export const GET_GEOJSON = gql`
  query geojson($countryList: [String]!) {
    geojson(countryList: $countryList) {
      features
      regions {
        name
        emoji
        visited
      }
      budget
    }
  }
`;
