<template>
  <div>
    <el-input v-model="countr.count" placeholder="" size="normal" clearable></el-input>
    <div>age: {{ countr.getAge }}</div>
    <div>doubleCount: {{ countr.doubleCount }}</div>
    <el-button type="primary" @click="increment">increment</el-button>
    <el-button type="primary" @click="countrReset">reset</el-button>
  </div>
</template>

<script setup>
// import { useCounterStore } from '@/stores/useCounterStore'
// 使用 state 、getter
// 无法直接结构使用，破坏了响应式
// const {count, doubleCount} = useCounterStore()
// 可直接赋值，再调用对象
// const countr = useCounterStore()
// 如果需要结构值出来可通过
// import { storeToRefs } from 'pinia'
// const { count, doubleCount } = storeToRefs(useCounterStore())

// 使用方法
// const { increment } = useCounterStore()

// option store使用
import { useCounterStore } from '@/stores/useCounterStore'
const countr = useCounterStore()
// 修改 count
countr.count++
countr.count = 10
countr.$patch({
  count: 20,
  age: 30,
})
// 重置 count
const countrReset = () => {
  countr.$reset()
}

// 订阅 countr变化
countr.$subscribe((mutation, state) => {
  console.log('mutation', mutation)
  console.log('state', state)
})

// 向getter 传参
console.log('getAge', countr.getAgePlus(5))
const { increment } = useCounterStore()
</script>
