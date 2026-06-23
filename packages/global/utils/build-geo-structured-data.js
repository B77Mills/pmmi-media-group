const defaultBuildStructuredData = require('@mindful-web/marko-web/components/page/metadata/google-structured-data/content');
const { get } = require('@mindful-web/object-path');

/**
 * Wraps the framework's default content structured-data (JSON-LD) builder and,
 * when a GEO summary is present on the content node, overrides the `description`
 * with it. Falls back to whatever the default builder produced otherwise.
 *
 * Requires `geoSummary` to be present on the metadata query node — see
 * `graphql/fragments/content-geo-metadata.js` (staged until the graphql-server
 * exposes the field).
 *
 * @param {object} node The content node from the page metadata query.
 * @param {Function} contentGatingHandler Passed through to the default builder.
 * @returns {?string} A JSON string, or whatever the default builder returned.
 */
module.exports = (node, contentGatingHandler) => {
  const json = defaultBuildStructuredData(node, contentGatingHandler);
  const geoSummary = get(node, 'geoSummary');
  if (!json || !geoSummary) return json;
  try {
    const data = JSON.parse(json);
    data.description = geoSummary;
    return JSON.stringify(data);
  } catch (e) {
    return json;
  }
};
