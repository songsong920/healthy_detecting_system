<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>患者信息</span></div>
    </div>
    <div class="app-container calendar-list-container">
      <!-- <el-form :model="listQuery" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input
            placeholder="请输入就诊卡号"
            v-model="listQuery.idCard"
            size="small"
            clearable
            @keyup.enter.native="handleFilter"
            style="width: 180px; margin-left: 15px"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
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
        <el-table-column align="center" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex ? scope.row.sex : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编号">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label=" 身份信息">
          <template slot-scope="scope">
            <span>{{ scope.row.idCard ? scope.row.idCard : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">开处方</el-button>
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
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
          <el-form-item label="处方编号" prop="no">
            <el-input
              v-model="form.no"
              placeholder="请输入处方编号"
              style="width: 100%"
              maxlength="50"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="一日几次" prop="dayToEat">
            <el-input
              v-model="form.dayToEat"
              placeholder="请输入一次几次"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="剂量" prop="dose">
            <el-input
              v-model="form.dose"
              placeholder="请输入处方剂量"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="药物编号" prop="drugNumber">
            <el-select
              class="filter-item"
              v-model="form.drugNumber"
              placeholder="请选择药物"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in dragOptions"
                :key="item.number"
                :label="item.name"
                :value="item.number"
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
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { showMyPatient, makePrescription, findAllDrug } from "api/doctor";
export default {
  data() {
    return {
      dragOptions: [],
      list: [],
      form: {},
      rules: {
        dayToEat: [
          {
            required: true,
            message: "请输入一日几次",
            trigger: "blur"
          }
        ],
        dose: [
          {
            required: true,
            message: "请输入处方剂量",
            trigger: "blur"
          }
        ],
        no: [
          {
            required: true,
            message: "处方编号不能为空",
            trigger: "blur"
          }
        ],
        drugNumber: [
          {
            required: true,
            message: "请输入药物编号",
            trigger: "blur"
          }
        ]
      },
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
        create: "开处方"
      },
      tableKey: 0
    };
  },

  computed: {
    roleName() {
      return localStorage.getItem("roleName");
    },
    password() {
      return localStorage.getItem("password");
    }
  },
  created() {
    this.findAllDrug();
    this.getList();
  },
  methods: {
    // 获取所有药物
    findAllDrug() {
      findAllDrug().then((res) => {
        this.dragOptions = res;
      });
    },
    // 获取患者列表
    getList() {
      showMyPatient(this.formatParams({ name: this.roleName })).then((res) => {
        this.list = res;
      });
    },
    // 编辑按钮操作
    handleUpdate(row) {
      this.form.pname = row.username;
      this.form.dname = this.roleName;
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    // 查询
    handleFilter() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    // 添加处方
    create(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          makePrescription(this.formatParams(this.form)).then((res) => {
            if (res == "添加成功") {
              this.loading = false;
              this.dialogFormVisible = false;
              this.getList();
              this.$message.success("添加处方成功");
            } else {
              this.loading = false;
              this.$message.error(res);
            }
          });
        }
      });
    },
    // 返回
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>