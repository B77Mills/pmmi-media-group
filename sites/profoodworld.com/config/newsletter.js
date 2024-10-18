const defaults = {
  disabled: process.env.DISABLE_IDX_NEWSLETTER_SIGNUP === 'true',
  name: 'Join thousands of your peers!',
  description: 'Food and beverage packaging intelligence and updates from <strong>ProFood World</strong> delivered to your inbox.',
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/pmmi/all/image/static/newsletter-pushdown/pfw-iphone-Cropped.png',
  },

  signupBanner: {
    ...defaults,
    name: 'You\'re Invited!',
    description: 'Don\'t miss your weekly dose of packaging intelligence and news with <strong>ProFood World\'s</strong> e-newsletter.',
    imagePath: 'files/base/pmmi/all/image/static/newsletter-pushdown/pfw-iphone.png',
  },
  signupBannerLarge: {
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    name: 'ProFood World Newsletter',
    description: 'The go to source for processing and packaging professionals looking for <strong>breaking news, industry trends and best practices</strong>.',
  },
  modal: {
    ...defaults,
    enabled: false,
    cookieValueToMatch: 1,
    name: 'ProFood World Newsletter',
    description: 'The go to source for processing and packaging professionals looking for <strong>breaking news, industry trends and best practices</strong>.',
  },
  signupBannerStatic: {
    ...defaults,
    name: 'You\'re Invited!',
    description: 'Don\'t miss your weekly dose of packaging intelligence and news with <strong>ProFood World\'s</strong> e-newsletter.',
  },
  contentRailBanner: {
    ...defaults,
    name: ' ',
    description: 'Thanks for stopping by! Get our top stories delivered daily by subscribing.',
  },
};
