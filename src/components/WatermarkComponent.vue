<template>
  <div v-if="showWatermark" class="watermark-container">
    <div class="watermark-content">
      <div
        v-for="(item, index) in watermarkItems"
        :key="index"
        class="watermark-item"
        :style="{
          left: item.left + 'px',
          top: item.top + 'px',
          transform: `rotate(${rotation}deg)`,
        }"
      >
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 定义 props
const props = defineProps({
  // 水印内容
  content: {
    type: String,
    default: '内部文档',
  },
  // 水印颜色
  color: {
    type: String,
    default: 'rgba(0, 0, 0, 0.3)',
  },
  // 水印字体大小
  fontSize: {
    type: String,
    default: '14px',
  },
  // 水印旋转角度
  rotation: {
    type: Number,
    default: -20,
  },
  // 水印间距
  gap: {
    type: Number,
    default: 100,
  },
  // 水印宽度
  width: {
    type: Number,
    default: 200,
  },
  // 水印高度
  height: {
    type: Number,
    default: 100,
  },
})

// 是否显示水印
const showWatermark = ref(true)

// 水印项目数组
const watermarkItems = ref([])

// 生成水印
const generateWatermark = () => {
  watermarkItems.value = []

  // 计算屏幕尺寸
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  // 计算需要的水印数量
  const cols = Math.ceil(screenWidth / props.gap) + 1
  const rows = Math.ceil(screenHeight / props.gap) + 1

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      watermarkItems.value.push({
        left: i * props.gap,
        top: j * props.gap,
      })
    }
  }
}

// 初始化
onMounted(() => {
  generateWatermark()

  // 监听窗口大小变化
  window.addEventListener('resize', generateWatermark)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', generateWatermark)
})
</script>

<style scoped>
.watermark-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.watermark-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.watermark-item {
  position: absolute;
  color: v-bind('props.color');
  font-size: v-bind('props.fontSize');
  white-space: nowrap;
  user-select: none;
  font-weight: bold;
  opacity: 0.1;
  transform-origin: 0 0;
}
</style>
