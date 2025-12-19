<template>
  <div class="layout-header">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { User, SwitchButton } from '@element-plus/icons-vue'

const route = useRoute()

// 面包屑数据
const breadcrumbItems = ref([{ path: '/', title: '首页' }])

// 监听路由变化更新面包屑
watch(
  () => route.path,
  () => {
    // 根据当前路由生成面包屑
    const matched = route.matched.filter((item) => item.meta && item.meta.title)
    const breadcrumbs = matched.map((item) => ({
      path: item.path,
      title: item.meta.title || item.name,
    }))

    // 添加首页
    breadcrumbItems.value = [{ path: '/', title: '首页' }, ...breadcrumbs]
  },
  { immediate: true },
)
</script>

<style scoped lang="less">
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .breadcrumb {
    flex: 1;

    :deep(.el-breadcrumb__inner) {
      font-weight: normal;

      &.is-link {
        color: #666;
        font-weight: normal;

        &:hover {
          color: #409eff;
        }
      }
    }

    :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
      color: #333;
      font-weight: 600;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;

    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;

      .user-name {
        margin-left: 8px;
        color: #333;
        font-size: 12px;
      }
    }
  }
}
</style>
