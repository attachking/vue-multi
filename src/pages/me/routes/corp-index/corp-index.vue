<template>
  <div class="corp-index">
    <div class="title">
      <span>欢迎您！</span>
      <span class="name normal">{{corpInfo.aab004 || '--'}}</span>
      <span class="tit-right">
        <span>
          <i class="xffont font-shouji-copy"></i>
          <span class="normal">{{corpInfo.aae005 || '--'}}</span>
        </span>&nbsp;&nbsp;
        <span>
          <i class="xffont font-youjian"></i>
          <span class="normal">{{corpInfo.aae015 || '--'}}</span>
        </span>
      </span>
    </div>
    <div class="menu">
      <a class="item" href="#/job">
        <div class="left-font">
          <i class="xffont font-zhiwei"></i>
          <p>已发布职位 <span class="theme">{{corpInfo.corpPositionCounts}}</span><br>剩余可发布 <span class="theme">{{corpInfo.allowPostionCounts}}</span></p>
        </div>
      </a>
      <a class="item" href="#/corpResume">
        <div class="left-font">
          <i class="xffont font-jianli-copy"></i>
          <p>未查看简历 <span class="theme">{{corpInfo.corpNoResumeCounts}}</span><br>已收到简历 <span class="theme">{{corpInfo.corpResumeCounts}}</span></p>
        </div>
      </a>
      <a class="item" href="#/jobFair">
        <div class="text">
          <p class="big">{{corpInfo.corpJobFairCounts}}</p>
          <p>已预订招聘会</p>
        </div>
      </a>
      <a class="item" href="#/talent">
        <div class="text">
          <p class="big">{{corpInfo.ccpr28}}</p>
          <p>剩余下载简历数</p>
        </div>
      </a>
      <a class="item" href="#/message">
        <div class="img">
          <el-badge :value="corpInfo.corpNoticeCounts" :hidden="Number(corpInfo.corpNoticeCounts) === 0">
            <i class="xffont font-youjian"></i>
          </el-badge>
          <p>我的消息</p>
        </div>
      </a>
    </div>
    <div class="banner">
      <img :src="ad" alt="">
    </div>
    <div class="job-fair">
      <div class="card-tit">
        <span class="item active"><i class="xffont font-zhiwei"></i>最新招聘会</span>
        <a href="#/jobFair">
          <el-button type="text" class="more">更多&gt;</el-button>
        </a>
      </div>
      <div class="list">
        <div class="item" v-for="val in jobFair" :key="val.acb330">
          <a :href="'fair.html?acb330=' + val.acb330" target="_blank" :title="val.acb331">{{val.acb331 || '--'}}</a>
          <p>
            <i class="xffont font-zuobiao"></i><span>{{val.acd200name || '--'}}</span>
            <i class="xffont font-msnui-time"></i><span>{{$dateFormat(val.acb333, 'yyyy-MM-dd hh:mm')}} -- {{$dateFormat(val.acb334, 'yyyy-MM-dd hh:mm')}}</span>
          </p>
          <el-button class="btn" type="primary" plain :disabled="Number(val.status) === 3">{{Number(val.status) === 3 ? '已结束' : '单位预定'}}</el-button>
        </div>
      </div>
      <empty v-if="jobFairPageBean.totalCount === 0"></empty>
    </div>
    <div class="talent">
      <div class="card-tit">
        <span class="item" :class="tab === 1 ? 'active' : ''" @click="tab = 1"><i class="xffont font-admin"></i>人才推荐</span>
        <span class="item" :class="tab === 2 ? 'active' : ''" @click="tab = 2"><i class="xffont font-xueshimao"></i>专业推荐</span>
        <el-button @click="change" type="text" class="more">换一批<i class="el-icon-refresh"></i></el-button>
      </div>
      <transition name="el-fade-in" mode="out-in">
        <div class="talent-list" v-if="tab === 1" key="recommend" v-loading="loading">
          <a class="item" v-for="val in recommend" :key="val.aac001" target="_blank" :href="'personalInfo.html?aac001=' + val.aac001">
            <div class="img">
              <img :src="val.ccmu15" alt="">
            </div>
            <p class="name" :title="val.aac003">{{val.aac003}}</p>
            <p class="middle">
              <span :title="val.bca112">{{val.bca112}}</span>
              <span>{{val.acb223name}}岁</span>
            </p>
            <p class="time">{{$dateFormat(val.ccpr05, 'yyyy-MM-dd')}}</p>
          </a>
          <empty v-if="tab === 1 && recommendPageBean.totalCount === 0"></empty>
        </div>
        <div class="talent-list" v-if="tab === 2" key="major" v-loading="loading">
          <a class="item" v-for="val in major" :key="val.aac001" target="_blank" :href="'personalInfo.html?aac001=' + val.aac001">
            <div class="img">
              <img :src="val.ccmu15" alt="">
            </div>
            <p class="name" :title="val.aac003">{{val.aac003}}</p>
            <p class="middle">
              <span :title="val.bca112">{{val.bca112}}</span>
              <span>{{val.acb223name}}岁</span>
            </p>
            <p class="time">{{$dateFormat(val.ccpr05, 'yyyy-MM-dd')}}</p>
          </a>
          <empty v-if="tab === 2 && majorPageBean.totalCount === 0"></empty>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Empty from '../../../../components/empty/empty.vue'

