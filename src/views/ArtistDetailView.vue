<template>
  <section v-if="artistSelectedRefObj">
    <div class="display-flex">
      <button class="goBack left" @click="redirectToHome()">Go Back</button>
      <h1>Artist</h1>
    </div>
    <img
      src="https://i.scdn.co/image/b040846ceba13c3e9c125d68389491094e7f2982"
      alt="Queen artist"
    />
    <h4>Name: {{ artistSelectedRefObj.name }}</h4>
    <h4>Followers: {{ artistSelectedRefObj?.followers?.total }}</h4>
    <h4>
      Genres:
      {{ artistSelectedRefObj.genres }}
    </h4>
    <h2>Albums</h2>
    <!-- Album list here -->
    <ul>
      <li v-for="album in artistSelectedRefObj.albums" :key="album">
        <img :src="album.images[0].url" :alt="album.name" />
        <div>{{ album.name }}</div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";

export default defineComponent({
  name: "ArtistDetailView",
  components: {},
  setup() {
    const artistSelectedRefObj = ref({});
    const router = useRouter();

    onBeforeMount(() => {
      artistSelectedRefObj.value = store.state.artistDetailSelectedObj;
    });

    const redirectToHome = () => {
      router.push("/");
    };

    return { artistSelectedRefObj, redirectToHome };
  },
});
</script>

<style lang="scss" scoped>
.display-flex {
  display: flex;
  justify-content: center;
}

// .goBack {
//   width: 2vmin;
//   height: 2vmin;
//   background: transparent;
//   border-top: 1vmin solid white;
//   border-right: 1vmin solid white;
//   box-shadow: 0 0 0 lightgray;
//   transition: all 200ms ease;

//   &.left {
//     left: 0;
//     transform: translate3d(0, -50%, 0) rotate(-135deg);
//   }

//   &:hover {
//     border-color: green;
//     box-shadow: 0.5vmin -0.5vmin 0 white;
//   }
//   &:before {
//     // for better hit
//     left: 50%;
//     transform: translate(-40%, -60%) rotate(45deg);
//     width: 200%;
//     height: 200%;
//   }
// }
</style>
