<template>
  <div class="corp-collection">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model.trim="searchData.aac003" placeholder="请输入姓名" @keydown.native.enter="onSubmit" clearable></el-input>
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
          <a target="_blank" :href="'personalInfo.html?aac001=' + scope.row.ccmp01">{{scope.row.aac003 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="意向岗位">
        <template slot-scope="scope">
          <span>{{scope.row.aca112 || '--'}}</span>
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
        label="学历">
        <template slot-scope="scope">
          <span>{{scope.row.eac011 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="专业名称">
        <template slot-scope="scope">
          <span>{{scope.row.aac040 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="160px"
        label="收藏时间">
        <template slot-scope="scope">
          <span>{{scope.row.ccpg02 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="100px"
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-delete" circle title="取消收藏" size="mini" @click="delSingle(scope.row)"></el-button>
          <el-tooltip class="item" effect="dark" content="已邀请" placement="right-end" :disabled="Number(scope.row.ccp03) === 0">
            <el-button
              @click="invite(scope.row)"
              icon="xffont font-yaoqingchengyuan"
              circle
              :title="scope.row.ccp03 > 0 ? '' : '面试邀请'"
              size="mini"
              :type="scope.row.ccp03 > 0 ? 'primary' : ''">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="edit" v-if="list.length">
      <el-button type="primary" size="mini" @click="inviteAll">面试邀请</el-button>
      <el-button size="mini" @click="delAll">取消收藏</el-button>
    </div>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
    <xf-invitation ref="invitation"></xf-invitation>
  </div>
</template>
<script>
import XfInvitation from '../../../../../components/xf-invitation/xf-invitation.vue'
import Pagination from '../../../../../components/pagination/pagination.vue'

export default {
  components: {
    Pagination,
    XfInvitation},
  data() {
    return {
      searchData: {
        aab001: this.$userInfo.aab001,
        rowsNum: 10,
        currentPage: 1,
        aac003: '' // 关键字
      },
      list: [],
      pageBean: {},
      loading: false,
      checked: [],
      inviteChecked: []
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/corpResume/corpTalentCollection/getCorpTalentList.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    onSubmit() {
      this.searchData.currentPage = 1
      this.getList()
    },
    handleSelectionChange(selections) {
      this.checked = selections
      this.inviteChecked = []
      selections.forEach(item => {
        if (Number(item.ccp03) === 0) {
          this.inviteChecked.push(item.ccmp01)
        }
      })
    },
    invite(val) {
      /*
      if (Number(val.ccp03) > 0) {
        this.$message({
          message: '已经邀请过该用户',
          type: 'warning'
        })
        return
      }
      */
      this.$refs.invitation.show(val.ccmp01).then(() => {
        this.getList()
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    inviteAll() {
      if (!this.checked.length) {
        this.$message({
          message: '没有选择任何项',
          type: 'warning'
        })
        return
      }
      /*
      if (!this.inviteChecked.length) {
        this.$message({
          message: '您已经邀请过了',
          type: 'warning'
        })
        return
      }
      */
      this.$refs.invitation.show(this.checked.map(item => item.ccmp01).join(',')).then(() => {
        this.getList()
      })
    },
    delAll() {
      if (!this.checked.length) {
        this.$message({
          message: '没有选择任何项',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定删除收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(this.checked.map(item => item.ccpg01).join(','))
      })
    },
    delSingle(val) {
      this.del(val.ccpg01)
    },
    del(ccpg01) {
      this.loading = true
      this.$post('/service/business/corpResume/corpTalentCollection/delTalentInfo.xf', {ccpg01}).then(res => {
        this.loading = false
        if (res.result && res.result.result === 1) {
          this.$message({
            message: res.result.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .demo-form-inline{
    padding: 15px 0 0 15px;
    font-size: 14px;
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
  .edit{
    padding: 15px 0;
  }
</style>
