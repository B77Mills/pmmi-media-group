const qf = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const companyQueryFragmentFn = require('../graphql/fragment-factories/content-company');
const { factory: leadersContentQueryFactory } = require('../graphql/fragment-factories/content-page');

const { newsletterState } = require('../middleware/newsletter-state');
const { formatContentResponse } = require('../middleware/format-content-response');
const withContent = require('../middleware/with-content');
const contact = require('../templates/content/contact');
const company = require('../templates/content/company');
const mediaGallery = require('../templates/content/media-gallery');
const whitepaper = require('../templates/content/whitepaper');
const webinar = require('../templates/content/webinar');
const contentTemplate = require('../templates/content');

module.exports = (app) => {
  const { site } = app.locals;

  // base on site config||USE_LINK_INJECTED_BODY to enable bcl
  const useLinkInjectedBody = site.get('useLinkInjectedBody');
  const queryFragment = qf.factory ? qf.factory({ useLinkInjectedBody }) : qf;

  app.get('/*?contact/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: contact,
    queryFragment,
    formatResponse: formatContentResponse,
  }));
  app.get('/*?company/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: company,
    queryFragment: companyQueryFragmentFn(site.get('leaders.alias')),
    formatResponse: formatContentResponse,
  }));
  app.get('/*?media-gallery/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: mediaGallery,
    queryFragment: leadersContentQueryFactory({
      useLinkInjectedBody,
      leadersAlias: site.get('leaders.alias'),
    }),
    formatResponse: formatContentResponse,
  }));
  app.get('/*?whitepaper/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: whitepaper,
    queryFragment: leadersContentQueryFactory({
      useLinkInjectedBody,
      leadersAlias: site.get('leaders.alias'),
    }),
    formatResponse: formatContentResponse,
  }));
  app.get('/*?webinar/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: webinar,
    queryFragment: leadersContentQueryFactory({
      useLinkInjectedBody,
      leadersAlias: site.get('leaders.alias'),
    }),
    formatResponse: formatContentResponse,
  }));
  app.get('/*?:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: contentTemplate,
    queryFragment: leadersContentQueryFactory({
      useLinkInjectedBody,
      leadersAlias: site.get('leaders.alias'),
    }),
    formatResponse: formatContentResponse,
  }));
};
