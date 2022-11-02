import axios from "axios";
import { ref, onMounted, watch } from "vue";

export function useFetching(limit, type) {
  const data = ref([]);
  const totalPages = ref(0);
  const isDataLoading = ref(true);
  console.log(type);
  let response = {};
  const fetching = async () => {
    try {
      switch (type) {
        case "home":
          {
            response = await axios.get(
              `https://jsonplaceholder.typicode.com/photos`,
              {
                params: {
                  _page: 1,
                  _limit: limit,
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
                  _page: 1,
                  _limit: limit,
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
                  _page: 1,
                  _limit: limit,
                },
              }
            );
          }
          break;
        case "lastWeek":
          {
            response = await axios.get(
              `https://jsonplaceholder.typicode.com/photos`,
              {
                params: {
                  _page: 1,
                  _limit: limit,
                },
              }
            );
          }
          break;
      }
    } catch (e) {
      alert("Ошибка");
    } finally {
      isDataLoading.value = false;
    }
    totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
    data.value = response.data;
  };
  watch([type], () => useFetching());
  onMounted(fetching);

  return {
    data,
    totalPages,
    isDataLoading,
  };
}
