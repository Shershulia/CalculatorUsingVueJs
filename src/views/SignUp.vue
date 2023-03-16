<template>
  <div class="container">
    <h1>Registration page</h1>

    <div class="template">
      <form @submit.prevent="sendForm">
        <fieldset>
          <legend>Enter your username</legend>
          <BaseInput v-model="name" label="Name" type="text"> </BaseInput>

          <legend>Enter your password</legend>
          <BaseInput v-model="password" label="Password" type="password">
          </BaseInput>

          <legend>Confirmation your password</legend>
          <BaseInput v-model="conf" label="Confirmation" type="password">
          </BaseInput>
        </fieldset>
        <p v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </p>
        <p>{{ this.error }}</p>

        <button id="submit_button" type="submit" data-test="submit_button">
          Submit
        </button>
      </form>
      <button class="back" v-on:click="backToLoginPage()">Back to login</button>
    </div>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import axios from "axios";
import router from "@/router";
import useValidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const onlyLetters = (value) => value.match(/^[a-zA-Z\s]*$/);

export default {
  components: { BaseInput },
  setup() {
    return { v$: useValidate() };
  },
  data() {
    return {
      name: this.$store.state.name,
      password: "",
      conf: "",
      error: "",
    };
  },
  validations() {
    return {
      name: {
        required,
        onlyLetters: helpers.withMessage(
          "Here accepted only letters",
          onlyLetters
        ),
      },
    };
  },
  computed() {
    return {};
  },
  methods: {
    backToLoginPage() {
      router.push("/login");
    },
    sendForm() {
      this.v$.$validate(); // checks all inputs
      const postData = {
        name: this.name,
        password: this.password,
      };
      if (!this.v$.$error) {
        axios
          .post("http://localhost:8081/users", postData)
          .then((res) => {
            if (res.status === 201) {
              console.log("RESPONSE RECEIVED: ", res);
              this.$store.commit("SET_NAME", this.name);
              router.push("/login");
            } else if (res.status === 200) {
              this.error = "This name is already taken, pls take the new one";
            } else {
              this.error =
                "Ooops... Response status: " +
                res.status +
                ". Please contact support";
            }
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });
      }
    },
  },
};
</script>
<style>
.container {
  justify-content: center;
  align-items: center;
}
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

form {
  padding: 10px;
  outline: solid 1px black;
  margin: 40px;
}
</style>
