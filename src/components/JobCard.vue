<template>
  <b-card text-variant="dark" title="Position Title" class="job-card">
    <b-card-text class="job-card-text text-muted">
      <span>Company displayed name</span>
      <span class="divider">•</span>
      <span>Position function</span>
      <span class="divider">•</span>
      <span>Due date</span>
    </b-card-text>
  </b-card>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class JobCard extends Vue {}
</script>

<style scoped>
.job-card {
    margin-top:1rem;
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
  margin-left: 5px;
  margin-right: 5px;
}
.rounded-border {
  border-radius: 220px !important;
}
</style>