const configureIdentityX = require('@pmmi-media-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APP_ID || '5e28a4a058e67b7fad55ae4a',
  gtmUserFields: {
    primary_business: '6217a41713ad4d403ec58775',
  },
});
