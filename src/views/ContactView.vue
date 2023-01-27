<template>
  <div>
    <h1>Give a feedback</h1>
    <form @submit.prevent="sendForm">
      <BaseSelect
        :options="categories"
        v-model="comment.category"
        label="Select category"
      ></BaseSelect>

      <h3>Describe your experience</h3>

      <BaseInput v-model="comment.name" label="Name" type="text"></BaseInput>

      <BaseInput v-model="comment.mail" label="E-mail" type="text"></BaseInput>

      <BaseInput
        v-model="comment.description"
        label="Description"
        type="text"
      ></BaseInput>
      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import axios from "axios";

export default {
  components: { BaseSelect, BaseInput },
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
  methods: {
    sendForm() {
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
    },
  },
};
</script>
<style>
form {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
