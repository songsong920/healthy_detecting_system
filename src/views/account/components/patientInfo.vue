<template>
  <div class="account-page">
    <div class="container">
      <div class="title">
        <div class='title-person'>个人信息(患者)</div>
      </div>
        <div class="pageInfo">
          <div class="list">
            <span class="item-name">姓名：</span>
            <span class="item-number">张三</span>
          </div>
          <div class="list">
            <span class="item-name">性别：</span>
            <span class="item-number">男</span>
          </div>
          <div class="list">
            <span class="item-name">病历号：</span>
            <span class="item-number">1433223</span>
          </div>
          <div class="list">
            <span class="item-name">年龄：</span>
            <span class="item-number">20</span>
          </div>
          <div class="list">
            <span class="item-name">科室：</span>
            <span class="item-number">外科</span>
          </div>
          <div class="list">
            <span class="item-name">学历：</span>
            <span class="item-number">本科</span>
          </div>
          <div class="list">
            <span class="item-name">证件类型：</span>
            <span class="item-number">居民身份证</span>
          </div>
          <div class="list">
            <span class="item-name">证件号码：</span>
            <span class="item-number">52247855555555</span>
          </div>
      </div>
  </div>
  </div>
</template>
<script>
export default {
};
</script>
<style scoped lang='scss'>
.account-page{
  height: calc(100vh - 56px);
  padding: 16px;
  .title{
    display: flex;
    padding: 15px;
    justify-content: space-between;
    .title-person{
      margin-top: 5px;
      font-size: 18px;
    }
  }
  .container{
    height: 100%;
    overflow: auto;
    background: #fff;
    border-radius: 16px;
    .pageInfo{
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      .list{
        width: 50%;
        height: 36px;
        height: 36px;
        font-size: 16px;
        .item-name{
          font-weight: bold;
        }
      }
    }
  }
}
</style>