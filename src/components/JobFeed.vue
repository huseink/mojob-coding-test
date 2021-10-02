<template>
  <div class="job-feed">
    <b-container>
      <JobFilter/>
      <JobCard/>
      <JobCard/>
      <JobCard/>
      <JobCard/>
      <JobCard/>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { JobListing, PositionFunction } from '@/models/models';
import JobCard from '@/components/JobCard.vue';
import JobFilter from '@/components/JobFilter.vue';

@Component({
  components: {
    JobCard,
    JobFilter,
  },
})
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  private jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];
}
</script>

<style scoped>
.job-feed {
  background-color: #fafdfd;
}
.container {
  padding: 2rem 0;
}
</style>
