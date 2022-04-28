<template>
  <div class="home">
    <SearchBox />
    <ul class="home__results-list">
      <li class="home__result-item" v-for="album in albums" :key="album.id">
        <AlbumItem :item="album" />
      </li>
      <li class="home__result-item" v-for="artist in artists" :key="artist.id">
        <ArtistItem :item="artist" />
      </li>
      <li class="home__result-item" v-for="track in tracks" :key="track.id">
        <TrackItem :item="track" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "@/components/search-box.vue";
import { mapState } from "vuex";
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
  },
  computed: {
    ...mapState(["albums", "artists", "tracks"]),
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
