<template src="./ArtistDetailView.html"></template>

<script lang="ts">
import { ref, defineComponent, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import store from "@/store";

import ButtonToSpotify from "@/components/button-to-spotify/button-to-spotify.vue";

export default defineComponent({
  name: "ArtistDetailView",
  components: {
    ButtonToSpotify,
  },
  setup() {
    const artistSelectedRefObj = ref();
    const router = useRouter();
    const albumSelectedRef = ref(false);
    const showModalRefBool = ref(false);
    const modalOriginRefStr = ref("0px 0px");

    onBeforeMount(() => {
      artistSelectedRefObj.value = store.state.artistDetailSelectedObj;
      console.log(
        "artistSelectedRefObj.value :>> ",
        artistSelectedRefObj.value
      );
    });

    const redirectToHome = () => {
      router.push("/");
    };

    const redirectToArtistPageInSpotify = () => {
      window.open(artistSelectedRefObj.value.linkToOpen, "_blank");
    };

    const redirectToAlbumPageInSpotify = (album: any) => {
      window.open(album.external_urls.spotify, "_blank");
    };

    const openModal = (e: any, album: any) => {
      showModalRefBool.value = true;
      albumSelectedRef.value = album;

      var target = e.target,
        target_coords = target.getBoundingClientRect();
      modalOriginRefStr.value =
        target.nodeName === "IMG"
          ? target.offsetLeft +
            target_coords.width / 2 +
            "px " +
            (target.offsetTop + target_coords.height / 2) +
            "px"
          : "0px 0px";
    };

    return {
      artistSelectedRefObj,
      albumSelectedRef,
      showModalRefBool,
      modalOriginRefStr,

      redirectToHome,
      redirectToArtistPageInSpotify,
      redirectToAlbumPageInSpotify,
      openModal,
    };
  },
});
</script>

<style lang="scss" src="./ArtistDetailView.scss" scoped></style>
