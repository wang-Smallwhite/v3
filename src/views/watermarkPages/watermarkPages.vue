<template>
  <div>water</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLocalStorage } from '@/useHook/useStorage'
const [name, setName] = useLocalStorage('name')
const [age, setAge] = useLocalStorage('age')
console.log(name, age)
const setNameFunc = () => {
  setName('watermarkOne')
  setAge(30)
}
onMounted(() => {
  setNameFunc()
})
</script>

<style lang="less" scoped></style>
