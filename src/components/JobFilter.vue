<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="w-20">
      <treeselect
        v-model="value"
        :multiple="true"
        :options="positionFunctions"
        :normalizer="normalizer"
        v-on:select="onPositionFunctionSelect"
        v-on:deselect="onPositionFunctionDeSelect"
        :clearable="false"
        placeholder="Filter by position"
      />
    </div>
    <b-dropdown
      id="paginationDropDown"
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
import { Pagination, PositionFunction } from "@/models/models";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

@Component({
  components: {
    Treeselect,
  },
})
export default class JobFilter extends Vue {
  @Prop()
  private selectedPaginationFilter!: Pagination;
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];

  private value = null;

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
  onPositionFunctionSelect(selectedPositionFunction: PositionFunction) {
    return selectedPositionFunction;
  }

  @Emit()
  onPositionFunctionDeSelect(deSelectedPositionFunction: PositionFunction) {
    return deSelectedPositionFunction;
  }

  @Emit()
  onPaginationChange(value: Pagination) {
    return value;
  }

  // Normalize the data from mojob api to match the required structure of the tree filter
  normalizer(node: PositionFunction) {
    return {
      id: node.id,
      label: node.name_en,
      children: node.children,
    };
  }
}
</script>

<style scoped>
.btn {
  border: none !important;
}
::v-deep .vue-treeselect__control {
  border: 1px solid #292b2c !important;
}
::v-deep .vue-treeselect__control-arrow {
  color: #292b2c !important;
}
::v-deep .vue-treeselect__placeholder {
  color: #292b2c !important;
}
.w-20 {
  width: 20% !important;
}
</style>