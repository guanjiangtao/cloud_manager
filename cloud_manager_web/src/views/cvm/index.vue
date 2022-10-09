<template>
  <div>
    <el-card class="box-card">
      <div class="cvm-header">
        <el-row :gutter="20">
          <el-col :span="10" style="text-align: left; margin-right: 1%">
            <el-select v-model="region" placeholder="请选择地区" @change="getCvmByList" style="margin-right: 5px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="region" placeholder="请选择账号" @change="getCvmByList" style="margin-right: 5px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="dialogVisible = true">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="cvmList"
        border
        stripe
        height="420px"
        max-height="420px"
        style="width: 100%"
      >
<!--        <el-table-column-->
<!--          prop="id"-->
<!--          label="ID"-->
<!--          width="180"-->
<!--          fixed-->
<!--        >-->
<!--        </el-table-column>-->
        <el-table-column
          prop="InstanceName"
          label="实例名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="InstanceId"
          label="实例ID"
        >
        </el-table-column>
        <el-table-column
          prop="serverName"
          label="服务商"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="所有人"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
        >
          <template slot-scope="scope">
            <div>{{
                formatTime(scope.row.createTime)
              }}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="handle(scope.$index, scope.row, 1)"
              type="text"
            >编辑
            </el-button>
            <el-button
              type="text"
              style="color: red"
              @click="handle(scope.$index, scope.row, 2)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCvmByList } from '@/api/cvm'
import { formatTime } from '@/utils/time'
import { getAuthCenterByList } from '@/api/auth'

export default {
  name: 'index',
  data() {
    return {
      cvmList: [],
      dialogVisible: false,
      input: "",
      region: 'ap-guangzhou',
      options: [{
        value: 'ap-guangzhou',
        label: '广州'
      }, {
        value: 'ap-beijing',
        label: '北京'
      }, {
        value: 'ap-hongkong',
        label: '香港'
      }, {
        value: 'ap-chongqing',
        label: '重庆'
      }, {
        value: 'ap-chengdu',
        label: '成都'
      }],
      accountOptions: []
    }
  },
  created() {
    this.getCvmByList()
  },
  methods: {
    getCvmByList() {
      getCvmByList({
        id: 1,
        region: this.region,
        offset: 0,
        limit: 100
      }).then((res) => {
        this.cvmList = res.data.message
        console.log(this.cvmList)
      })
    },
    formatTime,
    handle(index, row, type) {

    },
    getAllAuthAccount() {

    },
  }
}
</script>

<style scoped>

.cvm-header {
  line-height: 70px;
}
</style>
