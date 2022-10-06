import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { i18n } from "./localization";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(ElementPlus);

app.mount("#app");
