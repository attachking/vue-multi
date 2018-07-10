<!--招聘会已发布职位列表-->
<template>
  <div class="position-list">
    <div class="title">
      <div class="left">
        <p :title="info.acb331">{{info.acb331 || '--'}}</p>
        <p class="address">
          <span>
            <i class="xffont font-zuobiao"></i>&nbsp;{{info.acd200name || '--'}}
          </span>
          <span>
            摊位号：<span class="red">{{$route.query.ace201}}</span>
          </span>
        </p>
        <p><i class="xffont font-msnui-time"></i>&nbsp;{{$dateFormat(info.acb333, 'yyyy-MM-dd hh:mm')}} 至 {{$dateFormat(info.acb334, 'yyyy-MM-dd hh:mm')}}</p>
      </div>
      <div class="right">
        <router-link :to="'/jobFair/fairJob?acb330=' + acb330">
          <el-button type="success" plain>发布岗位</el-button>
        </router-link>
        <el-button type="primary" plain @click="history">提取有效岗位</el-button>
      </div>
    </div>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        label="岗位名称"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.cca113 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="招聘人数">
        <template slot-scope="scope">
          <span>{{scope.row.acb21r || 0}}人</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工作经验">
        <template slot-scope="scope">
          <span>{{scope.row.acc218 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="薪资待遇">
        <template slot-scope="scope">
          <span>{{scope.row.acc034Name || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="工作性质">
        <template slot-scope="scope">
          <span>{{scope.row.acb21iName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="岗位状态">
        <template slot-scope="scope">
          <span>{{Number(scope.row.acb208) === 3 ? '审核不通过' : Number(scope.row.acb208) === 4 ? '待审核' : Number(scope.row.acb208) === 2 ? '已过期' : '审核通过'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <span>
            <i class="el-icon-view edit" title="预览" @click="preview(scope.row)"></i>
            <i class="el-icon-edit edit" title="修改" @click="edit(scope.row)"></i>
            <i class="xffont font-weibiaoti519 edit" title="暂停岗位" v-if="Number(scope.row.acb208) === 0" @click="pause(scope.row, 0)"></i>
            <i class="el-icon-caret-right edit" title="启用岗位" v-if="Number(scope.row.acb208) === 1" @click="pause(scope.row, 1)"></i>
            <i class="el-icon-refresh edit" title="刷新岗位" v-if="Number(scope.row.acb208) === 0" @click="refresh(scope.row)"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
    <el-dialog
      title="提取有效岗位"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="800px">
      <el-table
        :data="historyList"
        stripe
        v-loading="historyLoading"
        style="width: 100%">
        <el-table-column
          label="岗位名称"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.cca113 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          align="center"
          label="使用日期">
          <template slot-scope="scope">
            <span>{{scope.row.ccpr05}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="工作经验">
          <template slot-scope="scope">
            <span>{{scope.row.acc218}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="招聘人数">
          <template slot-scope="scope">
            <span>{{scope.row.acb21r}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="90"
          label="学历">
          <template slot-scope="scope">
            <span>{{scope.row.aac012}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="110"
          label="薪资">
          <template slot-scope="scope">
            <span>{{scope.row.acc034Name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="Number(scope.row.is_Check) === 0 ? '提取岗位' : '已提取，点击取消'" placement="left">
              <el-button :type="Number(scope.row.is_Check) === 0 ? '' : 'danger'" :icon="Number(scope.row.is_Check) === 0 ? 'el-icon-download' : 'el-icon-delete'" size="mini" @click="pull(scope.row)" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <pagination :bean="historyPageBean" @current-change="handleChange"></pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/pagination.vue'

export default {
  components: {Pagination},
  data() {
    return {
      info: {},
      acb330: '',
      searchData: {
        acb330: this.$route.query.acb330,
        aab001: this.$userInfo.aab001,
        cczy01: this.$route.query.cczy01,
        rowsNum: 10,
        currentPage: 1
      },
      list: [],
      pageBean: {},
      loading: false,
      // 有效职位
      historyList: [],
      historyLoading: false,
      dialogVisible: false,
      historyPageBean: {},
      historySearch: {
        aab001: this.$userInfo.aab001,
        cczy01: this.$route.query.cczy01,
        rowsNum: 6,
        currentPage: 1,
        remark: 1,
        acb330: this.$route.query.acb330
      }
    }
  },
  methods: {
    getJobFairInfo() {
      this.$post('/service/business/jobfair/jobFairInfo/getJobFairInfo.xf', {
        acb330: this.$route.query.acb330,
        aab001: this.$userInfo.aab001
      }).then(res => {
        this.info = res.result
      })
    },
    getList() {
      this.loading = true
      this.$post('/service/business/jobfair/jobFairInfo/getJobFairPostionList.xf', this.searchData).then(res => {
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
        name: 'fairJob',
        query: {
          acb330: this.acb330,
          acb210: val.acb210
        }
      })
    },
    preview(val) {
      this.$router.push({
        name: 'fairJobPreview',
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
    },
    handleClose(done) {
      this.getList()
      done()
    },
    history() {
      this.dialogVisible = true
      this.getHistoryList()
    },
    getHistoryList() {
      this.historyLoading = true
      this.$post('/service/business/corp/newPosition/getValidJobList.xf', this.historySearch).then(res => {
        this.historyLoading = false
        this.historyList = res.result
        this.historyPageBean = res.pageBean
      }).catch(() => {
        this.historyLoading = false
      })
    },
    handleChange(page) {
      this.historySearch.currentPage = page
      this.getHistoryList()
    },
    pull(val) {
      this.historyLoading = true
      this.$post('/service/business/corp/newPosition/applyForJobFair.xf', {
        aab001: this.$userInfo.aab001,
        acb330: this.$route.query.acb330,
        cczy01: this.$route.query.cczy01,
        acb210Str: `${Number(val.is_Check) === 0 ? 1 : 0},${val.acb210}`
      }).then(res => {
        this.historyLoading = false
        if (res.result && res.result.result === 1) {
          this.$message({
            message: res.result.message,
            type: 'success'
          })
          this.getHistoryList()
        }
      }).catch(() => {
        this.historyLoading = false
      })
    }
  },
  created() {
    this.getJobFairInfo()
    this.getList()
    this.acb330 = this.$route.query.acb330
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .title{
    margin: 20px 0;
    padding: 15px 15px;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    @include clearFixed;
    .left{
      width: 600px;
      float: left;
      p{
        width: 100%;
        @include ellipsis;
        &:nth-child(1){
          font-size: 16px;
          color: $--color-primary;
        }
        &:not(:first-child){
          padding-top: 8px;
          font-size: 14px;
          color: #666;
        }
      }
      .address{
        & > span{
          display: inline-block;
          &:first-child{
            padding-right: 20px;
          }
        }
      }
    }
    .right{
      width: 250px;
      float: right;
    }
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
  .edit{
    font-size: 18px;
    &:hover{
      cursor: pointer;
      color: $--color-primary;
    }
  }
  .red{
    color: red;
  }
</style>
