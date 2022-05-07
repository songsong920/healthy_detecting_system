<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>患者管理</span></div>
      <div>
        <el-button icon="el-icon-plus" size="small" @click="handleCreate" type="primary"
          >添加患者</el-button
        >
      </div>
    </div>
    <div class="app-container calendar-list-container">
      <!-- <el-form :model="listQuery" :inline="true" @submit.native.prevent>
        <el-form-item style="margin-left:15px">
          <el-input
            placeholder="请输入患者姓名"
            v-model="listQuery.name"
            size="small"
            clearable
            @keyup.enter.native="handleFilter"
            style="width: 180px"
          >
          </el-input>
          <el-button type="primary" size="small" @click="handleFilter">查询</el-button>
        </el-form-item>
      </el-form> -->
      <el-table
        :key="tableKey"
        :data="list"
        v-loading.body="listLoading"
        fit
        style="width: 100%"
        :cell-style="{ textAlign: 'left' }"
        :header-cell-style="{ background: '#F8F8F9', textAlign: 'left' }"
      >
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="密码">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label=" 身份信息">
          <template slot-scope="scope">
            <span>{{ scope.row.idCard ? scope.row.idCard : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="病历记录">
          <template slot-scope="scope">
            <span>{{ scope.row.record ? scope.row.record : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="住院信息">
          <template slot-scope="scope">
            <span>{{ scope.row.record ? scope.row.record : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
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
      <!-- <div v-show="!listLoading" class="pagination-container">
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
      </div> -->
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="450px"
      >
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
          <el-form-item label="患者姓名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入患者姓名"
              style="width: 100%"
              maxlength="50"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="患者编号" prop="id">
            <el-input
              v-model="form.id"
              placeholder="请输入患者编号"
              style="width: 100%"
              maxlength="50"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="患者密码" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入患者密码"
              style="width: 100%"
              maxlength="30"
              size="small"
            ></el-input>
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
import { alluser } from "api/patient";
import { operatePatient } from "api/admin";
import { searchDoctorByName } from "api/patient";
export default {
  data() {
    return {
      list: [],
      form: {},
      rules: {
        username: [
          { required: true, message: "患者姓名不能为空", trigger: "blur" },
          { max: 50, message: "最大长度为50个字符", trigger: "blur" },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur"
          }
        ],
        id: [
          {
            required: true,
            message: "患者编号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "患者密码不能为空",
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
        update: "编辑患者",
        create: "添加患者"
      },
      tableKey: 0
    };
  },
  created() {
    this.getList();
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
    // 获取患者列表
    getList() {
      let params = {
        username:this.roleName,
        passward:this.password
      };
      alluser(params).then((res) => {
        this.list = res;
      });
    },
    //表单重置
    resetTemp() {
      this.loading = false;
      this.loadingText = "确 定";
      this.form = {
        choice: undefined,
        username: undefined,
        password: undefined
      };
      this.resetForm("form");
    },
    // 添加按钮操作
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.form.choice = 1;
    },
    // 编辑按钮操作
    handleUpdate(row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      this.form.choice = 3;
    },
    // 删除患者
    handleDelete(row) {
      this.form = { ...row };
      this.form.choice = 2;
      this.$confirm("确认删除此患者?", "删除患者", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        operatePatient(this.formatParams(this.form)).then((res) => {
          if (res == "删除成功") {
            this.loading = false;
            this.dialogFormVisible = false;
            this.$message.success("删除成功");
            this.getList();
          } else {
            this.loading = false;
            this.$message.error(res);
          }
        });
      });
    },
    // 查询
    handleFilter() {
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
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    // 添加
    create(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          operatePatient(this.formatParams(this.form)).then((res) => {
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
    // 返回
    cancel(formusername) {
      this.dialogFormVisible = false;
      this.$refs[formusername].resetFields();
    },
    // 编辑
    update(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          operatePatient(this.formatParams(this.form)).then((res) => {
            if (res == "修改成功") {
              this.loading = false;
              this.dialogFormVisible = false;
              this.$message.success("修改成功");
              this.getList();
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