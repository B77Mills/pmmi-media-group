const configure = require('@pmmi-media-group/package-global/config/omeda-identity-x');
const omedaConfig = require('./omeda');
const idxConfig = require('./identity-x');

module.exports = configure({
  omedaConfig,
  idxConfig,
  websiteBehaviorAttributeId: 199632,
  omedaPromoCodePrefix: 'PFW',
});
