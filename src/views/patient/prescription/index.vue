<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>处方管理</span></div>
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
        <el-table-column align="center" label="药物名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="药物数量">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label=" 用药剂量">
          <template slot-scope="scope">
            <span>{{ scope.row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处方状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status ==1?'已取药':'未取药'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpstatus(scope.row)">状态编辑</el-button>
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
                 <el-form-item label="状态" prop='status'>
          <el-select class="filter-item" v-model="form.status" placeholder="请选择状态" style="width:100%" size="small">
            <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id"/>
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
export default {
  name: "Doctor",
  data() {
    return {
      statusOptions:[
        {
          id:1,
          label:'已取药'
        },
        {
          id:2,
          label:'未取药'
        }
      ],
      list: [
        {
          name: "感冒药",
          number: "4",
          count: "一日三次，一次三颗",
          status: "1"
        },
        {
          name: "消炎药",
          number: "4",
          count: "一日三次，一次三颗",
          status: "2"
        },
        {
          name: "斯达舒",
          number: "4",
          count: "一日三次，一次三颗",
          status: "2"
        },
        {
          name: "新冠病毒特效药",
          number: "4",
          count: "一日三次，一次三颗",
          status: "1"
        },
        {
          name: "新冠病毒特效药",
          number: "4",
          count: "一日三次，一次三颗",
          status: "1"
        }
      ],
      form: {},
      rules: {
        status: [
          {
            required: true,
            message: "状态不能为空",
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
        update: "编辑状态",
        create: "添加患者"
      },
      tableKey: 0
    };
  },
  methods: {
    // 编辑按钮操作
    handleUpstatus(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    // 查询
    handleFilter() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {},
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