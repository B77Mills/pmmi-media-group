<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="results.nodes && results.nodes.length">
    <div class="page-wrapper page-wrapper--no-padding-x">
      <div class="page-wrapper__section">
        <div
          class="
          node-list
          node-list--directory-section-feed
          node-list--flush-x
          node-list--inner-justified"
        >
          <div class="node-list__nodes">
            <div
              v-for="(node, index) in results.nodes"
              :key="index"
              class="node-list__node"
            >
              <div
                v-if="node.type === 'company'"
                class="section-feed-content-node section-feed-content-node--company-content-type"
              >
                <div class="section-feed-content-node__contents">
                  <div class="section-feed-content-node__body">
                    <h5 class="section-feed-content-node__content-short-name">
                      <a
                        :href="node.siteContext.path"
                      >{{ node.shortName }}</a>
                    </h5>
                    <div class="section-feed-content-node__content-teaser">
                      <a
                        :href="node.siteContext.path"
                        v-html="node.teaser"
                      />
                    </div>
                    <ul style="margin-left: -25px">
                      <li
                        v-for="(schedule, scheduleIndex) in node.websiteSchedules
                          .filter(
                            (schedule) =>
                              String(schedule.section.site.id) === siteId
                              && schedule.section.alias.match(leadersAlias)
                              && schedule.section.alias !== leadersAlias)
                          .map((schedule) => schedule.section)
                          .map((category) => category.fullName.replace(/.+? \>/, '').trim())"
                        :key="scheduleIndex"
                      >
                        <b class="section-feed-content-node__content-categories-listed-in">
                          {{ schedule }}
                        </b>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="section-feed-content-node__image-wrapper">
                  <a v-if="node.primaryImage" :href="node.siteContext.path"><img
                    :src="buildImgixUrl(node.primaryImage.src)"
                    :data-src="buildImgixUrl(node.primaryImage.src)"
                    :data-srcset="buildImgixUrl(node.primaryImage.src) + '2x'"
                    class="section-feed-content-node__image ls-is-cached lazyloaded"
                    :alt="node.primaryImage.alt"
                    :srcset="buildImgixUrl(node.primaryImage.src) + '2x'"
                  ></a>
                </div>
              </div>
              <div
                v-else-if="node.type === 'contact'"
                class="section-feed-content-node section-feed-content-node--contact-content-type"
              >
                <div class="section-feed-content-node__contents">
                  <div class="section-feed-content-node__body">
                    <h5 class="section-feed-content-node__content-short-name">
                      <a
                        :href="node.siteContext.path"
                      >{{ node.shortName }}</a>
                    </h5>
                    <div v-if="node.websiteDeck">
                      {{ node.websiteDeck }}
                    </div>
                    <div v-if="node.priorCompanies">
                      <b>Prior Companies:</b> {{ node.priorCompanies }}
                    </div>
                    <div v-if="node.cityStateZip">
                      <b>Location:</b> {{ node.cityStateZip }}
                    </div>
                    <div
                      v-if="node.websiteSchedules
                        && node.websiteSchedules
                          .filter(
                            (schedule) =>
                              String(schedule.section.site.id) === siteId
                              && schedule.section.alias.match(leadersAlias)
                              && schedule.section.alias !== leadersAlias).length
                      "
                    >
                      <b>Core Capabilities:</b>
                    </div>
                    <ul style="margin-left: -25px">
                      <li
                        v-for="(schedule, scheduleIndex) in node.websiteSchedules
                          .filter(
                            (schedule) =>
                              String(schedule.section.site.id) === siteId
                              && schedule.section.alias.match(leadersAlias)
                              && schedule.section.alias !== leadersAlias)
                          .map((schedule) => schedule.section)
                          .map((category) => category.fullName.replace(/.+? \> .+? \>/, '').trim())"
                        :key="scheduleIndex"
                      >
                        <b class="section-feed-content-node__content-categories-listed-in">
                          {{ schedule }}
                        </b>
                      </li>
                    </ul>
                    <div>
                      <a
                        href="https://pmmimediagroup.wufoo.com/forms/subz0ty0ncvx9s/"
                        :title="`Connect with ${node.shortName}`"
                        target="_blank"
                        class="btn btn-primary"
                        rel="noopener"
                      >
                        Connect »
                      </a>
                    </div>
                  </div>
                </div>
                <div class="section-feed-content-node__image-wrapper">
                  <a v-if="node.primaryImage" :href="node.siteContext.path"><img
                    :src="buildImgixUrl(node.primaryImage.src)"
                    :data-src="buildImgixUrl(node.primaryImage.src)"
                    :data-srcset="buildImgixUrl(node.primaryImage.src) + '2x'"
                    class="section-feed-content-node__image ls-is-cached lazyloaded"
                    :alt="node.primaryImage.alt"
                    :srcset="buildImgixUrl(node.primaryImage.src) + '2x'"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="results.pageInfo" class="marko-web-search-pagination-controls">
          <button
            v-if="results.pageInfo.hasPreviousPage"
            class="btn btn-primary marko-web-search-pagination-controls__prev"
            @click="handlePaginationClick(results.pageInfo, 'Prev')"
          >
            Previous Page
          </button>
          <button
            v-if="results.pageInfo.hasNextPage"
            class="btn btn-primary marko-web-search-pagination-controls__next"
            @click="handlePaginationClick(results.pageInfo, 'Next')"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    defaultAssignedToWebsiteSectionIds: {
      type: Array,
      required: true,
    },
    siteId: {
      type: String,
      required: true,
    },
    incomingAssignedToWebsiteSectionIds: {
      type: Array,
      default: () => [],
    },
    incomingCursorDirection: {
      type: String,
      default: 'AFTER',
    },
    incomingCursorValue: {
      type: String,
      default: '',
    },
    leadersAlias: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      default: 'COMPANY',
    },
  },
  data: () => ({
    results: {},
  }),
  async mounted() {
    window.addEventListener('change', async (event) => {
      if (event.target.name === 'category') {
        const searchParams = new URLSearchParams(window.location.search);
        const assignedToWebsiteSectionIdsAsString = searchParams.get('assignedToWebsiteSectionIds');
        if (assignedToWebsiteSectionIdsAsString) {
          const assignedToWebsiteSectionIds = assignedToWebsiteSectionIdsAsString.split(',').map((v) => Number(v));
          const url = new URL(window.location.href);
          url.searchParams.set('cursorDirection', '');
          url.searchParams.set('cursorValue', '');
          // eslint-disable-next-line no-restricted-globals
          history.pushState({}, '', url);
          this.results = {};
          this.results = await this.load(assignedToWebsiteSectionIds);
        } else {
          this.results = {};
          this.results = await this.load(this.defaultAssignedToWebsiteSectionIds);
        }
      }
    });
    window.addEventListener('click', async (event) => {
      if (event.target.id === 'clear-leaders-filters-button') {
        const checkboxes = document.forms['Category Filters'].category;
        const checkedBoxes = Array.from(checkboxes).filter((category) => category.checked);
        checkedBoxes.forEach((checkedBox) => {
          const checkboxElement = document.getElementById(checkedBox.id);
          checkboxElement.checked = false;
        });
        const url = new URL(window.location.href);
        url.search = '';
        // eslint-disable-next-line no-restricted-globals
        history.pushState({}, '', url);
        this.results = {};
        this.results = await this.load(this.defaultAssignedToWebsiteSectionIds);
      }
    });
    this.results = await this.load();
  },
  methods: {
    async load(assignedToWebsiteSectionIds, cursorDirection, cursorValue) {
      const finalizedAssignedToWebsiteSectionIds = () => {
        if (assignedToWebsiteSectionIds) {
          return assignedToWebsiteSectionIds;
        } if (this.incomingAssignedToWebsiteSectionIds.length) {
          return this.incomingAssignedToWebsiteSectionIds;
        }
        return this.defaultAssignedToWebsiteSectionIds;
      };
      const view = this.siteId === '5d0a748572c1aa35008b4567' ? 'mundo' : 'main';
      const query = `
        query {
          postInterfaceSearchConnectionUsingLegacyWebsiteParams(
          view: "${view}",
          assignedToWebsiteSectionIds: ${JSON.stringify(finalizedAssignedToWebsiteSectionIds())},
          contentTypes: ["${this.contentType}"],
          sortField: NAME,
          sortOrder: ASC,
          cursorDirection: ${cursorDirection || this.incomingCursorDirection || 'AFTER'},
          cursorValue: "${cursorValue || this.incomingCursorValue || ''}",
          limit: 4,
          ) {
            edges {
              node {
                _id
                integerId
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          }
        }
      `;
      const response = await fetch('https://graphql.mindfulcms.com/query', {
        body: JSON.stringify({ query }),
        headers: {
          'content-type': 'application/json',
          'x-namespace': 'pmmi/default',
        },
        method: 'POST',
      });
      const responseJson = await response.json();
      const { data } = responseJson;
      const {
        edges,
        pageInfo,
        totalCount,
      } = data.postInterfaceSearchConnectionUsingLegacyWebsiteParams;
      const ids = edges.map((edge) => edge.node.integerId);
      if (!edges.length) return { nodes: [], pageInfo, totalCount };
      const completeDataQuery = `
        query {
          allContent(input: { ids: [${ids.join(',')}], pagination: { limit: ${
  ids.length
} } }) {
            edges {
              node {
                id
                type
                shortName
                labels
                teaser(input: { useFallback: false, maxLength: null })
                siteContext {
                  path
                }
                company {
                  id
                  name
                  canonicalPath
                }
                primarySection {
                  id
                  name
                  fullName
                  canonicalPath
                }
                primaryImage {
                  id
                  src(input: { options: { auto: "format,compress", q: 70 } })
                  alt
                  isLogo
                }
                ... on Addressable {
                  address1
                  address2
                  cityStateZip
                  city
                  state
                  country
                }
                ... on Contactable {
                  phone
                  tollfree
                  website
                }
                ... on ContentContact {
                  websiteDeck
                  priorCompanies: customAttribute(input: { path: "priorCompanies" })
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
              }
            }
          }
        }
      `;
      const completeDataResponse = await fetch(
        'https://graphql.tauron.compat.mindfulcms.com/',
        {
          body: JSON.stringify({ query: completeDataQuery }),
          headers: {
            'content-type': 'application/json',
            'x-tenant-key': this.siteId === '5d0a748572c1aa35008b4567' ? 'pmmi_mundo' : 'pmmi_all',
            'x-site-id': this.siteId,
          },
          method: 'POST',
        },
      );
      const completeDataResponseJson = await completeDataResponse.json();
      const { data: dataFromWeb } = completeDataResponseJson;
      const nodes = dataFromWeb.allContent.edges
        .map((edge) => (edge && edge.node ? edge.node : null))
        .filter((c) => c);
      const map = nodes.reduce(
        (m, node) => m.set(`${node.id}`, node),
        new Map(),
      );
      const ordered = ids.map((id) => map.get(`${id}`)).filter((node) => node);
      return { nodes: ordered, pageInfo, totalCount };
    },
    buildImgixUrl(imageSrc) {
      try {
        const url = new URL(imageSrc);
        const searchParams = new URLSearchParams();
        searchParams.set('w', '250');
        searchParams.set('h', '167');
        searchParams.set('fit', 'fill');
        searchParams.set('auto', 'format,compress');
        searchParams.set('q', '70');
        url.search = searchParams;
        return url.toString();
      } catch (e) {
        return imageSrc;
      }
    },
    async handlePaginationClick(pageInfo, controlDirection) {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.searchParams);
      const assignedToWebsiteSectionIdsAsString = searchParams.get('assignedToWebsiteSectionIds');
      const assignedToWebsiteSectionIds = assignedToWebsiteSectionIdsAsString ? assignedToWebsiteSectionIdsAsString.split(',').map((v) => Number(v)) : null;
      if (controlDirection === 'Prev') {
        searchParams.set('cursorDirection', 'BEFORE');
        searchParams.set('cursorValue', pageInfo.startCursor);
        url.search = searchParams;
        // eslint-disable-next-line no-restricted-globals
        history.pushState({}, '', url);
        this.results = {};
        this.results = await this.load(assignedToWebsiteSectionIds, 'BEFORE', pageInfo.startCursor);
      } else if (controlDirection === 'Next') {
        searchParams.set('cursorDirection', 'AFTER');
        searchParams.set('cursorValue', pageInfo.endCursor);
        url.search = searchParams;
        // eslint-disable-next-line no-restricted-globals
        history.pushState({}, '', url);
        this.results = {};
        this.results = await this.load(assignedToWebsiteSectionIds, 'AFTER', pageInfo.endCursor);
      }
    },
  },
};
</script>
