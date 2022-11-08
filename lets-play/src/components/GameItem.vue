<template>
  <div
    class="item-card"
    @mouseenter="mouseEnterHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <div class="img__wrapper">
      <img :src="`${dataItem.url}`" alt="" />
    </div>
    <div class="item__description">
      <div class="platforms">Win Xbox PS4</div>
      <h2>{{ dataItem.title }}</h2>
      <div v-if="isHovered" class="item__info">
        <div class="item__infoItem">
          <p>Release date:</p>
          <p>Dec 31, 2020</p>
        </div>
        <div class="item__infoItem">
          <p>Genres:</p>
          <p>Action, RPG</p>
        </div>
        <div class="item__infoItem">
          <p>Chart:</p>
          <p>#12 Top 2022</p>
        </div>
        <button class="show-more-btn">Show more like this</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    mouseEnterHandler() {
      this.isHovered = true;
    },
    mouseLeaveHandler() {
      this.isHovered = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
.item-card {
  position: relative;
  padding-bottom: 1rem;
  background-color: $background-color-items;
  border-radius: 1rem;
  transition: transform 0.2s ease-in-out;
}

.img__wrapper {
  height: auto;
  img {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    width: 100%;
    height: 100%;
  }
}

.item__description {
  margin: 1rem 1rem 0;
}

.item__info {
  position: absolute;
  z-index: 1;
  background-color: $background-color-items;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 0 0 -1rem;
  padding: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.item__infoItem {
  display: flex;
  justify-content: space-between;
}

.show-more-btn {
  background-color: #424242;
  color: $font-color-primary;
  font-family: $font-family-primary;
  border: none;
  border-radius: 0.5rem;
  text-align: left;
  padding: 10px;
  cursor: pointer;
}
</style>
