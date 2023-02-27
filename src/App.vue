<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import Navbar from "./Components/Navbar.vue";
import LoginView from "./Views/LoginView.vue";
const auth = ref(false);
const toggleAuth = () => {
  auth.value = !auth.value;
};
</script>

<template>
  <div class="vh-100">
    <div v-if="!auth">
      <LoginView :toggleAuth="toggleAuth" />
    </div>
    <div v-else>
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
div {
  background: #282828;
}
</style>
