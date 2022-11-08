<template>
  <div class="card-list">
    <template v-if="type === 'review'">
      <review-item
        v-for="dataItem in data"
        :dataItem="dataItem"
        :key="dataItem.id"
      />
    </template>
    <template v-else>
      <game-item
        v-for="dataItem in data"
        :dataItem="dataItem"
        :key="dataItem.id"
        :type="type"
      />
    </template>
  </div>
</template>

<script>
import GameItem from "@/components/GameItem";
import ReviewItem from "@/components/ReviewItem";
export default {
  name: "ItemsList",
  components: { ReviewItem, GameItem },
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.card-list {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
