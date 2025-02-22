import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ProjectView from "@/views/dashboard/ProjectView.vue";
import ChatView from "@/views/dashboard/ChatView.vue";
import CalenderView from "@/views/dashboard/CalendarView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import ProjectDetailView  from "@/views/dashboard/ProjectDetailView.vue";
import ProjectCreateView from "@/views/dashboard/ProjectCreateView.vue";
import ProfileSettingView from "@/views/dashboard/ProfileSettingView.vue";
import EmailVerificationView from "@/views/EmailVerificationView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import NewPasswordView from "@/views/NewPasswordView.vue";
import ContributionView from "@/views/dashboard/ContributionView.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import ProjectMainDetailView from "@/views/ProjectMainDetailView.vue";
import DonationView from "@/views/DonationView.vue";
import PaymentDonationView from "@/views/PaymentDonationView.vue";
import VolunteerView from "@/views/VolunteerView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "/project/:projectId",
          name: "project-main-detail",
          component: ProjectMainDetailView,
        },

      ],
    },
    {
      path: "/project/:projectId/donation",
      name: "project-donation",
      component: DonationView,
    },
    {
      path: "/donation/payment/:projectId",
      name: "donation-payment",
      component: PaymentDonationView,
    },
    {
      path: "/project/:projectId/volunteer",
      name: "donation-payment",
      component: VolunteerView,
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
      path: "/password/reset/:token",
      name: "password-reset",
      component: NewPasswordView
    },
    {
      path: "/password/send-reset",
      name: "password-send-reset",
      component: ResetPasswordView
    },
    {
      path: "/email/verify/:id/:hash",
      name: "email-verification",
      component: EmailVerificationView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      children:
    [
      
      {
        path: ':userId',
        name: 'dashboard-main',
        component: DashboardView
      },
      {
        path: 'profile/setting',
        name: 'profile-setting',
        component: ProfileSettingView
      },
      {
        path: 'project',
        name: 'dashboard-project',
        component: ProjectView,
      },
      {
        path: 'project/create',
        name: 'dashboard-project-create',
        component: ProjectCreateView
      },
      {
        path: 'project/:projectid',
        name: 'projetct-detail',
        component: ProjectDetailView
      },
      {
        path: 'kontribusi',
        name: 'kontribusi',
        component: ContributionView
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
