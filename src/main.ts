import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// 使用虚拟router 自动引入pages 下面的路由
import routes from 'virtual:generated-pages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
