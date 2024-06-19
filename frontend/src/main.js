import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FcGoogle } from "oh-vue-icons/icons";

import "./styles/index.css";

addIcons(FcGoogle);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(router);
app.mount("#app");
