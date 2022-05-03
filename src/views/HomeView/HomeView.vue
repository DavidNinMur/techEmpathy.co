<template src="./HomeView.html"></template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";

import { getArtistParsed, getTracksParsed } from "@/computation/data-parser";
import { userHaveDoneASearch } from "@/computation/utils.js";

import {
  setAlbumFromArtistSelected,
  getDataToRenderer,
  setUserInfo,
} from "./helper.js";

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
  setup() {
    const router = useRouter();
    const actualFilterRefStr = ref(store.state.filterByUser);
    const dataToRendererRefList = ref();
    const userFavArtistsDataToRendererRefList = ref();
    const userFavTracksDataToRendererRefList = ref();
    const userInfoDataToRendererRefList = ref();
    const componentRenderedBoolRef = ref(false);

    // To load from artist-detail the last search
    onBeforeMount(async () => {
      await store.dispatch("authorize");
      getInfoByUser();
      if (userHaveDoneASearch({ store })) {
        onSelectFilter(actualFilterRefStr.value);
      } else {
        onSelectFilter("all");
      }

      componentRenderedBoolRef.value = true;
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

    const getInfoByUser = async () => {
      const artistsList = await setUserInfo({ store, infoStr: "artists" });
      const tracks = await setUserInfo({ store, infoStr: "tracks" });
      userInfoDataToRendererRefList.value = await setUserInfo({
        store,
        infoStr: "infoUser",
      });

      userFavArtistsDataToRendererRefList.value = getArtistParsed({
        artistList: { items: artistsList },
      });

      userFavTracksDataToRendererRefList.value = getTracksParsed({
        tracksList: { items: tracks },
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
      userFavArtistsDataToRendererRefList,
      userFavTracksDataToRendererRefList,
      userInfoDataToRendererRefList,

      componentRenderedBoolRef,

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
