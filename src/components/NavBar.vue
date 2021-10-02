<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand>
        <router-link to="/">
          <img src="../assets/mojob_logo.svg" alt="Mojob Logo" width="130" />
        </router-link>
      </b-navbar-brand>
      |
      <b-navbar-nav>
        <b-nav-item to="/" active-class="active" exact>Home</b-nav-item>
        <b-nav-item to="/about" active-class="active">About</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<style>
.active {
  color: #46bbb3!important;
  font-weight: 600!important;
}
</style>