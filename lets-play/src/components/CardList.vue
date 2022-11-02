<template>
  <div class="card-list">
    <card-item
      v-for="dataItem in data"
      :dataItem="dataItem"
      :key="dataItem.id"
      :type="type"
    />
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";
export default {
  name: "CardList",
  components: { CardItem },
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
