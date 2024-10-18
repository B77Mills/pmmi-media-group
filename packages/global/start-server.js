const newrelic = require('newrelic');
const { startServer } = require('@parameter1/base-cms-marko-web');
const { set, get, getAsObject } = require('@parameter1/base-cms-object-path');
const loadInquiry = require('@parameter1/base-cms-marko-web-inquiry');
const htmlSitemapPagination = require('@parameter1/base-cms-marko-web-html-sitemap/middleware/paginated');
const omedaIdentityX = require('@parameter1/base-cms-marko-web-omeda-identity-x');
const i18n = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/i18n');
const newsletterModalState = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/newsletter-modal-state');

const document = require('./components/document');
const components = require('./components');
const fragments = require('./fragments');
const sharedRoutes = require('./routes');
const paginated = require('./middleware/paginated');
const redirectHandler = require('./redirect-handler');
const oembedHandler = require('./oembed-handler');
const idxRouteTemplates = require('./templates/user');
const recaptcha = require('./config/recaptcha');
const idxNavItems = require('./config/identity-x-nav');

const contentGatingHandlerEnabled = process.env.CONTENT_GATING_HANDLER_ENABLED;
const defaultContentGatingHandler = () => false;
// When we retest this with the group remove above line and uncomment line below! :)
// const defaultContentGatingHandler = require('./utils/content-gating-handler');

const routes = (siteRoutes, siteConfig) => (app) => {
  // Handle submissions on /__inquiry
  loadInquiry(app);
  // Shared/global routes (all sites)
  sharedRoutes(app, siteConfig);
  // Load site routes
  siteRoutes(app);
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
