const sharedInquiryConfig = require('@pmmi-media-group/package-global/config/inquiry');
const contentMeter = require('@pmmi-media-group/package-global/config/content-meter');
const gam = require('./gam');
const identityX = require('./identity-x');
const leaders = require('./leaders');
const magazine = require('./magazine');
const nativeX = require('./native-x');
const navigation = require('./navigation');
const newsletter = require('./newsletter');
const omeda = require('./omeda');
const omedaIdentityX = require('./omeda-identity-x');
const identityXOptInHooks = require('./identity-x-opt-in-hooks');
const search = require('./search');
const subscribe = require('./subscribe');
const pageDetails = require('./page-details');

module.exports = {
  // module configs
  contentMeter,
  gam,
  identityX,
  useLinkInjectedBody: process.env.USE_LINK_INJECTED_BODY === 'true',
  idxNavItems: { enable: true },
  leaders,
  magazine,
  nativeX,
  navigation,
  newsletter,
  omeda,
  omedaIdentityX,
  identityXOptInHooks,
  search,
  subscribe,
  pageDetails,
  partnerPerspectivesSectionId: 90223,
  // theme configs
  company: 'PMMI Media Group',
  copyrightNotice: 'Todos los derechos reservados.',
  p1events: {
    tenant: 'pmmi',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'www.mundopmmi.com' : '',
    engagement: { enabled: true },
  },
  logos: {
    navbar: {
      src: 'https://img.mundoexpopack.com/files/base/pmmi/mundo/Mundo-EXPO-PACK-R_WEB.svg?h=75&auto=format,compress',
      srcset: [
        'https://img.mundoexpopack.com/files/base/pmmi/mundo/Mundo-EXPO-PACK-R_WEB.svg?h=75&auto=format,compress&dpr=2 2x',
      ],
    },
    footer: {
      src: 'https://img.mundoexpopack.com/files/base/pmmi/mundo/Mundo-EXPO-PACK-R_Rev_WEB.svg?h=35&w=auto&auto=format,compress',
      srcset: [
        'https://img.mundoexpopack.com/files/base/pmmi/mundo/Mundo-EXPO-PACK-R_Rev_WEB.svg?h=35&w=auto&auto=format,compress&dpr=2 2x',
      ],
      width: '88',
      height: '35',
    },
    printContent: {
      src: 'https://img.mundoexpopack.com/files/base/pmmi/mundo/Mundo-fullcolor.svg?h=80&auto=format,compress',
      srcset: [
        'https://img.mundoexpopack.com/files/base/pmmi/mundo/Mundo-fullcolor.svg?h=80&auto=format,compress&dpr=2 2x',
      ],
    },
    corporate: {
      alt: 'PMMI Media Group Logo',
      href: 'https://www.pmmimediagroup.com',
      src: 'https://img.mundoexpopack.com/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress',
      srcset: [
        'https://img.mundoexpopack.com/files/base/pmmi/all/image/static/pmmi-logo.png?h=50&auto=format,compress&dpr=2 2x',
      ],
      width: '83',
      height: '40',
    },
  },
  socialMediaLinks: [
    { provider: 'linkedin', href: 'https://www.linkedin.com/showcase/mundo-pmmi' },
    { provider: 'tiktok', href: 'https://www.tiktok.com/@mundo.expopack' },
    { provider: 'youtube', href: 'https://www.youtube.com/channel/UCM5Ldhqi4SFRIyoGxuJZV3w?utm_source=MundoWebsite&utm_campaign=MundoYouTube' },
  ],
  gtm: {
    containerId: process.env.GTM_CONTAINER_ID || 'GTM-PWZTDXM',
    slotPrefix: 'mundo',
  },
  ga4: {
    propertyId: '316574887',
  },
  gcse: {
    id: '017383739850048358259:ngawhyv_sgi',
  },
  wufoo: {
    userName: 'pmmimediagroup',
  },
  newsletters: {
    subscribeLink: '',
  },
  magazines: {
    description: '',
  },
  inquiry: {
    ...sharedInquiryConfig,
    sendFrom: 'Mundo EXPO PACK <noreply@parameter1.com>',
    logo: 'https://img.mundoexpopack.com/files/base/pmmi/mundo/footerLogos_white.png?h=45&auto=format,compress',
    consentCheckboxes: [
      {
        key: 'privacyConsent',
        label: 'privacyConsent',
        html: '<span class="small">Al enviar este formulario, doy mi consentimiento para que PMMI recopile y almacene mi información, también autorizo para recibir correos electrónicos, así como anuncios publicitarios patrocinados de PMMI Media Group. Confirmo que he leído <a href="https://www.pmmimediagroup.com/articles/privacy-policy" target="_blank" >la política de privacidad de PMMI Media Group </a> y entiendo que puedo cancelar la suscripción u optar por no recibir más informaciones de PMMI Media Group en cualquier momento, y que puedo enviarle a su Director responsable de la protección de la intimidad, al correo <a href="mailto:dataprivacy@pmmi.org">dataprivacy@pmmi.org</a>, cualquier consulta acerca de políticas o prácticas de privacidad.</span>',
        required: true,
      },
      {
        key: 'notificationConsent',
        label: 'notificationConsent',
        html: '<span class="small">Estoy de acuerdo en compartir mi información con y recibir actualizaciones ocasionales de las compañías mencionadas en este artículo.</span>',
        required: true,
      },
      {
        key: 'thirdPartyConsent',
        label: 'thirdPartyConsent',
        html: '<span class="small">Tenga en cuenta que una vez compartida, futuras comunicaciones pueden proceder directamente del patrocinador y no están regidas bajo la política de privacidad de PMMI Media Group.</span>',
        required: true,
      },
    ],
  },
  lang: 'es',
  // productsParams: { alias: 'noticias-de-los-proveedores' },
  completeYourProfileVerbiage: 'Completa tu perfil de Mundo EXPO PACK',
  profileSubmitButtonLabel: 'Enviar',
  linkOffsite: {
    webinar: 'linkUrl',
    event: 'website',
    target: '_blank',
  },
  mindful: {
    namespace: 'pmmi/default',
    view: 'mundo',
    key: 'mundo',
    websiteAdvertisingChannelId: '654917202e4a2921881de5fa',
  },
};
