<template>
  <div class="news-pic" ref="list">
    <div class="news-pic-item" v-for="val in list" :key="val.cand01">
      <a class="pic-item-left" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01">
        <img :src="val.cand11" onload="handleBeauty(event)">
      </a>
      <div class="pic-item-right">
        <a :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01"><span :title="val.cand03">{{val.cand03}}</span><i class="xffont font-zhiding" title="置顶" v-if="val.cand17 === 1"></i><i title="热点" class="xffont font-tubiao-" v-if="val.cand16 === 1"></i></a>
        <div class="news-info">{{val.cand19}}</div>
        <div class="news-resource">
          <span class="time-item" :title="'阅读量：' + val.cand13"><i class="xffont font-yanjing"></i><span>{{val.cand13 || 0}}</span></span>
          <span class="time-item"><i class="xffont font-msnui-time"></i><span>{{$dateFormat(val.ccpr05, 'yyyy-MM-dd')}}</span></span>
        </div>
      </div>
    </div>
    <empty v-if="pageBean.totalPage === 0" class="empty"></empty>
    <div class="page" v-if="pageBean.totalPage > 0">
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
        rowsNum: 5,
        currentPage: 1,
        countsNum: 150,
        channel_code: ''
      },
      list: [],
      pageBean: {}
    }
  },
  methods: {
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    getList() {
      const loading = this.$loading({
        target: this.$refs.list,
        fullscreen: false
      })
      this.$post('/service/business/sms/sms/getContentList', this.searchData).then(res => {
        loading.close()
        this.pageBean = res.pageBean
        this.list = res.result
      }).catch(() => {
        loading.close()
      })
    },
    handleRoute(route) {
      if (!route.query.channel_code) return
      this.searchData.channel_code = route.query.channel_code
      this.searchData.currentPage = 1
      this.getList()
    }
  },
  watch: {
    $route(newVal) {
      this.handleRoute(newVal)
    }
  },
  mounted() {
    this.handleRoute(this.$route)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .news-pic-item{
    @include clearFixed;
    padding: 10px 20px;
    border-bottom: 1px solid #d9d9d9;
    &:hover{
      background: #f3f3f3;
    }
    .pic-item-left{
      width: 200px;
      height: 128px;
      display: block;
      float: left;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .pic-item-right{
      width: 610px;
      float: right;
      a{
        font-size: 16px;
        display: inline-block;
        width: 100%;
        span{
          display: inline-block;
          max-width: 90%;
          @include ellipsis;
          vertical-align: middle;
        }
        .font-zhiding{
          font-size: 20px;
          color: $--color-primary;
          vertical-align: middle;
        }
        .font-tubiao-{
          font-size: 16px;
          color: red;
          vertical-align: middle;
        }
      }
      .news-info{
        color: #333;
        font-size: 14px;
        padding: 5px 0;
        text-indent: 2em;
        height: 90px;
        overflow: hidden;
      }
      .news-resource{
        padding: 5px 0 0 0;
        color: #666;
        font-size: 14px;
        i{
          margin: 0 5px 0 10px;
        }
      }
    }
  }
  .empty{
    margin: 50px 0 0 0;
  }
  .page{
    padding: 10px 0;
    text-align: center;
  }
</style>
