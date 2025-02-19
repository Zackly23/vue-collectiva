<script setup>
import { reactive, toRaw, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Icon from "@/assets/cuteicon.png";

const router = useRouter();
const route = useRoute();

const resetToken = route.params.token;
const email = route.query.email;


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Reactive state for form data
const form = reactive({
  password: "",
  passwordConfirmation: "",
});

// Reactive state for error messages
const errors = reactive({
  password: null,
  password_confirmation: null,
});

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

// Form validation function
const validateForm = () => {
  let isValid = true;

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  } else {
    errors.password = null;
  }

  if (!form.passwordConfirmation) {
    errors.password_confirmation = "Password Confirmation is required";
    isValid = false;
  } else if (form.passwordConfirmation.length < 6) {
    errors.password_confirmation = "Password must be at least 6 characters";
    isValid = false;
  } else if (form.passwordConfirmation != form.password) {
    errors.password_confirmation = "Password confirmation is not match";
    isValid = false;
  } else {
    errors.password_confirmation = null;
  }

  return isValid;
};

// Reactive state for visibility toggle
const togglePasswordVisibility = (field) => {
  if (field === "password") {
    showPassword.value = !showPassword.value;
  } else if (field === "passwordConfirmation") {
    showPasswordConfirmation.value = !showPasswordConfirmation.value;
  }
};

// Form submission handler
const resetPassword = async () => {
  if (validateForm()) {
    console.log('token : ', resetToken)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/password/reset`,
        {
          email: email,
          token: resetToken,
          password: form.password,
          password_confirmation: form.passwordConfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Object.keys(errors).forEach((key) => {
        errors[key] = null;
      });


      if (response.status == 200) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during Login:", error.response || error);

      // alert('Login failed. Please try again.');
    }
  }
};

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

          <form @submit.prevent="resetPassword" class="space-y-4">
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
                  @click="togglePasswordVisibility('password')"
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

            <!-- Password Confirmation Field -->
            <div>
              <div class="relative">
                <label class="block text-sm mb-1">Password Confirmation</label>
                <input
                  :type="showPasswordConfirmation ? 'text' : 'password'"
                  v-model="form.passwordConfirmation"
                  class="form-input"
                  :class="{ error: errors.password_confirmation }"
                  placeholder="Password"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility('passwordConfirmation')"
                  class="absolute right-2 bottom-2 text-gray-500"
                >
                  <i
                    v-if="showPasswordConfirmation"
                    class="fas fa-eye-slash"
                  ></i>
                  <i v-else class="fas fa-eye"></i>
                </button>
              </div>
              <div>
                <p v-if="errors.password_confirmation" class="error-message">
                  {{ errors.password_confirmation }}
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-black font-semibold text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Reset Password
            </button>
          </form>
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
