<template>
  <div class="me">
    <xf-header></xf-header>
    <div class="me-box">
      <div class="container">
        <div class="menu">
          <div class="info">
            <div class="head">
              <img src="./static/head.png" alt="">
            </div>
            <p class="name">{{name}}</p>
          </div>
          <div class="list">
            <router-link to="/corp" class="item">
              <i class="xffont font-yidiandiantubiao04"></i>
              <span>企业中心</span>
            </router-link>
            <router-link to="/user" class="item">
              <i class="xffont font-yidiandiantubiao04"></i>
              <span>个人中心</span>
            </router-link>
            <router-link to="/message" class="item">
              <i class="xffont font-xiaoxi"></i>
              <span>我的消息</span>
            </router-link>
            <router-link to="/account" class="item">
              <i class="xffont font-shezhi"></i>
              <span>账号管理</span>
            </router-link>
            <router-link to="/jobSearch" class="item">
              <i class="xffont font-search"></i>
              <span>岗位搜索</span>
            </router-link>
            <router-link to="/talent" class="item">
              <i class="xffont font-search"></i>
              <span>人才搜索</span>
            </router-link>
            <router-link to="/resume" class="item">
              <i class="xffont font-jianli-copy"></i>
              <span>我的简历</span>
            </router-link>
            <router-link to="/corpResume" class="item">
              <i class="xffont font-jianli-copy"></i>
              <span>简历管理</span>
            </router-link>
            <router-link to="/job" class="item">
              <i class="xffont font-iconzhiwei"></i>
              <span>职位管理</span>
            </router-link>
            <router-link to="/jobFair" class="item">
              <i class="xffont font-ai-user"></i>
              <span>招聘会</span>
            </router-link>
            <router-link to="/userCollection" class="item">
              <i class="xffont font-shoucang"></i>
              <span>我的收藏</span>
            </router-link>
            <router-link to="/records" class="item">
              <i class="xffont font-jilu"></i>
              <span>求职管理</span>
            </router-link>
          </div>
        </div>
        <transition name="el-fade-in" mode="out-in">
          <router-view class="right"></router-view>
        </transition>
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
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters([
      'corpInfo'
    ])
  },
  methods: {
    ...mapMutations({
      setCorpInfo: 'SET_CORP_INFO',
      setAuthenInfo: 'SET_AUTHEN_INFO',
      setPersonalInfo: 'SET_PERSONAL_INFO'
    }),
    ...mapActions([
      'getPhoneOpen',
      'getDictionaries'
    ]),
    getCorpInfo() {
      if (this.$userInfo.status !== 1 || this.$userInfo.ccmu17 !== 2) return
      this.$post('/service/business/corp/corps/getCorpIndexInfo.xf', {
        aab001: this.$userInfo.aab001
      }).then(res => {
        const o = res.result
        for (let i in o) {
          if (o.hasOwnProperty(i) && i !== 'corpInfo') {
            o.corpInfo[i] = o[i]
          }
        }
        this.setCorpInfo(res.result.corpInfo)
        this.name = res.result.corpInfo.aab004
      })
    },
    getAuthen() {
      if (this.$userInfo.status !== 1 || this.$userInfo.ccmu17 !== 2) return
      this.$post('/service/business/authen/authen/getAuthenInfo.xf', {
        aab001: this.$userInfo.aab001
      }).then(res => {
        this.setAuthenInfo(res.result || {})
      })
    },
    getPersonalInfo() {
      if (this.$userInfo.status !== 1 || this.$userInfo.ccmu17 !== 1) return
      this.$post('/service/business/person/personInfo/getPersonIndexInfo.xf', {
        aac001: this.$userInfo.aac001
      }).then(res => {
        const o = res.result
        for (let i in o) {
          if (o.hasOwnProperty(i) && i !== 'personInfo') {
            o.personInfo[i] = o[i]
          }
        }
        this.setPersonalInfo(o.personInfo)
        this.name = o.personInfo.aac003
      })
    }
  },
  created() {
    this.getPhoneOpen()
    this.getDictionaries()
    this.getCorpInfo()
    this.getPersonalInfo()
    this.getAuthen()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .me-box{
    width: 100%;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 20px 0;
  }
  .container{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    min-height: 650px;
    @include clearFixed;
  }
  .menu{
    width: 200px;
    float: left;
    .info{
      padding: 15px 0 35px 0;
      .head{
        width: 112px;
        height: 112px;
        padding: 5px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        border: 1px solid #ebebeb;
        &:hover{
          transform: scale(1.1);
          cursor: pointer;
        }
        img{
          width: 100%;
        }
      }
      p{
        text-align: center;
        padding: 3px 0 0 0;
        font-size: 14px;
      }
      .name{
        color: $--color-primary;
        padding: 5px 5px;
      }
      .other{
        color: #666;
      }
    }
    .list{
      .router-link-active{
        color: $--color-primary;
      }
      .item{
        display: block;
        text-align: center;
        font-size: 14px;
        padding: 15px 0;
        &:not(:last-child){
          border-bottom: 1px solid #ebebeb;
        }
      }
    }
  }
  .right{
    border-left: 1px solid #ebebeb;
    min-height: 650px;
    width: 1000px;
    float: left;
  }
</style>
