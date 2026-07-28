const configureIdentityX = require('@pmmi-media-group/package-global/config/identity-x');
const formDefault = require('@pmmi-media-group/package-global/config/identity-x/default');

module.exports = configureIdentityX({
  appId: '5e28a4ba58e67b867055ae4c',
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
    //     id: '62979a481f9729aafe3288cd',
    //     type: 'custom-select',
    //     required: true,
    //     width: 0.5,
    //   },
    //   {
    //     label: 'Company Initiatives',
    //     id: '',
    //     type: 'custom-select',
    //     required: true,
    //     width: 0.5,
    //   },
    // ],
  ],
  gtmUserFields: {
    primary_business: '62979a481f9729aafe3288cd',
  },
  forms: {
    default: formDefault,
  },
});
