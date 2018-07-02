<template>
  <div class="invitation">
    <el-table
      :data="list"
      stripe
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        label="职位名称"
        width="150">
        <template slot-scope="scope">
          <a target="_blank" :href="'job.html?acb210=' + scope.row.acb210">{{scope.row.cca113 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="企业名称">
        <template slot-scope="scope">
          <a target="_blank" :href="'corp.html?aab001=' + scope.row.aab001">{{scope.row.aab004 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="面试时间">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.ccps03">{{scope.row.ccps03 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="面试地点">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.ccps05">{{scope.row.ccps05 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.ccps11 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="回复状态">
        <template slot-scope="scope">
          <span>{{scope.row.isaccept == 2 ? '已接受' : scope.row.isaccept == 1 ? '已拒绝' : '未回复'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      loading: false,
      searchData: {
        aac001: this.$userInfo.aac001,
        rowsNum: 10,
        currentPage: 1
      },
      list: [],
      pageBean: {}
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/person/personInterviewInvitation/getPersonInvitationList.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .page{
    text-align: center;
    padding: 15px 0;
  }
  .ellipsis{
    display: inline-block;
    max-width: 150px;
    @include ellipsis;
  }
</style>
