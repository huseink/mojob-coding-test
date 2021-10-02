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
      text="5 Per Page"
      class="m-md-2"
      variant="outline-dark"
      :lazy="true"
    >
      <b-dropdown-item>First Action</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.btn {
  border: none !important;
}
</style>