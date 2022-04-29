<template src="./_search-box.html"></template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";

export default defineComponent({
  name: "search-box",
  props: {},
  setup(props, { emit }) {
    const searchByUserRefStr = ref("");
    const placeholderRefStr = ref("Artist, songs or podcast");
    const searchSuggestionRefList = ref(store.state.searchSuggestionList);

    const onQueryChange = () => {
      if (searchByUserRefStr.value != "") {
        store.dispatch("search", searchByUserRefStr);
      } else {
        cleaningSearch();
      }
    };
    const cleaningSearch = () => {
      store.commit("setArtists", {});
      store.commit("setAlbums", {});
      store.commit("setTracks", {});
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

<style lang="scss" src="./_search-box.scss"></style>
