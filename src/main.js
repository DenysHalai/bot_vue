import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import VueGeolocation from "vue3-geolocation/src";

createApp(App).use(naive).use(VueGeolocation).mount('#app');
