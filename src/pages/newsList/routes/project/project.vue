<template>
  <div class="list" v-loading="loading">
    <div class="item" v-for="val in list" :key="val.projectid">
      <a class="tit" :href="'project.html?channel_code=' + $route.query.channel_code + '&projectid=' + val.projectid"><span :title="val.projectName">{{val.projectName}}</span></a>
      <span class="time"><i class="xffont font-msnui-time"></i><span>{{$dateFormat(val.projectSubmitdate, 'yy-MM-dd')}}</span></span>
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
      pageBean: {},
      list: [],
      searchData: {
        rowsNum: 10,
        currentPage: 1
      },
      loading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/project/enterpriseProject/getAllProjectList', this.searchData).then(res => {
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
      width: 85%;
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
      width: 15%;
      color: #666;
      font-size: 14px;
      i{
        margin: 0 5px 0 10px;
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
