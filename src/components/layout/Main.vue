<template>
  <div class="layout-main">
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script setup>
// 主内容区组件，用于渲染路由匹配到的组件
</script>

<style scoped lang="less">
.layout-main {
  height: 100%;
  
  // 确保内容区有足够的空间
  :deep(.el-card) {
    margin-bottom: 20px;
  }
}
</style>