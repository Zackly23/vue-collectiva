import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);

app.use(router);
app.use(VCalendar, {
  popover: {
    placement: "top", // Sesuaikan posisi popover
  },
});

app.mount("#app");
