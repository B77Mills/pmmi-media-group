const configureIdentityX = require('@pmmi-media-group/package-global/config/identity-x');
const formDefault = require('@pmmi-media-group/package-global/config/identity-x/default');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APP_ID || '5e28a4ad58e67b166155ae4b',
  gtmUserFields: {
    primary_business: '6285417ea1be7355b22a8c9e',
  },
  forms: {
    default: formDefault,
  },
});
