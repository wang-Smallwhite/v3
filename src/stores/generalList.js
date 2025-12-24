import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

/**
 * 创建通用列表store的工厂函数
 * @param {String} storeId - store的唯一标识符
 * @returns {Function} 返回一个defineStore函数
 */
export function createGeneralListStore(storeId) {
  return defineStore(storeId, () => {
    // 使用响应式数组存储列表数据
    const list = reactive([])
    const total = ref(0)
    const loading = ref(false)
    const error = ref('')
    const currentPage = ref(1)
    const pageSize = ref(10)

    // 设置列表数据
    function setList(items) {
      // 清空现有数据并添加新数据
      list.splice(0, list.length, ...items)
    }

    // 添加项目到列表
    function addItem(item) {
      list.push(item)
    }

    // 更新列表中的特定项目
    function updateItem(index, updatedItem) {
      if (index >= 0 && index < list.length) {
        list[index] = updatedItem
      }
    }

    // 删除列表中的特定项目
    function removeItem(index) {
      if (index >= 0 && index < list.length) {
        list.splice(index, 1)
      }
    }

    // 设置总数
    function setTotal(count) {
      total.value = count
    }

    // 设置加载状态
    function setLoading(isLoading) {
      loading.value = isLoading
    }

    // 设置错误信息
    function setError(errMsg) {
      error.value = errMsg
    }

    // 设置分页信息
    function setPagination(page, size) {
      currentPage.value = page
      pageSize.value = size
    }

    // 清空列表
    function clearList() {
      list.splice(0, list.length)
    }

    return {
      list,
      total,
      loading,
      error,
      currentPage,
      pageSize,
      setList,
      addItem,
      updateItem,
      removeItem,
      setTotal,
      setLoading,
      setError,
      setPagination,
      clearList,
    }
  })
}

// 为用户列表创建特定的store实例
export const useUserListStore = createGeneralListStore('userList')

// 为产品列表创建特定的store实例
export const useProductListStore = createGeneralListStore('productList')

// 为订单列表创建特定的store实例
export const useOrderListStore = createGeneralListStore('orderList')
