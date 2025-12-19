# v3

This template should help get you started developing with Vue 3 in Vite.

## 移动端适配说明

本项目已支持移动端H5适配，采用px到rem的自动转换方案：
- 使用postcss-pxtorem插件自动将px单位转换为rem
- 根据设备屏幕宽度动态设置根字体大小
- 设计稿基准宽度为750px，1rem = 75px

开发时直接使用px单位即可，构建时会自动转换为rem单位。

## Element Plus 按需引入配置

1. 安装按需引入所需插件：
   ```bash
   npm install unplugin-auto-import unplugin-vue-components
   ```

2. 配置vite.config.js文件：
   ```javascript
   import AutoImport from 'unplugin-auto-import/vite'
   import Components from 'unplugin-vue-components/vite'
   import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

   export default defineConfig({
     plugins: [
       // 其他插件...
       AutoImport({
         resolvers: [ElementPlusResolver()],
       }),
       Components({
         resolvers: [ElementPlusResolver()],
       }),
     ],
   })
   ```

3. 使用Element Plus组件：
   ```vue
   <template>
     <el-button type="primary">主要按钮</el-button>
     <el-input v-model="input" placeholder="请输入内容"></el-input>
   </template>
   
   <script setup>
   import { ref } from 'vue'
   
   const input = ref('')
   </script>
   ```

## 第三方库自动导入配置

对于没有专用resolver的第三方库，可以通过AutoImport的imports选项配置自动导入：

1. 安装所需库：
   ```bash
   npm install axios dayjs lodash-es
   ```

2. 配置vite.config.js文件：
   ```javascript
   export default defineConfig({
     plugins: [
       // 其他插件...
       AutoImport({
         resolvers: [
           ElementPlusResolver()
         ],
         imports: [
           {
             'axios': [
               ['default', 'axios'] // 将 axios 默认导出命名为 axios
             ],
             'dayjs': [
               ['default', 'dayjs'] // 将 dayjs 默认导出命名为 dayjs
             ],
             'lodash-es': ['debounce', 'throttle', 'cloneDeep'] // 按需引入 lodash-es 中的特定函数
           }
         ]
       }),
     ],
   })
   ```

3. 使用时直接调用，无需手动导入：
   ```javascript
   // 在任何组件中都可以直接使用，无需导入
   const formattedDate = dayjs().format('YYYY-MM-DD')
   const response = await axios.get('/api/data')
   const debouncedFn = debounce(() => console.log('debounced'), 300)
   ```

## Axios封装

1. 创建utils/request.js文件：
   ```javascript
   import axios from 'axios'
   
   // 创建axios实例
   const service = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL || '',
     timeout: 15000,
     headers: {
       'Content-Type': 'application/json;charset=UTF-8'
     }
   })
   
   // 请求拦截器
   service.interceptors.request.use(
     (config) => {
       // 添加token等
       return config
     },
     (error) => {
       return Promise.reject(error)
     }
   )
   
   // 响应拦截器
   service.interceptors.response.use(
     (response) => {
       // 处理响应数据
       return response.data
     },
     (error) => {
       return Promise.reject(error)
     }
   )
   
   export default service
   ```

2. 创建api目录和接口文件(如api/user.js)：
   ```javascript
   import request from '@/utils/request'
   
   export function getUserInfo() {
     return request({
       url: '/user/info',
       method: 'get'
     })
   }
   ```

3. 创建认证工具(utils/auth.js)：
   ```javascript
   export function getToken() {
     return localStorage.getItem('access_token')
   }
   
   export function setToken(token) {
     return localStorage.setItem('access_token', token)
   }
   
   export function removeToken() {
     return localStorage.removeItem('access_token')
   }
   ```

## Less样式系统

1. 安装Less依赖：
   ```bash
   npm install less less-loader --save-dev
   ```

2. 配置vite.config.js支持Less：
   ```javascript
   export default defineConfig({
     css: {
       preprocessorOptions: {
         less: {
           javascriptEnabled: true,
           modifyVars: {},
         },
       },
     },
   })
   ```

3. 创建样式文件结构：
   ```bash
   src/
   └── styles/
       ├── index.less       # 全局样式入口
       ├── variables.less   # Less变量定义
       ├── mixins.less      # Less混入定义
       └── themes/
           ├── light.less   # 浅色主题
           └── dark.less    # 深色主题
   ```

4. 创建主题切换工具(utils/theme.js)：
   ```javascript
   export function toggleTheme() {
     const currentTheme = getCurrentTheme()
     const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
     setTheme(newTheme)
     return newTheme
   }
   
   export function initTheme() {
     // 初始化主题逻辑
   }
   ```

## 添加PostCSS插件流程

1. 安装postcss-pxtorem插件：
   ```bash
   npm install postcss-pxtorem --save-dev
   ```

2. 创建postcss.config.js配置文件：
   ```javascript
   export default {
     plugins: {
       'postcss-pxtorem': {
         rootValue: 75, // 设计稿宽度为750px时，1rem = 75px
         propList: ['*'], // 对所有属性进行转换
         selectorBlackList: ['.no-rem'], // 忽略.no-rem类中的px转换
         minPixelValue: 2, // 小于2px的不转换
         mediaQuery: false, // 不对媒体查询中的px进行转换
         exclude: /node_modules/i // 排除node_modules文件夹
       }
     }
   }
   ```

3. 在main.js中添加rem适配代码：
   ```javascript
   import { initRem } from './utils/rem'
   
   // 初始化rem适配
   initRem()
   ```

4. 创建src/utils/rem.js工具文件：
   ```javascript
   // 设置根字体大小
   export function setRootFontSize() {
     const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth
     // 假设设计稿宽度为750px，根字体大小为75px
     const fontSize = deviceWidth / 10
     document.documentElement.style.fontSize = fontSize + 'px'
     return fontSize
   }
   
   // px转rem函数
   export function pxToRem(px) {
     const rootFontSize = parseFloat(document.documentElement.style.fontSize) || 75
     return px / rootFontSize + 'rem'
   }
   
   // 监听窗口大小变化
   export function initRem() {
     setRootFontSize()
     window.addEventListener('resize', setRootFontSize)
   }
   
   export default {
     setRootFontSize,
     pxToRem,
     initRem
   }
   ```


# 在项目根目录执行
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main