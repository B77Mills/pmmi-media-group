const gql = require('graphql-tag');

/**
 * Spread into the content page metadata query (via the `structuredDataQueryFragment`
 * input on `<theme-content-page>`) so that `geoSummary` is available to the JSON-LD
 * builder (`utils/build-geo-structured-data.js`).
 *
 * GEO (staged): `geoSummary` is commented out until the mindful-web graphql-server
 * exposes it — see `scripts/geo/README.md`. Requesting an undefined field here
 * fails the page metadata query. The fragment still selects `id` so it stays valid
 * while the field is staged.
 */
module.exports = gql`
  fragment ContentGeoMetadataFragment on Content {
    id
    # geoSummary
  }
`;
