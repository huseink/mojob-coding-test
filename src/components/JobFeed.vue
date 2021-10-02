<template>
  <div class="job-feed">
    <div v-for="job in jobListings" :key="job.id">
      <job-card :jobListing="job" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { JobListing, PositionFunction } from "@/models/models";
import JobCard from "@/components/JobCard.vue";

@Component({
  components: {
    JobCard,
  },
})
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  private jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];
}
</script>
