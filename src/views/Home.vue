<template>
  <div class="home">
    <b-container>
      <job-filter
        :selectedPaginationFilter="selectedPaginationFilter"
        @on-pagination-change="handlePaginationChange"
      />
      <div v-if="jobListings.length > 0">
        <job-feed
          :job-listings="jobListings"
          :position-functions="positionFunctionFilters"
        />
      </div>
      <div v-else>
        <b-spinner></b-spinner>
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

  private selectedPaginationFilter: Pagination = {
    page_size: 5,
    text: "5 Per Page",
    use_pagination: true,
  };

  /**
   * Here you can do necessary request to our
   * public test-API in order to retrieve a list of job listings and a list of
   * position function filters.
   *
   * You can test the endpoints and see the documentation at:
   * https://test-api.mojob.io/public/docs/
   *
   * @private
   */
  private async mounted() {
    // Here is an example on how to retrieve job position function filters
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

  private handlePaginationChange(pagination: Pagination) {
    this.selectedPaginationFilter = pagination;
    if (this.mojobApi) {
      this.fetchJobListings(this.mojobApi, this.selectedPaginationFilter);
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

  private async fetchJobListings(api: BaseApi, pagination: Pagination) {
    this.jobListings = [];
    if (pagination.use_pagination) {
      const jobListingsResponsePage: IPage<JobListing> =
        await api.getPagedJobListings(pagination);
      if (jobListingsResponsePage.results) {
        this.jobListings = jobListingsResponsePage.results;
      } else {
        console.log("Failed loading job listings");
      }
    } else {
      const jobListingsResponse: JobListing[] = await api.getAllJobListings();

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
