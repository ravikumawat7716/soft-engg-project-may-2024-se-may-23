import HomePage from "./components/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import SigninView from "./views/SigninView.vue";
import Layout from "./components/Layout.vue";
import UserDashboardView from "./views/UserDashboardView.vue";
import CourseView from "./views/CourseView.vue";

const routes = [
  {
    name: "Home",
    component: Layout,
    path: "/",
    children: [
      {
        path: "/",
        name: "home",
        component: HomePage,
      },
      {
        path: "/user-dashboard",
        name: "UserDashboard",
        component: UserDashboardView,
      },
      {
        path: "/user-dashboard/course",
        name: "coursePage",
        component: CourseView,
      },
    ],
  },
  {
    name: "SignIN",
    component: SigninView,
    path: "/signin",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
