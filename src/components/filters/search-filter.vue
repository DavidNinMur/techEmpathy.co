<template src="./search-filter.html"></template>

<script>
import { defineComponent, ref } from "vue";
import store from "@/store";

export default defineComponent({
  name: "search-filter",
  props: {
    optionListProp: {
      type: Array,
      required: true,
    },
  },
  emits: ["onSelectFilter"],
  setup(props, { emit }) {
    const onSelectFilter = (filterSelectedObj) => {
      emit("onSelectFilter", filterSelectedObj.valueStr);
    };

    return { onSelectFilter };
  },
});
</script>

<style lang="scss" src="./search-filter.scss"></style>
