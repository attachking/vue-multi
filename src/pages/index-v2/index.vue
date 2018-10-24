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
      <div class="module">
        <div class="news">
          <div class="news-con" style="width: 400px;">
            <div class="news-carousel">
              <el-carousel height="345px" @change="handleChange" arrow="never">
                <el-carousel-item v-for="val in firstSlider" :key="val.cand01">
                  <a :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" :title="val.cand03" style="display: block;width: 100%;height: 100%;">
                    <img :src="val.cand11" onload="handleBeauty(event)">
                  </a>
                </el-carousel-item>
              </el-carousel>
              <div class="news-banner-info">{{firstSlider.length ? firstSlider[firstSliderIndex].cand03 : ''}}</div>
            </div>
          </div>
          <div class="news-con">
            <div class="title">
              <span>招聘信息</span>
              <a href="newsList.html#/module?channel_code=ZPJZ" class="news-more" title="更多">更多&gt;</a>
            </div>
            <div class="news-list">
              <div class="news-item" v-for="item in ZPJZ" :key="item.cand01">
                <a :href="'newsDetail.html?channel_code=' + item.channelCode + '&cand01=' + item.cand01" :title="item.cand03"><i class="xffont font-jiantou"></i><span>{{item.cand03}}</span><i class="xffont font-zhiding" v-if="item.cand17 === 1"></i></a>
                <span class="time">{{$dateFormat(item.ccpr05, 'yyyy-MM-dd')}}</span>
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
          <div class="recommend-job-list" key="job" v-if="recommendIndex === 1" v-loading="jobLoading">
            <div>
              <div class="item hover-opa" v-for="val in recommendJob" :key="val.acb210">
                <div class="top">
                  <p>
                    <a :href="'job.html?acb210=' + val.acb210" target="_blank" :title="val.cca113">{{val.cca113}}</a>
                    <span class="salary">{{val.acc034Name}}</span>
                  </p>
                  <p>{{val.aac012 || '--'}} / {{val.acb21r ? val.acb21r + '人' : '若干'}} / {{val.acb21iName || '--'}}</p>
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
              <div class="count">在招岗位数：<span>{{val.cnt || 0}}</span>需求人数：<span>{{val.personCnt || 0}}</span></div>
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
    <div class="module supporting-box normal-bg" ref="media">
      <div class="module-con">
        <div class="title">
          <p>友情链接</p>
          <p>FRIENDSHIP LINK</p>
        </div>
        <div class="supporting-con">
          <a target="_blank" :href="val.ccmw03" class="supporting-item" v-for="(val, key) in HZMT" :key="key" :title="val.ccmw02">
            <img :src="val.ccmw07" onload="handleBeauty(event)">
          </a>
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
      ZPJZ: [],
      wonders: [],
      zzInfo: {},
      topBannerHeight: '',
      recommendIndex: 1,
      recommendJob: [],
      recommendCorp: [],
      recommendTalent: [],
      ccmu17: this.$userInfo.ccmu17,
      status: this.$userInfo.status,
      HZMT: []
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
    getZPJZ() {
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 10,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'ZPJZ'
      }).then(res => {
        this.ZPJZ = res.result
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
      this.jobLoading = true
      this.$post('/service/business/corp/newPosition/queryPositionList.xf', {
        acb21z: 3,
        rowsNum: 9,
        currentPage: 1,
        aac001: this.$userInfo.aac001,
        key: 'POSITION'
      }).then(res => {
        this.jobLoading = false
        this.recommendJob = res.result
      }).catch(() => {
        this.jobLoading = false
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
      this.jobLoading = true
      this.$post('/service/business/person/positionTalent/saveTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.jobLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getRecommendJob()
        }
      }).catch(() => {
        this.jobLoading = false
      })
    },
    delCollect(acb210) {
      this.jobLoading = true
      this.$post('/service/business/person/positionTalent/delTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.jobLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getRecommendJob()
        }
      }).catch(() => {
        this.jobLoading = false
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
    },
    getHZMT() { // 友情链接
      this.$post('/service/business/fm/link/links/getLinksList.xf', {
        ccmw05: 1
      }).then(res => {
        this.HZMT = res.result.links
      })
    }
  },
  created() {
    this.getFirstSlider()
    this.getZPJZ()
    this.getWonders()
    this.getZZInfo()
    this.getBanners()
    this.getRecommendJob()
    this.getRecommendCorp()
    this.getRecommendTalent()
    this.getHZMT()
    $(window).on('resize', () => {
      this.topBannerHeight = Math.max($(window).width(), 1200) / 1920 * 360 + 'px'
    })
    this.topBannerHeight = Math.max($(window).width(), 1200) / 1920 * 360 + 'px'
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
      a{
        color: #dd0303;
        display: inline-block;
        width: 100%;
        @include ellipsis;
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
      width: 800px;
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
        padding: 9px 0 0 0;
        .news-item{
          padding: 6px 0;
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
        font-size: 14px;
        color: #666;
        span{
          color: $--color-primary;
          margin-right: 3px;
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
  .module{
    width: 100%;
    .module-con{
      width: 1200px;
      margin: 0 auto;
      .title{
        text-align: center;
        p{
          &:first-child{
            color: #05a5c3;
            font-size: 24px;
          }
          &:nth-child(2){
            color: #666;
            font-size: 14px;
            padding: 5px 0;
          }
        }
      }
    }
  }
  .supporting-box{
    padding: 65px 0 0 0;
    .supporting-con{
      padding: 50px 0 0 0;
      @include clearFixed;
      .supporting-item{
        float: left;
        width: 215px;
        height: 137px;
        border: 1px solid #d9d9d9;
        margin-right: 30px;
        margin-bottom: 30px;
        display: block;
        overflow: hidden;
        &:hover{
          cursor: pointer;
          opacity: .9;
          transform: scale(1.1);
        }
        &:nth-child(5n){
          margin-right: 0;
        }
      }
    }
  }
</style>
