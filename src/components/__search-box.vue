<template>
  <div class="search-box">
    <input
      list="recomended-searches"
      class="search-box__input"
      type="search"
      v-model="searchByUserStr"
      :placeholder="placeholderStr"
      @input="onQueryChange()"
    />
    <datalist id="recomended-searches">
      <option value=""></option>
      <option
        v-for="artist in searchSuggestionList"
        :key="artist"
        :value="artist"
      >
        {{ artist }}
      </option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "search-box",
  data() {
    return {
      searchByUserStr: "",
      placeholderStr: "Artist, songs or podcast",
      searchSuggestionList: store.state.searchSuggestionList,
    };
  },
  methods: {
    onQueryChange: function () {
      if (this.searchByUserStr != "") {
        store.dispatch("search", this.searchByUserStr);
      } else {
        this.cleaningSearch();
      }
    },
    cleaningSearch: function () {
      store.commit("setArtists", {});
      store.commit("setAlbums", {});
      store.commit("setTracks", {});
    },
  },
});
</script>

<style lang="scss" scoped>
.search-box {
  width: 300px;
  margin: auto;
}

.search-box__input {
  width: 100%;
  padding: 2%;
  border-radius: 15px;
  padding-left: 25px;
  background: url("https://static.thenounproject.com/png/101791-200.png")
    no-repeat scroll left center;
  background-size: 20px;
  background-color: white;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)
    no-repeat 50% 50%;
  background-size: contain;
  opacity: 1;
}
</style>
