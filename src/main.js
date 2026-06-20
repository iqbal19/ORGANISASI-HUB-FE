import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Vue3Marquee from "vue3-marquee";
import VueDraggableResizable from "vue-draggable-resizable";

import App from "./App.vue";
import router from "./router";
import "@/extends/plugins/axios";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component("vue-draggable-resizable", VueDraggableResizable);
app.use(Vue3Marquee);
app.use(pinia);
app.use(router);

app.mount("#app");
