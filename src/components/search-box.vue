<template src="./search-box.html"></template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";

export default defineComponent({
  name: "search-box",
  props: {},
  setup(props, { emit }) {
    const searchByUserRefStr = ref("");
    const placeholderRefStr = ref("Artist, songs or albums");
    const searchSuggestionRefList = ref(store.state.searchSuggestionList);

    const onQueryChange = () => {
      if (searchByUserRefStr.value !== "") {
        emit("onQueryChange", searchByUserRefStr.value);
      } else {
        emit("onCleaningSearch");
      }
    };

    return {
      searchByUserRefStr,
      placeholderRefStr,
      searchSuggestionRefList,

      onQueryChange,
    };
  },
});
</script>

<style lang="scss" src="./search-box.scss"></style>
