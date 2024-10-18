const defaults = {
  disabled: process.env.DISABLE_IDX_NEWSLETTER_SIGNUP === 'true',
  name: 'Join thousands of your peers!',
  description: 'Packaging intelligence and updates from <strong>Packaging World</strong> delivered to your inbox.',
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/pmmi/all/image/static/newsletter-pushdown/pw-iphone-Cropped.png',
  },

  signupBanner: {
    ...defaults,
    name: 'You\'re Invited!',
    description: 'Don\'t miss your weekly dose of packaging intelligence and news with <strong>Packaging World\'s</strong> e-newsletter.',
    imagePath: 'files/base/pmmi/all/image/static/newsletter-pushdown/pw-iphone.png',
  },
  signupBannerLarge: {
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    name: 'Packaging World Newsletter',
    description: 'The go-to source for packaging professionals looking for <strong>breaking news, industry trends and best practices.</strong>',
  },
  modal: {
    ...defaults,
    enabled: false,
    cookieValueToMatch: 1,
    name: 'Packaging World Newsletter',
    description: 'The go-to source for packaging professionals looking for <strong>breaking news, industry trends and best practices.</strong>',
  },
  signupBannerStatic: {
    ...defaults,
    name: 'You\'re Invited!',
    description: 'Don\'t miss your weekly dose of packaging intelligence and news with <strong>Packaging World\'s</strong> e-newsletter.',
  },
};
