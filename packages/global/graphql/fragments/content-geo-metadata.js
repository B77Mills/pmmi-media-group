const gql = require('graphql-tag');

/**
 * Spread into the content page metadata query (via the `structuredDataQueryFragment`
 * input on `<theme-content-page>`) so that `geoSummary` is available to the JSON-LD
 * builder (`utils/build-geo-structured-data.js`).
 */
module.exports = gql`
  fragment ContentGeoMetadataFragment on Content {
    id
    geoSummary
  }
`;
