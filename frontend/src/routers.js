import HomePage from "./components/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import SigninView from "./views/SigninView.vue";
import Layout from "./components/Layout.vue";
import UserDashboardView from "./views/UserDashboardView.vue";
import CourseView from "./views/CourseView.vue";
import CreateAssignment from "./views/CreateAssignment.vue";
import CreateCourse from "./views/CreateCourse.vue";
import LectureView from "./views/LectureView.vue";
import AssignmentView from "./views/AssignmentView.vue";

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
        path: "/user-dashboard/courseId",
        name: "coursePage",
        component: CourseView,
        children: [
          {
            path: "/user-dashboard/courseId/lectureId",
            name: "LectureView",
            component: LectureView,
          },
          {
            path: "/user-dashboard/courseId/assignments/assignmentId",
            name: "AssignmentView",
            component: AssignmentView,
          },
        ],
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
