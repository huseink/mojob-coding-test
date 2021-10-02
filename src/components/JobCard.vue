<template>
  <b-card text-variant="dark" :title="jobListing.job.title" class="job-card">
    <b-card-text class="job-card-text text-muted">
      <span>{{ jobListing.job.unit.display_name }}</span>
      <span class="divider">•</span>
      <span>{{ jobListing.job.position_function.name_en }}</span>
      <span class="divider">•</span>
      <span>{{ jobListing.job.due_date | formatDate }}</span>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import { JobListing } from "@/models/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class JobCard extends Vue {
  @Prop({ default: () => [], type: Object as () => JobListing })
  private jobListing!: JobListing;
}
</script>

<style scoped>
.job-card {
  margin-top: 1rem;
  padding: 0.5rem;
  text-align: left;
  background-color: #ffffff !important;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05), 0px 1px 10px rgba(0, 0, 0, 0.08),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 1rem !important;
}
.job-card-text {
  font-weight: 300;
}
.divider {
  color: #757575;
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
}
.rounded-border {
  border-radius: 220px !important;
}
</style>