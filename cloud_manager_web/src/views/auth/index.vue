<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="auth-header">
        <el-row :gutter="20">
          <el-col :span="1" style="text-align: left; margin-right: 1%">
            <el-button @click="getAuthCenterByList(1)" icon="el-icon-refresh-right"></el-button>
          </el-col>
          <el-col :span="6">
            <el-input v-model="input" placeholder="请输入内容" @keyup.enter="getAuthCenterByList(1)"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="getAuthCenterByList(1)">搜索</el-button>
          </el-col>
          <el-col :span="10" style="text-align: right; margin-left: 3%">
            <el-button @click="dialogVisible = true">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        height="420px"
        max-height="420px"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="80"
          fixed
        >
        </el-table-column>
        <el-table-column
          label="授权码"
          width="350"
        >
          <template slot-scope="scope">
              <div>
                <div>AK：{{scope.row.accessKey}}<i class="el-icon-copy-document copy-style" style="margin-left: 3px" @click="doCopy(scope.row.accessKey)"></i></div>
                <div>SK：{{scope.row.securityKey}}<i class="el-icon-copy-document copy-style" style="margin-left: 3px" @click="doCopy(scope.row.accessKey)"></i></div>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="serverName"
          label="服务商"
        >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
        >
          <template slot-scope="scope">
            <div>-
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="所有人"
        >
          <template slot-scope="scope">
            <div>-
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
        >
          <template slot-scope="scope">
            <div>{{ formatTime(scope.row.createTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <!--            <el-button-->
            <!--              @click="handle(scope.$index, scope.row, 0)"-->
            <!--              type="text"-->
            <!--              style="color: #98cb65"-->
            <!--            >查看-->
            <!--            </el-button>-->
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
      <div class="auth-footer">
        <el-pagination
          background
          @current-change="getAuthCenterByList"
          :current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      :title="panelTitle"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="auth" :model="auth" label-width="100px">
        <el-form-item label="Access Key">
          <el-input v-model="auth.accessKey"></el-input>
        </el-form-item>
        <el-form-item label="Security Key">
          <el-input v-model="auth.securityKey"></el-input>
        </el-form-item>
        <el-form-item label="云服务商">
          <el-select v-model="auth.serverName" placeholder="请选择云服务商" style="width: 100%">
            <el-option label="腾讯云" value="腾讯云"></el-option>
            <el-option label="阿里云" value="阿里云"></el-option>
            <el-option label="AWS" value="AWS"></el-option>
            <el-option label="UCloud" value="UCloud"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addAuth">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addAuth, deleteAuthById, getAuthById, getAuthCenterByList, getAuthCount } from '@/api/auth'
import { formatTime } from '@/utils/time'

export default {
  name: 'auth-list',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      auth: {},
      count: 0,
      input: '',
      currentPage: 1,
      panelTitle: '新增授权',
      disabled: false,
      clipboard: {
        text: ''
      }
    }
  },
  created() {
    this.getAuthCenterByList()
    document.addEventListener('copy', this.copy)
  },
  methods: {
    getAuthCenterByList(val = 1) {
      getAuthCenterByList(
        {
          index: val,
          pageSize: 10,
          value: this.input
        }
      ).then((res) => {
        this.tableData = res.data.message
        this.getAuthCount()
      })
    },
    addAuth() {
      this.auth.userId = 1
      addAuth(this.auth).then((res) => {
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.getAuthCenterByList()
        this.auth = {}
      }).catch(() => {
        this.dialogVisible = false
        this.auth = {}
      })
    },
    handle(id, row, type) {
      if (type === 2) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAuthById({ id: row.id }).then((res) => {
            if (res.data.data.statusCode === 300) {
              this.$message.error(res.data.data.message)
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.getAuthCenterByList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (type === 1) {
        this.panelTitle = '编辑授权'
        this.dialogVisible = true
        // 获取权限ID
        getAuthById({ id: row.id }).then((res) => {
          this.auth = res.data.data.data
        })
      } else {
        this.panelTitle = '查看授权'
      }
    },
    formatTime,
    getAuthCount() {
      getAuthCount().then((res) => {
        this.count = res.data.data.data
      })
    },
    copy(e) {
      e.clipboardData.setData('text/plain', this.clipboard.text);
      e.preventDefault();
    },
    doCopy(val) {
      this.clipboard.text = val;
      document.execCommand('copy');
      this.$message.info('内容已复制！')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.auth-footer {
  margin-top: 1%;
}

.auth-header {
  line-height: 70px;
}
.copy-style {
  cursor: pointer;
}
</style>
