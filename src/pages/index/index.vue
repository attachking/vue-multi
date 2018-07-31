<template>
  <div class="index">
    <xf-header></xf-header>
    <div class="banner">
      <el-carousel :height="topBannerHeight" :interval="5000" arrow="never">
        <el-carousel-item v-for="item in banners" :key="item.url">
          <a :href="item.target" class="banner-img">
            <img :src="item.url">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="normal-bg">
      <div class="module module-top">
        <div class="news-top">
          <p class="title">
            <a :href="'newsDetail.html?channel_code=' + topNews.channelCode + '&cand01=' + topNews.cand01 + '&head=1'" :title="topNews.cand03">{{topNews.cand03}}</a>
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
                  <a :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" :title="val.cand03" style="display: block;width: 100%;height: 100%;">
                    <img :src="val.cand11" onload="handleBeauty(event)">
                  </a>
                </el-carousel-item>
              </el-carousel>
              <div class="news-banner-info">{{firstSlider.length && firstSlider[firstSliderIndex].cand03}}</div>
            </div>
          </div>
          <div class="news-con">
            <div class="title">
              <span>工作动态</span>
              <a href="newsList.html#/module?channel_code=ZXDT" class="news-more" title="更多">更多&gt;</a>
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
              <a href="newsList.html#/module?channel_code=RCZC" class="news-more" title="更多">更多&gt;</a>
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
    </div>
    <div class="module personnel-box">
      <div class="personnel">
        <div class="title">
          <a href="javascript:;" :class="{active: recommendIndex === 1}" @click="recommendIndex = 1">岗位推介</a><a href="javascript:;" :class="{active: recommendIndex === 2}" @click="recommendIndex = 2">单位推介</a><a :class="{active: recommendIndex === 3}" href="javascript:;" @click="recommendIndex = 3">人才推介</a>
        </div>
        <transition name="el-fade-in" mode="out-in">
          <div class="recommend-job-list" key="job" v-if="recommendIndex === 1">
            <div class="item hover-opa" v-for="val in recommendJob" :key="val.acb210">
              <div class="top">
                <p>
                  <a :href="'job.html?acb210=' + val.acb210" target="_blank" :title="val.cca113">{{val.cca113}}</a>
                  <span class="salary">{{val.acc034Name}}</span>
                </p>
                <p>{{val.aac012 || '--'}} / {{val.acb21r || 0}}人 / {{val.acb21iName || '--'}}</p>
                <p>[ {{$dateFormat(val.ccpr05, 'yyyy-MM-dd hh:mm:ss')}} 发布 ]</p>
              </div>
              <div class="bottom">
                <div class="img">
                  <img :src="val.ccmu15" alt="">
                </div>
                <div class="corp-info">
                  <a :href="'corp.html?aab001=' + val.aab001" target="_blank">{{val.aab004}}</a>
                  <p>
                    <span>{{val.bcb202 || '--'}}</span>
                  </p>
                </div>
                <div class="edit">
                  <i class="xffont" v-if="ccmu17 !== 2" @click="collectSingle(val)" :class="Number(val.is_Collection) === 0 ? 'font-shoucang' : 'font-shoucang1'" :title="Number(val.is_Collection) === 0 ? '收藏' : '已收藏'"></i>
                  <i class="xffont font-send" v-if="ccmu17 !== 2" :class="Number(val.is_Resume) > 0 ? 'active' : ''" @click="handleResume(val)" :title="Number(val.is_Resume) > 0 ? '已投递简历' : '投递简历'"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="recommend-corp-list" key="corp" v-if="recommendIndex === 2">
            <a class="item hover-opa" v-for="val in recommendCorp" :key="val.aab001" :href="'corp.html?aab001=' + val.aab001" target="_blank">
              <div class="img">
                <img :src="val.ccmu15">
              </div>
              <div class="info">
                <p class="ell">{{val.aab004}}</p>
                <p class="ell">{{val.ccpr10name || '--'}}</p>
                <p style="height: 58px;">{{val.acb206 || '--'}}</p>
              </div>
              <div class="count">在招岗位数：<span>{{val.cnt || 0}}</span></div>
            </a>
          </div>
          <div class="personnel-list" key="talent" v-if="recommendIndex === 3">
            <div class="personnel-item hover-opa" v-for="val in recommendTalent" :key="val.aac001">
              <div class="img">
                <img :src="val.ccmu15" onload="handleBeauty(event)">
              </div>
              <div class="info">
                <a class="tit" :href="'personalInfo.html?aac001=' + val.aac001" target="_blank" v-if="status === 1">{{val.aac003}}</a>
                <a class="tit" href="" @click.prevent="handleLogin" v-if="status !== 1">{{val.aac003}}</a>
                <p>{{val.aac011name || '--'}}/{{val.aac004name || '--'}}</p>
                <p>专业：{{val.bcc01g || '--'}}</p>
                <p>{{val.aac041 || '--'}}</p>
              </div>
            </div>
          </div>
        </transition>
        <div class="personnel-more">
          <a class="more" :href="recommendIndex === 1 ? 'newsList.html#/job?channel_code=GWTJ' : recommendIndex === 2 ? 'newsList.html#/corp?channel_code=DWTJ' : 'newsList.html#/talent?channel_code=RCTJ'" target="_blank">查看更多</a>
        </div>
      </div>
    </div>
    <div class="module innovate-box" v-if="false">
      <div class="innovate">
        <div class="title">
          <p>创新创业</p>
          <p>INNOVATION AND ENTREPRENEURSHIP</p>
        </div>
        <div class="innovate-con">
          <div class="innovate-left">
            <div class="tit">
              <span>创新创业政策</span>
              <a href="newsList.html#/module?channel_code=ZCWJ" class="news-more" title="更多">更多&gt;</a>
            </div>
            <div class="innovate-list">
              <a :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" class="innovate-item" v-for="val in CXCY1" :key="val.cand01" :title="val.cand03">{{val.cand03}}</a>
            </div>
          </div>
          <div class="innovate-right">
            <a class="innovate-right-item" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" :title="val.cand03" v-for="val in CXCY2" :key="val.cand01">
              <img :src="val.cand11" alt="" onload="handleBeauty(event)">
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
            <el-carousel-item v-for="(val, key) in wonders" :key="val.cand01">
              <div class="wonder-item" :title="val.caoa03" @click="handleHenan(val, key)">
                <img :src="val.cand11" onload="handleBeauty(event)">
                <div class="wonder-tip" v-if="key === wonderIdx">
                  <span>{{wonders.length && wonders[wonderIdx].cand19}}</span>
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
              <a href="newsList.html#/module?channel_code=ZZGK" title="更多" class="wisdom-left-more">更多&gt;</a>
            </div>
            <div class="wisdom-left-con">{{zzInfo.cand19}}</div>
          </div>
          <div class="wisdom-right">
            <a class="wisdom-right-item" href="newsList.html#/module?channel_code=YZZC"><span>引智政策</span><br>POLICY OF INTRODUCING INTELLIGENCE<img src="./static/wisdom-icon-1.png"></a>
            <div class="wisdom-right-item"></div>
            <a class="wisdom-right-item" href="newsList.html#/module?channel_code=RCGZ"><span>人才工作</span><br>TALENT WORK<img src="./static/wisdom-icon-2.png"></a>
            <a class="wisdom-right-item" href="newsList.html#/module?channel_code=YZHD"><span>引智活动</span><br>INTELLECTUAL ACTIVITY<img src="./static/wisdom-icon-3.png"></a>
            <div class="wisdom-right-item"></div>
            <a class="wisdom-right-item" href="newsList.html#/pic?channel_code=ZJFC"><span>专家风采</span><br>EXPERT DEMEANOR<img src="./static/wisdom-icon-4.png"></a>
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
import event from '../../common/js/event'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      banners: [],
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
      topBannerHeight: '',
      recommendIndex: 1,
      recommendJob: [],
      recommendCorp: [],
      recommendTalent: [],
      ccmu17: this.$userInfo.ccmu17,
      status: this.$userInfo.status
    }
  },
  methods: {
    getBanners() { // 出彩河南
      this.$post('/service/business/fm/pic/picInfo/getPicList', {
        caoa04: 110,
        rowsNum: 12,
        key: 'BANNER'
      }).then(res => {
        this.banners = res.result.map(item => {
          return {
            url: item.caoa02,
            target: item.caoa10 || 'javascript:;'
          }
        })
      })
    },
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
        flag: 1,
        key: 'ZXDT_PIC'
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
        flag: 0,
        key: 'ZXDT_CONTENT'
      }).then(res => {
        this.ZXDT = res.result
      })
    },
    getRCZC() { // 人才政策
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 10,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'RCZC',
        key: 'RCZC'
      }).then(res => {
        this.RCZC = res.result
      })
    },
    getCXCY1() { // 创新创业（无图）
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 8,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'ZCWJ',
        key: 'ZCWJ'
      }).then(res => {
        this.CXCY1 = res.result
      })
    },
    getCXCY2() { // 创新创业（有图）
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 6,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'CGZS',
        key: 'CGZS'
      }).then(res => {
        this.CXCY2 = res.result
      })
    },
    getWonders() { // 出彩河南
      this.$post('/service/business/sms/sms/getContentList', {
        caoa04: 130,
        rowsNum: 8,
        currentPage: 1,
        channel_code: 'MSGJ',
        key: 'MSGJ'
      }).then(res => {
        this.wonders = res.result
      })
    },
    getTopNews() { // 获取头条新闻
      this.$post('/service/business/sms/sms/getHeadlineInfo', {
        key: 'HEAD'
      }).then(res => {
        if (res.result && res.result.length) {
          this.topNews = res.result[0]
        }
      })
    },
    getZZInfo() { // 郑州概况
      this.$post('/service/business/sms/sms/getConInfo', {
        channel_code: 'ZZGK',
        key: 'ZZGK'
      }).then(res => {
        if (res.result && res.result.length) {
          // res.result[0].cand04 = res.result[0].cand04.replace(/<[^>]+>/g, '')
          this.zzInfo = res.result[0]
        }
      })
    },
    handleHenan(val, key) { // 点击出彩河南
      if (this.wonderIdx === key) {
        location.href = `newsDetail.html?cand01=${val.cand01}&channel_code=${val.channelCode}`
      }
    },
    getRecommendJob() { // 岗位推介
      this.$post('/service/business/corp/newPosition/queryPositionList.xf', {
        acb21z: 3,
        rowsNum: 9,
        currentPage: 1,
        key: 'POSITION'
      }).then(res => {
        this.recommendJob = res.result
      })
    },
    getRecommendCorp() {
      this.$post('/service/business/corp/corps/queryCorpList.xf', {
        ccpr26: 1,
        rowsNum: 10,
        currentPage: 1,
        key: 'COMPANY'
      }).then(res => {
        res.result.forEach(item => {
          item.acb206 = item.acb206 ? item.acb206.substr(0, 40) + '...' : '--'
        })
        this.recommendCorp = res.result
      })
    },
    getRecommendTalent() {
      this.$post('/service/business/search/stuApplyJob/seachRCPersonnel.xf', {
        rowsNum: 9,
        currentPage: 1,
        key: 'PERSON'
      }).then(res => {
        res.result.forEach(item => {
          item.aac041 = item.aac041 ? item.aac041.substr(0, 25) + '...' : '--'
        })
        this.recommendTalent = res.result
      })
    },
    collectSingle(val) {
      if (Number(val.is_Collection) === 0) {
        this.collect(val.acb210)
      } else {
        this.delCollect(val.acb210)
      }
    },
    collect(acb210) {
      if (!this.$userInfo.status) {
        event.$emit('login')
        return
      }
      this.loading = true
      this.$post('/service/business/person/positionTalent/saveTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    delCollect(acb210) {
      this.loading = true
      this.$post('/service/business/person/positionTalent/delTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleResume(val) {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (this.$userInfo.ccmu17 === 2) {
        this.$message({
          message: '只有求职者可以收藏岗位',
          type: 'warning'
        })
        return
      }
      if (Number(val.is_Resume) > 0) {
        this.$message({
          message: '您已经投递过该单位的该岗位',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定向该单位投递简历?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.sendResume(val.acb210)
      })
    },
    sendResume(acb210) {
      this.loading = true
      this.$post('/service/business/person/personSendResume/savePositionApplyInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleLogin() {
      this.$confirm(`登陆后可查看详细信息`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        event.$emit('login')
      })
    }
  },
  created() {
    this.getFirstSlider()
    this.getZXDT()
    this.getRCZC()
    // this.getCXCY1()
    // this.getCXCY2()
    this.getWonders()
    this.getTopNews()
    this.getZZInfo()
    this.getBanners()
    this.getRecommendJob()
    this.getRecommendCorp()
    this.getRecommendTalent()
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
      .banner-img{
        display: block;
        height: 100%;
        width: 100%;
        img{
          width: 100%;
        }
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
          display: inline-block;
          float: right;
          font-size: 14px;
          padding: 3px 0 0 0;
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
    background: url("./static/innovate.jpg") no-repeat;
    background-size: 100% 100%;
    padding: 55px 0;
    height: 865px;
  }
  .personnel{
    width: 1200px;
    margin: 0 auto;
    .title{
      width: 360px;
      height: 50px;
      border: 1px solid $--color-primary;
      white-space: nowrap;
      border-radius: 5px;
      overflow: hidden;
      margin: 0 auto;
      background: #fff;
      a{
        display: inline-block;
        width: 33.4%;
        color: #333;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 20px;
        &.active,&:hover{
          background: $--color-primary;
          color: #fff;
        }
      }
    }
    .personnel-list{
      padding: 15px 0 0 0;
      @include clearFixed;
      .personnel-item{
        display: block;
        width: 30%;
        height: 174px;
        float: left;
        background: #fff;
        border: 1px solid #ebebeb;
        @include clearFixed;
        overflow: hidden;
        margin-bottom: 15px;
        &:nth-child(3n-2),&:nth-child(3n-1){
          margin-right: 58px;
        }
        &:hover{
          border-color: $--color-primary;
        }
        .img{
          height: 112px;
          width: 112px;
          float: left;
          border-radius: 50%;
          overflow: hidden;
          margin: 30px 0 0 30px;
        }
        .info{
          width: 200px;
          float: right;
          margin: 30px 0 0 0;
          padding: 0 10px 0 0;
          .name{
            color: #333;
          }
          p{
            color: #666;
            margin-top: 6px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .personnel-more{
    margin: 20px 0 0 0;
    text-align: center;
  }
  .more{
    width: 157px;
    height: 50px;
    line-height: 46px;
    text-align: center;
    display: inline-block;
    border: 2px solid #fff;
    color: #fff;
    font-size: 20px;
    &:hover{
      background: $--color-primary;
      cursor: pointer;
      color: #fff;
      border: 2px solid $--color-primary;
    }
  }
  .innovate-box{
    background: url("./static/innovate.jpg") no-repeat;
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
          display: inline-block;
          float: right;
          color: #fff;
          padding: 3px 0 0 0;
          font-size: 14px;
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
    background: url("./static/bg.jpg") no-repeat center center;
    background-size: 100% 100%;
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
          font-size: 14px;
          color: #fff;
          padding: 3px 0 0 0;
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
  .recommend-job-list{
    @include clearFixed;
    padding: 15px 0 0 0;
    overflow: hidden;
    .item{
      display: block;
      width: 30%;
      height: 176px;
      margin-bottom: 15px;
      overflow: hidden;
      border: 1px solid #ebebeb;
      background: #fff;
      float: left;
      &:hover{
        border-color: $--color-primary;
      }
      &:nth-child(3n-2),&:nth-child(3n-1){
        margin-right: 58px;
      }
      .top{
        height: 103px;
        margin: 0 10px;
        padding: 15px 0;
        border-bottom: 1px dashed #ebebeb;
        .salary{
          display: inline-block;
          width: 30%;
          text-align: right;
          color: #f26b01;
        }
        a{
          @include ellipsis;
          font-size: 16px;
          display: inline-block;
          width: 70%;
        }
        p{
          white-space: nowrap;
          font-size: 14px;
          color: #666;
          &:not(:first-child){
            margin: 5px 0 0 0;
          }
        }
      }
      .bottom{
        position: relative;
        padding: 16px 15px;
        @include clearFixed;
        .img{
          width: 40px;
          height: 40px;
          float: left;
          img{
            width: 100%;
          }
        }
        .corp-info{
          width: 235px;
          float: left;
          padding: 0 0 0 15px;
          a{
            display: inline-block;
            width: 100%;
            @include ellipsis;
            font-size: 14px;
          }
          p{
            font-size: 14px;
            color: #666;
          }
        }
        .edit{
          position: absolute;
          right: 18px;
          bottom: 18px;
          .xffont{
            font-size: 22px;
            &:hover{
              cursor: pointer;
              color: #f26b01;
            }
          }
          .active{
            color: #f26b01;
          }
        }
        .font-shoucang1{
          color: #f26b01;
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
      width: 225px;
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
      &:nth-child(5n){
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
  .red{
    color: red;
  }
</style>
