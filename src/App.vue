<template id="app">
  <nav v-if="show">
    <router-link :to="{ name: 'CalculatorView' }">Calculator</router-link> |
    <router-link :to="{ name: 'ContactView' }">Kontaktskjema</router-link>
    <button class="logout" v-on:click="logout()">Logout</button>
  </nav>
  <router-view />
</template>
<script>
import router from "@/router";

export default {
  methods: {
    logout() {
      this.$store.commit("SET_AUT", false);
      this.$store.commit("SET_TOKEN", "");
      clearInterval(this.$store.state.timer);
      router.push("/login");
    },
  },
  computed: {
    // a computed getter
    show() {
      // `this` points to the component instance
      return this.$store.state.isAuth;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.logout {
  position: absolute;
  right: 150px;
}
</style>
