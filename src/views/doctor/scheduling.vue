<template>
  <div>
    <div class="app-header">
      <div class="allManager">医生排班</div>
    </div>
    <div class="app-container">
      <div class="class-table">
        <div class="table-wrapper">
          <div class="table-container">
            <table>
              <tbody>
                <tr style=" background: rgba(2, 255, 208, 0.1)">
                  <th>日期</th>
                  <th
                    v-for="(item, index) in mapList"
                    :key="item + index"
                    style="border: 1px solid #e7e7e7; font-size: 13px;padding: 12px 2px;"
                  >
                    <span v-if="index == 1">周一</span>
                    <span v-if="index == 2">周二</span>
                    <span v-if="index == 3">周三</span>
                    <span v-if="index == 4">周四</span>
                    <span v-if="index == 5">周五</span>
                    <span v-if="index == 6">周六</span>
                    <span v-if="index == 7">周日</span>
                    （{{ item }}）
                  </th>
                </tr>
                <tr
                  v-for="(dept, deptIndex) in deptOptions"
                  :key="deptIndex"
                  style="border: 1px solid #e7e7e7"
                >
                  <td style="border: 1px solid #e7e7e7;">
                    <p>{{ dept.dept }}</p>
                  </td>
                  <td
                    v-for="(item, index) in dept.list"
                    :key="item + index"
                    style="border: 1px solid #e7e7e7"
                    class="schedule-list-wrapper"
                  >
                    <div v-if="item && item.length">
                      <div v-for="(course, courseIndex) in item" :key="courseIndex + course">
                        <div @click="handleUpdate(course.id)" v-if="courseIndex < 1">
                          <p>{{ course.doctorName }}</p>
                          <el-button type="text" style="font-size: 10px;padding:0">排班编辑</el-button>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <el-button type="text" style="font-size: 10px;padding:0" @click="handleCreate">添加排班</el-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- 新增/编辑排班 -->
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="520px"
      >
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
         
          <el-form-item label="医生名称" prop="dname">
            <el-select
              class="filter-item"
              v-model="form.dname"
              placeholder="请选择医生"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in docList"
                :key="item.username"
                :label="item.username"
                :value="item.username"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属科室" prop="dept">
            <el-select
              class="filter-item"
              v-model="form.dept"
              placeholder="请选择科室"
              style="width: 100%"
              size="small"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.dept"
                :label="item.dept"
                :value="item.dept"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="排课日期" prop="date">
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
            v-if="dialogStatus == 'create'"
            type="primary"
            @click="create('form')"
            :loading="loading"
            size="small"
            >{{ loadingText }}</el-button
          >
          <el-button v-else type="primary" @click="update('form')" :loading="loading" size='small'>{{
            loadingText
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { arrangeDoctor,findallDoctor,deleteDoctor,updateDoctor,showWeeklyRoaster,findAllDept} from "api/admin";
export default {
  data() {
    return {
      mapList:{},
      doctorOptions: [],
      weekList: [
        { weekType: "1", value: "周一" },
        { weekType: "2", value: "周二" },
        { weekType: "3", value: "周三" },
        { weekType: "4", value: "周四" },
        { weekType: "5", value: "周五" },
        { weekType: "6", value: "周六" },
        { weekType: "7", value: "周日" }
      ],
      deptOptions: [],
      tableData: {
        list: [
          {
            classTime: "2022-05-03", //日期可以不要
            doctorName: "张三",  //医生姓名
            id: 1,
            departId: 4, //科室id 与科室进行管理
            weekType: "2" // 周几
          },
          {
            classTime: "2022-05-03",
            doctorName: "李四",
            id: 2,
            departId: 6,
            weekType: "2"
          },
          {
            classTime: "2022-05-03",
            doctorName: "王五",
            id: 3,
            departId: 1,
            weekType: "2"
          },
          {
            classTime: "2022-05-03",
            doctorName: "赵六",
            id: 4,
            departId: 3,
            weekType: "5"
          },
          {
            classTime: "2022-05-03",
            doctorName: "宋七",
            id: 5,
            departId: 1,
            weekType: "3"
          }
        ],
      },
      dialogFormVisible: false,
      rules: {
        date: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "blur"
          }
        ],
        dname: [
          {
            required: true,
            message: "请选择医生名称",
            trigger: "blur"
          }
        ],
        dept: [
          {
            required: true,
            message: "请选择所属科室",
            trigger: "blur"
          }
        ],
      },
      showTime: new Date(),
      mapList: null,
      loading: false,
      loadingText: "确 定",
      form: {},
      dialogStatus: "",
      textMap: {
        create:"新增排班",
        update: "编辑排班"
      },
      scheduleList: [] ,//课表
      docList:[],
    };
  },
  created() {
    this.getData()
    this.getList()
    this.getDept()
    this.getMap()
  },
  computed: { 
  roleName() {
      return localStorage.getItem('roleName');
    }
  },
  methods: {
    // 处理周一到周日
    getMap(){
      var now = new Date();
      var nowTime = now.getTime() ;
      var day = now.getDay();
      var oneDayTime = 24*60*60*1000;
      var one = nowTime - (day-1)*oneDayTime ;//显示周一
      var two = nowTime - (2-day)*oneDayTime ;//显示周二
      var three = nowTime - (3-day)*oneDayTime ;//显示周三
      var four = nowTime - (4-day)*oneDayTime ;//显示周四
      var five = nowTime - (5-day)*oneDayTime ;//显示周五
      var six = nowTime - (6-day)*oneDayTime ;//显示周六
      var serven =  nowTime + (7-day)*oneDayTime ;//显示周日
      this.mapList = {
          1: this.parseTime(new Date(one),'{y}-{m}-{d}'),
          2: this.parseTime(new Date(two),'{y}-{m}-{d}'),
          3: this.parseTime(new Date(three),'{y}-{m}-{d}'),
          4: this.parseTime(new Date(four),'{y}-{m}-{d}'),
          5: this.parseTime(new Date(five),'{y}-{m}-{d}'),
          6: this.parseTime(new Date(six),'{y}-{m}-{d}'),
          7: this.parseTime(new Date(serven),'{y}-{m}-{d}')
        }
    },
    // 获取医生列表
    getList(){
      findallDoctor().then(res=>{
        this.docList = res
      })
    },
    getData(d){
      showWeeklyRoaster().then(res=>{
        
      })
    },
    // 查询所有科室
    getDept(){
      findAllDept().then(res=>{
        this.deptOptions = res
        this.scheduleList = this.handleTableData(this.tableData.list);
     })
    },
    // 处理表格数据
    handleTableData(scheduleList) {
      if (scheduleList && scheduleList.length) {
        this.deptOptions.forEach((dept) => {
          dept.list = [[], [], [], [], [], [], []];
          scheduleList.forEach((item) => {
            if (dept.no == item.id) {
              for (var i = 0; i < 7; i++) {
                if (item.weekType - 1 == i) {
                  dept.list[i].push(item);
                }
              }
            }
          });
        });
      }
      console.log(this.deptOptions);
      return this.deptOptions;
    },
    // 根据时间更新课程表
    handleChangeTime(value) {
      this.getList(value);
    },
    // 新增排班
    handleCreate(){
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    //排班编辑
    handleUpdate(id) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    //返回
    cancel(formName) {
      this.dialogFormVisible = false;
    },
    // 删除排班
    handleDelete(row) {
      this.$confirm("确认删除此排班?", "删除排班", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        deleteDoctor(this.formatParams(this.form)).then(res=>{
          if(res == '删除成功'){
            this.$message.success('删除成功')
            this.getList()
            this.loading = false
          }else{
            this.loading = false
            this.$message.error(res)
          }
        })
      });
    },
    // 添加
    create(formusername) {
      const set = this.$refs;
      set[formusername].validate((valid) => {
        if (valid) {
          this.loading = true;
          arrangeDoctor(this.formatParams(this.form)).then((res) => {
            if (res == "添加排班成功") {
              this.loading = false;
              this.dialogFormVisible = false;
              this.getList();
              this.$message.success("添加排班成功");
            } else {
              this.loading = false;
              this.$message.error(res);
            }
          });
        }
      });
    },
    //编辑排班信息
    update(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          updateDoctor(this.formatParams(this.form)).then((response) => {
            this.loading = false;
            if (res == '编辑排班成功') {
              this.$message.success("编辑排班成功");
              this.getList(); //获取课程列表
              this.dialogFormVisible = false;
            } else {
              this.$message.error(response.msg);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.itemList {
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 5px;
}
.class-table {
  background: #fff;
  padding: 16px;
  height: calc(100vh - 145px);
  border-collapse: none;
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .table-container {
    table {
      table-layout: fixed;
      width: 100%;
      border-spacing: none;
      thead {
        background-color: #4065e0;
        th {
          color: #fff;
          line-height: 17px;
          font-weight: normal;
        }
      }
      tbody {
        background-color: #fff;
        td {
          color: #677998;
          height: 70px;
        }
      }
      th,
      td {
        width: 100px;
        font-size: 12px;
        text-align: center;
        // overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }

      tr td:first-child {
        color: #333;
        .period {
          font-size: 8px;
        }
      }
    }
  }
}
</style>