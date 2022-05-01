<template>
  <div class="home">
    <SearchBox />
    <SearchFilter
      :optionListProp="filterRefList"
      @onSelectFilter="onSelectFilter"
    />
    <ul class="home__results-list">
      <li class="home__result-item" v-for="album in albums" :key="album.id">
        <AlbumItem
          :item="album"
          v-show="
            actualFilterRefStr === 'all' || actualFilterRefStr === 'album'
          "
        />
      </li>
      <li
        v-show="actualFilterRefStr === 'all' || actualFilterRefStr === 'artist'"
        class="home__result-item"
        v-for="artist in artists"
        :key="artist.id"
      >
        <ArtistItem :item="artist" />
      </li>
      <li class="home__result-item" v-for="track in tracks" :key="track.id">
        <TrackItem
          :item="track"
          v-show="
            actualFilterRefStr === 'all' || actualFilterRefStr === 'track'
          "
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SearchBox from "@/components/search-box.vue";
import { mapState } from "vuex";

import SearchFilter from "@/components/filters/search-filter.vue";

import AlbumItem from "@/components/results/album-item.vue";
import ArtistItem from "@/components/results/artist-item.vue";
import TrackItem from "@/components/results/track-item.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TrackItem,
    ArtistItem,
    AlbumItem,
    SearchBox,
    SearchFilter,
  },
  computed: {
    ...mapState(["albums", "artists", "tracks"]),
  },
  setup(props, { emit }) {
    const actualFilterRefStr = ref("all");
    // const dataToRendererRefList = ref([]);

    const filterRefList = ref([
      { nameStr: "All", selectedBool: true, valueStr: "all" },
      { nameStr: "Albums", selectedBool: false, valueStr: "album" },
      { nameStr: "Artists", selectedBool: false, valueStr: "artist" },
      { nameStr: "Tracks", selectedBool: false, valueStr: "track" },
    ]);

    const onSelectFilter = (valueStr: string) => {
      filterRefList.value.forEach((filter) => {
        filter.selectedBool = false;
        if (filter.valueStr === valueStr) {
          filter.selectedBool = true;
          actualFilterRefStr.value = valueStr;
        }
      });
      nombreADisponer();
    };

    const nombreADisponer = () => {
      // let newDataToShowList = Array as unknown as [];
      // console.log("albums :>> ", store.state.albums);
      // debugger;
      // if (actualFilterRefStr.value == "all") newDataToShowList.push();
      // if (actualFilterRefStr.value == "album") newDataToShowList.push();
      // if (actualFilterRefStr.value == "artist") newDataToShowList.push();
      // if (actualFilterRefStr.value == "track") newDataToShowList.push();
      // dataToRendererRefList.value = newDataToShowList;
      // debugger;
    };

    return { filterRefList, actualFilterRefStr, onSelectFilter };
  },
});
</script>

<style lang="scss" scoped>
.home {
  &__results-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    list-style: none;
    padding: 32px;
    gap: 32px;
  }
}
</style>
