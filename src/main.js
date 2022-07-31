import {createApp} from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import VueGeolocation from "vue3-geolocation/src";
import { createRouter, createWebHistory } from 'vue-router'
import Location from "@/components/Location";
import Auth from "@/components/Auth";
import AllCases from "@/components/AllCases";
import CreateCase from "@/components/CreateCase";
import AllLocation from "@/components/AllLocation";

const routes = [
    {path: '/', component: Auth},
    {path: '/location', component: Location},
    {path: '/allcases', component: AllCases},
    {path: '/createcase', component: CreateCase},
    {path: '/alllocation', component: AllLocation},
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

createApp(App)
    .use(router)
    .use(naive)
    .use(VueGeolocation)
    .mount('#app');


