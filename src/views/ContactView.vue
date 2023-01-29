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
        ></BaseSelect>
        <p v-if="v$.comment.category.$error">
          {{ v$.comment.category.$errors[0].$message }}
        </p>
      </fieldset>

      <fieldset>
        <legend>Personal information to five you feedback</legend>
        <BaseInput v-model="comment.name" label="Name" type="text">
        </BaseInput>
        <p v-if="v$.comment.name.$error">
        {{ v$.comment.name.$errors[0].$message }}
        </p>
        <br>
        <BaseInput v-model="comment.mail" label="E-mail" type="text">
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
        ></BaseInput>
        <p v-if="v$.comment.description.$error">
          {{ v$.comment.description.$errors[0].$message }}
        </p>
      </fieldset>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  components: { BaseSelect, BaseInput },
  setup() {
    return { v$: useValidate() };
  },
  data() {
    return {
      categories: ["experience", "bag"],
      comment: {
        category: "",
        name: "",
        mail: "",
        description: "",
      },
    };
  },
  validations() {
    return {
      comment: {
        category: { required },
        name: { required },
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
            alert("Success")
          )
          .then(function (response) {
            console.log("Response", response);
          })
          .catch(function (err) {
            console.log("Error", err);
          });
      } else alert("Invalid");
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
</style>
