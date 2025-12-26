import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', // API基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以添加token等信息
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 如果是post请求且数据是FormData，则删除Content-Type让浏览器自动设置
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data

    // 根据实际业务需求调整判断条件
    if (res.code === 200) {
      return res
    } else {
      // 统一处理错误
      console.error('响应错误:', res.message || '未知错误')
      return Promise.reject(new Error(res.message || '未知错误'))
    }
  },
  (error) => {
    // 对响应错误做点什么
    console.error('响应错误:', error)

    // 根据错误类型进行不同处理
    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 401:
          // 未授权，跳转登录页
          console.error('未授权，请重新登录')
          // 可以在这里清除token并跳转到登录页
          break
        case 403:
          console.error('拒绝访问')
          break
        case 404:
          console.error('请求地址出错')
          break
        case 500:
          console.error('服务器内部错误')
          break
        case 'ECONNABORTED':
          // 请求超时 弹窗提示用户重新请求

          break
        default:
          console.error(`错误:${error.response.status}`)
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，请检查网络连接')
    } else {
      // 其他错误
      console.error('请求失败:', error.message)
    }

    return Promise.reject(error)
  }
)

export default service
