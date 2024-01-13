import CataloguePage from "@/pages/CataloguePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import OrderingPage from "@/pages/OrderingPage.vue";
import OrderDetailsPage from "@/pages/Orders.vue";
import OrdersPage from "@/pages/OrdersPage.vue";
import { createRouter, createWebHistory } from "vue-router";

// import { authGuard } from '@auth0/auth0-vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/catalogue",
      name: "catalogue",
      component: CataloguePage,
    },
    {
      path: "/ordering",
      name: "ordering",
      component: OrderingPage,
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersPage,
    },
    {
      path: "/order-detail",
      name: "detail",
      component: OrderDetailsPage,
    },
  ],
});

// router.beforeEach(authGuard)

export default router;
