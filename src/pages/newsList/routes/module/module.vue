<!--新闻纯文本列表页-->
<template>
  <div class="list" ref="list">
    <div class="item" v-for="val in list" :key="val.cand01">
      <a class="tit" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01"><span :title="val.cand03">{{val.cand03}}</span><i class="xffont font-zhiding" title="置顶" v-if="val.cand17 === 1"></i><i title="热点" class="xffont font-tubiao-" v-if="val.cand16 === 1"></i></a><span class="time">
        <span class="time-item" :title="'阅读量：' + val.cand13"><i class="xffont font-yanjing"></i><span>{{val.cand13 || 0}}</span></span>
        <span class="time-item"><i class="xffont font-msnui-time"></i><span>{{$dateFormat(val.ccpr05, 'MM-dd')}}</span></span>
      </span>
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
        rowsNum: 10,
        currentPage: 1,
        countsNum: 50,
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

  .page{
    padding: 10px 0;
    text-align: center;
  }
  .list{
    padding: 0 15px;
  }
  .item{
    padding: 14px 15px;
    white-space: nowrap;
    .tit{
      display: inline-block;
      width: 80%;
      @include ellipsis;
      span{
        display: inline-block;
        max-width: 90%;
        @include ellipsis;
        vertical-align: middle;
      }
      i{
        font-size: 20px;
        color: $--color-primary;
        vertical-align: middle;
      }
      .font-tubiao-{
        font-size: 16px;
        color: red;
      }
    }
    .time{
      display: inline-block;
      text-align: left;
      width: 20%;
      color: #666;
      font-size: 14px;
      .time-item{
        display: inline-block;
        i{
          margin: 0 5px 0 10px;
        }
        &:first-child{
          width: 45%;
        }
      }
    }
    &:not(:last-child){
      border-bottom: 1px dashed #d9d9d9;
    }
  }
  .empty{
    margin: 50px 0 0 0;
  }
</style>
