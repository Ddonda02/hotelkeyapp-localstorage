import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueGoodTablePlugin from "vue-good-table";

// import the styles
import "vue-good-table/dist/vue-good-table.css";

const app = createApp(App);

app.use(VueGoodTablePlugin);

app.use(router);

app.mount("#app");
