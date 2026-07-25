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
  partnerPerspectivesSectionId: 90220,
  // theme configs
  disableNativeSlotTwo: true,
  company: 'PMMI Media Group',
  p1events: {
    tenant: 'pmmi',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'oemmagazine.org' : '',
    engagement: { enabled: true },
  },
  logos: {
    navbar: {
      src: 'https://img.oemmagazine.org/files/base/pmmi/oem/OEM-logo-colored.png?auto=format,compress',
      srcset: [
        'https://img.oemmagazine.org/files/base/pmmi/oem/OEM-logo-colored.png?auto=format,compress&dpr=2 2x',
      ],
      width: '120',
      height: '30',
    },
    footer: {
      src: 'https://img.oemmagazine.org/files/base/pmmi/oem/oem_logo.png?h=35&auto=format,compress',
      srcset: [
        'https://img.oemmagazine.org/files/base/pmmi/oem/oem_logo.png?h=35&auto=format,compress&dpr=2 2x',
      ],
      width: '98',
      height: '35',
    },
    printContent: {
      src: 'https://img.oemmagazine.org/files/base/pmmi/oem/OEM-logo-colored.png?h=45&auto=format,compress',
      srcset: [
        'https://img.oemmagazine.org/files/base/pmmi/oem/OEM-logo-colored.png?h=45&auto=format,compress&dpr=2 2x',
      ],
    },
    corporate: {
      alt: 'PMMI Media Group Logo',
      href: 'https://www.pmmimediagroup.com',
      src: 'https://img.oemmagazine.org/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress',
      srcset: [
        'https://img.oemmagazine.org/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress&dpr=2 2x',
      ],
      width: '83',
      height: '40',
    },
  },
  socialMediaLinks: [
    { provider: 'twitter', href: 'https://twitter.com/oemmagazine' },
    { provider: 'facebook', href: 'https://www.facebook.com/OEMMagazine' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/showcase/oem-magazine' },
    { provider: 'youtube', href: 'https://www.youtube.com/channel/UCFTwxWPoHELvYMYBa-ZES4A?utm_source=OEMWebsite&utm_campaign=OEMYouTube' },
  ],
  gtm: {
    containerId: process.env.GTM_CONTAINER_ID || 'GTM-M596Q98',
    slotPrefix: 'oem',
  },
  ga4: {
    propertyId: '316595702',
  },
  gcse: {
    id: '003355913687346718228:znjzr8aiziw',
  },
  wufoo: {
    userName: 'pmmimediagroup',
  },
  newsletters: {
    subscribeLink: '',
  },
  magazines: {
    description: 'Geared toward professionals who design and build machinery for packaging and processing, as well as related equipment including plastics processing, converting, and materials handling. Each quarterly issue has content targeted specifically to professionals in engineering, manufacturing, operations, field service and executive management.',
  },
  inquiry: {
    ...sharedInquiryConfig,
    sendFrom: 'OEM Magazine <noreply@parameter1.com>',
    logo: 'https://img.oemmagazine.org/files/base/pmmi/oem/oem_logo.png?h=45&auto=format,compress',
  },
  linkOffsite: {
    webinar: 'linkUrl',
    event: 'website',
    target: '_blank',
  },
  mindful: {
    namespace: 'pmmi/default',
    key: 'all',
    websiteAdvertisingChannelId: '654917202e4a2921881de5f4',
  },
};
