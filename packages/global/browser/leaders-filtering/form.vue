<template>
  <form name="Category Filters" onsubmit="event.preventDefault()">
    <div class="row" style="padding-bottom: 5px">
      <div class="col-6">
        <button
          id="clear-leaders-filters-button"
          class="btn btn-primary"
          type="submit"
          style="text-wrap: nowrap; font-size: 12px; padding: 5px 12px"
          @click="clearFilters"
        >
          Clear Filters
        </button>
      </div>
    </div>
    <div class="row" style="padding-bottom: 8px">
      <div class="col-12">
        <b style="font-size: 24px">{{ title }}</b>
      </div>
    </div>
    <div v-for="dropdownOption, index in dropdownOptions" :key="index">
      <dropdown
        :index="index"
        :lower-level-sections="dropdownOption.lowerLevelSections"
        :upper-level-section="dropdownOption.upperLevelSection"
      />
    </div>
  </form>
</template>

<script>
import Dropdown from './dropdown.vue';

export default {
  components: {
    Dropdown,
  },
  props: {
    dropdownOptions: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'Categories',
    },
  },
  methods: {
    clearFilters() {
      // eslint-disable-next-line no-restricted-globals
      history.pushState({}, '', `${window.location.origin + window.location.pathname}`);
    },
  },
};
</script>
