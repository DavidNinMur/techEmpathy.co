<template>
  <nav class="nav-bar">
    <router-link
      to="/"
      class="nav-bar__link"
      active-class="nav-bar__link--is-active"
      >Home</router-link
    >
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "App",
  methods: {
    ...mapActions(["authorize"]),
  },
  mounted(): void {
    this.authorize();
  },
});
</script>

<style lang="scss">
html {
  background-color: #243d48;
}

html,
body {
  * {
    margin: 0;
    padding: 0;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.nav-bar {
  padding: 30px;

  &__link {
    font-weight: bold;
    color: #2c3e50;

    &--is-active {
      color: #42b983;
    }
  }
}
</style>
