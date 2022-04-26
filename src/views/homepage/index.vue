<template>
  <div class="home-page">
    <div class="noData">
      <img :src="noData" alt="" class="no-image" />
      <div class="text">数据建设中...</div>
    </div>
  </div>
</template>
<script>
import noData from "assets/images/no_content.png";
export default {
  data() {
    return {
      noData,
    };
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #fff;
  .noData {
    margin: auto;
    .no-image {
      width: 218px;
      height: 235px;
    }
    .text {
      color: #3071c4;
      font-size: 16px;
      margin-top: 16px;
      text-align: center;
    }
  }
}
</style>
