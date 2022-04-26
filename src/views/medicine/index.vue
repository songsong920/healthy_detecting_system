<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>药物系统</span></div>
      <div>
        <el-button icon="el-icon-plus" size="small" @click="handleCreate" type="primary"
          >用药清单</el-button
        >
      </div>
    </div>
    <div class="app-container calendar-list-container">
      <el-form :model="listQuery" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input
            placeholder="请输入药物名称"
            v-model="listQuery.name"
            size="small"
            clearable
            @keyup.enter.native="handleFilter"
            style="width: 180px; margin-left: 15px"
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
        <el-table-column align="center" label="药物信息">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="药物简介">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否有库存">
          <template slot-scope="scope">
            <span>{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="库存">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
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
          <el-form-item label="就诊卡号" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入就诊卡号"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="药物" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入添加药物"
              style="width: 100%"
              maxlength="15"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入数量"
              style="width: 100%"
              maxlength="15"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="用药剂量" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入具体用药剂量"
              style="width: 100%"
              maxlength="15"
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
export default {
  name: "Doctor",
  data() {
    return {
      list: [
        {
          name: "药物1",
          stock: "是",
          mobilePhone: "13655555555",
          remark: "522422199800114456",
          number: "888"
        },
        {
          name: "药物2",
          stock: "否",
          mobilePhone: "13655555555",
          remark: "522422199800114456",
          number: "0"
        },
        {
          name: "药物3",
          stock: "否",
          mobilePhone: "13655555555",
          remark: "522422199800114456",
          number: "0"
        },
        {
          name: "药物4",
          stock: "否",
          mobilePhone: "13655555555",
          remark: "522422199800114456",
          number: "0"
        },
        {
          name: "药物5",
          stock: "否",
          mobilePhone: "13655555555",
          remark: "522422199800114456",
          number: "0"
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
        stock: [
          {
            required: true,
            message: "请选择药物性别",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "药物编号不能为空",
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
            message: "请选择药物入职日期",
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
        update: "编辑用药清单",
        create: "添加用药清单"
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
    // 删除药物
    handleDelete(row) {
      this.$confirm("确认删除此药物?", "删除药物", {
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
          this.loading = true;
          this.loadingText = "保存中...";
          // 新增接口
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
          this.loadingText = "保存中...";
          // 编辑接口
        }
      });
    }
  }
};
</script>