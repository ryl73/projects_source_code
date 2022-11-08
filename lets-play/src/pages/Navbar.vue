<template>
  <div class="navbar__wrapper">
    <div class="navbar">
      <a href=""><h1>Let's play</h1></a>
      <input class="input" />
      <div class="navbar__btns">
        <a href="">Log in</a>
        <a href="">Sign up</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

.navbar__wrapper {
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: $background-color;
}

.navbar {
  padding: 1.4rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s ease-in-out;
  }
  a:hover {
    color: $font-color-secondary;
  }
}

.navbar__btns {
  display: flex;
  gap: 1.4rem;
}

.input {
  position: relative;
  padding: 0.6rem 1.5rem;
  min-width: 800px;
  border-radius: 1rem;
  background-color: $background-color-items;
  border: none;
  font-family: $font-family-primary;
  font-size: $font-size-primary;
}

.input::before {
  content: "";
  position: absolute;
}
</style>
