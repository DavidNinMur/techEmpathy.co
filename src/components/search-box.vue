<template>
  <div class="search-box">
    <input class="search-box__input" v-model="query" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "search-box",
  data() {
    return {
      query: "",
    };
  },
});
</script>

<style lang="scss" scoped></style>
