import { authGuard } from "@/guards/authGuard";
import CataloguePage from "@/pages/CataloguePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import OrderDetailsPage from "@/pages/OrderDetailsPage.vue";
import OrderingPage from "@/pages/OrderingPage.vue";
import OrdersPage from "@/pages/OrdersPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
    },
    {
      path: "/ordering",
      name: "ordering",
      component: OrderingPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/order-detail",
      name: "detail",
      component: OrderDetailsPage,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    authGuard(to, from, next);
  } else {
    next();
  }
});

export default router;
