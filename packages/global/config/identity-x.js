const IdentityXConfiguration = require('@mindful-web/marko-web-identity-x/config');
const newrelic = require('newrelic');
const googleAuth = require('./google-auth');

module.exports = ({
  appId,
  requiredServerFields,
  requiredClientFields,
  forms = [],
  booleanQuestionsLabel = 'Choose your subscriptions:',
  ...rest
} = {}) => {
  const config = new IdentityXConfiguration({
    appId,
    forms,
    apiToken: process.env.IDENTITYX_API_TOKEN,
    requiredServerFields,
    requiredClientFields,
    booleanQuestionsLabel,
    onHookError: newrelic.noticeError.bind(newrelic),
    googleAuth,
    ...rest,
  });
  return config;
};
