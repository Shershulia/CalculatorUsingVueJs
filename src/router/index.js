import { createRouter, createWebHistory } from "vue-router";
import CalculatorView from "../views/CalculatorView.vue";
import ContactView from "../views/ContactView.vue";
import LoginVue from "../views/LoginVue.vue";
import store from "../store";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "CalculatorView",
    component: CalculatorView,
    beforeEnter: checkAuth,
  },
  {
    path: "/kontaktskjema",
    name: "ContactView",
    component: ContactView,
    beforeEnter: checkAuth,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "LoginVue",
    component: LoginVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
function checkAuth(to, from, next) {
  if (store.state.isAuth) next();
  else next("/login");
}

export default router;
