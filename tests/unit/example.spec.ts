import { shallowMount } from "@vue/test-utils";
import SearchBox from "@/components/search-box.vue";

describe("search-box", () => {
  it("renders successfully", () => {
    const wrapper = shallowMount(SearchBox);
    expect(wrapper.exists()).toBe(true);
  });
});
