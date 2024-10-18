const defaults = {
  disabled: process.env.DISABLE_IDX_NEWSLETTER_SIGNUP === 'true',
  name: 'Join thousands of your peers!',
  description: 'Industry intelligence and updates from <strong>Healthcare Packaging</strong> delivered to your inbox.',
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/pmmi/all/image/static/newsletter-pushdown/hcp-iphone-Cropped.png',
  },

  signupBanner: {
    ...defaults,
    name: 'You\'re Invited!',
    description: 'Don\'t miss your weekly dose of packaging intelligence and news with <strong>Healthcare Packaging\'s</strong> e-newsletter.',
    imagePath: 'files/base/pmmi/all/image/static/newsletter-pushdown/hcp-iphone.png',
  },
  signupBannerLarge: {
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    name: 'Healthcare Packaging Newsletter',
    description: 'The go-to source for healthcare packaging professionals looking for <strong>breaking news, industry trends and best practices.</strong>',
  },
  modal: {
    ...defaults,
    enabled: false,
    cookieValueToMatch: 1,
    name: 'Healthcare Packaging Newsletter',
    description: 'The go-to source for healthcare packaging professionals looking for <strong>breaking news, industry trends and best practices.</strong>',
  },
  signupBannerStatic: {
    ...defaults,
    name: 'You\'re Invited!',
    description: 'Don\'t miss your weekly dose of packaging intelligence and news with <strong>Healthcare Packaging\'s</strong> e-newsletter.',
  },
};
