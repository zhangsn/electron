<script setup lang="ts">
const clickBaidu = () => {
  window.electronAPI.setUrl('https://www.baidu.com')
}
const clickQQ = () => {
  window.electronAPI.setUrl('https://www.qq.com')
}
</script>

<template>
  <div>
    <div @click="clickBaidu">baidu</div>
    <div @click="clickQQ">baidu</div>
  </div>
</template>
<style lang="css" scoped>
div{
  display: flex;
  flex-direction: row;
}
</style>
