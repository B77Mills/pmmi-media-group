const gql = require('graphql-tag');

module.exports = gql`
fragment ContentPageFragment on Content {
  id
  name
  teaser(input: { useFallback: false, maxLength: null })
  body
  published
  company {
    id
    name
    siteContext {
      path
    }
  }
  taxonomy {
    edges {
      node {
        id
        type
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
  }
  primaryImage {
    id
    src
    alt
    caption
    credit
    isLogo
  }
  images(input:{ pagination: { limit: 100 }, sort: { order: values } }) {
    edges {
      node {
        id
        src
        alt
        displayName
        caption
        credit
      }
    }
  }
  gating {
    surveyType
    surveyId
  }
  ... on ContentVideo {
    embedCode
  }
  ... on ContentNews {
    source
    byline
  }
  ... on ContentEvent {
    ends
    starts
  }
  ... on ContentArticle {
    sidebars
  }
  ... on ContentWebinar {
    linkUrl
    starts
    sponsors {
      edges {
        node {
          id
          name
          siteContext {
            path
          }
        }
      }
    }
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
  ... on ContentCompany {
    email
    isLeader: hasWebsiteSchedule(input: { sectionAlias: "leaders" })
  }
  ... on SocialLinkable {
    socialLinks {
      provider
      url
      label
    }
  }
  ... on Media {
    fileSrc
  }
  ... on Authorable {
    authors {
      edges {
        node {
          id
          name
          type
          siteContext {
            path
          }
        }
      }
    }
    contributors {
      edges {
        node {
          id
          name
          type
          siteContext {
            path
          }
        }
      }
    }
    photographers {
      edges {
        node {
          id
          name
          type
          siteContext {
            path
          }
        }
      }
    }
  }
}
`;
