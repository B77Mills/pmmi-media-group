const sharedInquiryConfig = require('@pmmi-media-group/package-global/config/inquiry');
const contentMeter = require('@pmmi-media-group/package-global/config/content-meter');
const gam = require('./gam');
const identityX = require('./identity-x');
const leaders = require('./leaders');
const magazine = require('./magazine');
const nativeX = require('./native-x');
const navigation = require('./navigation');
const newsletter = require('./newsletter');
const omeda = require('./omeda');
const omedaIdentityX = require('./omeda-identity-x');
const identityXOptInHooks = require('./identity-x-opt-in-hooks');
const search = require('./search');
const subscribe = require('./subscribe');
const pageDetails = require('./page-details');

module.exports = {
  // module configs
  contentMeter,
  gam,
  identityX,
  useLinkInjectedBody: process.env.USE_LINK_INJECTED_BODY === 'true',
  idxNavItems: { enable: true },
  leaders,
  magazine,
  nativeX,
  navigation,
  newsletter,
  omeda,
  omedaIdentityX,
  identityXOptInHooks,
  search,
  subscribe,
  partnerPerspectivesSectionId: 90221,
  // theme configs
  company: 'PMMI Media Group',
  p1events: {
    tenant: 'pmmi',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'www.packworld.com' : '',
    engagement: { enabled: true },
  },
  logos: {
    navbar: {
      src: 'https://img.packworld.com/files/base/pmmi/pw/pw-logo.png?h=75&auto=format,compress',
      srcset: [
        'https://img.packworld.com/files/base/pmmi/pw/pw-logo.png?h=75&auto=format,compress&dpr=2 2x',
      ],
    },
    footer: {
      src: 'https://img.packworld.com/files/base/pmmi/pw/pw_logo.png?h=35&auto=format,compress',
      srcset: [
        'https://img.packworld.com/files/base/pmmi/pw/pw_logo.png?h=35&auto=format,compress&dpr=2 2x',
      ],
      width: '122',
      height: '35',
    },
    printContent: {
      src: 'https://img.packworld.com/files/base/pmmi/pw/pw_logo_black.png?h=45&auto=format,compress',
      srcset: [
        'https://img.packworld.com/files/base/pmmi/pw/pw_logo_black.png?h=45&auto=format,compress&dpr=2 2x',
      ],
    },
    corporate: {
      alt: 'PMMI Media Group Logo',
      href: 'https://www.pmmimediagroup.com',
      src: 'https://img.packworld.com/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress',
      srcset: [
        'https://img.packworld.com/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress&dpr=2 2x',
      ],
      width: '83',
      height: '40',
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/PackagingWorld' },
    { provider: 'twitter', href: 'https://twitter.com/packagingworld' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/showcase/packaging-world' },
    { provider: 'youtube', href: 'https://www.youtube.com/channel/UCjmotU1o5ij4p3PNUsnBoNQ?utm_source=PWWebsite&utm_campaign=PWYouTube' },
  ],
  gtm: {
    containerId: process.env.GTM_CONTAINER_ID || 'GTM-TK8WXJR',
    slotPrefix: 'pw',
  },
  ga4: {
    propertyId: '316170169',
  },
  gcse: {
    id: '003355913687346718228:trgtl90veyh',
  },
  wufoo: {
    userName: 'pmmimediagroup',
  },
  newsletters: {
    subscribeLink: '',
  },
  magazines: {
    description: 'Packaging World keeps professionals across all industries informed about the business of packaging. Monthly issues offer a smart mix of  application features, new products, machinery, technology and materials updates.',
  },
  inquiry: {
    ...sharedInquiryConfig,
    sendFrom: 'Packaging World <noreply@parameter1.com>',
    logo: 'https://img.packworld.com/files/base/pmmi/pw/pw_logo.png?h=45&auto=format,compress',
  },
  linkOffsite: {
    webinar: 'linkUrl',
    event: 'website',
    target: '_blank',
  },
  mindful: {
    namespace: 'pmmi/default',
    key: 'all',
    websiteAdvertisingChannelId: '654917202e4a2921881de5f8',
  },
  pageDetails,
};
