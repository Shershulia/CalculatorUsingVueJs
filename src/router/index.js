import { createRouter, createWebHistory } from "vue-router";
import CalculatorView from "../views/CalculatorView.vue";
import ContactView from "../views/ContactView.vue";


const routes = [
  {
    path: "/",
    name: "CalculatorView",
    component: CalculatorView,
  },
  {
    path: "/kontaktskjema",
    name: "ContactView",
    component: ContactView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
