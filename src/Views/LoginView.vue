<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const { toggleAuth } = defineProps(["toggleAuth"]);

const username = ref("");
const password = ref("");
const router = useRouter();

const handleLoginClick = () => {
  if (username.value === "" || password.value === "") {
    alert("shkruj diqka");
  } else if (username.value !== "diar" && password.value !== "diar123") {
    alert("ska user te till te regjistrum");
  } else {
    toggleAuth();
  }
};
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div
      class="card p-3"
      style="background-color: #808080; color: #fff; width: 400px"
    >
      <!-- <h1 class="text-center mb-4">Login</h1> -->
      <div class="card-header">
        <img
          src="https://as2.ftcdn.net/v2/jpg/02/19/98/93/1000_F_219989372_K1pBzmbiGfoMd6X5JJd5SYOVIBzSUN8f.jpg"
          alt="logo"
        />
        <p>Student Information System</p>
      </div>
      <form>
        <div class="mb-3">
          <label for="username" class="form-label">UserName:</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-outline-light"
          @click="handleLoginClick()"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 90px;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(192, 192, 192, 1) 35%,
    rgba(40, 40, 40, 1) 79%
  );
}
.card-header img {
  height: 80px;
  width: 80px;
}
.btn {
  margin-top: 30px;
}

/* .container {
  background-color: #282828;
  max-width: 100%;
} */
</style>
