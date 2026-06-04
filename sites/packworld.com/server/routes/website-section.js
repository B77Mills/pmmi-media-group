const { withWebsiteSection } = require('@mindful-web/marko-web/middleware');
const { asyncRoute } = require('@mindful-web/utils');
const queryFragment = require('@mindful-web/marko-web-theme-monorail/graphql/fragments/website-section-page');
const emergingBrandsFragment = require('@pmmi-media-group/package-global/graphql/fragments/emerging-brands-section-page');
const downloads = require('@pmmi-media-group/package-global/templates/website-section/downloads');
const webinars = require('@pmmi-media-group/package-global/templates/website-section/webinars');
const events = require('@pmmi-media-group/package-global/templates/website-section/events');
const collections = require('@pmmi-media-group/package-global/templates/website-section/collections');
const withTopStoriesBlock = require('@pmmi-media-group/package-global/templates/website-section/with-top-stories-block');
const superCategory = require('@pmmi-media-group/package-global/templates/website-section/super-category');

const { newsletterState } = require('@pmmi-media-group/package-global/middleware/newsletter-state');

const section = require('../templates/website-section');
const advisorNetwork = require('../templates/advisor-network');

module.exports = (app) => {
  app.get('/advancedrecycling', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Advanced Recycling Content: What You Should Know',
    description: 'Advanced recycling, also known as chemical recycling, is making a name for itself within the recycling space. Check out our curated list of content on this topic so you can learn how this method produces materials that are indistinguishable from virgin plastics. You’ll also read how used plastics are recaptured and remanufactured into new plastics and products -- all through advanced recycling.',
    queryParams: {
      // Advanced Recycling
      includeTaxonomyIds: [3199258],
    },
  })));
  app.get('/reusablepackaging', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Reusable Packaging: New & Noteworthy Content',
    description: 'In terms of sustainability, reusable and refillable packaging is making a big splash in working to extend the life of common packaging types. Check out our curated list of content on the topic of reusable packaging in markets like food, personal care, and household goods. See which companies are introducing reusable solutions that work toward a circular economy.',
    queryParams: {
      // Reusable Packaging
      includeTaxonomyIds: [3199269],
    },
  })));

  app.get('/machinery/smart-packaging', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Smart Packaging: New & Noteworthy Content',
    description: 'The stars are aligning on multiple relevant fronts: consumer behavior, legislation, technology, and data management and capacity. This confluence of advancements is slowly but surely unlocking the potential of active, intelligent, connected, and otherwise smart packaging.',
    queryParams: {
      // smart packaging
      includeTaxonomyIds: [3199742],
    },
  })));

  app.get('/packagingrecyclingsummit', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Packaging Recycling Summit: Event Coverage',
    description: '<i>Packaging World’s</i> annual Packaging Recycling Summit (PRS) brings together brands, retailers, packaging suppliers, reprocessors, and material recovery facilities (MRFs) with a goal of promoting collaboration across the circular supply chain. Check out our content from the conference program that aims to examine all links in the value chain, identifying materials that can and will be recycled, and exploring end-use markets for waste.',
    queryParams: {
      // Packaging Recylcing Summit
      includeTaxonomyIds: [3199350],
    },
  })));

  app.get('/pfas', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'PFAS in Packaging: What You Should Know',
    description: 'Check out our collection of content on the topic of PFAS. Per- and polyfluoroalkyl substances (PFAS) are a diverse group of thousands of chemicals used in hundreds of types of products. Read more about what PFAS is, the regulations surrounding the chemicals, and a look at PFAS-free packaging.',
    queryParams: {
      // pfas, PFAS
      includeTaxonomyIds: [3199281, 3199353],
    },
  })));

  app.get('/casestudies-cartoning', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'A Curated Collection of Case Studies: Cartoning',
    description: 'Are you in the market for cartoning equipment and looking for the latest technology and innovations to streamline your packaging operations? Check out our list of case studies featuring cartoners and the unique solutions that these pieces of equipment bring to the companies mentioned here. Learn how the equipment works, what it’s capable of, and which machine is right for your line.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Secondary Packaging > Cartoning
      sectionId: 87571,
      includeLabels: ['Case Study'],
    },
  })));

  app.get('/casestudies-casepacking', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'A Curated Collection of Case Studies: Case Packing',
    description: 'Are you in the market for a case packer and looking for the latest technology and innovations to streamline your packaging operations? Check out our list of case studies featuring case packers and the unique solutions that these pieces of equipment bring to the companies mentioned here. Learn how the equipment works, what it’s capable of, and which machine is right for your line.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Secondary Packaging > Case/Tray Packing
      sectionId: 87573,
      includeLabels: ['Case Study'],
    },
  })));

  app.get('/casestudies-coding/marking', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'A Curated Collection of Case Studies: Coding/Marking',
    description: 'Are you in the market for coding/marking equipment? Want to learn more about the category of equipment and the latest innovations that can help you achieve your packaging goals? Read through our collection of the most recent case studies related to coding, marking, & RFID.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Coding, Printing & Labeling > Coding & Marking
      sectionId: 87569,
      includeLabels: ['Case Study'],
    },
  })));

  app.get('/casestudies-liquidfilling', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'A Curated Collection of Case Studies: Liquid Filling & Capping',
    description: 'Are you in the market for a liquid filler/capper and looking for the latest technology and innovations to streamline your packaging operations? Check out our list of case studies featuring liquid and viscous fillers and the unique solutions that these pieces of equipment bring to the companies mentioned here. Learn how the equipment works, what they\'re capable of, and which machine is right for your line.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Leaders (UNIVERSAL TAXONOMY PW) > Machinery > Filling/capping, liquid and viscous
      sectionId: 87073,
      includeLabels: ['Case Study'],
    },
  })));

  app.get('/casestudies-palletizing', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'A Curated Collection of Case Studies: Palletizing',
    description: 'Are you in the market for a palletizer and looking for the latest technology and innovations to streamline your packaging operations? Check out our list of case studies featuring palletizing and depalletizing equipment and the unique solutions that these pieces of equipment bring to the companies mentioned here. Learn how the equipment works, what it’s capable of, and which machine is right for your line.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Leaders (UNIVERSAL TAXONOMY PW) > Machinery > Palletizing/depalletizing
      sectionId: 87080,
      includeLabels: ['Case Study'],
    },
  })));

  app.get('/paperpackaging', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Exploring Paper Packaging: A Collection of Case Studies',
    description: 'Read our curated content on the topic of paper/wood/organic packaging. Explore what other brands are doing well, popular use cases for this material type, and success product launches.',
    queryParams: {
      // paper packaging
      includeTaxonomyIds: [3199743],
      includeLabels: ['Case Study'],
    },
  })));

  app.get('/multipacking', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Multipacking/Shrink Bundling/Banding: Videos & Articles',
    description: 'Do you want the latest news, case studies, and videos on the topic of multipacking, shrink bundling, and banding? Look no further. Check out our collection of content on this equipment type and get informed, inspired, and educated.',
    queryName: 'website-scheduled-content',
    queryParams: {
      // Secondary Packaging > Multipacking
      sectionId: 87572,
      includeContentTypes: ['Article', 'Video'],
    },
  })));

  app.get('/drupa-2024', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'drupa 2024 Report: How Package Printing’s Ongoing Digital Transformation will Impact Brands',
    editorImage: 'https://img.packworld.com/files/base/pmmi/all/image/static/Matt_Reynolds.png',
    description: '<p>Matt Reynolds | Editor-in-Chief | <i>Packaging World</i></p><p>The pandemic caused an eight-year gap since the last drupa, the world’s largest paper and plastic printing expo. Packaging, including cartonboard, corrugated, labels, and flexible packaging, is becoming the preferred choice as traditional print materials like mailers and magazines shift to digital. The world has changed since 2016, highlighting the importance of digitalization in business. Digitalization speeds up time to market and offers flexibility, with AI playing a significant role in customization and equipment controls at the show.</p><p>Sustainability remains a key trend, with recyclable, monomaterial barrier films featured prominently. E-commerce and D2C have grown significantly since 2016. Companies like SEE and Packsize showcased innovations in digital printing and sustainable packaging for the e-commerce channel. Mass customization and embellishment capabilities have also advanced, with new techniques for high-end cosmetics and spirits packaging.</p><p>What follows is a series of conversations held at drupa about digital printing, digitalized packaging asset software, embellishment, e-comm/D2C/FC/DC, all anchored in how the trend will directly impact brand owners and CPGs.</p>',
    queryParams: {
      // drupa 2024
      includeTaxonomyIds: [3199812, 3199813, 3199814, 3199815],
    },
  })));

  app.get('/researched-lists', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Researched Lists',
    queryParams: {
      // Researched List
      includeTaxonomyIds: [3200288],
    },
  })));

  app.get('/recycling', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Recycling',
    description: 'Read up on the latest news, insights, and solutions that address the complex and timely issue of recycling. Explore topics like advanced recycling, package circularity, recycling rates, sustainable waste management, and more.',
    queryParams: {
      // Recycling
      includeTaxonomyIds: [3201419],
    },
  })));

  app.get('/packagethis', asyncRoute(async (_, res) => res.marko(collections, {
    name: 'Package This: Packaging Machinery Basics',
    description: 'From primary packaging to end-of-line automation, these videos collectively trace the basics of how modern packaging lines transform raw materials into protected, shelf-ready products. These systems illustrate how integrated machinery delivers consistency, efficiency, and scalability across the entire packaging lifecycle.',
    queryParams: {
      includeLabels: ['Machinery Basics'],
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
    description: 'Connect with industry leaders, gain insights into the latest trends, and experience breakthrough technologies in packaging and processing.',
  })));

  app.get('/webinars', asyncRoute(async (_, res) => res.marko(webinars, {
    alias: 'webinars',
    name: 'Webinars',
    description: 'Packaging webinars cover equipment, machinery, design, materials, sustainability, e-commerce, workforce, regulation, innovation, cannabis, & logistics.',
  })));

  app.get('/:alias(WomenInPackaging)', newsletterState(), withWebsiteSection({
    template: withTopStoriesBlock,
    queryFragment,
  }));

  app.get('/:alias(emergingbrands)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment: emergingBrandsFragment,
  }));

  app.get('/:alias(advisor-network)', newsletterState(), withWebsiteSection({
    template: advisorNetwork,
    queryFragment: emergingBrandsFragment,
  }));

  app.get('/:alias(industries/beverage)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
    assignedToWebsiteSectionIds: [
      87582,
      87585,
      87586,
      87587,
      87588,
      87589,
      87590,
      87591,
      87592,
    ],
  }));

  app.get('/:alias(industries/food)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
    assignedToWebsiteSectionIds: [
      87583,
      87593,
      87594,
      87595,
      87596,
      87597,
      87598,
      87599,
      87600,
      87601,
    ],
  }));

  app.get('/:alias(industries/other-packaged-goods)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
    assignedToWebsiteSectionIds: [
      87584,
      87602,
      87603,
      87604,
      87605,
    ],
  }));

  app.get('/:alias(resources/downloads)', newsletterState(), withWebsiteSection({
    template: downloads,
    queryFragment,
  }));

  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: superCategory,
    queryFragment,
  }));
};
