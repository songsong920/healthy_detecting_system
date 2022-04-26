<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "APP"
};
</script>

<style lang="scss">
// 全局自定义的css样式
@import "./styles/index.scss";
@import "./styles/custom.scss";
</style>
