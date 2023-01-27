<template>
  <div>
    <h1>Give a feedback</h1>
    <form>
      <BaseSelect
        :options="categories"
        v-model="comment.category"
        label="Select category"
      ></BaseSelect>

      <h3>Describe your experience</h3>

      <BaseInput v-model="comment.title" label="Title" type="text"></BaseInput>

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

export default {
  components: { BaseSelect, BaseInput },
  data() {
    return {
      categories: ["experience", "bag"],
      comment: {
        category: "",
        title: "",
        description: "",
      },
    };
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
