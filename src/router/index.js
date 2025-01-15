import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ProjectView from "@/views/dashboard/ProjectView.vue";
import ChatView from "@/views/dashboard/ChatView.vue";
import CalenderView from "@/views/dashboard/CalendarView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      children:
    [
      {
        path: '',
        name: 'dashboard-main',
        component: DashboardView
      },
      {
        path: 'project',
        name: 'dashboard-project',
        component: ProjectView
      },
      {
        path: 'chat',
        name: 'chat',
        component: ChatView
      },
      {
        path: 'calendar',
        name: 'calender',
        component: CalenderView
      }
    ]
    },
  ],

});

export default router;
