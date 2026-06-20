const { get } = require('@mindful-web/object-path');
const htmlSitemap = require('@mindful-web/marko-web-html-sitemap/routes');
const companySearchHandler = require('@mindful-web/marko-web-theme-monorail/routes/company-search');
const defaultRoutes = require('@mindful-web/marko-web-theme-monorail/routes');
const search = require('@mindful-web/marko-web-theme-monorail/routes/search');
const taxonomy = require('@mindful-web/marko-web-theme-monorail/routes/taxonomy');
const omedaNewsletters = require('@mindful-web/marko-web-omeda/routes/omeda-newsletters');
const magazine = require('@mindful-web/marko-web-theme-monorail-magazine/routes');
const mindfulPreview = require('@mindful-web/marko-web-theme-monorail/routes/ad-preview');
const getAdvertisingPostAsNativeStory = require('@mindful-web/mindful/marko-web/middleware/get-advertising-post-as-native-story');
const getAdvertisingPostsAsNativeStories = require('@mindful-web/mindful/marko-web/middleware/advertising-post-connection');

const advertisingPostTemplate = require('../templates/content/advertising-post');
const partnerPerspectivesTemplate = require('../templates/website-section/partner-perspectives');

const directory = require('./directory');
const feed = require('./feed');
const digitalEditionRedirects = require('./digital-edition-redirects');
const content = require('./content');
const scheduledContent = require('./scheduled-content');
const dynamicPage = require('./dynamic-page');

const printContent = require('./print-content');
const publicFiles = require('./public-files');
const redirects = require('./redirects');
const staticPage = require('./static-page');
const taxonomyCategory = require('./taxonomy-category');
const publication = require('../templates/magazine/publication');
const publicationFragment = require('../graphql/fragments/magazine-publication-page');

module.exports = (app, siteConfig) => {
  // Handle request on /__company-search?searchQuery=CompanyName
  companySearchHandler(app);

  // Company directory
  directory(app, {
    assignedToWebsiteSectionIds: get(siteConfig, 'search.companySearch.assignedToWebsiteSectionIds', []),
    contentTypes: ['Company'],
    rootAlias: get(siteConfig, 'search.companySearch.rootAlias', 'z-company-categories-2026'),
  });

  // Mindful Preview Link
  const namespace = get(siteConfig, 'mindful.namespace');
  if (namespace) {
    mindfulPreview(app, namespace);
    // Mindful/NativeX (Story rendering)
    getAdvertisingPostAsNativeStory(app, {
      route: '/partner-perspectives/:section/:slug/:id',
      tenant: 'pmmi',
      template: advertisingPostTemplate,
    });
    getAdvertisingPostsAsNativeStories(app, {
      route: '/partner-perspectives',
      queryParams: { websiteChannelEdgeNodeIds: [get(siteConfig, 'mindful.websiteAdvertisingChannelId')] },
      template: partnerPerspectivesTemplate,
    });
  }

  // Taxonomy category pages
  taxonomyCategory(app);

  // Feed
  feed(app);

  scheduledContent(app);

  // Magazine Routes
  magazine(app, { publication }, { publicationFragment });

  // Omeda newsletter signup
  omedaNewsletters(app);

  // Shared Print Content
  printContent(app);

  // Shared Public Files (e.g. ads.txt)
  publicFiles(app);

  // Redirects
  redirects(app);

  // Theme-level default routes (e.g. email-preview, render-block)
  defaultRoutes(app);

  // Taxonomy pages (for handling redirects from old WP sites)
  taxonomy(app);

  // Search routes
  search(app, siteConfig);

  // Static pages
  staticPage(app);

  // HTML Sitemap
  htmlSitemap(app);

  // dynamic pages /page/${alias}
  dynamicPage(app);

  content(app);

  // Programatic redirect for legacy digitial edition urls
  // old: "http://www.automationworld.com/sites/default/files/digital_edition/december2014/AW_December_2014_Optimized/index.html",
  // new: "https://digitaleditions.automationworld.com/december2014/AW_December_2014_Optimized/index.html",
  digitalEditionRedirects(app);
};
