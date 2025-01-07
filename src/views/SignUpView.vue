<script setup>
  import { reactive, toRaw, ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";

  const router = useRouter();

  // Reactive state for form data
  const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });
  
  // Reactive state for error messages
  const errors = reactive({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    password_confirmation: null
  });

  const showPassword = ref(false);
  const showPasswordConfirmation = ref(false);
  
  // Form validation function
  const validateForm = () => {
    let isValid = true;
  
    if (!form.firstName) {
      errors.first_name = "First name is required";
      isValid = false;
    } else {
      errors.first_name = null;
    }
  
    if (!form.lastName) {
      errors.last_name = "Last name is required";
      isValid = false;
    } else {
      errors.last_name = null;
    }
  
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

    if (!form.passwordConfirmation) {
      errors.password_confirmation = "Password Confirmation is required";
      isValid = false;
    } else if (form.passwordConfirmation.length < 6 ) {
      errors.password_confirmation = "Password must be at least 6 characters";
      isValid = false;
    } else if (form.passwordConfirmation != form.password) {
      errors.password_confirmation = "Password confirmation is not match"
      isValid = false
    } else {
      errors.password_confirmation = null
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
  const handleSubmit = async () => {
    if (validateForm()) {
      // alert("Form submitted successfully");
      console.log("Form data:", toRaw(form));

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/sign-up', {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          password_confirmation : form.passwordConfirmation
          
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        Object.keys(errors).forEach((key) => {
          errors[key] = null;
        });

        // alert('Registration successful!');
        console.log('Response:', response.data);

      router.push('/')
      } catch (error) {
        const errorData = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          errors[key] = errorData[key] ? errorData[key][0] : null
        }) 
    }
    }
  };

// Redirect to log-in page
function redirectToLogin() {
  // console.log('Redirecting to Log In...');
  router.push('/login');
}
</script>

<template>
   <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <div class="container-split w-full max-w-5xl flex items-center justify-center">
      <!-- Left side - Registration Form -->
      <div class="w-full md:w-1/2 max-w-md">  
        <!-- Main Card -->
        <div class="bg-white p-8 rounded-lg shadow-sm">
          <h1 class="text-2xl font-semibold mb-6 font-sans">Sign up</h1>
  
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Name Fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm mb-1">First name</label>
                <input
                  type="text"
                  v-model="form.firstName"
                  class="form-input"
                  :class="{ error: errors.first_name }"
                  placeholder="First name"
                />
                <p v-if="errors.first_name" class="error-message">{{ errors.first_name }}</p>
              </div>
              <div>
                <label class="block text-sm mb-1">Last name</label>
                <input
                  type="text"
                  v-model="form.lastName"
                  class="form-input"
                  :class="{ error: errors.last_name }"
                  placeholder="Last name"
                />
                <p v-if="errors.last_name" class="error-message">{{ errors.last_name }}</p>
              </div>
            </div>
  
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
              <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
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
                @click="togglePasswordVisibility('password')"
                class="absolute right-2 bottom-2 text-gray-500"
              >
                <i v-if="showPassword" class="fas fa-eye-slash"></i>
                <i v-else class="fas fa-eye"></i>
              </button>
              </div>
              <div>
                <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
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
                <i v-if="showPasswordConfirmation" class="fas fa-eye-slash"></i>
                <i v-else class="fas fa-eye"></i>
              </button>
            </div>
            <div>
              <p v-if="errors.password_confirmation" class="error-message">{{ errors.password_confirmation }}</p>
            </div>
          </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-black font-semibold text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Create an account
            </button>
          </form>

                    <!-- Terms -->
          <p class="text-xs text-gray-600 mt-4">
            By clicking "Create account" above, you acknowledge that you will receive updates from the Relume team and that you have read, understood, and agreed to Relume Library's 
            <a href="#" class="text-black hover:underline">Terms & Conditions</a>,
            <a href="#" class="text-black hover:underline">Licensing Agreement</a> and
            <a href="#" class="text-black hover:underline">Privacy Policy</a>.
        </p>
  
          <!-- Login Link -->
          <div class="mt-6 flex items-center justify-between space-x-2">
            <span class="text-sm">Already have an Account?</span>
            <button
              @click="redirectToLogin"
              class="py-1 px-3 bg-white text-black border border-black rounded-md hover:bg-gray-100 transition-colors text-sm"
            >
            Login
           </button>
        </div>
        </div>
      </div>
  
      <!-- Right side - Testimonial and Logos -->
      <div class="hidden md:flex w-1/2 flex-col items-center justify-center pl-16">
        <div class="text-center mb-12">
          <img src="https://via.placeholder.com/48" alt="User" class="rounded-full mx-auto mb-4" />
          <p class="font-medium text-lg mb-2">Nothing short of groundbreaking for designers.</p>
          <p class="text-gray-600 mb-2">
            It immediately changes how I work and makes me 10x more productive as a web designer.
          </p>
          <p class="font-medium">@ransegall</p>
          <p class="text-sm text-gray-600">Founder, Flux Academy</p>
        </div>
        <div class="grid grid-cols-3 gap-8">
          <img src="https://via.placeholder.com/80x40?text=Nike" alt="Nike" class="opacity-50" />
          <img src="https://via.placeholder.com/80x40?text=Webflow" alt="Webflow" class="opacity-50" />
          <img src="https://via.placeholder.com/80x40?text=Rokt" alt="Rokt" class="opacity-50" />
        </div>
      </div>
    </div>
    </div>
  </template>
  
  
  
  <style scoped>
  .form-input {
  width: 100%;
  padding: 0.5rem;
  padding-right: 2.5rem;
  border: 0.5px solid #e5e7eb;
  border-radius: 0.45rem;
  background-color: #e7e9eb;
  font-size: 0.875rem;
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
.relative {
  position: relative;
}
  </style>
  