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
            <a class="tit" :href="'personalInfo.html?aac001=' + val.aac001" target="_blank">{{val.aac003}}</a>
            <p class="sub-tit">
              <span>{{val.aac011name || '--'}}</span>
              <span>{{val.aac004name || '--'}}</span>
            </p>
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

export default {
  components: {
    Empty,
    Pagination},
  data() {
    return {
      searchData: {
        rowsNum: 10,
        currentPage: 1
      },
      pageBean: {},
      list: []
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
      width: 190px;
      height: 250px;
      margin: 0 20px 20px 0;
      &:nth-child(4n){
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
      .el-card{
        height: 240px;
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
