
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
import 'vant/lib/index.css'
import * as vant from 'vant'
app.use(createPinia())
app.use(router)
app.use(vant)
app.mount('#app')
