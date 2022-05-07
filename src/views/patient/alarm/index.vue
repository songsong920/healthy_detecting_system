<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>告警信息</span></div>
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
            <span>{{ scope.row.temperature ? scope.row.temperature : "0" }}℃</span
            >
          </template>
        </el-table-column>
         <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpstatus(scope.row)">状态编辑</el-button>
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
import { getMessage } from 'api/doctor'
export default {
  data() {
    return {
      statusOptions: [
        {
          id: 1,
          label: "已处理"
        },
        {
          id: 2,
          label: "未处理"
        }
      ],
      list: [],
      form:{},
       rules: {
        status: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "blur"
          }
        ],
       },
      tableKey: 0,
       loading: false,
      loadingText: "确 定",
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑状态",
      },
    };
  },
  created(){
    this.getMessage()
  },
  methods:{
    getMessage(){
       getMessage().then(res=>{
        this.list = res
      })
    },
     // 编辑按钮操作
    handleUpstatus(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
  }
};
</script>