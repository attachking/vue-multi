<template>
  <div class="newsList">
    <xf-header v-if="!en"></xf-header>
    <theme-header v-if="en"></theme-header>
    <div class="module">
      <div class="news-con">
        <div class="left" ref="left" :style="'height:' + leftHeight + 'px'">
          <div class="left-title">
            <span v-if="!en">{{pr.canc03}}</span>
            <span>{{pr.canc06}}</span>
          </div>
          <a :href="val.canc04 || 'javascript:;'" v-for="(val, key) in cr" :key="key" class="left-item" :class="{active: val.channelCode === searchData.channel_code}">
            <span>{{val.canc03}}</span>
            <i class="xffont font-rightarrow"></i>
          </a>
        </div>
        <div class="right" ref="right">
          <div class="right-tit">
            <i class="xffont font-weibiao45100847"></i>
            <a :href="en ? 'theme.html?lang=en' : 'index.html'">{{en ? 'Home' : '首页'}}</a> >
            <a :href="current.canc04">{{current.canc03}}</a>
          </div>
          <transition name="el-fade-in" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfHeader from '../../components/xf-header/xf-header.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import {renderTitle, queryParse} from '../../common/js/utils'
import $ from 'jquery'
import ThemeHeader from '../../components/theme-header/theme-header.vue'

export default {
  components: {
    ThemeHeader,
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      searchData: {
        channel_code: ''
      },
      cr: [],
      pr: {},
      current: {},
      leftHeight: 700,
      en: queryParse(location.search).lang === 'en'
    }
  },
  methods: {
    getChannel() {
      this.$post('/service/business/sms/sms/channelInfo/getCrChannel', this.searchData).then(res => {
        res.result.cr.forEach(item => {
          if (item.channelCode === this.searchData.channel_code) {
            this.current = item
            renderTitle(item.canc03)
          }
        })
        this.cr = res.result.cr || []
        this.pr = res.result.pr || {}
      })
    },
    handleRoute(route) {
      if (!route.query.channel_code) return
      this.searchData.channel_code = route.query.channel_code
      this.en = this.searchData.channel_code.indexOf('_EN') !== -1
      this.searchData.canc09 = this.en ? 2 : ''
      this.getChannel()
    }
  },
  watch: {
    $route(newVal) {
      this.handleRoute(newVal)
    }
  },
  created() {
    this.handleRoute(this.$route)
  },
  mounted() {
    $(this.$refs.right).on('DOMNodeInserted contentchanged', () => {
      setTimeout(() => {
        this.leftHeight = $(this.$refs.right).height()
      }, 20)
    })
  }
}
</script>
<style lang="scss">
  @import "../../common/style/variables";
  .module{
    width: 100%;
    min-height: 800px;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 50px 0;
  }
  .news-con{
    width: 1200px;
    margin: 0 auto;
    @include clearFixed;
    .left{
      height: 700px;
      width: 300px;
      float: left;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background: #fff url("./static/left-bg.png") no-repeat 0 100%;
      .left-title{
        height: 69px;
        line-height: 69px;
        background: url("./static/tit-bg.png") no-repeat;
        background-size: 100% 100%;
        padding: 0 0 0 20px;
        margin: 0 0 10px 0;
        span{
          color: #fff;
          &:nth-child(1){
            font-size: 24px;
          }
          &:nth-child(2){
            font-size: 14px;
          }
        }
      }
      .left-item{
        height: 53px;
        line-height: 53px;
        margin: 0 0 2px 0;
        background: #f1f1f1;
        display: block;
        @include clearFixed;
        padding: 0 20px;
        color: #666;
        span{
          display: inline-block;
          font-size: 16px;
        }
        i{
          display: inline-block;
          font-size: 20px;
          float: right;
        }
      }
      .left-item.active{
        color: $--color-primary;
      }
    }
    .right{
      width: 870px;
      min-height: 700px;
      background: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      float: right;
      .right-tit{
        height: 68px;
        line-height: 67px;
        border-bottom: 1px solid #d9d9d9;
        color: #333;
        padding: 0 0 0 18px;
        a{
          margin: 0 5px;
        }
        i{
          font-size: 20px;
        }
      }
    }
  }
</style>
