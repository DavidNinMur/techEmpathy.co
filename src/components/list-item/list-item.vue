<template src="./list-item.html"></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "list-item",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ["onClickArtist"],
  setup(props, { emit }) {
    const onClickInItem = async (item: any) => {
      if (props.item.type === "artist") emit("onClickArtist", item);
    };

    return { onClickInItem };
  },
});
</script>

<style lang="scss" src="./list-item.scss"></style>
