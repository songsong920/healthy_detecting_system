<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>异常患者</span></div>
      <el-button type="primary" size="small" @click="handleSendMsg">一键通知</el-button>
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
        <el-table-column align="center" label="病历记录">
          <template slot-scope="scope">
            <span>{{ scope.row.mobilePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="住院信息">
          <template slot-scope="scope">
            <el-button type="text" style="color: #000 !important">{{ scope.row.date }}</el-button>
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
          <el-form-item label="医生姓名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入医生姓名"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="医生性别" prop="sex">
            <el-radio-group v-model="form.sex" style="margin-bottom: -10px">
              <el-radio label="1">男</el-radio>
              <el-radio label="2" style="margin-left: 30px">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="医生年龄" prop="age">
            <el-input
              v-model="form.age"
              placeholder="请输入医生年龄"
              style="width: 100%"
              maxlength="15"
              size="small"
            ></el-input>
          </el-form-item>
                    <el-form-item label="账户密码" prop="passWord">
            <el-input
              v-model="form.passWord"
              placeholder="请输入密码"
              style="width: 100%"
              maxlength="10"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phoneNumber">
            <el-input
              v-model="form.phoneNumber"
              placeholder="请输入手机号码"
              style="width: 100%"
              maxlength="11"
              minlength="11"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="dept">
            <el-select
              class="filter-item"
              v-model="form.dept"
              placeholder="请选择部门"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="医生IP" prop="port">
            <el-select
              class="filter-item"
              v-model="form.port"
              placeholder="请选择医生IP"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
            <el-form-item label="信息描述" prop="message">
            <el-input
              v-model="form.message"
              placeholder="请输入信息描述"
              style="width: 100%"
              size="small"
              type="textarea"
              :rows="2"
            ></el-input>
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
import { showPatientHealthStatus,sendMessage } from "api/admin";
export default {
  data() {
    return {
      deptOptions:[
        {id:1,label:'儿科'}
      ],
      list: [
        {
          name: "异常患者1",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "异常患者2",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "异常患者3",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "异常患者4",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        },
        {
          name: "异常患者5",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25"
        }
      ],
      form:{},
      rules:{},
      loading: false,
      loadingText: "确 定",
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        send: "一键发送",
      },
      tableKey: 0
    };
  },
    created(){
    // this.getList()
  },
  methods: {
    // 获取患者列表
    getList(){
      let params = {
        username:'admin',
        passward:'123456',
        date:new Date()
      }
      showPatientHealthStatus(params).then(res=>{
        this.list = res
      })
    },
    // 一键通知
    handleSendMsg(){
      this.dialogStatus = "send";
      this.dialogFormVisible = true
    },
     // 一键发送
    send(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loadingText = "保存中...";
          sendMessage(this.form).then(res=>{

          })
        }
      });
    },
  }
};
</script>