<template>
  <div class="subject-page">
    <xf-header v-if="!en"></xf-header>
    <theme-header v-if="en"></theme-header>
    <div class="subject">
      <div class="topic">
        <div class="module">
          <a class="tit">{{info.cand03 || '--'}}</a>
          <p class="con">{{info.cand19 || '--'}}</p>
        </div>
        <img src="./static/triangle.png" class="triangle">
      </div>
      <div class="explain-con">
        <div class="explain module">
          <div class="common-tit">
            <p class="title">{{en ? 'Explain' : '专场说明'}}</p>
            <p><span></span></p>
          </div>
          <div class="con" v-html="info.cand04 || '--'"></div>
        </div>
      </div>
      <div class="dynamic-con" v-if="false">
        <div class="dynamic module">
          <div class="common-tit">
            <p class="title">专场动态</p>
            <p><span></span></p>
          </div>
          <div class="list">
            <a class="item" v-for="val in 8" :key="val">
              <img src="./static/plane.png" onload="handleBeauty(event)">
              <div class="tip">河南第二架经营性租赁飞机顺利降…</div>
            </a>
          </div>
        </div>
      </div>
      <div class="fair-con" v-if="Number(info.category) !== 10 && !en">
        <div class="fair module">
          <div class="common-tit">
            <p class="title">专场招聘</p>
            <p><span></span></p>
          </div>
          <div class="btn-list" v-if="Number(info.category) === 12">
            <el-button type="primary" :plain="current !== ''" @click="handleCity()">全部</el-button>
            <el-button type="primary" :plain="current !== val.id" v-for="(val, key) in cities" :key="key" @click="handleCity(val.id)">{{val.name}}</el-button>
          </div>
          <empty v-if="!corps.length"></empty>
          <div class="recommend-corp-list">
            <a class="item" target="_blank" v-for="(val, key) in corps" :key="key" :href="'corp.html?aab001=' + val.aab001">
              <div class="img">
                <img :src="val.ccmu15">
              </div>
              <div class="info">
                <p class="ell">{{val.aab004}}</p>
                <p class="ell">{{val.ccpr10name || '--'}}</p>
                <p class="ell">{{val.acb206 || '--'}}</p>
              </div>
              <div class="count">在招岗位数：<span>{{val.cnt || 0}}</span></div>
            </a>
          </div>
          <div class="page">
            <pagination :bean="pageBean" @current-change="handleChange"></pagination>
          </div>
        </div>
      </div>
    </div>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import XfHeader from '../../components/xf-header/xf-header.vue'
import {queryParse, isEn} from '../../common/js/utils'
import Empty from '../../components/empty/empty.vue'
import ThemeHeader from '../../components/theme-header/theme-header.vue'
import Pagination from '../../components/pagination/pagination.vue'

export default {
  components: {
    Pagination,
    ThemeHeader,
    Empty,
    XfHeader,
    RightMenu,
    XfFooter},
  data() {
    return {
      cities: [],
      searchData: {
        rowsNum: 12,
        currentPage: 1,
        cand01: ''
      },
      pageBean: {},
      corps: [],
      current: '',
      cand01: '',
      info: {},
      en: isEn()
    }
  },
  methods: {
    async getCities() {
      const list = await this.$post('/service/sys/catagry/citys/getHeNanCity', {})
      this.cities = list.result
    },
    handleCity(cityId) {
      this.current = cityId || ''
      this.searchData.cityId = this.current
      this.searchData.currentPage = 1
      this.getCorps()
    },
    async getCorps() {
      this.searchData.cand01 = this.cand01
      const res = await this.$post('/service/business/corp/corps/corpZCList', this.searchData)
      this.corps = res.result
      this.pageBean = res.pageBean
    },
    handleChange(page) {
      this.searchData.currentPage = page
      this.getCorps()
    },
    async getInfo() {
      const res = await this.$post('/service/business/sms/sms/getContentInfo', {
        cand01: this.cand01
      })
      this.info = res.result
    }
  },
  created() {
    const query = queryParse(location.search)
    this.cand01 = query.cand01
    if (!this.en) {
      this.getCities()
      this.handleCity()
    }
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .topic{
    width: 100%;
    background: url("./static/bg.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .triangle{
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .tit{
      font-size: 36px;
      font-weight: bold;
      color: #fff;
      padding: 50px 0 20px 0;
      margin: 0 0 20px 0;
      border-bottom: 1px solid #f2f2f2;
      text-align: center;
      display: inline-block;
      width: 100%;
    }
    .con{
      font-size: 16px;
      color: #fff;
      text-align: center;
      display: inline-block;
      width: 100%;
      padding: 0 0 50px 0;
    }
  }
  .module{
    width: 1200px;
    margin: 0 auto;
  }
  .explain-con{
    background: url("./static/bg2.png");
  }
  .explain{
    padding: 50px 0;
    .con{
      padding: 20px 0 0 0;
      line-height: 30px;
    }
  }
  .common-tit{
    .title{
      color: #005cab;
      font-size: 30px;
      font-weight: bold;
    }
    p{
      text-align: center;
    }
    span{
      width: 43px;
      display: inline-block;
      border-bottom: 5px solid #999;
      vertical-align: middle;
    }
  }
  .dynamic-con{
    width: 100%;
    background: #fff;
    .dynamic{
      padding: 50px 0;
      .list{
        margin: 25px 0 0 0;
        @include clearFixed;
        .item{
          width: 288px;
          height: 216px;
          float: left;
          display: block;
          overflow: hidden;
          position: relative;
          margin: 0 15px 15px 0;
          .tip{
            position: absolute;
            bottom: 0;
            left: 0;
            display: inline-block;
            width: 100%;
            padding: 15px 15px;
            background: rgba(0,0,0,.3);
            color: #fff;
            font-size: 14px;
            @include ellipsis;
          }
          &:nth-child(4n){
            margin-right: 0;
          }
          &:hover{
            opacity: .9;
          }
        }
      }
    }
  }
  .fair-con{
    width: 100%;
    background: #f3f3f3;
    .fair{
      padding: 50px 0;
      .btn-list{
        padding: 20px 0;
        .el-button{
          margin-bottom: 10px;
          margin-left: 10px;
        }
      }
    }
  }
  .recommend-corp-list{
    @include clearFixed;
    padding: 15px 0 0 0;
    .item{
      display: block;
      float: left;
      width: 280px;
      height: 313px;
      margin-bottom: 15px;
      overflow: hidden;
      border: 1px solid #ebebeb;
      position: relative;
      background: #fff;
      margin-right: 15px;
      &:hover{
        border-color: $--color-primary;
      }
      &:nth-child(4n){
        margin-right: 0;
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
        .ell{
          @include ellipsis;
          text-align: center;
        }
        p{
          margin: 0 0 10px 0;
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
        font-size: 16px;
        color: #666;
        span{
          color: $--color-primary;
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
  .page{
    padding: 20px 0;
    text-align: center;
  }
</style>
