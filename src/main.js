import {createApp} from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import VueGeolocation from "vue3-geolocation/src";
import { createRouter, createWebHistory } from 'vue-router'
import Location from "@/components/Location";
import HelloWorld from "@/components/HelloWorld";
import AllCases from "@/components/AllCases";
import CreateCase from "@/components/CreateCase";
import AllLocation from "@/components/AllLocation";
import Testloc from "@/components/Testloc";

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/location', component: Location},
    {path: '/allcases', component: AllCases},
    {path: '/createcase', component: CreateCase},
    {path: '/alllocation', component: AllLocation},
    {path: '/testloc', component: Testloc},
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


