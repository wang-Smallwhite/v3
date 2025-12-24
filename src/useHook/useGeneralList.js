import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 通用列表请求hook
 * @param {Function} fetchStore - 获取store实例的函数
 * @param {String} apiUrl - API请求地址
 * @param {Object} options - 配置选项
 * @param {Number} options.pageNumber - 页码，默认为1
 * @param {Number} options.pageSize - 每页大小，默认为10
 * @param {Function} options.transformData - 数据转换函数，用于处理API响应
 */
export function useGeneralList(fetchStore, apiUrl, options = {}) {
  const {
    pageNumber = 1,
    pageSize = 10,
    transformData = (data) => ({ list: data, total: data.length }),
  } = options

  // 获取状态管理仓库
  const store = fetchStore()

  // 用户取消请求（防止卸载组件后仍在请求）
  let controller = null

  // 获取列表函数
  const fetchList = async () => {
    store.setLoading(true)
    store.setError('')

    // 取消上一次请求
    if (controller) {
      controller.abort()
    }
    controller = new AbortController()
    try {
      console.log('Fetching list with', { page: pageNumber, size: pageSize })
      const response = await fetch(`${apiUrl}?page=${pageNumber}&size=${pageSize}`, {
        signal: controller.signal,
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()

      // 使用数据转换函数处理响应数据
      const transformedData = transformData(data)

      // 假设store有setList方法，如果没有则使用setUserList作为备选
      if (store.setList) {
        store.setList(transformedData.list)
      } else if (store.setUserList) {
        store.setUserList(transformedData.list)
      }

      if (store.setTotal) {
        store.setTotal(transformedData.total)
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        store.setError(error.message || 'Failed to fetch list')
      }
    } finally {
      store.setLoading(false)
    }
  }

  onUnmounted(() => {
    // 组件卸载时取消请求
    if (controller) {
      controller.abort()
    }
  })

  return {
    fetchList,
    list: store.list || store.userList,
    total: store.total,
    loading: store.loading,
    error: store.error,
  }
}

/**
 * 使用axios的通用列表请求hook
 * @param {Function} fetchStore - 获取store实例的函数
 * @param {String} apiUrl - API请求地址
 * @param {Object} options - 配置选项
 */
export async function useGeneralListWithAxios(fetchStore, apiUrl, options = {}) {
  const {
    pageNumber = 1,
    pageSize = 10,
    transformData = (data) => ({ list: data, total: data.length }),
    axiosInstance = null, // 可选的axios实例
  } = options

  const store = fetchStore()
  const request = axiosInstance || (await import('@/utils/request')).default

  const fetchList = async () => {
    store.setLoading(true)
    store.setError('')

    try {
      const response = await request.get(apiUrl, {
        params: {
          page: pageNumber,
          size: pageSize,
        },
      })

      const data = response.data
      const transformedData = transformData(data)

      if (store.setList) {
        store.setList(transformedData.list)
      } else if (store.setUserList) {
        store.setUserList(transformedData.list)
      }

      if (store.setTotal) {
        store.setTotal(transformedData.total)
      }
    } catch (error) {
      store.setError(error.message || 'Failed to fetch list')
    } finally {
      store.setLoading(false)
    }
  }

  return {
    fetchList,
    list: store.list || store.userList,
    total: store.total,
    loading: store.loading,
    error: store.error,
  }
}
