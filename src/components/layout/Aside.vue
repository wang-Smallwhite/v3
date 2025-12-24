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
      :unique-opened="true"
    >
      <template v-for="route in menuRoutes" :key="route.path">
        <el-menu-item v-if="!route.children || route.children.length === 1" :index="route.path">
          <el-icon v-if="route.meta && route.meta.icon">
            <component :is="route.meta.icon" />
          </el-icon>
          <span>{{ route.meta && route.meta.title ? route.meta.title : route.name }}</span>
        </el-menu-item>

        <el-sub-menu v-else :index="route.name || route.path">
          <template #title>
            <el-icon v-if="route.meta && route.meta.icon">
              <component :is="route.meta.icon" />
            </el-icon>
            <span>{{ route.meta && route.meta.title ? route.meta.title : route.name }}</span>
          </template>

          <template v-for="child in route.children" :key="child.path">
            <el-menu-item v-if="!child.hidden" :index="child.path">
              {{ child.meta && child.meta.title ? child.meta.title : child.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/router/routes'
const route = useRoute()
const activeMenu = ref(route.path)

// 菜单路由数据
const menuRoutes = ref([])

onMounted(() => {
  // 使用导入的路由配置
  const allRoutes = routes

  // 过滤出需要显示在菜单中的路由
  menuRoutes.value = allRoutes.filter((route) => {
    // 排除空路径的默认路由
    if (route.path === '') {
      return false
    }
    // 如果路由有 meta.hidden 属性且为 true，则不显示在菜单中
    if (route.meta && route.meta.hidden === true) {
      return false
    }
    return true
  })
})

// 监听路由变化，更新激活菜单
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  },
  { immediate: true },
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
