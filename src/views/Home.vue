<template>
  <div class="home">
    <b-container>
      <job-filter
        v-if="positionFunctionFilters.length > 0"
        :position-functions="positionFunctionFilters"
        :selectedPaginationFilter="selectedPaginationFilter"
        @on-pagination-change="handlePaginationChange"
        @on-position-function-select="handlePositionFunctionSelect"
        @on-position-function-de-select="handlePositionFunctionDeSelect"
      />
      <div v-if="jobListings.length > 0">
        <job-feed :job-listings="jobListings" />
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import JobFeed from "@/components/JobFeed.vue";
import JobFilter from "@/components/JobFilter.vue";
import BaseApi from "@/api-requests/api";
import {
  IPage,
  JobListing,
  Pagination,
  PositionFunction,
} from "@/models/models";

@Component({
  components: {
    JobFeed,
    JobFilter,
  },
})
export default class Home extends Vue {
  private mojobApi: BaseApi | null = null;
  private positionFunctionFilters: PositionFunction[] = [];
  private jobListings: JobListing[] = [];
  private positionFunctionIds: Number[] = [];

  private selectedPaginationFilter: Pagination = {
    page_size: 5,
    text: "5 Per Page",
    use_pagination: true,
  };

  private async mounted() {
    this.mojobApi = new BaseApi(
      "https://test-api.mojob.io/public/",
      this.axios
    );
    try {
      this.fetchPositionFunctions(this.mojobApi);
      this.fetchJobListings(this.mojobApi, this.selectedPaginationFilter);
    } catch (e) {
      console.log(e);
    }
  }

  // Fires when page size is changed from pagination filter menu
  private handlePaginationChange(pagination: Pagination) {
    this.selectedPaginationFilter = pagination;
    if (this.mojobApi) {
      this.fetchJobListings(this.mojobApi, this.selectedPaginationFilter);
    }
  }

  // Fires when a position function is selected from position function filter menu
  private handlePositionFunctionSelect(positionFunction: PositionFunction) {
    if (this.mojobApi) {
      // Push the selected position function id to currenlty selected ids
      if (positionFunction && positionFunction.id) {
        this.positionFunctionIds.push(positionFunction.id);
      }
      this.fetchJobListings(
        this.mojobApi,
        this.selectedPaginationFilter,
        this.positionFunctionIds
      );
    }
  }

  // Fires when a position function is deselected (removed) from position function filter menu
  private handlePositionFunctionDeSelect(positionFunction: PositionFunction) {
    if (this.mojobApi) {
      // Filter the deselected id from selected position ids array
      const filteredFunctionIds: Number[] = [];
      this.positionFunctionIds.forEach((id) => {
        if (id !== positionFunction.id) {
          filteredFunctionIds.push(id);
        }
      });
      this.positionFunctionIds = filteredFunctionIds;
      this.fetchJobListings(
        this.mojobApi,
        this.selectedPaginationFilter,
        filteredFunctionIds
      );
    }
  }

  private async fetchPositionFunctions(api: BaseApi) {
    const positionFunctionsResponsePage: IPage<PositionFunction> =
      await api.getPositionFunctions();

    if (positionFunctionsResponsePage.results) {
      this.positionFunctionFilters = positionFunctionsResponsePage.results;
    } else {
      console.log("Failed loading position function filters");
    }
  }

  private async fetchJobListings(
    api: BaseApi,
    pagination: Pagination,
    positionFunctionIdsFilter?: Number[]
  ) {
    // Fetch with pagination
    if (pagination.use_pagination) {
      const jobListingsResponsePage: IPage<JobListing> =
        await api.getPagedJobListings(pagination, positionFunctionIdsFilter);
      if (
        jobListingsResponsePage.results &&
        jobListingsResponsePage.results.length > 0
      ) {
        this.jobListings = jobListingsResponsePage.results;
      } else {
        console.log("Failed loading job listings");
      }
    } else {
      // Fetch without pagination
      const jobListingsResponse: JobListing[] = await api.getAllJobListings(
        positionFunctionIdsFilter
      );
      if (jobListingsResponse && jobListingsResponse.length > 0) {
        this.jobListings = jobListingsResponse;
      } else {
        console.log("Failed loading job listings");
      }
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #fafdfd;
}
.container {
  padding: 2rem 0;
}
</style>
