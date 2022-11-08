<template>
  <div class="page">
    <template v-if="type === 'home'">
      <h1 class="page__title">New and trending</h1>
      <p>Based on player counts and release date</p>
    </template>
    <h1 v-if="type === 'review'" class="page__title">Reviews</h1>
    <h1 v-if="type === '30days'" class="page__title">Last 30 days</h1>
    <h1 v-if="type === 'thisWeek'" class="page__title">This week</h1>
    <items-list :data="data" :type="type" />
    <div v-intersection="loadMoreData" class="observer" />
  </div>
</template>

<script>
import axios from "axios";
import ItemsList from "@/components/ItemsList";

export default {
  name: "GamePage",
  components: { ItemsList },
  data() {
    return {
      data: [],
      page: 1,
      totalPages: 0,
      limit: 20,
      isDataLoading: false,
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    async fetchData() {
      let response = {};
      try {
        switch (this.type) {
          case "home":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
          case "review":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/comments`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
          case "30days":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
          case "thisWeek":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
        }
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.data = response.data;
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isDataLoading = false;
      }
    },
    async loadMoreData() {
      try {
        this.page++;
        let response = {};
        switch (this.type) {
          case "home":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
          case "review":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/comments`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
          case "30days":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
          case "thisWeek":
            {
              response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos`,
                {
                  params: {
                    _page: this.page,
                    _limit: this.limit,
                  },
                }
              );
            }
            break;
        }
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.data = [...this.data, ...response.data];
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    type() {
      this.page = 1;
      this.fetchData();
    },
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
