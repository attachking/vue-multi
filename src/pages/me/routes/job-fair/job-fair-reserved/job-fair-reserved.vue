<template>
  <div class="reserved">
    <div class="title">
      <el-form inline class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="searchData.cczy05" placeholder="请选择审核状态" clearable>
            <el-option label="审核中" value="3"></el-option>
            <el-option label="审核通过" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="tip">已预定 <span class="red">{{count}}</span> 场招聘会</span>
    </div>
    <div class="list" v-loading="loading">
      <div class="item" v-for="(val, key) in list" :key="key">
        <a :href="'fair.html?acb330=' + val.acb330" target="_blank" :title="val.acb331">{{val.acb331 || '--'}}</a>
        <p>
          <i class="xffont font-zuobiao"></i>&nbsp;{{val.acd200name || '--'}}&nbsp;&nbsp;&nbsp;
          摊位号：<span class="red">{{val.ace201 || '--'}}</span>&nbsp;&nbsp;&nbsp;
          审核状态：{{Number(val.cczy05) === 3 ? '审核中' : Number(val.cczy05) === 4 ? '审核通过' : '--'}}
        </p>
        <p><i class="xffont font-msnui-time"></i>&nbsp;{{$dateFormat(val.acb333, 'yyyy-MM-dd hh:mm')}} -- {{$dateFormat(val.acb334, 'yyyy-MM-dd hh:mm')}}</p>
        <div class="btn">
          <el-button type="primary" plain @click="publish(val)">发布岗位</el-button>
          <el-button type="primary" plain @click="history(val)">已发布岗位</el-button>
        </div>
      </div>
    </div>
    <empty v-if="pageBean.totalCount === 0"></empty>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/pagination.vue'
import Empty from '../../../../../components/empty/empty.vue'

export default {
  components: {
    Empty,
    Pagination},
  data() {
    return {
      searchData: {
        aab001: this.$userInfo.aab001,
        rowsNum: 6,
        currentPage: 1,
        cczy05: ''
      },
      count: '',
      list: [],
      pageBean: {},
      loading: false
    }
  },
  methods: {
    getCount() { // 已预定的招聘会场次
      this.$post('/service/business/jobfair/jobFairInfo/getFairListByCorpCounts.xf', {
        aab001: this.$userInfo.aab001
      }).then(res => {
        this.count = res.result
      })
    },
    getList() {
      this.loading = true
      this.$post('/service/business/jobfair/jobFairInfo/getFairListByCorp.xf', this.searchData).then(res => {
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
    history(val) {
      this.$router.push({
        name: 'positionList',
        query: {
          acb330: val.acb330,
          cczy01: val.cczy01,
          ace201: val.ace201
        }
      })
    },
    publish(val) {
      this.$router.push({
        name: 'fairJob',
        query: {
          acb330: val.acb330,
          cczy01: val.cczy01
        }
      })
    }
  },
  created() {
    this.getCount()
    this.getList()
    this.$watch('searchData.cczy05', (newVal, oldVal) => {
      setTimeout(() => {
        this.searchData.currentPage = 1
        this.getList()
      }, 20)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .demo-form-inline{
    padding: 15px 0;
    width: 50%;
    float: left;
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .title{
    @include clearFixed;
  }
  .tip{
    display: inline-block;
    float: right;
    padding: 15px 10px;
  }
  .red{
    color: red;
  }
  .list{
    .item{
      padding: 15px 10px;
      position: relative;
      a{
        display: inline-block;
        max-width: 80%;
        @include ellipsis;
      }
      &:not(:last-child){
        border-bottom: 1px dashed #ebebeb;
      }
      &:hover{
        background: #f3f3f3;
      }
      p{
        padding: 8px 0 0 0;
        font-size: 14px;
        color: #333;
      }
      .btn{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
</style>
