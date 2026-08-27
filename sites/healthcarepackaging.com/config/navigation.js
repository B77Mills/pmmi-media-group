const privacyPolicy = require('./privacy-policy');
const subscribe = require('./subscribe');
// const leaders = require('./leaders');

const topics = [
  subscribe,
  { href: '/design-materials', label: 'Design & Materials' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/machinery', label: 'Machinery' },
  { href: '/logistics', label: 'Logistics' },
  { href: '/industry-news', label: 'Industry News' },
  { href: '/resources/downloads', label: 'Downloads' },
];

const utilities = [
  { href: 'https://www.pmmimediagroup.com/hcp/healthcare-packaging', label: 'Advertise', target: '_blank' },
  { href: 'https://www.pmmimediagroup.com/hcp/reprints-and-permissions', label: 'Reprints' },
  { href: '/page/hcp-about-us', label: 'About' },
  { href: '/page/hcp-contact-us', label: 'Contact' },
];

const mobileMenu = {
  primary: [
    ...topics,
    { href: '/manufacturing', label: 'Manufacturing' },
  ],
  secondary: [
    subscribe,
    { href: '/events', label: 'Events' },
    { href: '/resources/downloads', label: 'Downloads' },
    { href: '/page/hcp-newsletters', label: 'Newsletters' },
    { href: '/magazine', label: 'Magazine' },
    { href: '/leaders', label: 'Premier Suppliers' },
    { href: '/videos', label: 'Videos' },
    { href: '/podcasts', label: 'Podcasts' },
    { href: 'https://www.pmmi.org/hall-of-fame', label: 'Hall of Fame', target: '_blank' },
    { href: '/webinars', label: 'Webinars' },
    { href: '/supplier-news', label: 'Supplier News' },
    { href: '/partner-perspectives', label: 'Partner Perspectives' },
    // { href: '/page/digital-editions', label: 'Digital,
  ],
};

const desktopMenu = {
  leftCol: {
    items: [
      subscribe,
      ...utilities,
    ],
  },
  middleCol: {
    items: [
      ...topics,
      { href: '/news', label: 'News' },
    ],
  },
  rightCol: {
    items: [
      { href: '/resources/downloads', label: 'Downloads' },
      { href: '/events', label: 'Events' },
      { href: '/magazine', label: 'Magazine' },
      { href: '/page/hcp-newsletters', label: 'Newsletters' },
      { href: '/podcasts', label: 'Podcasts' },
      { href: '/researched-lists', label: 'Researched Lists' },
      { href: '/videos', label: 'Videos' },
      { href: '/webinars', label: 'Webinars' },
      { href: '/partner-perspectives', label: 'Partner Perspectives' },
    ],
  },
  extraCol: {
    label: 'Extras',
    items: [
      { href: 'https://www.pmmi.org/workforce-development/education-partners', label: 'Education', target: '_blank' },
      { href: 'https://www.pmmi.org/hall-of-fame', label: 'Hall of Fame', target: '_blank' },
      { href: '/leaders', label: 'Leaders in Healthcare Packaging' },
      { href: '/supplier-news', label: 'Supplier News' },
      { href: '/manufacturing', label: 'Manufacturing' },
      { href: '/packexpo', label: 'PACK EXPO News' },
    ],
  },
};

module.exports = {
  type: 'navbar-b',
  desktopMenu,
  mobileMenu,
  primary: {
    items: topics,
  },
  secondary: {
    items: [],
  },
  tertiary: {
    items: [],
  },
  user: {
    items: [],
  },
  contexts: [
    {
      when: ['/design-materials'],
      secondary: {
        items: [
          { href: '/design-materials/adherence-delivery', label: 'Adherence/Delivery' },
          { href: '/design-materials/package-design', label: 'Package Design' },
          { href: '/design-materials/materials', label: 'Materials' },
          { href: '/design-materials/medical-device-packaging', label: 'Medical Device/Packaging' },
          { href: '/design-materials/transport-packaging', label: 'Transport Packaging' },
        ],
      },
      tertiary: { items: [] },
      primary: { items: topics },
    },
    {
      when: ['/machinery'],
      secondary: {
        items: [
          { href: '/machinery/packaging-filling', label: 'Packaging/Filling' },
          { href: '/machinery/labeling-printing', label: 'Labeling/Printing' },
          { href: '/machinery/robotics-automation', label: 'Robotics/Automation' },
          { href: '/machinery/inspection', label: 'Inspection' },
          { href: '/machinery/aseptic-sterile', label: 'Aseptic/Sterile' },
        ],
      },
      tertiary: { items: [] },
      primary: { items: topics },
    },
    {
      when: ['/sustainability'],
      secondary: {
        items: [
          { href: '/sustainability/sustainability', label: 'Sustainability' },
          { href: '/sustainability/recyclability', label: 'Recyclability' },
          { href: '/sustainability/reuse-return', label: 'Reuse/Return' },
        ],
      },
      tertiary: { items: [] },
      primary: { items: topics },
    },
    {
      when: ['/logistics'],
      secondary: {
        items: [
          { href: '/logistics/traceability-serialization', label: 'Traceability/Serialization' },
          { href: '/logistics/temp-control-cold-chain', label: 'Temp Control/Cold Chain' },
          { href: '/logistics/supply-chain', label: 'Supply Chain' },
        ],
      },
      tertiary: { items: [] },
      primary: { items: topics },
    },
    {
      when: ['/industry-news'],
      secondary: {
        items: [
          { href: '/industry-news/e-commerce', label: 'E-Commerce' },
          { href: '/industry-news/market-trends', label: 'Market Trends' },
          { href: '/industry-news/pmmi-news', label: 'PMMI News' },
          { href: '/industry-news/quick-hits', label: 'Quick Hits' },
          { href: '/industry-news/regulatory', label: 'Regulatory' },
          { href: '/industry-news/workforce', label: 'Workforce' },
        ],
      },
      tertiary: { items: [] },
      primary: { items: topics },
    },
  ],
  footer: {
    items: [
      { href: '/page/hcp-about-us', label: 'About Us' },
      privacyPolicy,
      { href: '/page/terms-of-use', label: 'Terms of Use' },
      { href: '/site-map', label: 'Site Map' },
    ],
    topics,
    more: [
      subscribe,
      { href: 'https://www.pmmimediagroup.com/hcp/healthcare-packaging', label: 'Advertise', target: '_blank' },
      { href: '/page/hcp-contact-us', label: 'Contact' },
    ],
  },
};
