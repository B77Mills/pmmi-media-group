const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');
const leadersFragment = require('@pmmi-media-group/package-theme-monorail-leaders/graphql/fragments/leaders-section');
const webinars = require('@pmmi-media-group/package-global/templates/website-section/webinars');
const events = require('@pmmi-media-group/package-global/templates/website-section/events');
const withTopStoriesBlock = require('@pmmi-media-group/package-global/templates/website-section/with-top-stories-block');
const { newsletterState } = require('@pmmi-media-group/package-global/middleware/newsletter-state');

const section = require('../templates/website-section');
const leaders = require('../templates/website-section/leaders');
const caseStudies = require('../templates/website-section/casestudies-casepacking');

module.exports = (app) => {
  app.get('/casestudies-casepacking', asyncRoute(async (_, res) => res.marko(caseStudies)));

  app.get('/:alias(events)', withWebsiteSection({
    template: events,
    queryFragment,
  }));

  app.get('/:alias(webinars)', withWebsiteSection({
    template: webinars,
    queryFragment,
  }));

  app.get('/:alias(leaders)', newsletterState(), withWebsiteSection({
    template: leaders,
    queryFragment: leadersFragment,
  }));

  app.get('/:alias(WomenInPackaging)', newsletterState(), withWebsiteSection({
    template: withTopStoriesBlock,
    queryFragment,
  }));

  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
  }));
};
