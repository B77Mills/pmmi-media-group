const NativeXConfiguration = require('@parameter1/base-cms-marko-web-native-x/config');

module.exports = ({
  uri = 'https://delivery.mindfulcms.com/pmmi/default/compat/native-website',
  enabled = true,
} = {}) => new NativeXConfiguration(uri, { enabled, tenantKey: 'pmmi' });
