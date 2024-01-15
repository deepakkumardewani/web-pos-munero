import "@/assets/main.scss";

import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router";
// Components
import App from "./App.vue";

import Toast, { PluginOptions, POSITION } from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faBars,
  faMoon,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser, faArrowLeft, faBars, faSun, faMoon);

const pinia = createPinia();
const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

registerPlugins(app);

const options: PluginOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  hideProgressBar: true,
};

app.use(Toast, options);

app.use(pinia);
app.use(router);
app.mount("#app");
