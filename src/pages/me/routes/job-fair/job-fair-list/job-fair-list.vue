<template>
  <div class="job-fair-list">
    <div class="tip">
      <p>
        <i class="el-icon-info"></i>&nbsp;
        以下是近期所有招聘会信息，您可以选择所需要的招聘会场次，进行在线预订。您需按步骤填写招聘会预定的基本信息，岗位信息，等待审核。(注：每场招聘会摊位预定限一个，如有疑问联系网站管理员)
      </p>
    </div>
    <div class="list" v-loading="loading">
      <div class="item" v-for="val in list" :key="val.acb330">
        <a href="" target="_blank" :title="val.acb331">{{val.acb331 || '--'}}</a>
        <p><i class="xffont font-zuobiao"></i>&nbsp;{{val.acd200name || '--'}}</p>
        <p><i class="xffont font-msnui-time"></i>&nbsp;{{$dateFormat(val.acb333, 'yyyy-MM-dd hh:mm')}} -- {{$dateFormat(val.acb334, 'yyyy-MM-dd hh:mm')}}</p>
        <div class="btn">
          <el-button type="primary" plain @click="corps(val)">参会企业</el-button>
          <el-button type="primary" plain @click="book(val)">企业预定</el-button>
        </div>
      </div>
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
        rowsNum: 6,
        currentPage: 1,
        aab001: this.$userInfo.aab001
      },
      list: [],
      pageBean: {},
      loading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/jobfair/jobFairInfo/getValidJobFairList.xf', this.searchData).then(res => {
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
    book(val) {
      this.$router.push({
        name: 'stalls',
        query: {
          acb330: val.acb330,
          acb331: encodeURIComponent(val.acb331)
        }
      })
    },
    corps(val) {
      this.$router.push({
        name: 'fairCorpList',
        query: {
          acb330: val.acb330
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
  .tip{
    margin: 10px 0;
    width: 100%;
    padding: 15px;
    font-size: 14px;
    border: 1px solid #fff0bc;
    background: #ffffeb;
    color: #f85d5b;
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
