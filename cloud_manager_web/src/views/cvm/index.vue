<template>
  <div>
    <el-card class="box-card">
      <div class="cvm-header">
        <el-row :gutter="20">
          <el-col :span="10" style="text-align: left; margin-right: 1%">
            <el-select v-model="region" placeholder="请选择地区" @change="getCvmByList" style="margin-right: 5px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="region" placeholder="请选择账号" @change="getCvmByList" style="margin-right: 5px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="dialogVisible = true">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="cvmList" border stripe height="420px" max-height="420px" style="width: 100%">
        <el-table-column prop="InstanceName" label="实例名称" width="80">
        </el-table-column>
        <el-table-column prop="InstanceId" label="实例ID" width="110">
          <template slot-scope="scope">
            <div class="tbl-font-style instance-id-class">
              {{ scope.row.InstanceId }}
              <i class="el-icon-document-copy copy-tbl-icon" @click="doCopy(scope.row.InstanceId)"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="机器配置" width="140">
          <template slot-scope="scope">
            <div class="tbl-font-style">
              <div> CPU: {{ scope.row.CPU }}核 内存: {{ scope.row.Memory }}GB</div>
              <div>磁盘: {{ scope.row.DataDisks[0].DiskSize }}GB</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="OsName" label="系统名称" width="200">
        </el-table-column>
        <el-table-column label="网络地址" width="320">
          <template slot-scope="scope">
            <div class="tbl-font-style">
              <div id="ipv4" v-if="scope.row.PublicIpAddresses.length > 0">IPv4: {{ scope.row.PublicIpAddresses[0] }}(公)
                <i class="el-icon-document-copy copy-tbl-icon" @click="doCopy(scope.row.PublicIpAddresses[0])"></i>
              </div>
              <div id="ipv6" v-if="scope.row.IPv6Addresses.length > 0">IPv6: {{ scope.row.IPv6Addresses[0] }}(公) <i
                  class="el-icon-document-copy copy-tbl-icon" @click="doCopy(scope.row.IPv6Addresses[0])"></i></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div class="tbl-font-style">{{
                formatTime(scope.row.createTime)
            }}</div>
          </template>
        </el-table-column>
        <el-table-column label="过期时间">
          <template slot-scope="scope">
            <div class="tbl-font-style" :class="renderClass(scope.row.ExpiredTime)">{{
                formatTime(scope.row.ExpiredTime)
            }}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-dropdown>
            <span class="el-dropdown-link">
              执行操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="handle(scope.$index, scope.row, 1)">开机</el-dropdown-item>
              <el-dropdown-item>关机</el-dropdown-item>
              <el-dropdown-item>重启</el-dropdown-item>
              <el-dropdown-item disabled>销毁</el-dropdown-item>
              <el-dropdown-item divided>扩容</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCvmByList } from '@/api/cvm'
import { formatTime, expiredTime } from '@/utils/time'
import { addCopyEventListener, addCopyText } from '@/utils/copy-paste'

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
    addCopyEventListener()
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
    expiredTime,
    handle(index, row, type) {

    },
    renderClass(time) {
      return expiredTime(time) ? 'time-danger' : 'time-normal'
    },
    doCopy(txt) {
      addCopyText(txt)
      document.execCommand("Copy")
      this.$notify.info({
        title: '通知',
        message: '复制成功'
      });
    },
  }
}
</script>

<style scoped>
.cvm-header {
  line-height: 70px;
}

.tbl-font-style {
  font-size: 12px;
}

.copy-tbl-icon {
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.time-normal {

}

.time-danger {
  color: red;
}
</style>
