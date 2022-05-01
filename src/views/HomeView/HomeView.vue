<template src="./HomeView.html"></template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";

import { userHaveDoneASearch } from "@/computation/utils.js";
import { setAlbumFromArtistSelected, getDataToRenderer } from "./helper.js";

import SearchFilter from "@/components/filters/search-filter.vue";
import SearchBox from "@/components/search-box/search-box.vue";
import ListItem from "@/components/list-item/list-item.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    ListItem,
    SearchBox,
    SearchFilter,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const actualFilterRefStr = ref(store.state.filterByUser);
    const dataToRendererRefList = ref();

    onBeforeMount(() => {
      if (userHaveDoneASearch({ store })) {
        onSelectFilter(actualFilterRefStr.value);
      }
    });

    const filterRefList = ref([
      { nameStr: "All", selectedBool: true, valueStr: "all" },
      { nameStr: "Albums", selectedBool: false, valueStr: "album" },
      { nameStr: "Artists", selectedBool: false, valueStr: "artist" },
      { nameStr: "Tracks", selectedBool: false, valueStr: "track" },
    ]);

    const setArtistSelected = async ({ artistObj }: any) => {
      const artistSelectedObj = JSON.parse(JSON.stringify(artistObj));
      artistSelectedObj["albums"] = await setAlbumFromArtistSelected({
        store,
        artistSelectedObj,
      });

      store.commit("setArtistDetailSelected", artistSelectedObj);
      router.push("/artist-detail");
    };

    const getDataToRender = () => {
      dataToRendererRefList.value = getDataToRenderer({
        store,
        actualFilterRefStr: actualFilterRefStr.value,
      });
    };

    const onClickArtist = (artistObj: any) => {
      setArtistSelected({ artistObj });
    };

    const onCleaningSearch = () => {
      store.commit("setQueryOfUser", "");
      store.commit("setArtists", []);
      store.commit("setAlbums", []);
      store.commit("setTracks", []);
      getDataToRender();
    };

    const onQueryChange = async (searchStr: string) => {
      await store.dispatch("search", searchStr);
      store.commit("setQueryOfUser", searchStr);
      getDataToRender();
    };

    const onSelectFilter = (valueStr: string) => {
      filterRefList.value.forEach((filter) => {
        filter.selectedBool = false;
        if (filter.valueStr === valueStr) {
          filter.selectedBool = true;
          actualFilterRefStr.value = valueStr;
        }
      });
      store.commit("setFilterByUser", actualFilterRefStr.value);
      getDataToRender();
    };

    return {
      filterRefList,
      actualFilterRefStr,
      dataToRendererRefList,

      store,

      onClickArtist,
      onCleaningSearch,
      onQueryChange,
      onSelectFilter,

      getDataToRenderer,
      userHaveDoneASearch,
    };
  },
});
</script>

<style lang="scss" src="./HomeView.scss" scoped></style>
