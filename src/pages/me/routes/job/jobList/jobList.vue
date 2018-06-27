<template>
  <div class="job-list">
    <el-form inline class="demo-form-inline">
      <el-form-item label="职位审核状态">
        <el-select v-model="form.abb773" placeholder="不限" clearable>
          <el-option label="未审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核未通过" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位发布状态">
        <el-select v-model="form.acb208" placeholder="不限" clearable>
          <el-option label="使用中" value="0"></el-option>
          <el-option label="暂停" value="1"></el-option>
          <el-option label="已过期" value="2"></el-option>
          <el-option label="审核不通过" value="3"></el-option>
          <el-option label="待审核" value="4"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        label="职位名称"
        width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.cca113 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投递简历数">
        <template slot-scope="scope">
          <span>未查看{{scope.row.alreadyStatus}}个,共{{scope.row.allStatus}}个</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布日期">
        <template slot-scope="scope">
          <span>{{$dateFormat(scope.row.aae030, 'yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="刷新日期">
        <template slot-scope="scope">
          <span>{{$dateFormat(scope.row.cczy09, 'yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="职位状态">
        <template slot-scope="scope">
          <span>{{scope.row.ecb208}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态">
        <template slot-scope="scope">
          <span>{{scope.row.ebb773}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <span>
            <i class="el-icon-view edit" title="预览" @click="preview(scope.row)"></i>
            <i class="el-icon-edit edit" title="修改" @click="edit(scope.row)"></i>
            <i class="xffont font-weibiaoti519 edit" title="暂停职位" v-if="Number(scope.row.acb208) === 0" @click="pause(scope.row, 0)"></i>
            <i class="el-icon-caret-right edit" title="启用职位" v-if="Number(scope.row.acb208) === 1" @click="pause(scope.row, 1)"></i>
            <i class="el-icon-refresh edit" title="刷新职位" v-if="Number(scope.row.acb208) === 0" @click="refresh(scope.row)"></i>
          </span>
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
import Empty from '../../../../../components/empty/empty.vue'
// abb773  审核状态
// acb208  职位状态  0-使用中, 1-暂停, 2-已过期,3-审核不通过,4-待审核

export default {
  components: {
    Empty,
    Pagination},
  data() {
    return {
      form: {
        aab001: this.$userInfo.aab001,
        rowsNum: 10,
        currentPage: 1,
        abb773: '',
        acb208: ''
      },
      list: [],
      pageBean: {},
      loading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/corp/corpPositon/positionList.xf', this.form).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    handlePage(page) {
      this.form.currentPage = page
      this.getList()
    },
    handleChange() {
      setTimeout(() => {
        this.form.currentPage = 1
        this.getList()
      }, 20)
    },
    edit(val) {
      this.$router.push({
        name: 'jobEdit',
        query: {
          acb210: val.acb210
        }
      })
    },
    preview(val) {
      this.$router.push({
        name: 'jobPreview',
        query: {
          acb210: val.acb210
        }
      })
    },
    refresh(val) {
      this.loading = true
      this.$post('/service/business/corp/corpPositon/positionRefresh.xf', {
        acb210: val.acb210
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
    pause(val, acb208) {
      this.loading = true
      this.$post('/service/business/corp/corpPositon/positionStopReset.xf', {
        acb210: val.acb210,
        acb208
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
    }
  },
  created() {
    this.getList()
    this.$watch('form.abb773', this.handleChange)
    this.$watch('form.acb208', this.handleChange)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .demo-form-inline{
    padding: 15px 0 0 0;
  }
  .edit{
    font-size: 18px;
    &:hover{
      cursor: pointer;
      color: $--color-primary;
    }
  }
  .page{
    margin: 20px 0;
    text-align: center;
  }
</style>
