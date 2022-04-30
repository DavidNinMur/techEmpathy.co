<template src="./button-to-spotify.html"></template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "album-item",
  props: {
    nameStrProp: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const onClickButton = () => {
      emit("onClickButton");
    };

    return { onClickButton };
  },
});
</script>

<style lang="scss" src="./button-to-spotify.scss"></style>
