<template>
  <div class="list" v-loading="loading">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <xf-cascader
          :options="dictionaries.TAB_CITY"
          v-model="city"
          placeholder="请选择地区"
          clearable
          change-on-select
          filterable></xf-cascader>
      </el-form-item>
      <el-form-item>
        <el-input class="keywords" v-model.trim="keywords" placeholder="请输入关键字/项目名称/项目类别/经费来源/合作方式/待遇" @keydown.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button type="default" size="mini" icon="el-icon-refresh" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="item" v-for="val in list" :key="val.projectid">
      <a class="tit" :href="'project.html?channel_code=' + $route.query.channel_code + '&projectid=' + val.projectid"><span :title="val.projectName" v-html="mixinHighLight(val.projectName, keywords)"></span><i title="热点" class="xffont font-tubiao-" v-if="Number(val.projectPromotion) === 1"></i></a>
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
import {handleCity, echo} from '../../../../common/js/utils'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'
import {mixinHighLight} from '../../../../common/js/mixin'

export default {
  components: {
    XfCascader,
    Empty,
    Pagination},
  data() {
    return {
      pageBean: {},
      list: [],
      searchData: {
        rowsNum: 10,
        currentPage: 1,
        projectWorkCode: '',
        keyword: ''
      },
      loading: false,
      keywords: '',
      city: '',
      dictionaries: {
        TAB_CITY: []
      }
    }
  },
  methods: {
    mixinHighLight,
    onSubmit() {
      this.searchData.currentPage = 1
      this.searchData.projectWorkCode = this.city
      this.searchData.keyword = encodeURIComponent(this.keywords)
      this.getList()
    },
    onReset() {
      this.keywords = ''
      this.city = ''
      echo(this.searchData)
    },
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
    },
    getDictionaries() { // 字典表
      this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_CITY'
      }).then(res => {
        res.result.TAB_CITY = handleCity(res.result.TAB_CITY.children)
        this.dictionaries = res.result
      })
    }
  },
  created() {
    this.getDictionaries()
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .demo-form-inline{
    padding: 20px 0 0 0;
  }
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
        margin-left: 5px;
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
    border-bottom: 1px dashed #d9d9d9;
  }
  .empty{
    margin: 50px 0 0 0;
  }
  .keywords{
    width: 400px;
  }
</style>
