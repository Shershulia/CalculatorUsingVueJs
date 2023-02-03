import { createStore as VuexCreateStore } from "vuex";
const storeConfiguration = {
  state: {
    name: "",
    email: "",
    description:"",
    category:""
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
  modules: {},}
const defaultOverrides = {
  state: ()=>{
    return {}
  }
}
function makeState(inits,override){
  return{
    ...(typeof inits === "function" ? inits() : inits),
    ...override()
  }
}
export function createStore(storeOverrides = defaultOverrides){
  return VuexCreateStore({
    ...storeConfiguration,
    ...storeOverrides,
    ...{
      state:makeState(storeConfiguration.state,storeOverrides.state)
    }
  })
}
export default createStore();
