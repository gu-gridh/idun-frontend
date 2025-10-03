import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueMatomo from 'vue-matomo'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueMatomo, {
    host: import.meta.env.VITE_MATOMO_URL,
    siteId: import.meta.env.VITE_MATOMO_SITE_ID,
    router,
    enableLinkTracking: true,
    trackInitialView: true,
    debug: false
})

app.mount('#app')
