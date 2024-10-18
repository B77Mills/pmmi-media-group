module.exports = {
  title: 'Content Download',
  anonymousCta: 'Register to download this document, gain access to premium content, and more.',
  authenticatedCta: 'Fill out the form below to download this document.',
  fieldRows: [
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
    // Row 2
    [
      {
        label: 'Email Address',
        key: 'email',
        type: 'built-in',
        required: true,
        width: 1,
      },
    ],
    // Row 3
    [
      {
        label: 'Company Name',
        key: 'organization',
        type: 'built-in',
        required: true,
        width: 0.5,
      },
      {
        label: 'Phone Number',
        key: 'phoneNumber',
        type: 'built-in',
        required: true,
        width: 0.5,
      },
    ],
    // Row 4
    [
      {
        label: 'Country',
        key: 'countryCode',
        type: 'built-in',
        required: true,
        width: 0.33,
      },
      {
        label: 'State/Province',
        key: 'regionCode',
        type: 'built-in',
        required: false,
        width: 0.33,
      },
      {
        label: 'ZIP Code',
        key: 'postalCode',
        type: 'built-in',
        required: false,
        width: 0.33,
      },
    ],
  ],
};
