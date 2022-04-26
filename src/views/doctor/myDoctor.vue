<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>医生栏目</span></div>
      <el-button size="small" type="primary" @click="handleCreate">自主选择医生</el-button>
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
        <el-table-column align="center" label="医生名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
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
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="450px"
      >
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
          <el-form-item label="医生名称" prop="status">
            <el-select
              class="filter-item"
              v-model="form.status"
              placeholder="请选择医生"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in doctorOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctorOptions: [
        {
          id: 1,
          label: "张医生"
        },
        {
          id: 2,
          label: "李医生"
        }
      ],
      list: [
        {
          name: "赵医生",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure: "111",
          pulse: "100",
          temperature: "37"
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
      rules: {
        status: [
          {
            required: true,
            message: "老师不能为空",
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
        update: "编辑状态",
        create: "添加患者"
      }
    };
  },
  methods: {
    // 自主选择按钮操作
    handleCreate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    // 编辑按钮操作
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    // 返回
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
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