<template>
  <div class="news-detail">
    <xf-header v-if="!en"></xf-header>
    <theme-header v-if="en"></theme-header>
    <div class="module">
      <div class="news-module" ref="module">
        <div class="top-tit">
          <i class="xffont font-weibiao45100847"></i>
          <a :href="en ? 'theme.html?lang=en' : 'index.html'">{{en ? 'Home' : '首页'}}</a> >
          <a :href="currentUrl" v-if="!sc.head">{{current}}</a>
          <a v-if="sc.head">头条</a>
        </div>
        <div class="news-tit">
          <h2 :style="'color: ' + (detail.cand20 || '#000000') + ';'">{{detail.cand03}}</h2>
          <div class="resource">
            {{en ? 'Date' : '发布时间'}}：{{$dateFormat(detail.ccpr05, 'yyyy-MM-dd')}}&nbsp;&nbsp;<span v-if="!en">发布来源：{{detail.aac003}}&nbsp;&nbsp;</span><i class="xffont font-yanjing" :title="(en ? 'amount of reading' : '阅读量') + '：' + detail.cand13"></i>{{detail.cand13 || 0}}
          </div>
          <div class="baidu">
            <div class="bdsharebuttonbox" data-tag="share_1">
              <a class="bds_weixin" data-cmd="weixin"></a>
              <a class="bds_tsina" data-cmd="tsina"></a>
              <a class="bds_qzone" data-cmd="qzone" href="#"></a>
            </div>
          </div>
        </div>
        <div class="news-con" v-html="detail.cand04"></div>
        <div class="news-page" v-if="!sc.head">
          <p>上一篇：<a :href="handleUrl(pre)" :class="{disabled: !pre.cand01}">{{pre.cand03}}</a></p>
          <p>下一篇：<a :href="handleUrl(next)" :class="{disabled: !next.cand01}">{{next.cand03}}</a></p>
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
import {queryParse, renderTitle} from '../../common/js/utils'
import ThemeHeader from '../../components/theme-header/theme-header.vue'

export default {
  components: {
    ThemeHeader,
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      current: '',
      currentUrl: '',
      channelCode: '',
      detail: {},
      pre: {},
      next: {},
      en: false,
      sc: queryParse(location.search)
    }
  },
  methods: {
    getDetail(cand01) {
      const loading = this.$loading({
        target: this.$refs.module,
        fullscreen: false
      })
      this.$post('/service/business/sms/sms/getContentInfo', {cand01}).then(res => {
        loading.close()
        renderTitle(res.result.cand03)
        this.detail = res.result
        this.baiduShare({
          bdText: res.result.cand03, // 分享的内容
          bdDesc: res.result.cand19, // 分享的摘要
          bdUrl: location.href, // 分享的Url地址
          bdPic: '' // 分享的图片
        })
      }).catch(() => {
        loading.close()
      })
    },
    getChannel(channelCode) {
      this.$post('/service/business/sms/sms/channelInfo/getCrChannel', {
        channel_code: channelCode,
        canc09: this.en ? 2 : ''
      }).then(res => {
        res.result.cr.forEach(item => {
          if (item.channelCode === channelCode) {
            this.current = item.canc03
            this.currentUrl = item.canc04
          }
        })
      })
    },
    getPage(cand01) {
      this.$post('/service/business/sms/sms/getPage', {
        cand01,
        canc09: this.en ? 2 : ''
      }).then(res => {
        this.pre = res.result.Last
        this.next = res.result.next
      })
    },
    handleUrl(val) {
      if (val.cand01) {
        return `newsDetail.html?channel_code=${val.channelCode}&cand01=${val.cand01}`
      } else {
        return 'javascript:;'
      }
    },
    baiduShare(common) {
      window._bd_share_config = {
        common: common,
        share: [{
          'bdSize': 16
        }]
        /*
        slide: [{
          bdImg: 0,
          bdPos: 'right',
          bdTop: 100
        }],
        */
        /*
        image: [{
          viewType: 'list',
          viewPos: 'top',
          viewColor: 'black',
          viewSize: '16',
          viewList: ['qzone', 'tsina', 'huaban', 'tqq', 'renren']
        }]
        */
        /*
        selectShare: [{
          'bdselectMiniList': ['qzone', 'tqq', 'kaixin001', 'bdxc', 'tqf']
        }]
        */
      }
      // 以下为js加载部分
      ;(document.getElementsByTagName('head')[0] || document.body).appendChild(document.createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)
    }
  },
  mounted() {
    const search = queryParse(location.search)
    this.channelCode = search.channel_code
    this.en = this.channelCode && this.channelCode.indexOf('_EN') !== -1
    this.getDetail(search.cand01)
    this.getPage(search.cand01)
    this.getChannel(search.channel_code)
  }
}
</script>
<style lang="scss">
  @import "../../common/style/variables";
  .module{
    min-height: 640px;
    padding: 50px 0;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .news-module{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 10px 50px 30px 50px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .top-tit{
    padding: 20px 0;
    color: #333;
    border-bottom: 1px solid #d9d9d9;
    a{
      margin: 0 5px;
    }
  }
  .news-tit{
    padding: 30px 0 20px 0;
    text-align: center;
    border-bottom: 1px solid #d9d9d9;
    .resource{
      padding: 20px 0 0 0;
      font-size: 14px;
      color: #666;
      i{
        font-size: 18px;
        margin: 0 5px;
        vertical-align: text-bottom;
      }
    }
  }
  .news-con{
    padding: 30px 0;
    min-height: 500px;
    overflow: hidden;
    @include clearFixed;
    img{
      max-width: 100%;
    }
    table{
      border-collapse: collapse;
      td{
        padding: 5px 5px;
        border: 1px solid #d9d9d9;
      }
    }
  }
  .news-page{
    font-size: 14px;
    p{
      padding: 5px 0 0 0;
    }
    a.disabled{
      color: #666;
      &:hover{
        cursor: default;
      }
    }
  }
  .baidu{
    margin: 0 0 0 980px;
  }
  .bd_weixin_popup{
    box-sizing: content-box;
  }
</style>
