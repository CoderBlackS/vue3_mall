import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/index.less'
import { setupStore } from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import hyRequest from '@/service'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
app.use(ElementPlus)
//刷新继续存一遍token
setupStore()
app.mount('#app')
