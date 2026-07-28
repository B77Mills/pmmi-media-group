const gql = require('graphql-tag');

const factory = ({ useLinkInjectedBody = false } = {}) => {
  const fragment = gql`
    fragment ContactPageFragment on Content {
      id
      name
      websiteDeck
      labels
      teaser(input: { useFallback: false, maxLength: null })
      body(input: { useLinkInjectedBody: ${useLinkInjectedBody} })
      status
      published
      siteContext {
        path
        canonicalUrl
      }
      company {
        id
        name
        siteContext {
          path
          canonicalUrl
        }
        enableRmi
      }
      taxonomy(input: { type: Category }) {
        edges {
          node {
            id
            name
            hierarchy {
              id
              name
            }
          }
        }
      }
      primarySection {
        id
        name
        alias
        canonicalPath
        hierarchy {
          id
          name
          alias
          canonicalPath
        }
        logo {
          id
          src(input: { options: { auto: "format,compress" } })
        }
      }
      primaryImage {
        id
        src(input: { useCropRectangle: true, options: { auto: "format,compress", q: 70 } })
        cropRectangle {
          width
          height
        }
        alt
        caption
        credit
        isLogo
        cropDimensions {
          aspectRatio
        }
        primaryImageDisplay
      }
      ... on Addressable {
        address1
        address2
        cityStateZip
        country
      }
      ... on Contactable {
        phone
        tollfree
        fax
        website
        title
        mobile
        publicEmail
      }
      ... on SocialLinkable {
        socialLinks {
          provider
          url
          label
        }
      }
      websiteSchedules {
        section {
          id
          name
          fullName
          alias
          site {
            id
          }
        }
      }
      priorCompanies: customAttribute(input: { path: "priorCompanies" })
      externalLinks {
        url
      }
    }
    `;
  fragment.factory = factory;
  return fragment;
};

module.exports = factory();
