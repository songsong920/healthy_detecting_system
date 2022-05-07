<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>数据统计</span></div>
      <!-- <el-button type="primary" size="small" @click="handleData">数据保存</el-button> -->
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
            <span>{{ scope.row.pname }}</span>
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
         <el-table-column align="center" label="日期">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
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
            <span>{{ scope.row.status?'是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status"
              type="text"
              @click="handleSendMsg(scope.row)"
              style="color: #e8505b !important"
              >一键通知</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
     <!-- 一键发送 -->
     <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="450px"
      >
      
        <el-form :model="form"  ref="form" label-width="90px">
          <el-form-item label="姓名" prop="pname">
          <span style="margin-top:4px;display:inline-block">{{form.pname}}</span>
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
          <el-form-item label="血压" prop="bloodPressure">
            <el-input
              v-model="form.bloodPressure"
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
            v-if="dialogStatus == 'send'"
            type="primary"
            @click="send('form')"
            :loading="loading"
            size="small"
            >{{ loadingText }}</el-button
          >
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { showAllHealthStatus ,sendMessage} from "api/admin";
export default {
  data() {
    return {
      deptOptions:[],
      list: [],
      tableKey: 0,
      form:{},
      rules:{},
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        send: "一键通知",
      },
    };
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      // {date:this.parseTime(new Date().toLocaleString(),'{y}-{m}-{d}')}
      showAllHealthStatus(this.formatParams({date:'2022-05-06'})).then(res=>{
        this.list = res
      })
    },
    // 返回
    cancel(formusername) {
      this.dialogFormVisible = false;
      this.$refs[formusername].resetFields();
    },
    // 一键通知
    handleSendMsg(row){
      this.form = { ...row };
      this.$confirm("确认一键通知医生?", "一键通知", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        sendMessage(this.formatParams(this.form)).then((res) => {
          if (res == "删除成功") {
            this.loading = false;
            this.dialogFormVisible = false;
            this.$message.success("一键通知成功");
            this.getList();
          } else {
            this.loading = false;
            this.$message.error(res);
          }
        });
      });
    },
    handleData(){
      this.$message.info('功能待开发...')
    }
  }
};
</script>