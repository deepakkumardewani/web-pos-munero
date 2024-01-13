import "@/assets/main.scss";

import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";
import { createApp } from "vue";
import router from "./router";

// Components
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser);

const pinia = createPinia();
const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

registerPlugins(app);
app.use(pinia);
app.use(router);
app.mount("#app");
