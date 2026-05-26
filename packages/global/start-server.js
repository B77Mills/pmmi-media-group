const newrelic = require('newrelic');
const { startServer } = require('@mindful-web/marko-web');
const { set, get, getAsObject } = require('@mindful-web/object-path');
const loadInquiry = require('@mindful-web/marko-web-inquiry');
const htmlSitemapPagination = require('@mindful-web/marko-web-html-sitemap/middleware/paginated');
const omedaIdentityX = require('@mindful-web/marko-web-omeda-identity-x');
const i18n = require('@mindful-web/marko-web-theme-monorail/middleware/i18n');
const newsletterModalState = require('@mindful-web/marko-web-theme-monorail/middleware/newsletter-modal-state');
const MindfulMarkoWebService = require('@mindful-web/mindful/marko-web/middleware/service');
const paginated = require('@mindful-web/marko-web/middleware/paginated');

const document = require('./components/document');
const components = require('./components');
const fragments = require('./fragments');
const sharedRoutes = require('./routes');
const redirectHandler = require('./redirect-handler');
const oembedHandler = require('./oembed-handler');
const idxRouteTemplates = require('./templates/user');
const recaptcha = require('./config/recaptcha');
const idxNavItems = require('./config/identity-x-nav');
const defaultContentGatingHandler = require('./utils/content-gating-handler');

const contentGatingHandlerEnabled = process.env.CONTENT_GATING_HANDLER_ENABLED;

const routes = (siteRoutes, siteConfig) => (app) => {
  // Handle submissions on /__inquiry
  loadInquiry(app);
  // Shared/global routes (all sites)
  sharedRoutes(app, siteConfig);
  // Load site routes
  siteRoutes(app, siteConfig);
};

module.exports = (options = {}) => {
  const { onStart } = options;
  const googleNewsInput = {
    days: 7,
    includeContentTypes: ['Article'],
    excludeLabels: ['Sponsored'],
  };
  // Allow for env enable/disable of contentGatingHandler
  const contentGatingHandler = (contentGatingHandlerEnabled)
    ? options.contentGatingHandler || defaultContentGatingHandler
    : () => false;
  return startServer({
    ...options,
    routes: routes(options.routes, options.siteConfig),
    document: options.document || document,
    components: options.components || components,
    fragments: options.fragments || fragments,
    sitemapsHeaders: {
      'x-google-news-input': JSON.stringify(googleNewsInput),
    },
    onStart: async (app) => {
      if (typeof onStart === 'function') await onStart(app);
      app.set('trust proxy', 'loopback, linklocal, uniquelocal');

      set(app.locals, 'contentGatingHandler', contentGatingHandler);

      // Use paginated middleware
      app.use(paginated());

      // Use paginated middleware
      app.use(htmlSitemapPagination());

      // Use newsletterModalState middleware
      app.use(newsletterModalState());

      const { namespace } = getAsObject(options, 'siteConfig.mindful') || { namespace: null };
      if (namespace) app.use(MindfulMarkoWebService({ namespace }));

      // Setup GAM.
      const gamConfig = get(options, 'siteConfig.gam');
      set(app.locals, 'GAM', gamConfig);

      // Setup NativeX.
      const nativeXConfig = get(options, 'siteConfig.nativeX');
      set(app.locals, 'nativeX', nativeXConfig);

      // i18n
      i18n(app, options.i18n);
      // Set omedaConfig to local
      const omedaConfig = getAsObject(options, 'siteConfig.omeda');
      set(app.locals, 'omedaConfig', omedaConfig);

      // Add IdentityX logoutHook to remove omeda_promo_code cookie
      const identityX = getAsObject(options, 'siteConfig.identityX');

      const { promoCodeCookieName } = omedaConfig;
      identityX.addHook({
        name: 'onLogout',
        fn: ({ res }) => res.clearCookie(promoCodeCookieName),
      });

      // Setup IdentityX + Omeda
      const omedaIdentityXConfig = getAsObject(options, 'siteConfig.omedaIdentityX');
      omedaIdentityX(app, { ...omedaIdentityXConfig, idxRouteTemplates });
      idxNavItems({ site: app.locals.site, i18n: app.locals.i18n });

      // Recaptcha
      set(app.locals, 'recaptcha', recaptcha);
    },
    onAsyncBlockError: (e) => newrelic.noticeError(e),

    redirectHandler,

    embeddedMediaHandlers: {
      oembed: oembedHandler,
    },
  });
};
