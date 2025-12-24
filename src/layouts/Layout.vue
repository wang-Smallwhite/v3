<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="layout-aside">
      <Aside />
    </el-aside>

    <!-- 主容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="layout-header">
        <Header />
      </el-header>

      <!-- 主要内容 -->
      <el-main class="layout-main">
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Aside from '@/components/layout/Aside.vue'
import Main from '@/components/layout/Main.vue'
</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;

  .layout-aside {
    background-color: #304156;
    color: #fff;
    overflow: hidden;
  }

  .layout-header {
    background-color: var(--white);
    color: #333;
    border-bottom: 1px solid #eee;
    padding: 0;
    height: 30px;
    line-height: 30px;
  }

  .layout-main {
    background-color: var(--background-color);
    overflow-y: auto;
  }
}
</style>
