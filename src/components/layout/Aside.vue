<template>
  <div class="layout-aside">
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      router
      :collapse="isCollapse"
    >
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
      
      <el-sub-menu index="system">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/users">用户管理</el-menu-item>
        <el-menu-item index="/system/roles">角色管理</el-menu-item>
        <el-menu-item index="/system/menus">菜单管理</el-menu-item>
      </el-sub-menu>
      
      <el-sub-menu index="data">
        <template #title>
          <el-icon><DataAnalysis /></el-icon>
          <span>数据管理</span>
        </template>
        <el-menu-item index="/data/charts">图表分析</el-menu-item>
        <el-menu-item index="/data/reports">报表统计</el-menu-item>
      </el-sub-menu>
      
      <el-sub-menu index="content">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/content/articles">文章管理</el-menu-item>
        <el-menu-item index="/content/categories">分类管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  House,
  Setting,
  DataAnalysis,
  Document
} from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = ref(route.path)

// 监听路由变化，更新激活菜单
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  }
)

// 是否折叠菜单
const isCollapse = ref(false)
</script>

<style scoped lang="less">
.layout-aside {
  height: 100%;
  overflow-y: auto;
  
  .sidebar-menu {
    border-right: none;
    min-height: 100%;
    
    :deep(.el-menu-item) {
      &:hover {
        background-color: #253545 !important;
      }
    }
    
    :deep(.el-sub-menu__title) {
      &:hover {
        background-color: #253545 !important;
      }
    }
  }
}
</style>