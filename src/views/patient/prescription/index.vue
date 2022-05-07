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
        <el-table-column align="center" label="医生名称">
          <template slot-scope="scope">
            <span>{{ scope.row.dname }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处方编号">
          <template slot-scope="scope">
            <span>{{ scope.row.prescriptionListNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="药物：一日几次/剂量/药物编号">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.prescriptionList" :key="index">{{ `药物${index+1}:` +item.dayToEat+'/'+item.dose+"/"+item.drug
}}<br></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="handleUpstatus(scope.row)">编辑</el-button>
            <span style="color: #cbcbcb">|</span> -->
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
          <el-form-item label="状态" prop="status">
            <el-select
              class="filter-item"
              v-model="form.status"
              placeholder="请选择状态"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in statusOptions"
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
import { showMyPrescription,deleteMyPrescriptionList } from "api/patient";
export default {
  data() {
    return {
      statusOptions: [
        {
          id: 1,
          label: "已取药"
        },
        {
          id: 2,
          label: "未取药"
        }
      ],
      list: [],
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
  created(){
    this.getList()
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
    // 获取处方列表
    getList(){
      showMyPrescription(this.formatParams({pname:this.roleName})).then(res=>{
        this.list = res
      })
    },
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
     // 删除处方
    handleDelete(row) {

      this.$confirm("确认删除我的处方?", "删除处方", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          pname:row.pname,
          prescriptionListNumber:row.prescriptionListNumber
        }
        deleteMyPrescriptionList(this.formatParams(params)).then((res) => {
            this.loading = false;
            this.$message.success("删除成功");
            this.getList();
        });
      });
    },
  }
};
</script>