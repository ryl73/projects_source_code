<template>
  <navbar />
  <div class="app">
    <side-menu />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/pages/Navbar";
import SideMenu from "@/pages/SideMenu";
export default {
  components: { SideMenu, Navbar },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: $font-size-primary;
}

body {
  background-color: $background-color;
  color: $font-color-primary;
  font-family: $font-family-primary;
  line-height: normal;
}

.app {
  display: grid;
  position: relative;
  grid-template-columns: auto 1fr;
  padding: 5rem 3rem 1.4rem;
  gap: 0 3rem;
}

a,
input {
  color: $font-color-primary;
}
</style>
