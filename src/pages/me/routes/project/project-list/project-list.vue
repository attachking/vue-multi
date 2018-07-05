<template>
  <div class="project-list">
    <el-table :data="list">
      <el-table-column
        label="项目名称">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectName">{{scope.row.projectName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="项目类别">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectCategory">{{scope.row.projectCategory || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工作地点">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectWorkaddress">{{scope.row.projectWorkaddress || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="联系人">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectContacts">{{scope.row.projectContacts || '--'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :bean="pageBean" @current-change="handlePage"></pagination>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/pagination.vue'

export default {
  components: {Pagination},
  data() {
    return {
      list: [],
      searchData: {
        aab001: this.$userInfo.aab001,
        rowsNum: 10,
        currentPage: 1
      },
      pageBean: {},
      loading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/project/enterpriseProject/getProjectList', this.searchData).then(res => {
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
  .ellipsis{
    display: inline-block;
    max-width: 150px;
    @include ellipsis;
  }
</style>
