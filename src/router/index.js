import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ProjectView from "@/views/dashboard/ProjectView.vue";
import ChatView from "@/views/dashboard/ChatView.vue";
import CalenderView from "@/views/dashboard/CalendarView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import ProjectDetailView from "@/views/dashboard/ProjectDetailView.vue";
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
import ProjectManagementView from "@/views/dashboard/admin/ProjectManagementView.vue";
import AccountManagementView from "@/views/dashboard/admin/AccountManagementView.vue";
import WithdrawalDonationView from "@/views/dashboard/WithdrawalDonationView.vue";
import Forbidden from "@/views/errors/403.vue"; // Import halaman 403
import NotFound from "@/views/errors/404.vue"; // Import halaman 404
import ProjectMainView from "@/views/ProjectMainView.vue";
import AuthLoginCallbackView from "@/views/AuthLoginCallbackView.vue";
import FAQView from "@/views/dashboard/FAQView.vue";
import ComunityGuidance from "@/views/dashboard/ComunityGuidance.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
          meta: { requiresAuth: false, title: "Home" },
        },
        {
          path: "project/list",
          name: "project-list",
          component: ProjectMainView,
          meta: { requiresAuth: false, title: "Project List" },
        },
        {
          path: "/project/:projectId",
          name: "project-main-detail",
          component: ProjectMainDetailView,
          meta: { requiresAuth: false, title: "Project Detail" },
        },
      ],
    },
    {
      path: "/project/:projectId/donation",
      name: "project-donation",
      component: DonationView,
      meta: {
        requiresAuth: true,
        role: ["admin", "active", "verified", "reported", "suspended"],
        title: "Donation",
      },
    },
    {
      path: "/project/:projectId/donation/withdrawal",
      name: "projetct-withdrawal",
      component: WithdrawalDonationView,
      meta: {
        requiresAuth: true,
        role: ["admin", "active", "verified", "reported"],
        title: "Withdrawal",
      },
    },
    {
      path: "/donation/payment/:projectId",
      name: "donation-payment",
      component: PaymentDonationView,
      meta: {
        requiresAuth: true,
        role: ["admin", "active", "verified", "reported"],
        title: "Payment",
      },
    },
    {
      path: "/project/:projectId/volunteer",
      name: "donation-payment",
      component: VolunteerView,
      meta: {
        requiresAuth: true,
        role: ["admin", "active", "verified", "reported"],
        title: "Volunteer",
      },
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpView,
      meta: { requiresAuth: false, blockIfLoggedIn: true, title: "Sign Up" },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false, blockIfLoggedIn: true, title: "Login" },
    },
    {
      path: "/auth/callback",
      name: "auth-callback",
      component: AuthLoginCallbackView,
      meta: { requiresAuth: false, blockIfLoggedIn: true, title: "SSO Login" },
    },
    {
      path: "/password/reset/:token",
      name: "password-reset",
      component: NewPasswordView,
      meta: {
        requiresAuth: false,
        blockIfLoggedIn: true,
        title: "Reset Password",
      },
    },
    {
      path: "/password/send-reset",
      name: "password-send-reset",
      component: ResetPasswordView,
      meta: {
        requiresAuth: false,
        blockIfLoggedIn: true,
        title: "Send Reset Password",
      },
    },
    {
      path: "/email/verify/:id/:hash",
      name: "email-verification",
      component: EmailVerificationView,
      meta: {
        requiresAuth: false,
        blockIfLoggedIn: false,
        title: "Email Verification",
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardLayout,

      children: [
        {
          path: ":userId",
          name: "dashboard-main",
          component: DashboardView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Dashboard",
          },
        },
        {
          path: "profile/setting",
          name: "profile-setting",
          component: ProfileSettingView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Profile Setting",
          },
        },
        {
          path: "project",
          name: "dashboard-project",
          component: ProjectView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Project",
          },
        },
        {
          path: "project/create",
          name: "dashboard-project-create",
          component: ProjectCreateView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported"],
            title: "Create Project",
          },
        },
        {
          path: "project/:projectid",
          name: "projetct-detail",
          component: ProjectDetailView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Project Detail",
          },
        },

        {
          path: "kontribusi",
          name: "kontribusi",
          component: ContributionView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Contribution",
          },
        },
        {
          path: "chat",
          name: "chat",
          component: ChatView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Chat",
          },
        },
        {
          path: "calendar",
          name: "calender",
          component: CalenderView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Calendar",
          },
        },
        {
          path: "faq",
          name: "faq",
          component: FAQView,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "FAQ",
          },
        },
        {
          path: "guidance",
          name: "guidance",
          component: ComunityGuidance,
          meta: {
            requiresAuth: true,
            role: ["admin", "active", "verified", "reported", "suspended"],
            title: "Guidance",
          },
        },
        {
          path: "management/project",
          name: "management-project",
          component: ProjectManagementView,
          meta: {
            requiresAuth: true,
            role: ["admin"],
            title: "Project Management",
          },
        },
        {
          path: "management/account",
          name: "management-account",
          component: AccountManagementView,
          meta: {
            requiresAuth: true,
            role: ["admin"],
            title: "Account Management",
          },
        },
      ],
    },
    {
      path: "/403",
      name: "403",
      component: Forbidden,
      title: "Forbidden Page",
    }, // Route 403
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      title: "Page Not Found",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const userRoles =
    authStore.roles || JSON.parse(localStorage.getItem("roles")) || [];
  const userPermissions =
    authStore.permissions ||
    JSON.parse(localStorage.getItem("permissions")) ||
    [];

  if (to.meta.blockIfLoggedIn && userRoles.length > 0) {
    next(false); // Redirect ke dashboard jika sudah login
  }

  if (to.meta.requiresAuth) {
    if (!userRoles.length && !userPermissions.length) {
      next("/"); // Redirect jika user tidak punya role & permission
    } else if (
      to.meta.role &&
      !to.meta.role.some((role) => userRoles.includes(role))
      // to.meta.permission && !to.meta.permission.some(permission => userPermissions.includes(permission))
    ) {
      next("/403"); // Redirect jika tidak ada role/permission yang cocok
    } else {
      next();
    }
  } else {
    next();
  }
});

// Update title berdasarkan meta title setiap kali route berubah
router.afterEach((to) => {
  document.title = to.meta.title || "SHCUnion";
});

export default router;
