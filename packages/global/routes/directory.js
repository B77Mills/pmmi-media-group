const { get } = require('@mindful-web/object-path');
const { withWebsiteSection } = require('@mindful-web/marko-web/middleware');
const MarkoWebSearchConfig = require('@mindful-web/marko-web-search/config');
const MarkoWebSearch = require('@mindful-web/marko-web-search');
const { MindfulApiClient } = require('@mindful-web/mindful/api-client');
const { MindfulMarkoWebService } = require('@mindful-web/mindful/marko-web/service');
const mindfulNamespaceMap = require('@mindful-web/marko-web-theme-monorail/config/mindful-namespace-map');
const queryFragment = require('../graphql/fragments/website-directory-section-page');
const directory = require('../templates/directory/index');

module.exports = (
  app,
  {
    rootAlias = 'directory',
    contentTypes = ['Company', 'Product'],
    assignedToWebsiteSectionIds = [],
  },
) => {
  const config = new MarkoWebSearchConfig({
    resultsPerPage: { default: 4 },
    contentTypes,
    assignedToWebsiteSectionIds,
    defaultSortField: 'NAME',
    rootAlias,
    mindful: new MindfulMarkoWebService({
      client: new MindfulApiClient({ ...(mindfulNamespaceMap.get(app.locals.tenantKey) || {}) }),
    }),
  });

  const searchMiddleware = (req, res, next) => {
    res.locals.$markoWebSearch = new MarkoWebSearch({
      config,
      query: {
        ...req.query,
      },
    });
    if (!get(req, 'query.searchQuery') && get(req, 'query.sortField') === 'SCORE') {
      const params = new URLSearchParams(get(req, 'query'));
      params.delete('sortField');
      params.delete('searchQuery');
      if (`${params}`) res.redirect(301, `/${get(req, 'params.alias')}?${params}`);
      else res.redirect(301, `/${get(req, 'params.alias')}`);
    }
    next();
  };

  app.get('/leaders', searchMiddleware, withWebsiteSection({
    template: directory,
    queryFragment,
    aliasResolver: () => rootAlias,
    redirectOnPathMismatch: false,
  }));
  app.get('/leaders/[a-z0-9-/]+', searchMiddleware, withWebsiteSection({
    template: directory,
    queryFragment,
    aliasResolver: () => rootAlias,
    redirectOnPathMismatch: false,
  }));
};
