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
  partnerPerspectivesSectionId: 90222,
  // theme configs
  disableNativeSlotTwo: true,
  company: 'PMMI Media Group',
  p1events: {
    tenant: 'pmmi',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'profoodworld.com' : '',
    engagement: { enabled: true },
  },
  logos: {
    navbar: {
      src: 'https://img.profoodworld.com/files/base/pmmi/pfw/pfw-color.svg?h=30&auto=format,compress',
      srcset: [
        'https://img.profoodworld.com/files/base/pmmi/pfw/pfw-color.svg?h=30&auto=format,compress&dpr=2 2x',
      ],
      width: '77',
      height: '30',
    },
    footer: {
      src: 'https://img.profoodworld.com/files/base/pmmi/pfw/pfw_logo.png?h=35&auto=format,compress',
      srcset: [
        'https://img.profoodworld.com/files/base/pmmi/pfw/pfw_logo.png?h=35&auto=format,compress&dpr=2 2x',
      ],
      width: '90',
      height: '35',
    },
    printContent: {
      src: 'https://img.profoodworld.com/files/base/pmmi/pfw/pfw-color.svg?h=45&auto=format,compress',
      srcset: [
        'https://img.profoodworld.com/files/base/pmmi/pfw/pfw-color.svg?h=45&auto=format,compress&dpr=2 2x',
      ],
    },
    corporate: {
      alt: 'PMMI Media Group Logo',
      href: 'https://www.pmmimediagroup.com',
      src: 'https://img.profoodworld.com/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress',
      srcset: [
        'https://img.profoodworld.com/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress&dpr=2 2x',
      ],
      width: '83',
      height: '40',
    },
  },
  socialMediaLinks: [
    { provider: 'twitter', href: 'https://twitter.com/ProFoodWorld' },
    { provider: 'facebook', href: 'https://www.facebook.com/ProFoodWorld' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/showcase/profoodworld' },
    { provider: 'youtube', href: 'https://www.youtube.com/channel/UCMtji4GViRU_1PfKnVpu2Yw?utm_source=PFWWebsite&utm_campaign=PFWYouTube' },
  ],
  gtm: {
    containerId: process.env.GTM_CONTAINER_ID || 'GTM-MW8Q9VC',
    slotPrefix: 'pfw',
  },
  ga4: {
    propertyId: '316593780',
  },
  gcse: {
    id: '003355913687346718228:spwkpiwssik',
  },
  wufoo: {
    userName: 'pmmimediagroup',
  },
  magazines: {
    description: 'Business-to-business publications for food and beverage processors. Readers will find informed coverage of news, trends, products and technologies in food safety, automation, processing, packaging, material handling and sustainability on the ProFood World website and in ProFood World’s print publication.',
  },
  inquiry: {
    ...sharedInquiryConfig,
    sendFrom: 'ProFood World <noreply@parameter1.com>',
    logo: 'https://img.profoodworld.com/files/base/pmmi/pfw/pfw_logo.png?h=45&auto=format,compress',
  },
  linkOffsite: {
    webinar: 'linkUrl',
    event: 'website',
    target: '_blank',
  },
  mindful: {
    namespace: 'pmmi/default',
    key: 'all',
    websiteAdvertisingChannelId: '654917202e4a2921881de5f6',
  },
  pageDetails,
};
