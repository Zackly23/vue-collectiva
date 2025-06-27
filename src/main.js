import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VCalendar from "v-calendar";
import { setupCalendar } from "v-calendar";
import "v-calendar/style.css";
import './echo.js';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createPinia } from 'pinia';
import accessDirective from './directives/access';
import actionDirective from './directives/action';


if (import.meta.env.MODE === 'production') {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}


const app = createApp(App);
const pinia = createPinia();

app.use(ToastPlugin, {
  position: 'top-right'
});
app.directive('access', accessDirective);
app.directive('action', actionDirective);

app.use(pinia);
app.use(router);
app.use(VCalendar, {
  popover: {
    placement: "top", // Sesuaikan posisi popover
  },
  componentPrefix: 'V', // Pastikan komponen diawali "V" (contoh: VCalendar, VDatePicker)

});



app.mount("#app");
