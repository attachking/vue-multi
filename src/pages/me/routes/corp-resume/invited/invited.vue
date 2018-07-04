<template>
  <div class="invited">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-select v-model="searchData.isaccept" placeholder="请选择回复状态" clearable>
          <el-option label="未回复" value="0"></el-option>
          <el-option label="已拒绝" value="1"></el-option>
          <el-option label="已接受" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="searchData.aac003" placeholder="请输入姓名" @keydown.native.enter="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      stripe
      v-loading="loading"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名">
        <template slot-scope="scope">
          <a target="_blank" href="">{{scope.row.aac003 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="意向职位">
        <template slot-scope="scope">
          <span>{{scope.row.aca112 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="邀请职位">
        <template slot-scope="scope">
          <span>{{scope.row.cca113 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sexName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="年龄">
        <template slot-scope="scope">
          <span>{{scope.row.age || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="备注"
            width="200"
            trigger="hover"
            :disabled="!scope.row.ccps12"
            :content="scope.row.ccps12">
            <el-button
              size="mini"
              slot="reference"
              type="text">
              {{scope.row.isaccept === 2 ? '已接受' : scope.row.isaccept === 1 ? '已拒绝' : '未答复'}}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="面试结果">
        <template slot-scope="scope">
          <span>{{scope.row.result || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="160px"
        label="邀请时间">
        <template slot-scope="scope">
          <span>{{scope.row.ccps02 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="100px"
        label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <el-button type="text">标记<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="scope.row.ccps01 + ',' + 0">待定</el-dropdown-item>
              <el-dropdown-item :command="scope.row.ccps01 + ',' + 1">已录取</el-dropdown-item>
              <el-dropdown-item :command="scope.row.ccps01 + ',' + 2">不合适</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div class="edit">
      <el-dropdown @command="handleCommand2">
        <el-button type="primary" size="mini">标记<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">待定</el-dropdown-item>
          <el-dropdown-item command="1">已录取</el-dropdown-item>
          <el-dropdown-item command="2">不合适</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/pagination.vue'

export default {
  components: {Pagination},
  data() {
    return {
      searchData: {
        isaccept: '', // 状态
        aab001: this.$userInfo.aab001,
        rowsNum: 10,
        currentPage: 1,
        aac003: '' // 关键字
      },
      list: [],
      pageBean: {},
      loading: false,
      checked: []
    }
  },
  methods: {
    onSubmit() {
      this.searchData.currentPage = 1
      this.getList()
    },
    getList() {
      this.loading = true
      this.$post('/service/business/corpResume/corpInterviewInvitation/getCorpInvitationList.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    handleSelectionChange(selections) {
      this.checked = selections.map(item => item.ccps01)
    },
    handleCommand(cmd) {
      const arr = cmd.split(',')
      this.sign(arr[0], arr[1])
    },
    sign(ids, result) {
      this.loading = true
      this.$post('/service/business/corpResume/corpInterviewInvitation/updateResult', {
        ids,
        result // 标记状态
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    handleCommand2(cmd) {
      if (!this.checked.length) return
      this.sign(this.checked.join(','), cmd)
    }
  },
  created() {
    this.onSubmit()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .demo-form-inline{
    padding: 15px 0 0 15px;
    font-size: 14px;
  }
  .edit{
    padding: 15px 0;
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
</style>
