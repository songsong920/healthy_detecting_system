<template>
  <div>
    <div class="app-header">
      <div class="allManager"><span>健康数据统计</span></div>
       <el-button type="primary" size="small" 
                >数据保存</el-button
              >
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
            <el-button type="text" style="color:#000 !important">{{ scope.row.temperature?scope.row.temperature:'0' }}℃</el-button>
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
          name: "患者1",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure:'111',
          pulse:'100',
          temperature:'37'
        },
        {
          name: "患者2",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure:'111',
          pulse:'100',
          temperature:'37'
        },
        {
          name: "患者3",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure:'111',
          pulse:'100',
          temperature:'36'
        },
        {
          name: "患者4",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure:'111',
          pulse:'100',
          temperature:'34'
        },
        {
          name: "患者5",
          sex: "男",
          mobilePhone: "13655555555",
          idCard: "522422199800114456",
          date: "2022-4-25",
          bloodPressure:'111',
          pulse:'100',
          temperature:'38'
        }
      ],
      tableKey: 0
    };
  },
};
</script>