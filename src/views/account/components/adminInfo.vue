<template>
  <div class="account-page">
    <div class="container">
      <div class="title">
        <div class="title-person">个人信息</div>
        <el-button type="primary" size="small" @click="handleUpdate">修改信息</el-button>
      </div>
      <div class="pageInfo">
        <div class="list">
          <span class="item-name">姓名：</span>
          <span class="item-number">{{info.username}}</span>
        </div>
        <div class="list">
          <span class="item-name">性别：</span>
          <span class="item-number">{{info.sex?info.sex:'未知'}}</span>
        </div>
       <div class="list">
          <span class="item-name">联系方式：</span>
          <span class="item-number">{{info.phoneNumber}}</span>
        </div>
        <div class="list">
          <span class="item-name">密码：</span>
          <span class="item-number">{{info.password}}</span>
        </div>
        <div class="list">
          <span class="item-name">学历：</span>
          <span class="item-number">-</span>
        </div>
        <div class="list">
          <span class="item-name">证件类型：</span>
          <span class="item-number">居民身份证</span>
        </div>
        <div class="list">
          <span class="item-name">证件号码：</span>
          <span class="item-number">-</span>
        </div>
      </div>
      <el-dialog
        :title="'修改个人信息'"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="450px"
      >
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
          <el-form-item label="姓名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入姓名"
              style="width: 100%"
              maxlength="50"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              style="width: 100%"
              maxlength="20"
              size="small"
              type="password"
              name='passoword'
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phoneNumber">
            <el-input
              v-model="form.phoneNumber"
              placeholder="请输入手机号码"
              style="width: 100%"
              maxlength="11"
              minlength="11"
              clearable
              size="small"
            ></el-input>
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
import { showManagerInfo ,modify} from "api/admin";
export default {
  data() {
    return {
      form: {},
      info:{},
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            max: 50,
            message: "最大长度为50个字符",
            trigger: "blur"
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      dialogFormVisible: false,
      tableKey: 0
    };
  },
  created() {
    this.showInfo();
  },
  computed: {
    roleName() {
      return localStorage.getItem("roleName");
    }
  },
  methods: {
    showInfo() {
      showManagerInfo(this.formatParams({ username: this.roleName})).then((res) => {
        this.info = res
      });
    },
    //编辑按钮操作
    handleUpdate() {
      this.form = {...this.info}
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 编辑
    update(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          modify(this.formatParams(this.form)).then((res) => {
            if (res == "修改成功") {
              this.loading = false;
              this.dialogFormVisible = false;
              this.$message.success("修改成功");
              this.showInfo();
            } else {
              this.loading = false;
              this.$message.error(res);
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.account-page {
  height: calc(100vh - 56px);
  padding: 16px;
  .title {
    display: flex;
    padding: 15px;
    justify-content: space-between;
    .title-person {
      margin-top: 5px;
      font-size: 18px;
    }
  }
  .container {
    height: 100%;
    overflow: auto;
    background: #fff;
    border-radius: 16px;
    .pageInfo {
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      .list {
        width: 50%;
        height: 36px;
        height: 36px;
        font-size: 16px;
        .item-name {
          font-weight: bold;
        }
      }
    }
  }
}
</style>