export default {
  components: {Empty},
  computed: {
    ...mapGetters([
      'corpInfo'
    ])
  },
  data() {
    return {
      jobFair: [],
      jobFairPageBean: {},
      loading: false,
      recommendSearch: {
        rowsNum: 5,
        aab001: this.$userInfo.aab001,
        currentPage: 1
      },
      recommend: [],
      recommendPageBean: {},
      majorSearch: {
        rowsNum: 5,
        aab001: this.$userInfo.aab001,
        currentPage: 1
      },
      major: [],
      majorPageBean: {},
      tab: 1,
      ad: ''
    }
  },
  methods: {
    getJobFair() {
      this.$post('/service/business/jobfair/jobFairInfo/listJson.xf', {
        rowsNum: 6,
        currentPage: 1
      }).then(res => {
        this.jobFair = res.result
        this.jobFairPageBean = res.pageBean
      })
    },
    getRecommend() { // 推荐人才
      this.loading = true
      this.$post('/service/business/search/stuApplyJob/getStuApplyJob', this.recommendSearch).then(res => {
        this.loading = false
        this.recommendPageBean = res.pageBean
        this.recommend = res.result
      }).catch(() => {
        this.loading = false
      })
    },
    getMajor() { // 专业推荐
      this.loading = true
      this.$post('/service/business/search/stuApplyJob/getStuMajorJob', this.majorSearch).then(res => {
        this.loading = false
        this.major = res.result
        this.majorPageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    change() { // 换一批
      if (this.tab === 1) {
        if (this.recommendPageBean.hasNextPage) {
          this.recommendSearch.currentPage = this.recommendPageBean.nextPage
          this.getRecommend()
        } else if (this.recommendSearch.currentPage === 1) {
          this.$message({
            message: '没有更多了',
            type: 'warning'
          })
        } else {
          this.recommendSearch.currentPage = 1
          this.getRecommend()
        }
      } else {
        if (this.majorPageBean.hasNextPage) {
          this.majorSearch.currentPage = this.majorPageBean.nextPage
          this.getMajor()
        } else if (this.majorSearch.currentPage === 1) {
          this.$message({
            message: '没有更多了',
            type: 'warning'
          })
        } else {
          this.majorSearch.currentPage = 1
          this.getMajor()
        }
      }
    },
    getAd() {
      this.$post('/service/business/fm/pic/picInfo/getPicDetail', {
        caoa04: 100
      }).then(res => {
        this.ad = res.result.caoa02
      })
    }
  },
  created() {
    this.getJobFair()
    this.getRecommend()
    this.getMajor()
    this.getAd()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  @keyframes toRight {
    0%{
      transform: translateX(-100%);
    }
    100%{
      transform: translateX(0);
    }
  }
  .corp-index{
    padding: 20px 20px;
  }
  .title{
    font-size: 14px;
    padding: 0 0 15px 0;
    & > span{
      vertical-align: middle;
    }
    .name{
      width: 300px;
      display: inline-block;
      @include ellipsis;
    }
    .normal{
      color: $--color-primary;
    }
    .tit-right{
      display: inline-block;
      float: right;
    }
  }
  .menu{
    height: 125px;
    @include clearFixed;
    border: 1px solid #ebebeb;
    .item{
      width: 20%;
      float: left;
      height: 105px;
      margin: 10px 0;
      text-align: center;
      overflow: hidden;
      font-size: 14px;
      display: block;
      .text{
        padding: 20px 0 0 0;
      }
      .img{
        padding: 16px 0 0 0;
        .xffont{
          font-size: 40px;
          color: #666;
        }
      }
      .left-font{
        @include clearFixed;
        padding: 28px 0 0 0;
        .xffont{
          font-size: 40px;
          color: #666;
        }
        p{
          width: 115px;
          float: right;
          text-align: left;
        }
      }
      .big{
        font-size: 28px;
        color: $--color-primary;
      }
      &:not(:last-child){
        border-right: 1px solid #ebebeb;
      }
      &:hover{
        cursor: pointer;
        & > div{
          animation: toRight .5s;
        }
      }
    }
  }
  .theme{
    color: $--color-primary;
  }
  .banner{
    padding: 20px 0 0 0;
    img{
      width: 100%;
    }
  }
  .job-fair{
    .list{
      .item{
        padding: 20px 10px;
        position: relative;
        a{
          font-size: 16px;
          display: inline-block;
          width: 80%;
          @include ellipsis;
        }
        p{
          padding: 10px 0 0 0;
          font-size: 14px;
          color: #666;
          .xffont{
            margin: 0 3px 0 6px;
          }
        }
        .btn{
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        &:not(:last-child){
          border-bottom: 1px dashed #ebebeb;
        }
        &:hover{
          background: #f3f3f3;
        }
      }
    }
  }
  .talent-list{
    padding: 20px 0;
    .item{
      width: 180px;
      float: left;
      margin: 0 0 0 10px;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      display: block;
      &:hover{
        border-color: $--color-primary;
      }
      .img{
        width: 90px;
        height: 90px;
        display: block;
        margin: 20px auto;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .name{
        font-size: 16px;
        width: 100%;
        padding: 0 20px;
        @include ellipsis;
        color: $--color-primary;
        text-align: center;
      }
      .middle{
        font-size: 14px;
        color: #333;
        white-space: nowrap;
        padding: 7px 0;
        span{
          display: inline-block;
          width: 50%;
          padding: 0 8px;
          @include ellipsis;
          &:not(:last-child){
            border-right: 1px solid #d9d9d9;
          }
          &:first-child{
            text-align: right;
          }
          &:nth-child(2){
            text-align: left;
          }
        }
      }
      .time{
        font-size: 14px;
        color: #666;
        text-align: center;
        padding: 0 0 15px 0;
      }
    }
  }
  .more{
    margin: 0 10px 0 0;
    float: right;
  }
</style>
