import { createRouter, createWebHistory } from "vue-router";
import Home from "../Components/Home.vue";
import ArchiveTable from "../Components/archiveTable.vue";
import StudentsTable from "../Components/Table.vue";
import Help from "../Components/Help.vue";
// import home from home.vue edhe mandej i jep 4 rregulla per qdo link te navbarit edhe manipulon ose eme routerlink ose me router.push
// tjetri opsion eshte loginin edhe homw njejt si opsioni i pare mmi qit app.vue me kusht amo mandej me bo me routerView cilen me shfaq

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/students",
      name: "StudentsTable",
      component: StudentsTable,
    },
    {
      path: "/archive",
      name: "ArchiveTable",
      component: ArchiveTable,
    },
    {
      path: "/help",
      name: "help",
      component: Help,
    },
  ],
});

export default router;
