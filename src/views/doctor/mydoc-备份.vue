<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>我的医生</span></div>
       <div>
        <el-button icon="el-icon-plus" size="small" @click="handleCreate" type="primary"
          >添加我的医生</el-button
        >
      </div>
    </div>
    <div class="app-container calendar-list-container">
      <el-form :model="listQuery" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input
            placeholder="请输入医生姓名"
            v-model="listQuery.name"
            size="small"
            clearable
            @keyup.enter.native="handleFilter"
            style="width: 180px;margin-left:15px"
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
        <el-table-column align="center" label="医生名称">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">{{ scope.row.name }}</el-button><span v-if="scope.row.select==1">(我的医生)</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="医生性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="医生职工号">
          <template slot-scope="scope">
            <span>{{ scope.row.idCard }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份信息">
          <template slot-scope="scope">
            <span>{{ scope.row.idCard }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
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
import {showMyDoctor,addMyDoctor} from 'api/patient'
import { findallDoctor} from "api/admin";
export default {
  data() {
    return {
      doctorOptions: [],
      list: [
        {
          name: "赵医生",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure: "111",
          pulse: "100",
          temperature: "37",
          select:1
        },
        {
          name: "钱医生",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure: "111",
          pulse: "100",
          temperature: "37"
        },
        {
          name: "孙医生",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure: "111",
          pulse: "100",
          temperature: "36"
        },
        {
          name: "李医生",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure: "111",
          pulse: "100",
          temperature: "34"
        },
        {
          name: "周医生",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure: "111",
          pulse: "100",
          temperature: "38"
        }
      ],
      tableKey: 0,
      form: {},
      listQuery:{
        name:undefined,
      },
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
     // 添加
    create(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          addMyDoctor(this.formatParams(this.form)).then((res) => {
            if (res == "注册成功") {
              this.loading = false;
              this.dialogFormVisible = false;
              this.getList();
              this.$message.success("添加成功");
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