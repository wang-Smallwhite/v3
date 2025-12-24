<template>
  <div>
    <h2>计数器示例</h2>
    <p>当前计数: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script setup>
import { useCounter } from '@/useHook/useCounter'
const { count, increment, decrement } = useCounter()
</script>

<style lang="less" scoped></style>
