import './styles/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initRem } from './utils/rem'
import { initTheme } from './utils/theme'

// Element Plus Icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 初始化rem适配
initRem()

// 初始化主题
initTheme()

const app = createApp(App)

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
