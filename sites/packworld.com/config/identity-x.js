const configureIdentityX = require('@pmmi-media-group/package-global/config/identity-x');
const formDefault = require('@pmmi-media-group/package-global/config/identity-x/default');

module.exports = configureIdentityX({
  appId: '5e28a4ad58e67b166155ae4b',
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
    // [
    //   {
    //     label: 'Primary Industry or Product',
    //     id: '6285417ea1be7355b22a8c9e',
    //     type: 'custom-select',
    //     required: true,
    //     width: 0.5,
    //   },
    //   {
    //     label: 'Company Initiatives',
    //     id: '62979d881f972983813288dd',
    //     type: 'custom-select',
    //     required: true,
    //     width: 0.5,
    //   },
    // ],
  ],
  gtmUserFields: {
    primary_business: '6285417ea1be7355b22a8c9e',
  },
  forms: {
    default: formDefault,
  },
});
