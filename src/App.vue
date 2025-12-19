<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, computed } from 'vue';
import themeToggleBtn from './components/themeToggleBtn.vue';
</script>

<template>
  <RouterView />
  <themeToggleBtn />
</template>

<style>

</style>
