<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>患者信息</span></div>
    </div>
    <div class="app-container calendar-list-container">
      <el-form :model="listQuery" :inline="true" @submit.native.prevent>
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
            style="width: 180px; "
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入身份证号"
            v-model="listQuery.idCard"
            size="small"
            clearable
            @keyup.enter.native="handleFilter"
            style="width: 180px;"
          >
          </el-input>
          <el-button type="primary" size="small" @click="handleFilter" 
                >查询</el-button
              >
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
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label=" 身份信息">
          <template slot-scope="scope">
            <span>{{ scope.row.idCard }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="病历记录">
          <template slot-scope="scope">
            <span>{{ scope.row.mobilePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="住院信息">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
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
          <el-form-item label="患者姓名" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入患者姓名"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="患者性别" prop="sex">
            <el-radio-group v-model="form.sex" style="margin-bottom: -10px">
              <el-radio label="1">男</el-radio>
              <el-radio label="2" style="margin-left: 30px">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="患者编号" prop="idCard">
            <el-input
              v-model="form.idCard"
              placeholder="请输入患者编号"
              style="width: 100%"
              maxlength="15"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="mobilePhone">
            <el-input
              v-model="form.mobilePhone"
              placeholder="请输入手机号码"
              style="width: 100%"
              maxlength="11"
              minlength="11"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="入职日期" prop="workDate">
            <el-date-picker
              v-model="form.workDate"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择入职日期"
              style="width: 100%"
              size="small"
            ></el-date-picker>
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
export default {
  data() {
    return {
      list: [
        {
          name: "患者1",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "患者2",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "患者3",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "患者4",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "患者5",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        }
      ],
      form: {},
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { max: 50, message: "最大长度为50个字符", trigger: "blur" },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择患者性别",
            trigger: "blur"
          }
        ],
        idCard: [
          {
            required: true,
            message: "患者编号不能为空",
            trigger: "blur"
          }
        ],
        mobilePhone: [
          { required: true, message: "联系方式不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入11位正确的电话号码",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择患者入职日期",
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
        update: "编辑患者",
        create: "添加患者"
      },
      tableKey: 0
    };
  },
  methods: {
    // 添加按钮操作
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    // 编辑按钮操作
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    // 删除患者
    handleDelete(row) {
      this.$confirm("确认删除此患者?", "删除患者", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //  删除接口
      });
    },
    // 查询
    handleFilter() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
    // 添加
    create(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.$message.info('新增接口')
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
          this.$message.info('编辑接口')
        }
      });
    }
  }
};
</script>