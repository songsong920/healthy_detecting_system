<template>
  <div class="account-page">
    <div class="container">
      <div class="title">
        <div class='title-person'>选择医生</div>
        <el-button type="primary" size="small" @click="handleCreate">自主选择医生</el-button>
      </div>
        <div class="pageInfo">
          <div class="list">
            <span class="item-name">医生姓名：</span>
            <span class="item-number">张三</span>
          </div>
          <div class="list">
            <span class="item-name">医生性别：</span>
            <span class="item-number">男</span>
          </div>
          <div class="list">
            <span class="item-name">医生职工号：</span>
            <span class="item-number">1433223</span>
          </div>
          <div class="list">
            <span class="item-name">医生年龄：</span>
            <span class="item-number">20</span>
          </div>
          <div class="list">
            <span class="item-name">所属科室：</span>
            <span class="item-number">外科</span>
          </div>
          <div class="list">
            <span class="item-name">医生学历：</span>
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
          <div class="list">
            <span class="item-name">医生经历：</span>
            <span class="item-number">20年老中医经历</span>
          </div>
           <div class="list">
            <span class="item-name">我的医生：</span>
            <span class="item-number">张三<el-button  type="text" style="margin-left:15px" @click="handleDelete">删除医生</el-button></span>
          </div>
          
      </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sexOptions: [
        { value: "1", desc: "男" },
        { value: "2", desc: "女" }
      ],
      form: {},
      binding:false,
      list: null,
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      dialogStatus: "",
      textMap: {
        update: "修改信息"
      },
      tableKey: 0
    };
  },
  created() {},
  methods: {
    // 自主选择按钮操作
    handleCreate(row) {
      this.$message.info("选择医生接口...");
    },
      handleDelete(row) {
      this.$confirm("确认删除此医生?", "删除医生", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message.info("删除接口与验证密码...");
      });
    },
  }
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