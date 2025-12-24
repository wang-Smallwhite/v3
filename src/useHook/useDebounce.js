import { ref, unref, watch, onUnmounted } from 'vue';
export function useDebounce(fn, delay = 300) {
  let timer = null;
  const loading = ref(false);
  // unref 处理响应式和非响应式值
  watch(() => unref(delay), () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  })
  const debouncedFn = (...args) => {
    if (timer) clearTimeout(timer);
    loading.value = true;
    timer = setTimeout(() => {
      fn(...args);
      loading.value = false;
    }, unref(delay));
  }
  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  });

  return { debouncedFn, loading };
}
