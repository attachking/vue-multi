<template>
  <div class="index">
    <xf-header></xf-header>
    <div class="banner">
      <el-carousel :height="topBannerHeight" :interval="5000" arrow="never">
        <el-carousel-item v-for="item in banners" :key="item.url">
          <a :href="item.target">
            <img :src="item.url" alt="">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="module module-top">
      <div class="news-top">
        <p class="title">
          <a :href="'newsDetail.html?channel_code=' + topNews.channelCode + '&cand01=' + topNews.cand01" :title="topNews.cand03">{{topNews.cand03}}</a>
        </p>
        <p class="content">{{topNews.cand19}}</p>
      </div>
    </div>
    <div class="module">
      <div class="news">
        <div class="news-con">
          <div class="news-carousel">
            <el-carousel height="345px" @change="handleChange" arrow="never">
              <el-carousel-item v-for="val in firstSlider" :key="val.cand01">
                <a :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" :title="val.cand03">
                  <img :src="val.cand11">
                </a>
              </el-carousel-item>
            </el-carousel>
            <div class="news-banner-info">{{firstSlider.length && firstSlider[firstSliderIndex].cand03}}</div>
          </div>
        </div>
        <div class="news-con">
          <div class="title">
            <span>工作动态</span>
            <a href="newsList.html#/module?channel_code=ZXDT" class="news-more" title="更多">+</a>
          </div>
          <div class="news-list">
            <div class="news-item" v-for="item in ZXDT" :key="item.cand01">
              <a :href="'newsDetail.html?channel_code=' + item.channelCode + '&cand01=' + item.cand01" :title="item.cand03"><i class="xffont font-jiantou"></i><span>{{item.cand03}}</span><i class="xffont font-zhiding" v-if="item.cand17 === 1"></i></a>
              <span class="time">{{$dateFormat(item.ccpr05, 'MM-dd')}}</span>
            </div>
          </div>
        </div>
        <div class="news-con">
          <div class="title">
            <span>人才政策</span>
            <a href="newsList.html#/module?channel_code=RCZC" class="news-more" title="更多">+</a>
          </div>
          <div class="news-list">
            <div class="news-item" v-for="item in RCZC" :key="item.cand01">
              <a :href="'newsDetail.html?channel_code=' + item.channelCode + '&cand01=' + item.cand01" :title="item.cand03"><i class="xffont font-jiantou"></i><span>{{item.cand03}}</span><i class="xffont font-zhiding" v-if="item.cand17 === 1"></i></a>
              <span class="time">{{$dateFormat(item.ccpr05, 'MM-dd')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module personnel-box" v-if="false">
      <div class="personnel">
        <div class="title">
          <a href="javascript:;" class="active">项目推介</a><a href="javascript:;">人才推介</a>
        </div>
        <div class="personnel-list">
          <a class="personnel-item" v-for="item in 5" :key="item">
            <img src="./static/personnel.png" alt="">
            <div class="personnel-info">高明宇</div>
          </a>
        </div>
        <div class="personnel-more">
          <div class="more">查看更多</div>
        </div>
      </div>
    </div>
    <div class="module innovate-box">
      <div class="innovate">
        <div class="title">
          <p>创新创业</p>
          <p>INNOVATION AND ENTREPRENEURSHIP</p>
        </div>
        <div class="innovate-con">
          <div class="innovate-left">
            <div class="tit">
              <span>创新创业政策</span>
              <a href="newsList.html#/module?channel_code=ZCWJ" class="news-more" title="更多">+</a>
            </div>
            <div class="innovate-list">
              <a :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" class="innovate-item" v-for="val in CXCY1" :key="val.cand01" :title="val.cand03">{{val.cand03}}</a>
            </div>
          </div>
          <div class="innovate-right">
            <a class="innovate-right-item" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" :title="val.cand03" v-for="val in CXCY2" :key="val.cand01">
              <img :src="val.cand11" alt="">
              <div class="innovate-right-info">{{val.cand03}}</div>
            </a>
            <div class="innovate-right-item" v-show="false">
              <img src="./static/innovate-icon.png" alt="">
              <p>创业项目申报</p>
            </div>
          </div>
        </div>
        <div class="innovate-more">
          <a class="more" href="newsList.html#/pic?channel_code=CGZS">查看更多</a>
        </div>
      </div>
    </div>
    <div class="module wonderful-box">
      <div class="wonderful">
        <div class="title">
          <p>出彩河南</p>
          <p>BRILLIANT HENAN</p>
        </div>
        <div class="wonder-slider">
          <el-carousel :autoplay="true" :interval="4000" type="card" height="360px" @change="handleWonder">
            <el-carousel-item v-for="(val, key) in wonders" :key="val.caoa01">
              <div class="wonder-item" :title="val.caoa03">
                <img :src="val.caoa02">
                <div class="wonder-tip" v-if="key === wonderIdx">
                  <span>{{wonders.length && wonders[wonderIdx].caoa03}}</span>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="module wisdom-box">
      <div class="wisdom">
        <div class="title">
          <p>智汇郑州</p>
          <p>WISDOM COMES TO ZHENGZHOU</p>
        </div>
        <div class="wisdom-con">
          <div class="wisdom-left">
            <div class="wisdom-left-tit">
              <span>{{zzInfo.cand03}}</span>
              <a href="newsList.html#/module?channel_code=ZZGK" title="更多" class="wisdom-left-more">+</a>
            </div>
            <div class="wisdom-left-con">{{zzInfo.cand19}}</div>
          </div>
          <div class="wisdom-right">
            <a class="wisdom-right-item" href="newsList.html#/module?channel_code=YZZC"><span>引智政策</span><br>POLICY OF INTRODUCING INTELLIGENCE<img src="./static/wisdom-icon-1.png"></a>
            <div class="wisdom-right-item"></div>
            <a class="wisdom-right-item" href="newsList.html#/module?channel_code=RCGZ"><span>人才工作</span><br>TALENT WORK<img src="./static/wisdom-icon-2.png"></a>
            <a class="wisdom-right-item" href="newsList.html#/module?channel_code=YZHD"><span>引智活动</span><br>INTELLECTUAL ACTIVITY<img src="./static/wisdom-icon-3.png"></a>
            <div class="wisdom-right-item"></div>
            <a class="wisdom-right-item" href="newsList.html#/module?channel_code=ZJFC"><span>专家风采</span><br>EXPERT DEMEANOR<img src="./static/wisdom-icon-4.png"></a>
          </div>
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
import $ from 'jquery'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      banners: [{
        url: './static/banners/1.png',
        target: 'theme.html'
      }, {
        url: './static/banners/2.jpg',
        target: ''
      }, {
        url: './static/banners/3.jpg',
        target: ''
      }, {
        url: './static/banners/4.jpg',
        target: ''
      }],
      firstSlider: [],
      firstSliderIndex: 0,
      wonderIdx: 0,
      ZXDT: [],
      RCZC: [],
      CXCY1: [],
      CXCY2: [],
      wonders: [],
      topNews: {},
      zzInfo: {},
      topBannerHeight: ''
    }
  },
  methods: {
    handleChange(index) {
      this.firstSliderIndex = index
    },
    handleWonder(index) {
      this.wonderIdx = index
    },
    getFirstSlider() { // 工作动态轮播图
      this.$post('/service/business/sms/sms/getNewsByPicUrl', {
        rowsNum: 4,
        currentPage: 1,
        countsNum: 23,
        channel_code: 'ZXDT',
        flag: 1
      }).then(res => {
        this.firstSlider = res.result
      })
    },
    getZXDT() { // 工作动态（无图）
      this.$post('/service/business/sms/sms/getNewsByPicUrl', {
        rowsNum: 10,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'ZXDT',
        flag: 0
      }).then(res => {
        this.ZXDT = res.result
      })
    },
    getRCZC() { // 人才政策
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 10,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'RCZC'
      }).then(res => {
        this.RCZC = res.result
      })
    },
    getCXCY1() { // 创新创业（无图）
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 8,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'ZCWJ'
      }).then(res => {
        this.CXCY1 = res.result
      })
    },
    getCXCY2() { // 创新创业（有图）
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 6,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'CGZS'
      }).then(res => {
        this.CXCY2 = res.result
      })
    },
    getWonders() { // 出彩河南
      this.$post('/service/business/fm/pic/picInfo/getPicList', {
        caoa04: 130,
        rowsNum: 8
      }).then(res => {
        this.wonders = res.result
      })
    },
    getTopNews() { // 获取头条新闻
      this.$post('/service/business/sms/sms/getHeadlineInfo', {}).then(res => {
        if (res.result && res.result.length) {
          this.topNews = res.result[0]
        }
      })
    },
    getZZInfo() { // 郑州概况
      this.$post('/service/business/sms/sms/getConInfo', {
        channel_code: 'ZZGK'
      }).then(res => {
        if (res.result && res.result.length) {
          // res.result[0].cand04 = res.result[0].cand04.replace(/<[^>]+>/g, '')
          this.zzInfo = res.result[0]
        }
      })
    }
  },
  created() {
    this.getFirstSlider()
    this.getZXDT()
    this.getRCZC()
    this.getCXCY1()
    this.getCXCY2()
    this.getWonders()
    this.getTopNews()
    this.getZZInfo()
    $(window).on('resize', () => {
      this.topBannerHeight = Math.max($(window).width(), 1200) / 1920 * 730 + 'px'
    })
    this.topBannerHeight = Math.max($(window).width(), 1200) / 1920 * 730 + 'px'
  }
}
</script>
<style lang="scss">
  @import "../../common/style/variables";

  a{
    text-decoration: none;
  }
  .index{
    .banner{
      width: 100%;
      .el-carousel__indicators{
        .el-carousel__indicator{
          &.is-active{
            .el-carousel__button{
              background: $--color-primary;
            }
          }
          .el-carousel__button{
            background: #999;
          }
        }
      }
      img{
        width: 100%;
      }
    }
    .module{
      width: 100%;
    }
  }
  .news-top{
    width: 1200px;
    margin: 0 auto;
    p{
      margin: 0 auto;
    }
    .title{
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      width: 700px;
      padding: 20px 0 0 0;
      @include ellipsis;
      a{
        color: #dd0303;
        &:hover{
          color: lighten(#dd0303, 20%);
        }
      }
    }
    .content{
      padding: 18px 0;
      width: 1050px;
      @include ellipsis;
      color: #333;
    }
  }
  .news{
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
    @include clearFixed;
    .news-con{
      width: 400px;
      padding: 0 10px;
      float: left;
      .title{
        @include clearFixed;
        padding: 0 0 20px 0;
        border-bottom: 2px solid #3eb888;
        span{
          font-size: 18px;
        }
        .news-more{
          width: 26px;
          height: 26px;
          line-height: 22px;
          text-align: center;
          border: 1px solid #d9d9d9;
          display: inline-block;
          float: right;
          font-weight: bold;
        }
      }
      .news-list{
        padding: 5px 0 0 0;
        .news-item{
          padding: 7px 0;
          white-space: nowrap;
          font-size: 14px;
          a{
            display: inline-block;
            width: 85%;
            vertical-align: middle;
            span{
              display: inline-block;
              max-width: 90%;
              @include ellipsis;
              vertical-align: middle;
            }
            i{
              vertical-align: middle;
            }
            .font-zhiding{
              color: $--color-primary;
              font-size: 18px;
            }
          }
          .time{
            vertical-align: middle;
            display: inline-block;
            text-align: right;
            width: 15%;
            color: #666;
          }
        }
      }
    }
    .news-carousel{
      position: relative;
      padding: 48px 0 0 0;
      img{
        width: 100%;
        height: 100%;
      }
      .news-banner-info{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 54px;
        line-height: 54px;
        width: 100%;
        background: #000000;
        color: #fff;
        font-size: 14px;
        padding: 0 10px;
        z-index: 2;
        @include ellipsis;
      }
    }
    .el-carousel__indicators{
      z-index: 3;
      left: auto;
      right: 1%;
      bottom: 48px;
      transform: translateX(0);
      .el-carousel__indicator{
        &.is-active{
          button{
            background: #ff8c4e;
          }
        }
        button{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
  }
  .personnel-box{
    background: #f3f3f3;
  }
  .personnel{
    width: 1200px;
    margin: 0 auto;
    padding: 60px 0;
    .title{
      width: 285px;
      height: 50px;
      border: 1px solid $--color-primary;
      white-space: nowrap;
      border-radius: 5px;
      overflow: hidden;
      margin: 0 auto;
      a{
        display: inline-block;
        width: 50%;
        color: #333;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        &.active,&:hover{
          background: $--color-primary;
          color: #fff;
        }
      }
    }
    .personnel-list{
      padding: 50px 0;
      @include clearFixed;
      .personnel-item{
        display: block;
        width: 224px;
        height: 273px;
        float: left;
        margin-right: 20px;
        position: relative;
        img{
          width: 100%;
        }
        .personnel-info{
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          padding: 0 10px;
          background: $--color-primary;
          color: #fff;
          position: absolute;
          bottom: 0;
          left: 0;
          @include ellipsis;
        }
        &:last-child{
          margin-right: 0;
        }
        &:hover{
          cursor: pointer;
          opacity: .9;
        }
      }
    }
  }
  .personnel-more{
    margin: 40px 0 0 0;
    text-align: center;
  }
  .more{
    width: 157px;
    height: 50px;
    line-height: 46px;
    text-align: center;
    display: inline-block;
    border: 2px solid #666;
    color: #666;
    font-size: 20px;
    &:hover{
      background: $--color-primary;
      cursor: pointer;
      color: #fff;
      border: 2px solid $--color-primary;
    }
  }
  .innovate-box{
    background: url("./static/innovate.png") no-repeat;
    background-size: 100% 100%;
    height: 650px;
    padding: 55px 0;
    .title{
      text-align: center;
      color: #fff;
      p{
        &:first-child{
          font-size: 36px;
        }
        &:nth-child(2){
          font-size: 16px;
          padding: 5px 0;
        }
      }
    }
    .innovate{
      width: 1200px;
      margin: 0 auto;
    }
    .innovate-con{
      @include clearFixed;
      margin: 45px 0 20px 0;
    }
    .innovate-left{
      width: 330px;
      padding: 10px 10px;
      float: left;
      background: rgba(0,0,0,.7);
      border-radius: 5px;
      .tit{
        @include clearFixed;
        padding: 0 0 20px 0;
        border-bottom: 2px solid #d9d9d9;
        color: #fff;
        span{
          font-size: 18px;
        }
        .news-more{
          width: 26px;
          height: 26px;
          line-height: 22px;
          text-align: center;
          border: 1px solid #d9d9d9;
          display: inline-block;
          float: right;
          font-weight: bold;
          color: #999;
          background: #fff;
          &:hover{
            color: $--color-primary;
          }
        }
      }
      .innovate-list{
        margin: 20px 0 0 0;
        .innovate-item{
          @include ellipsis;
          width: 100%;
          display: inline-block;
          font-size: 14px;
          color: #fff;
          padding: 6px 0;
          &:hover{
            color: $--color-primary;
          }
        }
      }
    }
    .innovate-more{
      text-align: center;
      .more{
        color: #fff;
        border: 2px solid #fff;
      }
    }
  }
  .innovate-right{
    width: 870px;
    float: left;
    padding-left: 53px;
    @include clearFixed;
    .innovate-right-item{
      display: block;
      width: 250px;
      height: 160px;
      float: left;
      margin-right: 27px;
      margin-bottom: 22px;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
      .innovate-right-info{
        color: #fff;
        width: 100%;
        height: 50px;
        background: rgba(0,0,0,.6);
        position: absolute;
        left: 0;
        bottom: 0;
        line-height: 50px;
        padding: 0 10px;
        @include ellipsis;
      }
      &:nth-child(3n){
        margin-right: 0;
      }
      &:last-child{
        background: #51c332;
        padding: 32px 0 0 0;
        img{
          display: block;
          width: 50px;
          margin: 0 auto;
        }
        p{
          text-align: center;
          color: #fff;
          padding: 10px 0;
          font-size: 16px;
        }
      }
      &:hover{
        cursor: pointer;
        opacity: .9;
      }
    }
  }
  .wonderful-box{
    padding: 50px 0;
    height: 640px;
    background: url("./static/wonderful.png") no-repeat center center;
    background-size: 100%;
    .wonderful{
      width: 1200px;
      margin: 0 auto;
    }
    .title{
      text-align: center;
      p:nth-child(1){
        font-size: 24px;
      }
      p:nth-child(2){
        font-size: 14px;
        padding: 5px 0 0 0;
        color: #666;
      }
    }
    .wonder-slider{
      padding: 50px 0 0 0;
    }
    .wonder-item{
      width: 600px;
      height: 360px;
      position: relative;
      img{
        width: 100%;
      }
      .wonder-tip{
        position: absolute;
        height: 110px;
        width: 100%;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,.6);
        padding: 10px 10px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .wisdom-box{
    height: 723px;
    padding: 60px 0;
    background: url("./static/wisdom.png") no-repeat;
    background-size: 100% 100%;
    .title{
      text-align: center;
      color: #fff;
      p:nth-child(1){
        font-size: 24px;
      }
      p:nth-child(2){
        font-size: 14px;
        padding: 5px 0 0 0;
      }
    }
    .wisdom-con{
      @include clearFixed;
      width: 1200px;
      margin: 0 auto;
      padding: 45px 0 0 0;
      .wisdom-left{
        width: 498px;
        height: 460px;
        float: left;
        background: rgba(81,195,50,.9);
        color: #fff;
        padding: 30px 20px;
        .wisdom-left-tit{
          font-size: 20px;
          padding: 0 0 20px 0;
          @include clearFixed;
        }
        .wisdom-left-more{
          display: inline-block;
          width: 29px;
          height: 29px;
          line-height: 24px;
          font-size: 26px;
          border: 1px solid #cbedc2;
          color: #cbedc2;
          text-align: center;
          float: right;
          &:hover{
            color: $--color-primary;
          }
        }
        .wisdom-left-con{
          font-size: 14px;
          line-height: 25px;
          height: 355px;
          overflow: hidden;
        }
      }
      .wisdom-right{
        width: 683px;
        float: right;
        @include clearFixed;
        a.wisdom-right-item:hover{
          cursor: pointer;
          opacity: .9;
        }
        .wisdom-right-item{
          display: block;
          width: 214px;
          height: 220px;
          float: left;
          color: #fff;
          padding: 35px 15px 0 22px;
          margin: 0 0 20px 0;
          font-size: 14px;
          position: relative;
          img{
            width: 30px;
            position: absolute;
            bottom: 20px;
            right: 20px;
          }
          span{
            font-size: 20px;
          }
          &:nth-child(3n-1),&:nth-child(3n-2){
            margin-right: 20px;
          }
          &:nth-child(1){
            background: #ff8c4e;
          }
          &:nth-child(2){
            background: url("./static/wisdom-1.png") no-repeat;
            background-size: 100%;
          }
          &:nth-child(3){
            background: #0d6fb8;
          }
          &:nth-child(4){
            background: #ae5da1;
          }
          &:nth-child(5){
            background: url("./static/wisdom-2.png") no-repeat;
            background-size: 100%;
          }
          &:nth-child(6){
            background: #05a5c3;
          }
        }
      }
    }
  }
  .module-top{
    padding: 30px 0 10px 0;
  }
</style>
