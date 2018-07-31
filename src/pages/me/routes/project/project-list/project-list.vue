<template>
  <div class="project-list">
    <el-table :data="list" v-loading="loading">
      <el-table-column
        align="center"
        width="150"
        label="项目名称">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectName">{{scope.row.projectName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        label="项目类别">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectCategoryName">{{scope.row.projectCategoryName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        label="经费来源">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.fundSourceName">{{scope.row.fundSourceName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        label="工作地点">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectWorkaddress">{{scope.row.projectWorkaddress || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        label="联系人">
        <template slot-scope="scope">
          <span class="ellipsis" :title="scope.row.projectContacts">{{scope.row.projectContacts || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="70"
        label="状态">
        <template slot-scope="scope">
          <span :class="Number(scope.row.projectAuditstatus) === 2 ? 'red' : Number(scope.row.projectAuditstatus) === 1 ? 'green' : 'un'">{{Number(scope.row.projectAuditstatus) === 2 ? '审核不通过' : Number(scope.row.projectAuditstatus) === 1 ? '审核通过' : '未审核'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-view" circle size="mini" title="预览" @click="see(scope.row)"></el-button>
          <el-button icon="el-icon-edit" circle size="mini" title="编辑" @click="edit(scope.row)"></el-button>
          <el-button icon="el-icon-delete" type="danger" circle size="mini" title="删除" @click="confirmDel(scope.row)"></el-button>
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
    },
    edit(val) {
      this.$router.push({
        name: 'projectApply',
        query: {
          projectid: val.projectid
        }
      })
    },
    confirmDel(val) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(val.projectid)
      })
    },
    del(ids) {
      this.loading = true
      this.$post('/service/business/project/enterpriseProject/delProjectInfo.xf', {ids}).then(res => {
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
    see(val) {
      this.$router.push({
        name: 'projectDetail',
        query: {
          projectid: val.projectid
        }
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
  .ellipsis{
    display: inline-block;
    max-width: 150px;
    @include ellipsis;
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
  .red{
    color: red;
  }
  .green{
    color: green;
  }
  .un{
    color: #666;
  }
</style>
