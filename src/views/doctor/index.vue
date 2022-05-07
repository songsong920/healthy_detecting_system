<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>医生管理</span></div>
      <div>
        <el-button icon="el-icon-plus" size="small" @click="handleCreate" type="primary"
          >添加医生</el-button
        >
      </div>
    </div>
    <div class="app-container calendar-list-container">
      <el-form :model="listQuery" :inline="true" @submit.native.prevent>
        <el-form-item style="margin-left:15px">
          <el-input
            placeholder="请输入医生姓名"
            v-model="listQuery.name"
            size="small"
            clearable
            @keyup.enter.native="handleFilter"
            style="width: 180px"
          >
          </el-input>
          <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :key="tableKey"
        :data="list"
        v-loading.body="listLoading"
        fit
        style="width: 100%"
        :cell-style="{ textAlign: 'left' }"
        :header-cell-style="{ background: '#F8F8F9', textAlign: 'left' }"
      >
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="年龄">
          <template slot-scope="scope">
            <span>{{ scope.row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="账户密码">
          <template slot-scope="scope">
            <span>{{ scope.row.passWord }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
         <el-table-column align="center" label="科室">
          <template slot-scope="scope">
            <span>{{ scope.row.dept }}</span>
          </template>
        </el-table-column>
         <el-table-column align="center" label="IP地址">
          <template slot-scope="scope">
            <span>{{ scope.row.port?scope.row.port:"-"}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系方式">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
            <span style="color: #cbcbcb">|</span>
            <el-button
              type="text"
              @click="handleDelete(scope.row)"
              style="color: #e8505b !important"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.pageNumber"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
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
            @click="update('form')"
            :loading="loading"
            size="small"
            >{{ loadingText }}</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { findallDoctor,operateDoctor,findAllDept} from "api/admin";
import { searchDoctorByName } from "api/patient";
export default {
  name: "Doctor",
  data() {
    return {
      deptOptions:[],
      list: [],
      form: {},
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
      total: 0,
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      listQuery: {
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑医生",
        create: "添加医生"
      },
      tableKey: 0
    };
  },
  created(){
    this.getList()
    this.getDept()
  },
  methods: {
  // 根据名字查询
   handleFilter(){
      if(this.listQuery.name){
        searchDoctorByName(this.formatParams({name:this.listQuery.name})).then(res=>{
          if(res){
            let list = []
            list.push(res)
            this.list = list
          }else{
            this.list = []
          }
      })
      }else{
        this.getList()
      }
    },
    // 获取医生列表
    getList(){
      findallDoctor().then(res=>{
        this.list = res
      })
    },
    // 查询所有科室
    getDept(){
      findAllDept().then(res=>{
        this.deptOptions = res
    })
    },
    //表单重置
    resetTemp() {
      this.loading = false;
      this.loadingText = "确 定";
      this.form = {
        id:undefined,
        dept:undefined,
        choice: undefined,
        username: undefined,
        age: undefined,
        passWord:undefined,
        phoneNumber:undefined
      };
      this.resetForm("form");
    },
    // 添加按钮操作
    handleCreate() {
      this.resetTemp()
      this.form.choice = 1
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    // 编辑按钮操作
    handleUpdate(row) {
      this.form = {...row}
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      this.form.choice = 3;
    },
    // 删除医生
    handleDelete(row) {
      this.form = { ...row };
      this.form.choice = 2;
      this.$confirm("确认删除此医生?", "删除医生", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        operateDoctor(this.formatParams(this.form)).then(res=>{
          if(res == '删除成功'){
            this.$message.success('删除成功')
            this.getList()
            this.loading = false
          }else{
            this.loading = false
            this.$message.error(res)
          }
        })
      });
    },
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    // 添加
    create(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          operateDoctor(this.formatParams(this.form)).then(res=>{
            if(res == '添加成功'){
              this.$message.success('添加成功')
              this.getList()
              this.dialogFormVisible = false
              this.loading = false
            }else{
              this.loading = false
              this.$message.error(res)
            }
          })
        }
      });
    },
    // 返回
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 编辑
    update(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          operateDoctor(this.formatParams(this.form)).then(res=>{
            if(res == '修改成功'){
              this.$message.success('修改成功')
              this.getList()
              this.dialogFormVisible = false
              this.loading = false
            }else{
              this.loading = false
              this.$message.error(res)
            }
          })
        }
      });
    }
  }
};
</script>