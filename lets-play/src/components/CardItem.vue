<template>
  <template v-if="type === 'home' || type === '30days' || type === 'thisWeek'">
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

  <template v-if="type === 'review'">
    <div class="review__card">
      <div class="review__main">
        <h2>{{ dataItem.name }}</h2>
        <p>{{ dataItem.body }}</p>
      </div>
      <div class="item__infoItem">
        <div class="about__reviewer">
          <div class="reviewer-avatar" />
          <div class="reviewer__section">
            <p>{{ dataItem.email }}</p>
            <p>1 hour ago</p>
          </div>
        </div>
        <div class="likes-dislikes">
          <like-icon @click="addLike" style="cursor: pointer" fill="green" />
          <span :style="{ color: likeCounterColor }">{{ likeCount }}</span>
          <like-icon
            @click="addDislike"
            style="transform: scale(-1); cursor: pointer"
            fill="red"
          />
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import LikeIcon from "@/assets/icons/LikeIcon";
export default {
  name: "CardItem",
  components: { LikeIcon },
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
      likeCount: 0,
      likeCounterColor: "#9e9e9e",
    };
  },
  methods: {
    mouseEnterHandler() {
      this.isHovered = true;
    },
    mouseLeaveHandler() {
      this.isHovered = false;
    },
    addLike() {
      if (this.likeCount === "+1") {
        this.likeCount = "0";
        this.likeCounterColor = "#9e9e9e";
      } else {
        this.likeCount = "+1";
        this.likeCounterColor = "green";
      }
    },
    addDislike() {
      if (this.likeCount === "-1") {
        this.likeCount = "0";
        this.likeCounterColor = "#9e9e9e";
      } else {
        this.likeCount = "-1";
        this.likeCounterColor = "red";
      }
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

.review__card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  background-color: $background-color-items;
  padding: 2rem;
  border-radius: 0.3rem;
}

.review__main {
  h2 {
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
    margin-bottom: 0.5rem;
  }
  h2:hover {
    color: $font-color-secondary;
  }
  p {
    opacity: 0.5;
  }
}

.about__reviewer {
  display: flex;
  gap: 0.6rem;
}

.reviewer-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 50%;
}

.reviewer__section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p:last-child {
    font-size: 14px;
    color: $font-color-secondary;
  }
}

.likes-dislikes {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-size: 1.5rem;
    font-weight: 700;
  }
}
</style>
