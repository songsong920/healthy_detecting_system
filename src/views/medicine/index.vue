<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>药物系统</span></div>
      <div>
        <!-- <el-button icon="el-icon-plus" size="small" @click="handleCreate" type="primary"
          >添加药物</el-button
        > -->
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
            @change="searchDurgByNmae"
            @keyup.enter.native="searchDurgByNmae"
            style="width: 180px; margin-left: 15px"
          >
          </el-input>
          <el-button type="primary" size="small" @click="searchDurgByNmae">查询</el-button>
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
      <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="药物名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
          <el-table-column align="center" label="药物编号">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="药物描述" width="480">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
      
        <!-- <el-table-column align="center" label="操作" width="200">
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
        </el-table-column> -->
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
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="药物名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入药物名称"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="编号" prop="number">
            <el-input
              v-model="form.number"
              placeholder="请输入编号"
              style="width: 100%"
              maxlength="15"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="form.description"
              placeholder="请输入药物描述"
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
import { makePrescription,findAllDrug,searchDurgByNmae } from "api/doctor";
export default {
  name: "Medicine",
  data() {
    return {
      list: [],
      form: {},
      rules: {
        name: [
          { required: true, message: "药物名不能为空", trigger: "blur" },
        ],
        number: [
          {
            required: true,
            message: "请输入药物编号",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "药物描述不能为空",
            trigger: "blur"
          }
        ],
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
        update: "编辑药物",
        create: "添加药物"
      },
      tableKey: 0
    };
  },
  created(){
    this.getList()
  },
  methods: {
    // 获取药物列表
    getList(){
      findAllDrug().then(res=>{
        this.list = res
      })
    },
    searchDurgByNmae(){
      if(this.listQuery.name){
        searchDurgByNmae(this.formatParams({name:this.listQuery.name})).then(res=>{
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
    create(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$message.info('功能尚未开通')
          // makePrescription(this.formatParams(this.form)).then((res) => {
          //   if (res == "注册成功") {
          //     this.loading = false;
          //     this.dialogFormVisible = false;
          //     this.getList();
          //     this.$message.success("添加成功");
          //   } else {
          //     this.loading = false;
          //     this.$message.error(res);
          //   }
          // });
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