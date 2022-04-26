<template>
  <div class="table-box">
    <span style="font-size:18px;font-weight:600">个人信息</span>
      <el-button size="small" type="primary" @click="handleUpdate" style="float :right;margin-bottom:15px;margin-left:15px" icon="el-icon-edit">修改信息</el-button>
    <table class="table-body"  style="position:relative">
      
      <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">姓名</td>
          <td class="td-value">张三</td>
        </div>
      </tr>
      <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">性别</td>
          <td class="td-value" >男</td>
        </div>
      </tr>
      <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">年龄</td>
          <td class="td-value" >18</td>
        </div>
      </tr>
      <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">联系方式</td>
          <td class="td-value" >13899999999</td>
        </div>
      </tr>
      <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">职工号</td>
          <td class="td-value" >1433223</td>
        </div>
      </tr>
       <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">科室</td>
          <td class="td-value" >外科</td>
        </div>
      </tr>
      <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">证件类型</td>
          <td class="td-value">居民身份证</td>
        </div>
      </tr>
      <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">证件号码</td>
          <td class="td-value">520222199844444444</td>
        </div>
      </tr>
        <tr class="tr-body">
        <div class="td-box">
          <td class="td-key">入职时间</td>
          <td class="td-value">2022-4-26</td>
        </div>
      </tr>
    </table>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="450px"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="90px">
        <el-form-item label="医生姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入医生姓名" style="width:100%" maxlength="50" size="small"></el-input>
        </el-form-item>
        <el-form-item label="医生性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio
              :label="item.value"
              :value="item.desc"
              :key="item.value"
              v-for="item in sexOptions"
              size="small"
            >{{item.desc}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医生编号" prop="numberNo">
          <el-input v-model="form.numberNo" placeholder="请输入医生编号" style="width:100%" maxlength="20" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobilePhone">
          <el-input
            v-model="form.mobilePhone"
            placeholder="请输入手机号码"
            style="width:100%"
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
            placeholder="选择日期"
            style="width:100%"
            size="small"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="cancel('form')" size="small">取 消</el-button>
        <el-button type="primary" @click="update('form')" :loading="loading" size="small">{{loadingText}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Account",
  data() {
    return {
      sexOptions: [
        { value: "1", desc: "男" },
        { value: "2", desc: "女" }
      ],
      form: {},
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            max: 50,
            message: "最大长度为50个字符",
            trigger: "blur"
          },
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
            message: "请选择医生性别",
            trigger: "blur"
          }
        ],
        numberNo: [
          {
            required: true,
            message: "医生编号不能为空",
            trigger: "blur"
          }
        ],
        mobilePhone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
            message: "请输入11位正确的电话号码",
            trigger: "blur"
          }
        ],
        workDate: [
          {
            required: true,
            message: "请选择医生入职日期",
            trigger: "blur"
          }
        ],
        status:[
           {
            required: true,
            message: "请选择医生状态",
            trigger: "blur"
          }
        ]
      },
      list: null,
      total: null,
      loading:false,
      loadingText:'确 定',
      listLoading: false,
      listQuery: { },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改信息"
      },
      tableKey: 0
    };
  },
  created(){
  },
  methods: {
   
    //编辑按钮操作
    handleUpdate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
     //编辑信息
     update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.loading = true
          this.loadingText = '保存中...'
          // 编辑接口
        } 
      });
    },
  }
};
</script>
<style lang="scss" scoped>
#qrcode {
  width: 196px;
  height: 196px;
  margin: 8px auto 0px;
  >>> iframe {
    height: 196px;
    width: 196px;
  }
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.table-box {
  padding: 15px;
  .table-body {
    width: 100%;
    border: 0.5px solid #000;
    .tr-body {
      display: flex;
      border-bottom: 1px solid #000 !important;
      &:last-child {
        border-bottom: 0 !important ;
      }
      .td-box {
        display: flex;
        border-left: 1px solid #000;
        &:first-child {
          border-left: 0;
        }
        .td-key {
          width: 200px;
          padding: 10px;
          line-height: 20px;
          text-align: center;
          background-color: rgba(242, 242, 242, 1);
          border-right: 1px solid #000;
        }
        .td-value {
          flex: 1 0;
          line-height: 20px;
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>
