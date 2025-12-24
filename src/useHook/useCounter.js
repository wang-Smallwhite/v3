import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) { // 入参：可配置的初始值（普通值/响应值都可以）
  const count = ref(initialValue);  // 内部响应式状态
  const double = computed(() => count.value * 2); // 计算属性：count 的两倍

  // 内部： 操作函数（可操纵响应式状态）
  const increment = () => {
    count.value += 1;
  };
  const decrement = () => {
    count.value -= 1;
  }
  const reset = () => {
    count.value = initialValue;
  }
  // 返回值：暴露响应式状态和操作函数
  return {
    count, // 暴露响应式状态
    double, // 暴露计算属性
    increment, // 暴露操作函数
    decrement,  // 暴露操作函数
    reset // 暴露操作函数
  };
}
