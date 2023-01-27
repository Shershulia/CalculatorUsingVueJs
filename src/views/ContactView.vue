<template>
  <div >
    <h1>Give a feedback</h1>
    <form>
      <label>Select a category</label>
      <select v-model="comment.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === comment.category"
        >{{ option }}</option>
      </select>

      <h3>Name & describe your experience</h3>

      <BaseInput v-model="comment.title"
                label='Title'
                type="text"></BaseInput>

      <BaseInput v-model="comment.description"
                 label='Description'
                 type="text"></BaseInput>
      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";

export default {
  components: { BaseInput },
  data () {
    return {
      categories: [
        'experience',
        'bag',
      ],
      comment: {
        category: '',
        title: '',
        description: '',
      }
    }
  }
}
</script>
<style>
form{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>