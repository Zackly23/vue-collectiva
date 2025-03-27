<script setup>
import { reactive, toRaw, ref, provide } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/assets/cuteicon.png";
import api from "@/api";
import { useToast } from "vue-toast-notification";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const toastNotification = useToast();
const authStore = useAuthStore();
const openNotificatication = (message, type = "success") => {
  toastNotification.open({
    type: type,
    message: message,
    position: "top-right",
    duration: 3000,
  });
};

// Reactive state for form data
const form = reactive({
  email: "",
  password: "",
});

// Reactive state for error messages
const errors = reactive({
  email: null,
  password: null,
});

const showPassword = ref(false);

// Form validation function
const validateForm = () => {
  let isValid = true;

  if (!form.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email format";
    isValid = false;
  } else {
    errors.email = null;
  }

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  } else {
    errors.password = null;
  }

  return isValid;
};

// Reactive state for visibility toggle
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSocialLogin = async (provider) => {
  try {
    const response = await api.get(`auth/${provider}/redirect`);
    console.log("Social Login response:", response.data);

    window.location.href = response.data.redirect_url;
  } catch (error) {
    console.error("Error during Social Login:", error.response || error);
    openNotificatication("Terjadi Kesalahan Saat Login", "warning");
  }
};

// Form submission handler
const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const response = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      Object.keys(errors).forEach((key) => {
        errors[key] = null;
      });

      console.log("Login response:", response.data);
      const userId = response.data.user.user_id;
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      let user = response.data.user;
      let roles = response.data.roles;
      let permissions = response.data.permissions;

      if (response.status == 200) {
        openNotificatication("Selamat Datang!, Anda Berhasil Login");
        authStore.setUser(user, roles, permissions);

        console.log("User setelah login:", authStore.user);
        console.log("Roles setelah login:", authStore.roles);
        console.log("Permissions setelah login:", authStore.permissions);
        console.log("LocalStorage Roles:", localStorage.getItem("roles"));
        console.log(
          "LocalStorage Permissions:",
          localStorage.getItem("permissions")
        );

        console.log(
          "Last Visited Page:",
          localStorage.getItem("last_visited_page")
        );

        if (localStorage.getItem("last_visited_page")) {
          router.push(localStorage.getItem("last_visited_page"));
        }
          router.push(`/dashboard/${userId}`);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          openNotificatication(
            "Akun tidak ditemukan! Pastikan email sudah benar.",
            "error"
          );
        } else {
          openNotificatication(
            "Terjadi Kesalahan Saat Login \nPastikan Email dan Password Benar!",
            "warning"
          );
        }
      }

      console.error("Error during Login:", error.response || error);
      const errorData = error.response.data.data;
      Object.keys(errors).forEach((key) => {
        errors[key] = errorData[key] ? errorData[key][0] : null;
      });

      // alert('Login failed. Please try again.');
    }
  }
};

// Redirect to sign-up page
function redirectToSignup() {
  console.log("Redirecting to Sign Up...");
  router.push("/sign-up");
  // Add navigation logic here, e.g., router.push('/signup')
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <div
      class="container-split w-full max-w-5xl flex items-center justify-center"
    >
      <!-- Left side - Registration Form -->
      <div class="w-full md:w-1/2 max-w-md">
        <!-- Logo
            <div class="hidden md:flex justify-center mb-8">
            <img :src="Icon" alt="Relume Logo" class="w-12 h-12 rounded-md object-cover" />
            </div> -->

        <!-- Main Card -->
        <div class="bg-white p-8 rounded-3xl shadow-sm">
          <h1 class="text-2xl font-semibold mb-6 font-sans">Log In</h1>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Email Field -->
            <div>
              <label class="block text-sm mb-1">Email</label>
              <input
                type="text"
                v-model="form.email"
                class="form-input"
                :class="{ error: errors.email }"
                placeholder="Email address"
              />
              <p v-if="errors.email" class="error-message">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password Field -->
            <div>
              <div class="relative">
                <label class="block text-sm mb-1">Password</label>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  class="form-input"
                  :class="{ error: errors.password }"
                  placeholder="Password"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility()"
                  class="absolute right-2 bottom-2 text-gray-500"
                >
                  <i v-if="showPassword" class="fas fa-eye-slash"></i>
                  <i v-else class="fas fa-eye"></i>
                </button>
              </div>
              <div>
                <p v-if="errors.password" class="error-message">
                  {{ errors.password }}
                </p>
              </div>
            </div>

            <div class="text-right mt-1">
              <router-link
                to="/password/send-reset"
                class="text-sm text-gray-600 hover:underline"
              >
                Forgot Password?
              </router-link>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-black font-semibold text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Login In
            </button>
          </form>

          <!-- Social Login Buttons -->
          <div class="mt-4">
            <p class="text-center text-sm text-gray-600 mb-4">Or login with</p>
            <div class="flex justify-center space-x-4">
              <button
                @click="handleSocialLogin('google')"
                class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                title="google"
              >
                <i class="ui uil-google"></i>
              </button>
              <!-- <button
                @click="handleSocialLogin('twitter')"
                class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <i class="ui uil-twitter"></i>
              </button>
              <button
                @click="handleSocialLogin('github')"
                class="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                <i class="ui uil-github"></i>
              </button> -->
            </div>
          </div>

          <!-- Sign Up Link -->
          <div class="mt-6 flex items-center justify-between space-x-2">
            <span class="text-xs">Don't Have an Account?</span>
            <button
              @click="redirectToSignup"
              class="py-1 px-3 bg-white text-black border border-black rounded-md hover:bg-gray-100 transition-colors text-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.45rem;
  background-color: #e7e9eb;
  font-size: 0.875rem; /* Ubah font size menjadi lebih kecil */
  transition: border-color 0.3s, box-shadow 0.3s;
}
.form-input.error {
  border-color: #f87171;
  background-color: #fee2e2;
}
.error-message {
  color: #f87171;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
