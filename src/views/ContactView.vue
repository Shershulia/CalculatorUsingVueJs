<template>
  <div>
    <h1>Give a feedback</h1>
    <form @submit.prevent="sendForm">
      <fieldset>
        <legend>Choose one of two option</legend>
        <BaseSelect
          :options="state.categories"
          v-model="state.comment.category"
          label="Select category"
        ></BaseSelect>
      </fieldset>

      <fieldset>
        <legend>Personal information to five you feedback</legend>
        <BaseInput
          v-model="state.comment.name"
          label="Name"
          type="text"
          error="This input has an error"
        ></BaseInput>

        <BaseInput
          v-model="state.comment.mail"
          label="E-mail"
          type="text"
        ></BaseInput>
      </fieldset>
      <fieldset>
        <legend>Describe your experience</legend>
        <BaseInput
          v-model="state.comment.description"
          label="Description"
          type="text"
        ></BaseInput>
      </fieldset>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { reactive, computed } from 'vue'
import axios from "axios";
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  components: { BaseSelect, BaseInput },
  setup () {
    const state = reactive({
      categories: ["experience", "bag"],
      comment: {
        category: "",
        name: "",
        mail: "",
        description: "",
      }
      },
    )
    const rules = computed(() => {
      return {
        comment: {
          category: { required },
          name: { required },
          mail: { required },
          description: { required },
        }
      }
    })
    const v$ = useValidate(rules, state)
    return { state, v$ }
  },
  methods: {
    sendForm() {
      this.v$.$validate() // checks all inputs
      if(!this.v$.$error) {
        axios
          .post(
            "https://my-json-server.typicode.com/Shershulia/CalculatorUsingVueJs/comments",
            this.comment,
            alert("Success")
          )
          .then(function(response) {
            console.log("Response", response);
          })
          .catch(function(err) {
            console.log("Error", err);
          });
      }else alert("Invalid")
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
</style>
