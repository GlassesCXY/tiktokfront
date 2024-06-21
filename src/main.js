
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
const app = createApp(App)
import 'vant/lib/index.css'
import 'element-plus/dist/index.css'
import * as vant from 'vant'
app.use(createPinia())
app.use(router)
app.use(vant)
app.use(ElementPlus)
app.mount('#app')
