<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-width="0px"
      class="login-form"
    >
      <div class="account-login-page">
        <div class="loginWapper">
          <div class="school-header">病人健康状态监测系统</div>
          <el-form-item prop="'mobilePhone" class="username">
            <el-input
              name="username"
              type="text"
              v-model.trim="loginForm.mobilePhone"
              @input="changePhone"
              @keyup.enter.native="handleLogin"
              onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
              placeholder="请输入账号"
              clearable
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              name="password"
              type="password"
              @keyup.enter.native="handleLogin"
              v-model.trim="loginForm.password"
              clearable
              onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
              placeholder="请输入密码"
              :maxlength="16"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login" :loading="loading" @click.native.prevent="handleLogin"
              >登录</el-button
            >
          </el-form-item>
       <div>没有账号？<el-button type="text" @click="handleRegister">注册账号</el-button></div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        mobilePhone: "",
        password: ""
      },
      loginRules: {
        mobilePhone: [
          {
            required: true,
            message: "手机号不能为空",
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
    // 监听输入框内容变化
    changePhone(val) {
      if (val == "") {
        this.loginForm.password = "";
      }
    },
    // 登陆按钮操作
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let { mobilePhone, password } = this.loginForm;
          if(mobilePhone && password){
            this.loading = false;
            localStorage.setItem('roleId',1)
            this.$router.replace({
              path: "/"
            });
          }
        }
      });
    },
    handleRegister(){
this.$router.push('/register');
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
  margin-bottom: 70px;
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
