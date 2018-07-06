<template>
  <div class="user">
    <div class="title">
      <span>欢迎您！</span>
      <span class="name normal">{{personalInfo.aac003 || '--'}}</span>
      <span class="tit-right">
        <span>
          <i class="xffont font-shouji-copy"></i>
          <span class="normal">{{personalInfo.aae005 || '--'}}</span>
        </span>&nbsp;&nbsp;
        <span>
          <i class="xffont font-youjian"></i>
          <span class="normal">{{personalInfo.aae015 || '--'}}</span>
        </span>
      </span>
    </div>
    <div class="menu">
      <a class="item" href="#/records/apply">
        <div class="text">
          <p class="big">{{personalInfo.positionCounts || 0}}</p>
          <p>我申请的职位</p>
        </div>
      </a>
      <a class="item" href="#/records/invitation">
        <div class="text">
          <p class="big">{{personalInfo.interviewCounts || 0}}</p>
          <p>我的面试邀请</p>
        </div>
      </a>
      <a class="item" href="#/message">
        <div class="img">
          <el-badge :value="personalInfo.noticeCounts" :hidden="Number(personalInfo.noticeCounts) === 0">
            <i class="xffont font-youjian"></i>
          </el-badge>
          <p>我的消息</p>
        </div>
      </a>
      <a class="item" href="#/userCollection">
        <div class="img">
          <i class="xffont font-shoucang"></i>
          <p>我的收藏</p>
        </div>
      </a>
      <a class="item" href="#/account/pics">
        <div class="img">
          <i class="xffont font-tupian-copy"></i>
          <p>我的风采</p>
        </div>
      </a>
    </div>
    <div class="banner">
      <img :src="ad" alt="">
    </div>
    <div class="job-fair">
      <div class="card-tit">
        <span class="item active"><i class="xffont font-zhiwei"></i>最新招聘会</span>
        <el-button type="text" class="more">更多&gt;</el-button>
      </div>
      <div class="list">
        <div class="item" v-for="val in jobFairList" :key="val.acb330">
          <a :href="'fair.html?acb330=' + val.acb330" :title="val.acb331" target="_blank">
            <span :class="Number(val.status) === 1 ? 'green' : Number(val.status) === 2 ? 'red' : 'closed'">【{{Number(val.status) === 1 ? '进行中' : Number(val.status) === 2 ? '未开始' : '已结束'}}】</span>
            {{val.acb331 || '--'}}
          </a>
          <p>
            <i class="xffont font-zuobiao"></i><span>{{val.acd200name || '--'}}</span>
          </p>
          <p>
            <i class="xffont font-msnui-time"></i><span>{{$dateFormat(val.acb333, 'yyyy-MM-dd hh:mm')}} 至 {{$dateFormat(val.acb334, 'yyyy-MM-dd hh:mm')}}</span>
          </p>
          <a :href="'fair.html?acb330=' + val.acb330" target="_blank">
            <el-button class="btn" type="primary" plain>查看详情</el-button>
          </a>
        </div>
      </div>
      <empty v-if="jobFairPageBean.totalCount === 0"></empty>
    </div>
    <div class="recommend">
      <div class="card-tit">
        <span class="item" :class="currentTab === 1 ? 'active' : ''" @click="currentTab = 1"><i class="xffont font-iconzhiwei"></i>推荐职位</span>
        <span class="item" :class="currentTab === 2 ? 'active' : ''" @click="currentTab = 2"><i class="xffont font-gongsixinxi"></i>推荐单位</span>
        <el-button @click="change" type="text" class="more">换一批<i class="el-icon-refresh"></i></el-button>
      </div>
      <transition name="el-zoom-in-top" mode="out-in">
        <div class="job-list" key="jobList" v-if="currentTab === 1" v-loading="loading1">
          <div class="item" v-for="val in jobList" :key="val.acb210">
            <div class="logo">
              <img :src="val.ccmu15">
            </div>
            <div class="pos-info">
              <p>
                <a :href="'job.html?acb210=' + val.acb210" class="pos-name" target="_blank" :title="val.cca113">{{val.cca113 || '--'}}</a>
                <a :href="'corp.html?aab001=' + val.aab001" class="corp-name" target="_blank" :title="val.aab004">{{val.aab004 || '--'}}</a>
                <span class="salary">{{val.acc034Name || '--'}}</span>
              </p>
              <p class="pos-detail">
                <span>
                  <span>地点：{{val.bcb202 || '--'}}</span>&nbsp;|&nbsp;
                  <span>招聘人数：{{val.acb21r || '--'}} 人</span>&nbsp;|&nbsp;
                  <span>经验：{{val.acc218 || '--'}}</span>&nbsp;|&nbsp;
                  <span>学历：{{val.aac012 || '--'}}</span>&nbsp;|&nbsp;
                  <span>工作性质：{{val.acb21iName || '--'}}</span>
                </span>
                <span class="date">{{$dateFormat(val.ccpr05, 'yyyy-MM-dd')}}</span>
              </p>
              <div class="job-control">
                <i class="xffont" :class="Number(val.is_Collection) > 0 ? 'font-shoucang1' : 'font-shoucang'" @click="handleCollect(val)" :title="Number(val.is_Collection) > 0 ? '已收藏' : '收藏'"></i>
                <i class="xffont font-send" :class="Number(val.is_Resume) > 0 ? 'active' : ''" @click="handleResume(val)" :title="Number(val.is_Resume) > 0 ? '已投递简历' : '投递简历'"></i>
              </div>
            </div>
          </div>
          <empty v-if="jobPageBean.totalCount === 0"></empty>
        </div>
        <div class="job-list" key="corpList" v-if="currentTab === 2" v-loading="loading2">
          <div class="item" v-for="val in corpList" :key="val.aab001">
            <div class="logo">
              <img :src="val.ccmu15">
            </div>
            <div class="pos-info">
              <p>
                <a :href="'corp.html?aab001=' + val.aab001" class="pos-name" target="_blank" :title="val.aab004">{{val.aab004 || '--'}}</a>
              </p>
              <p class="pos-detail">
                <span>
                  <span>行业：{{val.ccpr10name || '--'}}</span>&nbsp;|&nbsp;
                  <span>地址：{{val.aaa021 || '--'}} 人</span>&nbsp;|&nbsp;
                  <span>性质：{{val.aab019name || '--'}}</span>&nbsp;|&nbsp;
                  <span>规模：{{val.aab056name || '--'}}</span>
                </span>
              </p>
            </div>
            <div class="job-control">
              <i class="xffont" :class="Number(val.is_collection) > 0 ? 'font-shoucang1' : 'font-shoucang'" @click="handleSave(val)" :title="Number(val.is_collection) > 0 ? '已收藏' : '收藏'"></i>
            </div>
          </div>
          <empty v-if="corpPageBean.totalCount === 0"></empty>
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
      'personalInfo'
    ])
  },
  data() {
    return {
      currentTab: 1,
      jobFairList: [],
      jobFairPageBean: {},
      ad: '',
      jobSearch: {
        aac001: this.$userInfo.aac001,
        currentPage: 1,
        rowsNum: 5
      },
      jobList: [],
      jobPageBean: {},
      loading1: false,
      corpSearch: {
        aac001: this.$userInfo.aac001,
        currentPage: 1,
        rowsNum: 5
      },
      corpList: [],
      corpPageBean: {},
      loading2: false
    }
  },
  methods: {
    getJobFair() {
      this.$post('/service/business/jobfair/jobFairInfo/listJson.xf', {
        aac001: this.$userInfo.aac001,
        currentPage: 1,
        rowsNum: 5
      }).then(res => {
        this.jobFairList = res.result
        this.jobFairPageBean = res.pageBean
        // status 1进行中 2未开始 3已结束
      })
    },
    getAd() {
      this.$post('/service/business/fm/pic/picInfo/getPicDetail', {
        caoa04: 100
      }).then(res => {
        this.ad = res.result.caoa02
      })
    },
    getJob() { // 获取推荐岗位
      this.loading1 = true
      this.$post('/service/business/search/jobRecommendList/getRecommendJobList.xf', this.jobSearch, false).then(res => {
        this.loading1 = false
        this.jobList = res.result
        this.jobPageBean = res.pageBean
      }).catch(() => {
        this.loading1 = false
      })
    },
    getCorp() { // 获取推荐单位
      this.loading2 = true
      this.$post('/service/business/corp/corps/getHotCorpList.xf', this.corpSearch).then(res => {
        this.loading2 = false
        this.corpList = res.result
        this.corpPageBean = res.pageBean
      }).catch(() => {
        this.loading2 = false
      })
    },
    collect(acb210) {
      this.loading1 = true
      this.$post('/service/business/person/positionTalent/saveTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading1 = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getJob()
        }
      }).catch(() => {
        this.loading1 = false
      })
    },
    delCollect(acb210) {
      this.loading1 = true
      this.$post('/service/business/person/positionTalent/delTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading1 = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getJob()
        }
      }).catch(() => {
        this.loading1 = false
      })
    },
    sendResume(acb210) {
      this.loading1 = true
      this.$post('/service/business/person/personSendResume/savePositionApplyInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading1 = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getJob()
        }
      }).catch(() => {
        this.loading1 = false
      })
    },
    handleCollect(val) {
      if (Number(val.is_Collection) > 0) {
        this.delCollect(val.acb210)
      } else {
        this.collect(val.acb210)
      }
    },
    handleResume(val) {
      if (Number(val.is_Resume) === 0) {
        this.$confirm('确认投递?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sendResume(val.acb210)
        })
      }
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
    },
    handleSave(val) {
      if (Number(val.is_collection) > 0) {
        this.delCorp(val.aab001)
      } else {
        this.saveCorp(val.aab001)
      }
    },
    change() { // 换一批
      if (this.currentTab === 1) {
        if (this.jobPageBean.hasNextPage) {
          this.jobSearch.currentPage = this.jobPageBean.nextPage
          this.getJob()
        } else if (this.jobSearch.currentPage === 1) {
          this.$message({
            message: '没有更多了',
            type: 'warning'
          })
        } else {
          this.jobSearch.currentPage = 1
          this.getJob()
        }
      } else {
        if (this.corpPageBean.hasNextPage) {
          this.corpSearch.currentPage = this.corpPageBean.nextPage
          this.getCorp()
        } else if (this.corpSearch.currentPage === 1) {
          this.$message({
            message: '没有更多了',
            type: 'warning'
          })
        } else {
          this.corpSearch.currentPage = 1
          this.getCorp()
        }
      }
    }
  },
  created() {
    this.getJobFair()
    this.getAd()
    this.getJob()
    this.getCorp()
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
  .user{
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
  .banner{
    padding: 20px 0 0 0;
    img{
      width: 100%;
    }
  }
  .job-fair{
    .list{
      .item{
        padding: 20px 10px 0 10px;
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
  .more{
    margin: 0 10px 0 0;
    float: right;
  }
  .green{
    color: green;
  }
  .red{
    color: red;
  }
  .closed{
    color: #666;
  }
</style>
