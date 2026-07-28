const configureIdentityX = require('@pmmi-media-group/package-global/config/identity-x');
const formDefault = require('@pmmi-media-group/package-global/config/identity-x/default');

module.exports = configureIdentityX({
  appId: '5e28a49458e67b68f255ae49',
  /**
   * @type {import('@mindful-web/marko-web-identity-x').CustomColumnDefinition[][]}
   * */
  requiredCreateFieldRows: [
    [
      {
        label: 'First Name',
        key: 'givenName',
        type: 'built-in',
        required: true,
        width: 0.5,
      },
      {
        label: 'Last Name',
        key: 'familyName',
        type: 'built-in',
        required: true,
        width: 0.5,
      },
    ],
    [
      {
        label: 'Company Website URL',
        id: '6a0cafaa74dcb4dd7466ee4c',
        type: 'custom-text',
        required: true,
        width: 0.5,
      },
      {
        label: 'Country',
        key: 'countryCode',
        type: 'built-in',
        required: true,
        width: 0.5,
      },
    ],
    [
      {
        label: 'Primary Industry or Product',
        id: '62979e4f650fd867b7efed67',
        type: 'custom-select',
        required: true,
        width: 0.5,
      },
      {
        label: 'Company Initiatives',
        id: '62979ec0650fd8b42fefed69',
        type: 'custom-select',
        required: true,
        width: 0.5,
      },
    ],
  ],
  gtmUserFields: {
    primary_business: '62979e4f650fd867b7efed67',
  },
  forms: {
    default: formDefault,
  },
});
