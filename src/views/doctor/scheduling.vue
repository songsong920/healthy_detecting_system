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
                  v-for="(schedule, scheduleIndex) in scheduleList"
                  :key="scheduleIndex"
                  style="border: 1px solid #e7e7e7"
                >
                  <td style="border: 1px solid #e7e7e7;">
                    <p>{{ schedule.timeName }}</p>
                    <p class="period">{{ schedule.name }}</p>
                  </td>
                  <td
                    v-for="(item, index) in schedule.list"
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
          <el-button v-else type="primary" @click="update('form')" :loading="loading" size='small'>{{
            loadingText
          }}</el-button>
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
      weekList: [
        { weekType: "1", value: "周一" },
        { weekType: "2", value: "周二" },
        { weekType: "3", value: "周三" },
        { weekType: "4", value: "周四" },
        { weekType: "5", value: "周五" },
        { weekType: "6", value: "周六" },
        { weekType: "7", value: "周日" }
      ],
      departMentList: [
        {
          id: 1,
          name: "科室1"
        },
        {
          id: 2,
          name: "科室2"
        },
        {
          id: 3,
          name: "科室3"
        },
        {
          id: 4,
          name: "科室4"
        },
        {
          id: 5,
          name: "科室5"
        },
        {
          id: 6,
          name: "科室6"
        }
      ],
      tableData: {
        list: [
          {
            classTime: "2022-05-03",
            doctorName: "张三",
            id: 1,
            departId: 3,
            weekType: "2"
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
        map: {
          1: "2022-05-02",
          2: "2022-05-03",
          3: "2022-05-04",
          4: "2022-05-05",
          5: "2022-05-06",
          6: "2022-05-07",
          7: "2022-05-08"
        }
      },
      dialogFormVisible: false,
      rules: {},
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
      scheduleList: [] //课表
    };
  },
  created() {
    this.getNowCourList();
  },
  methods: {
    // 获取当前医生列表
    getNowCourList() {
      this.scheduleList = this.handleTableData(this.tableData.list);
      this.mapList = this.tableData.map;
    },
    // 处理表格数据
    handleTableData(scheduleList) {
      if (scheduleList && scheduleList.length) {
        this.departMentList.forEach((schedule) => {
          schedule.list = [[], [], [], [], [], [], []];
          scheduleList.forEach((item) => {
            if (schedule.id == item.departId) {
              for (var i = 0; i < 7; i++) {
                if (item.weekType - 1 == i) {
                  schedule.list[i].push(item);
                }
              }
            }
          });
        });
      }
      console.log(this.departMentList);
      return this.departMentList;
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
    //编辑排班信息
    update(formName) {
      const set = this.$refs;
      set[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loadingText = "保存中...";
          updateNowCourse(this.form).then((response) => {
            this.loading = false;
            this.loadingText = "确 定";
            if (response.code == 200) {
              this.$message.success("排班编辑成功");
              this.getNowCourList(); //获取课程列表
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