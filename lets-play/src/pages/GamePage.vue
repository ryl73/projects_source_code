<template>
  <div class="page">
    <template v-if="type === 'home'">
      <h1 class="page__title">New and trending</h1>
      <p>Based on player counts and release date</p>
    </template>
    <h1 v-if="type === 'review'" class="page__title">Reviews</h1>
    <h1 v-if="type === '30days'" class="page__title">Last 30 days</h1>
    <h1 v-if="type === 'thisWeek'" class="page__title">This week</h1>
    <card-list :data="data" :type="type" />
    <!--    <div v-intersection="loadMoreData" class="observer" />-->
  </div>
</template>

<script>
import CardList from "@/components/CardList";
import { useFetching } from "@/hooks/useFetching";

export default {
  name: "GamePage",
  components: { CardList },
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { data, totalPages, isDataLoading } = useFetching(20, props.type);
    console.log(props.type);

    return {
      data,
      totalPages,
      isDataLoading,
    };
  },
  methods: {
    showProps() {
      console.log("111");
    },
    // async loadMoreData() {
    //   try {
    //     this.page++;
    //     let response = {};
    //     switch (this.type) {
    //       case "home":
    //         {
    //           response = await axios.get(
    //             `https://jsonplaceholder.typicode.com/photos`,
    //             {
    //               params: {
    //                 _page: this.page,
    //                 _limit: this.limit,
    //               },
    //             }
    //           );
    //         }
    //         break;
    //       case "review":
    //         {
    //           response = await axios.get(
    //             `https://jsonplaceholder.typicode.com/comments`,
    //             {
    //               params: {
    //                 _page: this.page,
    //                 _limit: this.limit,
    //               },
    //             }
    //           );
    //         }
    //         break;
    //       case "30days":
    //         {
    //           response = await axios.get(
    //             `https://jsonplaceholder.typicode.com/photos`,
    //             {
    //               params: {
    //                 _page: this.page,
    //                 _limit: this.limit,
    //               },
    //             }
    //           );
    //         }
    //         break;
    //       case "lastWeek":
    //         {
    //           response = await axios.get(
    //             `https://jsonplaceholder.typicode.com/photos`,
    //             {
    //               params: {
    //                 _page: this.page,
    //                 _limit: this.limit,
    //               },
    //             }
    //           );
    //         }
    //         break;
    //     }
    //     this.totalPages = Math.ceil(
    //       response.headers["x-total-count"] / this.limit
    //     );
    //     this.data = [...this.data, ...response.data];
    //   } catch (e) {
    //     alert("Ошибка");
    //   }
    // },
  },
  mounted() {
    this.showProps();
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.page__title {
  font-size: 4.5rem;
}

.observer {
  height: 30px;
}
</style>
