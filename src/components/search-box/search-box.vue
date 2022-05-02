<template src="./search-box.html"></template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import store from "@/store";

import { userHaveDoneASearch } from "@/computation/utils.js";

export default defineComponent({
  name: "search-box",
  props: {},
  setup(props, { emit }) {
    const searchByUserRefStr = ref("");
    const placeholderRefStr = ref("Artist, songs or albums");
    const searchSuggestionRefList = ref(store.state.searchSuggestionList);

    onBeforeMount(() => {
      if (userHaveDoneASearch({ store })) {
        searchByUserRefStr.value = store.state.queryOfUser;
      }
    });

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
