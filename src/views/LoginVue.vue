<template>
  <div class="template">
    <h1>Login page</h1>
    <form @submit.prevent="sendForm">
      <fieldset>
        <legend>Enter your username</legend>
        <BaseInput
          v-model="name"
          label="Name"
          type="text"
          class="object"
          id="comment_name"
        >
        </BaseInput>
        <legend>Enter your password</legend>
        <BaseInput v-model="password" label="Password" type="password">
        </BaseInput>
      </fieldset>
      <p>{{ this.error }}</p>
      <button id="submit_button" type="submit" data-test="submit_button">
        Submit
      </button>
    </form>
    <button v-on:click="toSignUp()">Sign Up</button>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import axios from "axios";
import router from "../router";
export default {
  components: { BaseInput },
  data() {
    return {
      name: this.$store.state.name,
      error: null,
      password: "",
    };
  },
  methods: {
    toSignUp() {
      router.push("/sign-up");
    },
    async sendForm() {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios
        .post(
          "http://localhost:8081/token",
          {
            name: this.name,
            password: this.password,
          },
          config
        )
        .catch((err) => {
          if (err.response.status === 403) {
            this.error = "Ooops..\nWrong credentials";
          }
        });
      let data = response.data;
      if (data != null && data != "" && data != undefined) {
        this.$store.commit("SET_NAME", this.name);
        this.$store.commit("SET_AUT", true);
        this.$store.commit("SET_TOKEN", data);
        await router.push("/");
      }
    },
  },
};
</script>
<style>
fieldset {
  border: 0;
  margin: 10px;
  padding: 0;
}
legend {
  font-size: 28px;
  font-weight: 700;
  margin: 20px;
}
p {
  font-size: 12px;
  color: red;
}
.object {
  margin: 10px;
}
form {
  margin: 40px;
}
</style>
