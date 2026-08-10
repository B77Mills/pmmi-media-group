const configureIdentityX = require('@pmmi-media-group/package-global/config/identity-x');
const formDefault = require('@pmmi-media-group/package-global/config/identity-x/default');

module.exports = configureIdentityX({
  booleanQuestionsLabel: 'Elige tus suscripciones:',
  appId: '5e28a4c858e67b86c955ae4d',
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
        label: '¿En qué industria se concentran tus productos?',
        id: '6297a1f0650fd84a97efed81',
        type: 'custom-select',
        required: true,
        width: 0.5,
      },
      {
        label: '¿Está usted interesado en o involucrado en alguna de las siguientes iniciativas en su compañía?',
        id: '6a79e2675e8decf57dd8d1f3',
        type: 'custom-select',
        required: true,
        width: 0.5,
      },
    ],
  ],
  defaultFieldLabels: {
    givenName: 'Nombre',
    familyName: 'Apellido(s)',
    organization: 'Compañía',
    organizationTitle: 'Nombre de tu cargo',
    country: 'País',
    region: 'Estado',
    postalCode: 'Código Postal',
    addressBlockLabel: 'Dirección',
  },
  gtmUserFields: {
    primary_business: '6297a1f0650fd84a97efed81',
  },
  forms: {
    default: formDefault,
  },
});
