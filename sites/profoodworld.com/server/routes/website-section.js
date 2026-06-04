const { withWebsiteSection } = require('@mindful-web/marko-web/middleware');
const { asyncRoute } = require('@mindful-web/utils');
const queryFragment = require('@mindful-web/marko-web-theme-monorail/graphql/fragments/website-section-page');
const emergingBrandsFragment = require('@pmmi-media-group/package-global/graphql/fragments/emerging-brands-section-page');
const { newsletterState } = require('@pmmi-media-group/package-global/middleware/newsletter-state');
const downloads = require('@pmmi-media-group/package-global/templates/website-section/downloads');
const webinars = require('@pmmi-media-group/package-global/templates/website-section/webinars');
const events = require('@pmmi-media-group/package-global/templates/website-section/events');
const collections = require('@pmmi-media-group/package-global/templates/website-section/collections');
const superCategory = require('@pmmi-media-group/package-global/templates/website-section/super-category');
const section = require('../templates/website-section');
const global250 = require('../templates/website-section/global-250');
const global50 = require('../templates/website-section/global-50');

module.exports = (app) => {
  app.get('/highpressureprocessing', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'High-Pressure Processing: Content Collection',
    description: 'Read through our collection of the most recent content on high-pressure processing. Learn more about the technology and why it’s important to food safety, food quality, shelf life, and more. Plus, read about specific applications, case studies, and the CPGs using HPP in their food or beverage operations.',
    queryParams: {
      // HPP
      includeTaxonomyIds: [3197843],
    },
  })));

  app.get('/packexpo', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'PACK EXPO',
    description: '',
    queryName: 'website-scheduled-content',
    queryParams: {
      includeLabels: ['PACK EXPO'],
    },
  })));

  app.get('/:alias(global-250)', newsletterState(), (_, res) => { res.marko(global250); });
  app.get('/:alias(global-250/*)', newsletterState(), (_, res) => { res.marko(global250); });
  app.get('/:alias(global-50)', newsletterState(), (_, res) => { res.marko(global50); });
  app.get('/:alias(global-50/*)', newsletterState(), (_, res) => { res.marko(global50); });

  app.get('/events', asyncRoute(async (_, res) => res.marko(events, {
    alias: 'events',
    name: 'Events',
    description: 'Connect with industry leaders, gain insights into the latest trends, and experience breakthrough technologies in food processing & packaging.',
  })));

  app.get('/webinars', asyncRoute(async (_, res) => res.marko(webinars, {
    alias: 'webinars',
    name: 'Webinars',
    description: 'Industry expert insights on technologies, equipment, and software for food and beverage manufacturing.',
  })));

  app.get('/:alias(emergingbrands)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment: emergingBrandsFragment,
  }));

  app.get('/:alias(resources/downloads)', newsletterState(), withWebsiteSection({
    template: downloads,
    queryFragment,
  }));

  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: superCategory,
    queryFragment,
  }));
};
