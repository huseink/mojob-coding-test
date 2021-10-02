<template>
  <div class="d-flex justify-content-between">
    <b-dropdown
      id="dropdown-1"
      text="Filter By Position"
      class="m-md-2"
      variant="outline-dark"
      :lazy="true"
    >
      <b-dropdown-item>First Action</b-dropdown-item>
    </b-dropdown>
    <b-dropdown
      id="dropdown-1"
      :text="selectedPaginationFilter.text"
      class="m-md-2"
      variant="outline-dark"
      :lazy="true"
    >
      <b-dropdown-item
        v-for="pagination in paginationFilters"
        :key="pagination.pageSize"
        @click="onPaginationChange(pagination)"
      >
        {{ pagination.text }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang='ts'>
import { Pagination } from "@/models/models";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class JobFilter extends Vue {
  @Prop()
  private selectedPaginationFilter!: Pagination;

  private paginationFilters: Pagination[] = [
    {
      page_size: 5,
      text: "5 Per Page",
      use_pagination: true,
    },
    {
      page_size: 25,
      text: "25 Per Page",
      use_pagination: true,
    },
    {
      text: "Display All",
      use_pagination: false,
    },
  ];

  @Emit()
  onPaginationChange(value: Pagination) {
    return value;
  }
}
</script>

<style scoped>
.btn {
  border: none !important;
}
</style>