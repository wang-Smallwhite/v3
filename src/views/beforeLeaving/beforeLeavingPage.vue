<template>
  <div></div>
</template>

<script setup name="BeforeLeavingPage">
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm('确定要离开此页面吗？未保存的更改将会丢失。')
  if (answer) {
    next()
  } else {
    next(false)
  }
})
</script>

<style lang="less" scoped></style>
