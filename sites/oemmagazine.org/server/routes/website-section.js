const { withWebsiteSection } = require('@mindful-web/marko-web/middleware');
const { asyncRoute } = require('@mindful-web/utils');
const queryFragment = require('@mindful-web/marko-web-theme-monorail/graphql/fragments/website-section-page');
const { newsletterState } = require('@pmmi-media-group/package-global/middleware/newsletter-state');
const downloads = require('@pmmi-media-group/package-global/templates/website-section/downloads');
const events = require('@pmmi-media-group/package-global/templates/website-section/events');
const collections = require('@pmmi-media-group/package-global/templates/website-section/collections');
const webinars = require('@pmmi-media-group/package-global/templates/website-section/webinars');
const withTopStoriesBlock = require('@pmmi-media-group/package-global/templates/website-section/with-top-stories-block');

const section = require('../templates/website-section');

module.exports = (app) => {
  app.get('/ai', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'A Curated Collection of AI Insights',
    description: 'AI is everywhere, including packaging and processing equipment. Check our collection of columns, Business Intelligence, podcasts, and general AI coverage to find ways to add this constantly changing technology to your toolbox. Learn how AI works, its manufacturing capabilities, and what solutions it can offer your operation.',
    queryParams: {
      // AI
      includeTaxonomyIds: [3150016],
    },
  })));

  app.get('/oem-profiles', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Content Call-out: OEM Profiles',
    description: 'Read all our OEM profiles and get inspired by what these manufacturing companies are doing to stay competitive in today’s market. Read about their machinery innovation, successful equipment launches, and the family stories behind the companies that help to set them apart.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Business > OEM Profiles
      sectionId: 87501,
    },
  })));

  app.get('/ai-for-packaging-and-processing-oems', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'AI FOR OEMS: EXPLORING HOW PACKAGING AND PROCESSING OEMS CAN LEVERAGE GENERATIVE AI FOR THEIR EQUIPMENT',
    description: 'Packaging and processing OEMs have many opportunities to incorporate AI into their equipment. This is a collection of articles exploring how these technologies might provide the equipment with more robust capabilities while allowing machines to be more forgiving with the operators and technicians that run them.',
    queryParams: {
      // AI for OEMs
      includeTaxonomyIds: [3199762],
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
    description: '',
  })));

  app.get('/webinars', asyncRoute(async (_, res) => res.marko(webinars, {
    alias: 'webinars',
    name: 'Webinars',
    description: '',
  })));

  app.get('/:alias(WomenInPackaging)', newsletterState(), withWebsiteSection({
    template: withTopStoriesBlock,
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
