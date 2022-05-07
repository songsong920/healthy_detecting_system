<template>
  <div class="login-container">
    <el-form :model="form" :rules="loginRules" ref="form" label-width="0px" class="login-form">
      <div class="account-login-page">
        <div class="loginWapper">
          <div class="school-header">注册账号</div>
          <el-form-item prop="'id" class="username">
            <el-input
              name="username"
              type="text"
              v-model.trim="form.id"
              @keyup.enter.native="handleRegister"
              placeholder="请输入用户编号"
              clearable
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item prop="'username" class="username">
            <el-input
              name="username"
              type="text"
              v-model.trim="form.username"
              @keyup.enter.native="handleRegister"
              placeholder="请输入用户名"
              clearable
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              name="password"
              type="password"
              @keyup.enter.native="handleRegister"
              v-model.trim="form.password"
              clearable
              placeholder="请输入密码"
              :maxlength="16"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login" :loading="loading" @click.native.prevent="handleRegister"
              >注册账号</el-button
            >
          </el-form-item>
          <div>
            <router-link to="/login" style="color: #377be9"> 返回登录 </router-link>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { regist } from "api/patient";
export default {
  data() {
    return {
      form: {
        id:'',
        username: "",
        password: ""
      },
      loginRules: {
        id: [
          {
            required: true,
            message: "编号不能为空",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "账号不能为空",
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
      loadingText: "确 认"
    };
  },
  methods: {
    // 注册按钮操作
    handleRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loadingText = "注册中...";
          regist(this.formatParams(this.form)).then((res) => {
            if (res == '注册成功') {
              this.$message.success("注册成功");
              this.loading = false;
              this.loadingText = "确 认";
            } else {
              this.loading = false;
              this.loadingText = "确 认";
              this.$message.error(res);
            }
          });
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.login-container {
  @include relative;
  height: 100vh;
  background: url("../../assets/images/loginBg.png") no-repeat;
  min-height: 100vh;
  background-size: 100% 100%;
  background-position: center;
  text-align: center;
  .reset-pwd {
    font-weight: 600;
    color: #377be9;
    font-size: 38px;
    margin: 80px 0 60px;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #000;
    height: 40px;
    border-radius: 5px;
  }
  .el-input {
    display: inline-block;
    height: 40px;
    width: 368px;
    background: #fff;
  }
  .el-form-item {
    border-radius: 5px;
    color: #454545;
    margin-bottom: 30px;
  }
  .forget-pwd {
    color: #fff;
  }
}
.school-header {
  height: 124px;
  font-size: 34px;
  color: #ffffff;
  line-height: 124px;
  font-weight: bold;
  font-family: PingFangSC-Semibold, PingFang SC;
  margin-bottom: 30px;
}
.login-form {
  position: absolute;
  width: 640px;
  height: 500px;
  left: 0;
  margin: auto;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 0px 0px 20px 0px rgba(55, 118, 187, 0.2);
  border-radius: 16px;
  /deep/.el-form-item__error {
    left: 150px !important;
    position: absolute !important;
  }
  .loginWapper {
    background: url("../../assets/images/login-card.png") repeat;
    background-size: 100% 100%;
    background-position: center;
    width: 100%;
    height: 500px;
    text-align: center;
  }
}
.login {
  width: 368px;
  background: #377be9;
  font-size: 16px;
  color: #fff;
}
</style>
