import { createApp } from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import router from "@/router/index";
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

createApp(App).use(VueSidebarMenu).use(router).mount('#app')
