<template>
  <div class="corp">
    <div class="search">
      <div class="search-tit">
        <el-form inline :model="form" class="demo-form-inline">
          <el-form-item>
            <el-input v-model.trim="form.aab004" placeholder="请输入单位名称/关键字" @keydown.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.ccpr10" filterable clearable placeholder="请选择行业类别">
              <el-option
                v-for="item in dictionaries.INDUSTRY_AS"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <xf-cascader
              :options="dictionaries.TAB_CITY"
              v-model="form.aab301"
              placeholder="请选择地区"
              clearable
              change-on-select
              filterable></xf-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button type="default" size="mini" icon="el-icon-refresh" @click="onReset">重置</el-button>
          </el-form-item>
          <el-form-item>
            <a href="javascript:;" @click="showMore = !showMore">更多<i class="el-icon-arrow-down" :class="showMore ? 'more-rotate' : ''"></i></a>
          </el-form-item>
        </el-form>
      </div>
      <transition name="el-zoom-in-top" mode="out-in">
        <div class="search-more" v-if="showMore">
          <el-form inline :model="form" class="demo-form-inline">
            <el-form-item label="更多筛选">
              <el-select v-model="form.aab019" clearable placeholder="单位性质">
                <el-option
                  v-for="item in dictionaries.TAB_UNITNATURE"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item>
              <el-select v-model="form.aab056" clearable placeholder="单位规模">
                <el-option
                  v-for="item in dictionaries.TAB_PSCALE"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item>
              <el-select v-model="form.updateDates" clearable placeholder="更新时间">
                <el-option label="不限" value="0"></el-option>
                <el-option label="三天以内" value="3"></el-option>
                <el-option label="一周以内" value="7"></el-option>
                <el-option label="十天以内" value="10"></el-option>
                <el-option label="一个月以内" value="30"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
    <div class="list" ref="list" v-loading="loading">
      <div>
        <a class="item" v-for="val in list" :key="val.aab001" :href="'corp.html?aab001=' + val.aab001" target="_blank">
          <div class="img">
            <img :src="val.ccmu15">
          </div>
          <div class="info">
            <p :title="val.aab004">{{val.aab004}}</p>
            <p :title="val.ccpr10name">{{val.ccpr10name || '--'}}</p>
            <p v-html="val.acb206 || '--'"></p>
          </div>
          <div class="count">在招岗位数：<span>{{val.cnt || 0}}</span>需求人数：<span>{{val.personCnt || 0}}</span></div>
          <i class="xffont font-tubiao- red" title="重点推荐" v-if="Number(val.ccpr26) === 1"></i>
        </a>
      </div>
    </div>
    <empty v-if="pageBean.totalCount === 0"></empty>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
  </div>
</template>
<script>
import {echo, handleCity} from '../../../../common/js/utils'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'
import Empty from '../../../../components/empty/empty.vue'
import Pagination from '../../../../components/pagination/pagination.vue'

export default {
  components: {
    Pagination,
    Empty,
    XfCascader},
  data() {
    return {
      form: {
        currentPage: 1,
        rowsNum: 9,
        aab004: '', // 关键字
        ccpr10: '', // 行业类别
        aab301: '', // 城市
        aab019: '', // 单位性质
        aab056: '', // 单位规模
        updateDates: '' // 更新时间
      },
      showMore: false,
      dictionaries: {
        TAB_UNITNATURE: [], // 单位性质
        INDUSTRY_AS: [], // 行业类别
        TAB_CITY: [], // 地区
        TAB_PSCALE: [] // 规模
      },
      pageBean: {},
      list: [],
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.form.currentPage = 1
      this.getList()
    },
    getList() {
      this.loading = true
      this.form.aac001 = this.$userInfo.aac001
      this.$post('/service/business/corp/corps/queryCorpList.xf', this.form).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    getDictionaries() { // 字典表
      this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_UNITNATURE,TAB_PSCALE,TAB_CITY,INDUSTRY_AS'
      }).then(res => {
        res.result.TAB_CITY = handleCity(res.result.TAB_CITY.children)
        this.dictionaries = res.result
      })
    },
    handlePage(page) {
      this.form.currentPage = page
      this.getList()
    },
    onReset() {
      echo(this.form)
    },
    handleCascader(arr) {
      arr.forEach(item => {
        if (item.children instanceof Array) {
          if (item.children.length) {
            this.handleCascader(item.children)
          } else {
            delete item.children
          }
        }
      })
    },
    saveCorp(aab001) {
      this.loading2 = true
      this.$post('/service/business/person/personTalent/saveTalentCorpinfo.xf', {
        aac001: this.$userInfo.aac001,
        aab001
      }).then(res => {
        this.loading2 = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getCorp()
        }
      }).catch(() => {
        this.loading2 = false
      })
    },
    delCorp(aab001) {
      this.loading2 = true
      this.$post('/service/business/person/personTalent/delTalentCorpInfo.xf', {
        aac001: this.$userInfo.aac001,
        aab001
      }).then(res => {
        this.loading2 = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getCorp()
        }
      }).catch(() => {
        this.loading2 = false
      })
    }
  },
  created() {
    this.getDictionaries()
    this.onSubmit()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .corp{
    padding: 25px 10px;
    .search{
      .el-input{
        width: 255px;
      }
      .el-select,.el-cascader{
        width: 150px;
      }
      .el-form-item{
        margin-bottom: 0;
      }
      .search-tit{
        background: #f8f8f8;
        padding: 15px 10px;
        border-top: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        .more-rotate{
          transform: rotate(180deg);
        }
      }
      .search-more{
        padding: 15px 10px;
        border-bottom: 1px solid #ebebeb;
      }
    }
    .list{
      @include clearFixed;
      padding: 15px 0 0 0;
      .item{
        display: block;
        float: left;
        width: 260px;
        height: 260px;
        margin-bottom: 15px;
        overflow: hidden;
        border: 1px solid #ebebeb;
        position: relative;
        &:hover{
          background: #f3f3f3;
          border-color: $--color-primary;
        }
        &:nth-child(3n-2),&:nth-child(3n-1){
          margin-right: 15px;
        }
        .img{
          height: 90px;
          width: 90px;
          margin: 20px auto;
          img{
            width: 100%;
          }
        }
        .info{
          margin: 0 10px;
          padding: 0 0 12px 0;
          border-bottom: 1px dashed #ebebeb;
          p{
            text-align: center;
            @include ellipsis;
            margin: 0 0 5px 0;
            &:nth-child(1){
              font-size: 16px;
              color: #000;
            }
            &:nth-child(2){
              color: #666;
              font-size: 14px;
            }
            &:nth-child(3){
              color: #333;
              font-size: 14px;
            }
          }
        }
        .count{
          line-height: 41px;
          text-align: center;
          font-size: 14px;
          color: #666;
          span{
            color: $--color-primary;
            margin-right: 5px;
          }
        }
        .red{
          color: red;
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }
    }
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
</style>
