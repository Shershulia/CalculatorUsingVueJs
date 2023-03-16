import { createStore as VuexCreateStore } from "vuex";

const storeConfiguration = {
  state: {
    name: "",
    email: "",
    description: "",
    category: "",
    token: "",
    isAuth: false,
    timer: null,
  },
  getters: {},
  mutations: {
    SET_NAME(state, event) {
      state.name = event;
    },
    SET_EMAIL(state, event) {
      state.email = event;
    },
    SET_AUT(state, event) {
      state.isAuth = event;
    },
    SET_TOKEN(state, event) {
      state.token = event;
    },
    SET_TIMER(state, event) {
      state.timer = event;
    },
  },
  actions: {},
  modules: {},
};
const defaultOverrides = {
  state: () => {
    return {};
  },
};
function makeState(inits, override) {
  return {
    ...(typeof inits === "function" ? inits() : inits),
    ...override(),
  };
}
export function createStore(storeOverrides = defaultOverrides) {
  return VuexCreateStore({
    ...storeConfiguration,
    ...storeOverrides,
    ...{
      state: makeState(storeConfiguration.state, storeOverrides.state),
    },
  });
}
export default createStore();
