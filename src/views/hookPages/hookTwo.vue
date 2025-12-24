<template>
  <div>
    <!-- <h2>防抖示例</h2>
    <el-input
      v-model="delay"
      style="width: 60px"
      placeholder="延时"
      size="large"
      clearable
    ></el-input>

    <el-button type="primary" :disabled="loading" size="large" @click="submitClickDebounce">{{
      loading ? '提交中' : '提交'
    }}</el-button> -->
    <h2>用户列表示例</h2>
    <el-table :data="userList" border stripe :loading="userLoading" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="电话" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { useDebounce } from '@/useHook/useDebounce'
import { useUserList } from '@/useHook/userListHooks'
// const delay = ref(500)
// const submitClick = () => {
//   console.log('提交完成')
// }

// const { debouncedFn: submitClickDebounce, loading } = useDebounce(submitClick, delay)

const { fetchUserList, userList, total, loading: userLoading, error } = useUserList()

onMounted(() => {
  console.log('用户列表页加载完成，开始获取数据')
  fetchUserList()
})
</script>

<style lang="less" scoped></style>
