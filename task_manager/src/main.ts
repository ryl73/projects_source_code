import { createApp } from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import router from "@/router/index";
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import PrimeVue from 'primevue/config';

createApp(App)
    .use(VueSidebarMenu)
    .use(router)
    .use(PrimeVue)
    .mount('#app')
