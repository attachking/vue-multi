<!--人才推介-->
<template>
  <div class="talent">
    <div class="list">
      <div class="item" v-for="val in list" :key="val.aac001">
        <el-card>
          <div class="img">
            <img :src="val.ccmu15" class="image">
          </div>
          <div>
            <a class="tit" :href="'personalInfo.html?aac001=' + val.aac001" target="_blank" v-if="status === 1">{{val.aac003}}</a>
            <a class="tit" href="" @click.prevent="handleLogin" v-if="status !== 1">{{val.aac003}}</a>
            <p class="sub-tit">
              <span :title="val.aac011name">{{val.aac011name || '--'}}</span>
              <span :title="val.aac004name">{{val.aac004name || '--'}}</span>
            </p>
            <p class="other" :title="val.bca112">{{val.bca112 || '--'}}</p>
          </div>
        </el-card>
      </div>
    </div>
    <empty v-if="pageBean.totalPage === 0" class="empty"></empty>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '../../../../components/pagination/pagination.vue'
import Empty from '../../../../components/empty/empty.vue'
import event from '../../../../common/js/event'

export default {
  components: {
    Empty,
    Pagination},
  data() {
    return {
      searchData: {
        rowsNum: 6,
        currentPage: 1
      },
      pageBean: {},
      list: [],
      status: this.$userInfo.status
    }
  },
  methods: {
    getList() {
      this.$post('/service/business/search/stuApplyJob/seachRCPersonnel.xf', this.searchData).then(res => {
        this.list = res.result
        this.pageBean = res.pageBean
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    handleLogin() {
      this.$confirm(`登陆后可查看详细信息`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        event.$emit('login')
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .list{
    padding: 20px 20px 0 20px;
    @include clearFixed;
    .item{
      float: left;
      width: 260px;
      margin: 0 20px 20px 0;
      &:nth-child(3n){
        margin-right: 0;
      }
      .img{
        width: 100%;
        padding: 0 20px 20px 20px;
        img{
          width: 100%;
        }
      }
      .tit{
        font-size: 16px;
        text-align: center;
        color: #333;
        display: inline-block;
        width: 100%;
        &:hover{
          color: $--color-primary;
        }
      }
      .sub-tit{
        color: #666;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        padding: 5px 0;
        white-space: nowrap;
        span{
          display: inline-block;
          width: 50%;
          padding: 0 5px;
          &:nth-child(1){
            text-align: right;
            border-right: 1px solid #ebebeb;
          }
        }
      }
      .other{
        color: #666;
        font-size: 14px;
        width: 100%;
        text-align: center;
        @include ellipsis;
      }
      .el-card{
        height: 315px;
      }
    }
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
  .empty{
    margin: 50px 0 0 0;
  }
</style>
