<template>
  <article class="track-item">
    <span class="track-item__kind">Track</span>
    <header class="track-item__header">
      <img
        class="track-item__cover"
        :alt="`${item.name} album cover`"
        :src="item.album?.images[0]?.url"
      />
    </header>
    <h3 class="track-item__name">{{ item.name }}</h3>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Track } from "@/store";

export default defineComponent({
  name: "track-item",
  props: {
    item: {
      type: Object as PropType<Track>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.track-item {
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;

  &__cover {
    width: 100%;
  }
}
</style>
