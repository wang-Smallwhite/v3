<template>
  <!-- 全局主题切换按钮 -->
  <div class="theme-toggle-btn" @click="toggleTheme">
    <svg v-if="currentTheme === 'light'" class="icon sun-icon" viewBox="0 0 24 24" width="20" height="20">
      <path fill="currentColor" d="M12 9c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5zM12 5c.552 0 1-.448 1-1v-1c0-.552-.448-1-1-1s-1 .448-1 1v1c0 .552.448 1 1 1zM12 22c-.552 0-1-.448-1-1v-1c0-.552.448-1 1-1s1 .448 1 1v1c0 .552-.448 1-1 1zM6.343 6.343c.391.391.391 1.024 0 1.414-.391.391-1.024.391-1.414 0-.391-.391-.391-1.024 0-1.414.391-.391 1.024-.391 1.414 0zM17.657 17.657c-.391-.391-.391-1.024 0-1.414.391-.391 1.024-.391 1.414 0 .391.391.391 1.024 0 1.414-.391.391-1.024.391-1.414 0zM5 12c0-.552-.448-1-1-1h-1c-.552 0-1 .448-1 1s.448 1 1 1h1c.552 0 1-.448 1-1zM20 12c0 .552.448 1 1 1h1c.552 0 1-.448 1-1s-.448-1-1-1h-1c-.552 0-1 .448-1 1zM6.343 17.657c.391-.391.391-1.024 0-1.414-.391-.391-1.024-.391-1.414 0-.391.391-.391 1.024 0 1.414.391.391 1.024.391 1.414 0zM17.657 6.343c-.391.391-.391 1.024 0 1.414.391.391 1.024.391 1.414 0 .391-.391.391-1.024 0-1.414-.391-.391-1.024-.391-1.414 0z"/>
    </svg>
    <svg v-else class="icon moon-icon" viewBox="0 0 24 24" width="20" height="20">
      <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10 0-.463-.042-.917-.118-1.364a8.97 8.97 0 0 1-2.518 1.099c-.82.252-1.7.365-2.602.365-4.971 0-9-4.029-9-9 0-.902.113-1.782.365-2.602a8.97 8.97 0 0 1 1.099-2.518A9.94 9.94 0 0 0 7.964 2c-5.523 0-10 4.477-10 10s4.477 10 10 10z"/>
    </svg>
  </div>
</template>

<script setup>
import { toggleTheme, getCurrentTheme } from '../utils/theme'
import { computed } from 'vue'

const currentTheme = computed(() => getCurrentTheme())
</script>

<style lang="less" scoped>
.theme-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--background-color-overlay);
  box-shadow: var(--shadow-1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-2);
}

/* 暗色主题下的按钮样式 */
[data-theme="dark"] .theme-toggle-btn {
  background-color: var(--gray-3);
  border-color: var(--gray-4);
}

.sun-icon {
  color: #f59e0b; /* 琥珀色 */
}

.moon-icon {
  color: #fbbf24; /* 黄色 */
}
</style>