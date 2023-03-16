<template>
  <div class="template">
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
      </fieldset>
      <button id="submit_button" type="submit" data-test="submit_button">
        Submit
      </button>
    </form>
    <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import axios from "axios";

export default {
  components: { BaseInput },
  data() {
    return {
      name: this.$store.state.name,
    };
  },
  methods: {
    sendForm() {
      const postData = {
        name: this.name,
      };

      let axiosConfig = {
        headers: { Authorization: "Basic aXZhbnNoOmFkbWlu" },
      };

      axios
        .post("http://localhost:8081/users", postData, axiosConfig)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          this.$store.commit("SET_NAME", this.name);
          this.$store.commit("SET_AUT", true);
          console.log(this.$store.state.isAuth);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
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
form{
  margin: 40px;
}
</style>
