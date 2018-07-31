<template>
  <div class="apply">
    <el-table
      :data="list"
      stripe
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        align="center"
        label="岗位名称"
        width="150">
        <template slot-scope="scope">
          <a target="_blank" :href="'job.html?acb210=' + scope.row.acb210">{{scope.row.cca113 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单位名称">
        <template slot-scope="scope">
          <a target="_blank" :href="'corp.html?aab001=' + scope.row.aab001">{{scope.row.aab004 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工作地点">
        <template slot-scope="scope">
          <span>{{scope.row.bcb202 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="应聘时间">
        <template slot-scope="scope">
          <span>{{scope.row.ccpj02}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="查看状态">
        <template slot-scope="scope">
          <span>{{scope.row.ccpj03}}</span>
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
      searchData: {
        aac001: this.$userInfo.aac001,
        rowsNum: 10,
        currentPage: 1
      },
      list: [],
      pageBean: {},
      loading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/person/personSendResume/getApplyList.xf', this.searchData).then(res => {
        this.loading = false
        this.pageBean = res.pageBean
        this.list = res.result
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
</style>
