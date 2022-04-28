<template>
  <article class="artist-item">
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
import { Artist } from "@/store";

export default defineComponent({
  name: "artist-item",
  props: {
    item: {
      type: Object as PropType<Artist>,
      required: true,
    },
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
