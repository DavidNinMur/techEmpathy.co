<template>
  <article class="album-item" @click="redirectToDetail()">
    <span class="album-item__kind">Album</span>
    <header class="album-item__header">
      <img
        class="album-item__cover"
        :alt="`${item.name} album cover`"
        :src="item.images[0]?.url"
      />
    </header>
    <h3 class="album-item__name">{{ item.name }}</h3>
    <span class="album-item__artist-name">{{ item.artists[0].name }}</span>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

import { Album } from "@/store";

export default defineComponent({
  name: "album-item",
  props: {
    item: {
      type: Object as PropType<Album>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const redirectToDetail = () => {
      router.push("/artist-detail");
    };

    return { redirectToDetail };
  },
});
</script>

<style lang="scss" scoped>
.album-item {
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;

  &__cover {
    width: 100%;
  }
}
</style>
