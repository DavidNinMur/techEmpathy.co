<template>
  <article class="artist-item" @click="redirectToDetail()">
    <span class="artist-item__kind">Artist</span>
    <header class="artist-item__header">
      <img
        class="artist-item__cover"
        :alt="`${item.name} album cover`"
        :src="item.images[0]?.url"
      />
    </header>
    <h3 class="artist-item__name">{{ item.name }}</h3>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

import store from "@/store";
import { Artist } from "@/store";

import { getAlbumFromArtist } from "@/api/spotify";

export default defineComponent({
  name: "artist-item",
  props: {
    item: {
      type: Object as PropType<Artist>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const redirectToDetail = async () => {
      await setArtistSelected();
      router.push("/artist-detail");
    };

    const setArtistSelected = async () => {
      const artistSelectedObj = JSON.parse(JSON.stringify(props.item));
      artistSelectedObj["albums"] = await setAlbumFromArtistSelected(
        artistSelectedObj
      );

      store.commit("setArtistDetailSelected", artistSelectedObj);
    };

    const setAlbumFromArtistSelected = async (artistSelectedObj: any) => {
      const response = await getAlbumFromArtist(
        store.state.token.value,
        artistSelectedObj.id
      );
      const allAlbumsByUserSearchObj = JSON.parse(JSON.stringify(response));
      return allAlbumsByUserSearchObj.items;
    };

    return { redirectToDetail };
  },
});
</script>

<style lang="scss" scoped>
.artist-item {
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;

  &__cover {
    width: 100%;
  }
}
</style>
