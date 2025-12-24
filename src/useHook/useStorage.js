import { ref, watch, onMounted } from 'vue'

/**
 * 本地存储可组合函数
 * @param {string} key - 存储的键名
 * @param {*} defaultValue - 默认值
 * @returns {Array} - 返回 [getter, setter] 数组，类似 useState
 */
export function useLocalStorage(key, defaultValue) {
  // 从 localStorage 获取初始值
  const getInitialValue = () => {
    const storedValue = localStorage.getItem(key)
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue)
      } catch (error) {
        console.error(`Error parsing localStorage item "${key}":`, error)
        return defaultValue
      }
    }
    return defaultValue
  }

  // 创建响应式引用
  const storedValue = ref(getInitialValue())

  // 同步到 localStorage
  const updateStorage = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error)
    }
  }

  // 设置新值的函数
  const setValue = (newValue) => {
    // 支持传入函数来更新值（类似 useState 的功能）
    const valueToStore = typeof newValue === 'function' ? newValue(storedValue.value) : newValue
    storedValue.value = valueToStore
  }

  // 监听值的变化并同步到 localStorage
  watch(
    storedValue,
    (newValue) => {
      updateStorage(newValue)
    },
    { deep: true },
  )

  // 在组件挂载时同步最新的 localStorage 值
  onMounted(() => {
    // 检查是否有其他标签页更新了 localStorage
    const currentValue = getInitialValue()
    if (currentValue !== storedValue.value) {
      storedValue.value = currentValue
    }
  })

  // 返回 getter 和 setter（类似 React 的 useState）
  return [storedValue, setValue]
}
