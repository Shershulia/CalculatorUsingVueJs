<template>
  <h1>Give a feedback</h1>

  <div class="template">
    <form @submit.prevent="sendForm">
      <fieldset>
        <legend>Choose one of two option</legend>
        <BaseSelect
          :options="categories"
          v-model="comment.category"
          label="Select category"
          class="object"
        ></BaseSelect>
        <p v-if="v$.comment.category.$error">
          {{ v$.comment.category.$errors[0].$message }}
        </p>
      </fieldset>

      <fieldset>
        <legend>Personal information to give you feedback</legend>
        <BaseInput
          v-model="comment.name"
          label="Name"
          type="text"
          class="object"
          id="comment_name"
        >
        </BaseInput>
        <p v-if="v$.comment.name.$error">
          {{ v$.comment.name.$errors[0].$message }}
        </p>
        <br />
        <BaseInput
          v-model="comment.mail"
          label="E-mail"
          type="text"
          id="comment_mail"
          class="object"
        >
        </BaseInput>

        <p v-if="v$.comment.mail.$error">
          {{ v$.comment.mail.$errors[0].$message }}
        </p>
      </fieldset>
      <fieldset>
        <legend>Describe your experience</legend>
        <BaseInput
          v-model="comment.description"
          label="Description"
          type="text"
          class="object"
        ></BaseInput>
        <p v-if="v$.comment.description.$error">
          {{ v$.comment.description.$errors[0].$message }}
        </p>
      </fieldset>

      <button id="submit_button" :disabled="v$.$error" type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

const onlyLetters = (value) => value.match(/^[a-zA-Z\s]*$/);

export default {
  components: { BaseSelect, BaseInput },
  setup() {
    return { v$: useValidate() };
  },
  data() {
    return {
      categories: ["experience", "bag"],
      form_status: "",
      comment: {
        category: this.$store.state.category,
        name: this.$store.state.name,
        mail: this.$store.state.email,
        description: this.$store.state.description,
      },
    };
  },
  validations() {
    return {
      comment: {
        category: { required },
        name: {
          required,
          onlyLetters: helpers.withMessage(
            "Here accepted only letters",
            onlyLetters
          ),
        },
        mail: { required, email },
        description: { required, minLength: minLength(6) },
      },
    };
  },
  methods: {
    sendForm() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        axios
          .post(
            "https://my-json-server.typicode.com/Shershulia/CalculatorUsingVueJs/comments",
            this.comment,
            this.$store.commit("SET_NAME", this.comment.name),
            this.$store.commit("SET_EMAIL", this.comment.mail),
            (this.form_status = "Success"),
            alert("Success")
          )
          .then(function (response) {
            console.log("Response", response);
          })
          .catch(function (err) {
            console.log("Error", err);
          });
      } else {
        (this.form_status = "Invalid"), alert("Invalid");
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
</style>
