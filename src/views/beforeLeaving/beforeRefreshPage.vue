<template>
  <div>页面刷新前提示</div>
</template>

<script setup name="BeforeRefreshPage">
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})
function handleBeforeUnload(event) {
  event.preventDefault()
  event.returnValue = ''
}
</script>

<style lang="less" scoped></style>
