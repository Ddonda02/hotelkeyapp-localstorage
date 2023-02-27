<script setup>
import { RouterLink } from "vue-router";
import Header from "./Header.vue";
</script>

<template>
  <Header />
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-light custom-css">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/home">Home</RouterLink>
          <RouterLink class="nav-link" to="/students">Students</RouterLink>
          <RouterLink class="nav-link" to="/archive">Archive</RouterLink>
          <RouterLink class="nav-link" to="/help">Help</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow: inset 0 -10px 20px -10px rgba(255, 0, 0, 0.5);
}

.custom-css {
  display: flex;
  justify-content: center;
}
</style>
