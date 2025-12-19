import './styles/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initRem } from './utils/rem'
import { initTheme } from './utils/theme'

// 初始化rem适配
initRem()

// 初始化主题
initTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
