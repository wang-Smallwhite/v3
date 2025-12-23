<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import themeToggleBtn from './components/themeToggleBtn.vue'
import WatermarkComponent from './components/WatermarkComponent.vue'
import { useRoute } from 'vue-router'

// 需要显示水印的页面路径列表
const watermarkPages = ref(['/WatermarkOne'])

// 获取当前路由
const route = useRoute()

// 计算是否显示水印
const showWatermark = computed(() => {
  return watermarkPages.value.includes(route.path)
})
</script>

<template>
  <RouterView />
  <themeToggleBtn />
  <WatermarkComponent v-if="showWatermark" content="内部文档" />
</template>

<style></style>
