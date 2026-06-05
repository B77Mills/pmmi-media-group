const { withWebsiteSection } = require('@mindful-web/marko-web/middleware');
const { asyncRoute } = require('@mindful-web/utils');
const queryFragment = require('@mindful-web/marko-web-theme-monorail/graphql/fragments/website-section-page');
const { newsletterState } = require('@pmmi-media-group/package-global/middleware/newsletter-state');
const downloads = require('@pmmi-media-group/package-global/templates/website-section/downloads');
const events = require('@pmmi-media-group/package-global/templates/website-section/events');
const webinars = require('@pmmi-media-group/package-global/templates/website-section/webinars');
const collections = require('@pmmi-media-group/package-global/templates/website-section/collections');

const section = require('../templates/website-section');
const news = require('../templates/website-section/news');

module.exports = (app) => {
  app.get('/trackandtrace/products', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Track & Trace: A Collection of Products',
    description: 'Are you interested in track & trace/serialization solutions? Read through our collection of new and noteworthy products in track and trace and find the solution right for you.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Logistics > Traceability/Serialization
      sectionId: 33342,
      includeContentTypes: ['Product'],
    },
  })));

  app.get('/casestudies/pharma', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Case Studies: Pharmaceutical Packaging',
    description: 'Read through our collection of pharmaceutical packaging case studies and get informed and inspired by the latest thinking and newest technology.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Industries > Pharmaceuticals
      sectionId: 33334,
      includeLabels: ['Case Study'],
    },
  })));

  app.get('/researched-lists', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Researched Lists',
    queryParams: {
      // Researched List
      includeTaxonomyIds: [3200288],
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

  app.get('/events', asyncRoute(async (_, res) => res.marko(events, {
    alias: 'events',
    name: 'Events',
    description: 'Connect with healthcare packaging professionals, gain insights into the latest trends, and experience breakthrough technologies.',
  })));

  app.get('/webinars', asyncRoute(async (_, res) => res.marko(webinars, {
    alias: 'webinars',
    name: 'Webinars',
    description: 'Industry experts talk medical packaging technologies, sustainability, and logistics, ranging from fill/finish, package design, automation, and temperature control.',
  })));

  app.get('/:alias(news)', newsletterState(), withWebsiteSection({
    template: news,
    queryFragment,
  }));

  app.get('/:alias(resources/downloads)', newsletterState(), withWebsiteSection({
    template: downloads,
    queryFragment,
  }));

  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
  }));
};
