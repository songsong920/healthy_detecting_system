<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>异常患者</span></div>
      <el-button type="primary" size="small">一键通知</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      listQuery: {
        pageNumber: 1,
        pageSize: 10
      },
      tableKey: 0
    };
  }
};
</script>