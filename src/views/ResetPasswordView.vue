<script setup>
import { reactive, toRaw, ref } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/assets/cuteicon.png";
import api from "@/api";

const router = useRouter();

// Reactive state for form data
const form = reactive({
  email: "",
});

// Reactive state for error messages
const errors = reactive({
  email: null,
});

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

  return isValid;
};

// Form submission handler
const sendResetPassword = async () => {
  if (validateForm()) {
    try {
      const response = await api.post("/password/send-reset", {
        email: form.email,
      });

      Object.keys(errors).forEach((key) => {
        errors[key] = null;
      });

      if (response.status == 200) {
        router.push("/");
      }
    } catch (error) {
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
          <h1 class="text-2xl font-semibold mb-6 font-sans">Reset Password</h1>

          <form @submit.prevent="sendResetPassword" class="space-y-4">
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

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-black font-semibold text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Send Reset Link
            </button>
          </form>

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
