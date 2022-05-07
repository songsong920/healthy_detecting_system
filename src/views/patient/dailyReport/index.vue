<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>每日上报</span></div>
      <el-button size="small" type="primary" @click="handleReport">数据上报</el-button>
    </div>
    <div class="app-container calendar-list-container">
      <el-table
        :key="tableKey"
        :data="list"
        v-loading.body="listLoading"
        fit
        style="width: 100%"
        :cell-style="{ textAlign: 'left' }"
        :header-cell-style="{ background: '#F8F8F9', textAlign: 'left' }"
      >
        <el-table-column align="center" label="血压">
          <template slot-scope="scope">
            <span>{{ scope.row.bloodPressure }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="脉搏">
          <template slot-scope="scope">
            <span>{{ scope.row.pulse }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="体温">
          <template slot-scope="scope">
            <el-button type="text" style="color: #000 !important"
              >{{ scope.row.temperature ? scope.row.temperature : "0" }}℃</el-button
            >
          </template>
        </el-table-column>
         <el-table-column align="center" label="是否异常">
          <template slot-scope="scope">
            <span>{{ scope.row.status ?'正常':'异常'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上报时间">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
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
        <el-form :model="form" :rules="rules" ref="form" label-width="70px">
          <el-form-item label="姓名" prop="pname">
          <span style="margin-top:4px;display:inline-block">{{roleName}}</span>
          </el-form-item>
          <el-form-item label="体温" prop="temperature">
            <el-input
              v-model="form.temperature"
              placeholder="请输入体温"
              style="width: 100%"
              maxlength="15"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="脉搏" prop="pulse">
            <el-input
              v-model="form.pulse"
              placeholder="请输入脉搏"
              style="width: 100%"
              maxlength="11"
              minlength="11"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="血压" prop="bloodpressure">
            <el-input
              v-model="form.bloodpressure"
              placeholder="请输入血压"
              style="width: 100%"
              maxlength="11"
              minlength="11"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="form.date"
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
          <el-button
            v-if="dialogStatus == 'report'"
            type="primary"
            @click="updateReport('form')"
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
import { daily_punchIn,findAllReport
 } from "api/patient";
export default {
  data() {
    return {
      list: [],
      form: {},
      rules:{},
      total: 0,
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        report: "每日数据上报"
      },
      tableKey: 0
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
    this.getList()
  },
  methods: {
    getList(){
      findAllReport(this.formatParams({pname:this.roleName})).then(res=>{
        this.list = res
      })
    },
    // 数据上报按钮操作
    handleReport(row) {
      this.form.pname = this.roleName
      this.dialogFormVisible = true;
      this.dialogStatus = "report";
    },
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    // 返回
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 编辑
    updateReport(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          daily_punchIn(this.formatParams(this.form)).then(res=>{
            this.$message.success(res)
            this.dialogFormVisible = false
            this.getList()
          })
        }
      });
    }
  }
};
</script>