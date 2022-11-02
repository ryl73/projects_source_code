import { createRouter, createWebHistory } from "vue-router";
import GamePage from "@/pages/GamePage";

const routes = [
  {
    path: "/",
    component: GamePage,
    props: { type: "home" },
  },
  {
    path: "/reviews",
    component: GamePage,
    props: { type: "review" },
  },
  {
    path: "/discover/last-30-days",
    component: GamePage,
    props: { type: "30days" },
  },
  {
    path: "/discover/this-week",
    component: GamePage,
    props: { type: "thisWeek" },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
