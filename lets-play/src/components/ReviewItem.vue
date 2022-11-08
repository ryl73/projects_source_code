<template>
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

<script>
import LikeIcon from "@/assets/icons/LikeIcon";

export default {
  name: "ReviewItem",
  components: { LikeIcon },
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      likeCount: 0,
      likeCounterColor: "#9e9e9e",
    };
  },
  methods: {
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

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
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
