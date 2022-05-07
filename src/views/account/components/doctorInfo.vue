<template>
  <div class="account-page">
    <div class="container">
      <div class="title">
        <div class='title-person'>个人信息</div>
        <el-button type="primary" size="small" @click="handleUpdate">修改信息</el-button>
      </div>
        <div class="pageInfo">
          <div class="list">
            <span class="item-name">姓名：</span>
            <span class="item-number">{{info.username?info.username:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">性别：</span>
            <span class="item-number">{{info.sex?info.sex:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">账号密码：</span>
            <span class="item-number">{{info.passWord?info.passWord:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">医生职工号：</span>
            <span class="item-number">{{info.id?info.id:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">年龄：</span>
            <span class="item-number">{{info.age?info.age:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">科室：</span>
            <span class="item-number">{{info.dept?info.dept:'-'}}</span>
          </div>
           <div class="list">
            <span class="item-name">联系方式：</span>
            <span class="item-number">{{info.phoneNumber?info.phoneNumber:'-'}}</span>
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
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="450px"
    >
     <el-form :model="form"  ref="form" label-width="90px">
           <el-form-item label="医生编号" prop="id">
            <el-input
              v-model="form.id"
              placeholder="请输入医生编号"
              style="width: 100%"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="医生姓名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入医生姓名"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="医生性别" prop="sex">
            <el-radio-group v-model="form.sex" style="margin-bottom: -10px">
              <el-radio label="男">男</el-radio>
              <el-radio label="女" style="margin-left: 30px">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="医生年龄" prop="age">
            <el-input
              v-model="form.age"
              placeholder="请输入医生年龄"
              style="width: 100%"
              maxlength="15"
              size="small"
            ></el-input>
          </el-form-item>
            <el-form-item label="账户密码" prop="passWord">
            <el-input
              v-model="form.passWord"
              placeholder="请输入密码"
              style="width: 100%"
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
              size="small"
            ></el-input>
          </el-form-item>
           <el-form-item label="所属科室" prop="dept">
            <el-select
              class="filter-item"
              v-model="form.dept"
              placeholder="请选择科室"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.dept"
                :label="item.dept"
                :value="item.dept"
              />
            </el-select>
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

import { showDoctorInfo,modify} from "api/doctor";
import {findAllDept} from "api/admin";
export default {
  data() {
    return {
      info:{},
      deptOptions:[],
      sexOptions: [
        { value: "1", desc: "男" },
        { value: "2", desc: "女" }
      ],
      form: {},
      binding:false,
     rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { max: 50, message: "最大长度为50个字符", trigger: "blur" },
        ],
        sex: [
          {
            required: true,
            message: "请选择医生性别",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            message: "医生年龄不能为空",
            trigger: "blur"
          }
        ],
        dept:[
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          { required: true, message: "联系方式不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入11位正确的电话号码",
            trigger: "blur"
          }
        ],
        passWord: [
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
      dialogStatus: "",
      textMap: {
        update: "修改个人信息"
      },
      tableKey: 0
    };
  },
  created() {
    this.showInfo()
    this.getDept()
  },
  computed: {
    roleName() {
      return localStorage.getItem('roleName');
    },
    password() {
      return localStorage.getItem('password');
    }     
  },
  methods: {
    showInfo() {
      showDoctorInfo(this.formatParams({ dname: this.roleName})).then((res) => {
        this.info = res
      });
    },
    // 查询所有科室
    getDept(){
      findAllDept().then(res=>{
        this.deptOptions = res
    })
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