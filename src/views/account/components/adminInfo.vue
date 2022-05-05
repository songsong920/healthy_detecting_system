<template>
  <div class="account-page">
    <div class="container">
      <div class="title">
        <div class='title-person'>个人信息(管理员)</div>
        <el-button type="primary" size="small" @click="handleUpdate">修改信息</el-button>
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
            <span class="item-name">年龄：</span>
            <span class="item-number">20</span>
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
 <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="450px"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="90px">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入姓名"
            style="width: 100%"
            maxlength="50"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio
              :label="item.value"
              :value="item.desc"
              :key="item.value"
              v-for="item in sexOptions"
              size="small"
              >{{ item.desc }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="编号" prop="numberNo">
          <el-input
            v-model="form.numberNo"
            placeholder="请输入编号"
            style="width: 100%"
            maxlength="20"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobilePhone">
          <el-input
            v-model="form.mobilePhone"
            placeholder="请输入手机号码"
            style="width: 100%"
            maxlength="11"
            minlength="11"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职日期" prop="workDate">
          <el-date-picker
            v-model="form.workDate"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            style="width: 100%"
            size="small"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')" size="small">取 消</el-button>
        <el-button type="primary" @click="update('form')" :loading="loading" size="small">{{
          loadingText
        }}</el-button>
      </div>
    </el-dialog>
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
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            max: 50,
            message: "最大长度为50个字符",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur"
          }
        ],
        numberNo: [
          {
            required: true,
            message: "编号不能为空",
            trigger: "blur"
          }
        ],
        mobilePhone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
            message: "请输入11位正确的电话号码",
            trigger: "blur"
          }
        ],
        workDate: [
          {
            required: true,
            message: "请选择入职日期",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改信息"
      },
      tableKey: 0
    };
  },
  created() {},
  methods: {
    //编辑按钮操作
    handleUpdate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //编辑信息
    update(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loadingText = "保存中...";
          // 编辑接口
        }
      });
    }
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