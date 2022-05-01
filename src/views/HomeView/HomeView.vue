<template src="./HomeView.html"></template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { mapState } from "vuex";
import store from "@/store";

import { setAlbumFromArtistSelected } from "./helper.js";
import { cloneObj } from "@/computation/utils.js";

import SearchFilter from "@/components/filters/search-filter.vue";
import SearchBox from "@/components/search-box.vue";

import AlbumItem from "@/components/results/album-item.vue";
import ArtistItem from "@/components/results/artist-item.vue";
import TrackItem from "@/components/results/track-item.vue";
import ListItem from "@/components/results/list-item.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TrackItem,
    ArtistItem,
    AlbumItem,
    ListItem,
    SearchBox,
    SearchFilter,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const actualFilterRefStr = ref("all");
    const dataToRendererRefList = ref();

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

    const onClickArtist = (artistObj: any) => {
      setArtistSelected({ artistObj });
    };

    const onSelectFilter = (valueStr: string) => {
      filterRefList.value.forEach((filter) => {
        filter.selectedBool = false;
        if (filter.valueStr === valueStr) {
          filter.selectedBool = true;
          actualFilterRefStr.value = valueStr;
        }
      });
      getDataToRenderer();
    };

    const getDataToRenderer = () => {
      let newDataToShowList: any[] = [];

      const albumsList = cloneObj(store.state.albums);
      const artistList = cloneObj(store.state.artists);
      const tracksList = cloneObj(store.state.tracks);

      switch (actualFilterRefStr.value) {
        case "all":
          newDataToShowList.push(
            albumsList.concat(artistList.concat(tracksList))
          );
          break;

        case "album":
          newDataToShowList.push(albumsList);
          break;

        case "artist":
          newDataToShowList.push(artistList);
          break;

        case "track":
          newDataToShowList.push(tracksList);
          break;

        default:
          break;
      }
      dataToRendererRefList.value = newDataToShowList;
    };

    return {
      filterRefList,
      actualFilterRefStr,
      dataToRendererRefList,

      store,

      onClickArtist,
      onSelectFilter,

      getDataToRenderer,
    };
  },
});
</script>

<style lang="scss" src="./HomeView.scss" scoped></style>
