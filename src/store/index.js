import { createStore } from "vuex";

export default createStore({
  state: {
    name: "",
    email: "",
  },
  getters: {},
  mutations: {
    SET_NAME(state, event) {
      state.name = event;
    },
    SET_EMAIL(state, event) {
      state.email = event;
    },
  },
  actions: {},
  modules: {},
});
