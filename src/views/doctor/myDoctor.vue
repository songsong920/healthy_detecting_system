<template>
  <div>
    <div class="account-page">
    <div class="container">
      <div class="title">
        <div class='title-person'>选择医生</div>
        <el-button type="primary" size="small" @click="handleCreate" v-if="!doctorInfo">自主选择医生</el-button>
      </div>
        <div class="pageInfo">
          <div class="list">
            <span class="item-name">我的医生：</span>
            <span class="item-number">{{doctorInfo.username?doctorInfo.username:'暂未选择医生'}}<el-button  type="text" style="margin-left:15px" @click="handleDelete(doctorInfo)" v-if="doctorInfo">删除医生</el-button></span>
          </div>
          <div class="list">
            <span class="item-name">医生性别：</span>
            <span class="item-number">{{doctorInfo.sex?doctorInfo.sex:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">医生职工号：</span>
            <span class="item-number">{{doctorInfo.id?doctorInfo.id:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">医生年龄：</span>
            <span class="item-number">{{doctorInfo.age?doctorInfo.age:'-'}}</span>
          </div>
          <div class="list">
            <span class="item-name">所属科室：</span>
            <span class="item-number">{{doctorInfo.dept?doctorInfo.dept:'-'}}</span>
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
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="450px"
      >
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
           <el-form-item label="我的姓名">
            <span style="margin-top:4px;display:inline-block">{{roleName}}</span>
          </el-form-item>
          <el-form-item label="医生名称" prop="dname">
            <el-select
              class="filter-item"
              v-model="form.dname"
              placeholder="请选择医生"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in doctorOptions"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('form')" size="small">取 消</el-button>
          <el-button
            v-if="dialogStatus == 'create'"
            type="primary"
            @click="create('form')"
            :loading="loading"
            size="small"
            >{{ loadingText }}</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="upstatus('form')"
            :loading="loading"
            size="small"
            >{{ loadingText }}</el-button
          >
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {showMyDoctor,addMyDoctor,deleteMyDoctor} from 'api/patient'
import { findallDoctor} from "api/admin";
export default {
  data() {
    return {
      doctorOptions: [],
      doctorInfo:{},
      tableKey: 0,
      form: {},
      rules: {
        dname: [
          {
            required: true,
            message: "医生不能为空",
            trigger: "blur"
          }
        ]
      },
      total: 0,
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑医生",
        create: "选择医生"
      }
    };
  },
  computed: {
    roleName() {
      return localStorage.getItem('roleName');
    },
    password() {
      return localStorage.getItem('password');
    }     
  },
  created(){
    this.getDoctor()
    this.getList()
  },
  methods: {
    // 获取我的医生列表
    getList(){
      showMyDoctor(this.formatParams({ name:this.roleName})).then(res=>{
        this.doctorInfo = res
      })
    },
    // 获取所有医生列表
    getDoctor(){
      findallDoctor().then(res=>{
        this.doctorOptions = res
      })
    },
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    // 自主选择按钮操作
    handleCreate(){
      this.form.pname = this.roleName
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    // 编辑按钮操作
    handleUpdate(row) {
      
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    // 医生详情
    handleDetail(){
      this.$router.push('/patient/doctorSelect')
    },
    // 查询
    handleFilter(){
      this.$message.info('查询接口')
    },
    // 返回
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 删除我的医生
    handleDelete(row) {
      this.$confirm("确认删除此自主选择的医生?", "删除医生", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        let params = {
          pname:this.roleName,
          dname:row.username
        }
        deleteMyDoctor(this.formatParams(params)).then(res=>{
          if(res == 1){
            this.getList()
            this.$message.success('删除成功')
            this.loading = false
          }else{
            this.loading = false
            this.$message.error(res)
          }
        })
      });
    },
     // 添加
    create(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          addMyDoctor(this.formatParams(this.form)).then((res) => {
            if (res == 1) {
              this.loading = false;
              this.dialogFormVisible = false;
              this.$message.success("自主选择医生成功");
              this.getList();
            } else {
              this.loading = false;
              this.$message.error(res);
            }
          });
        }
      });
    },
    // 编辑
    update(formName) {
      const set = this.$refs;
      set[formName].valistatus((valid) => {
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