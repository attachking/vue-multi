<template>
  <div class="me">
    <xf-header></xf-header>
    <div class="me-box">
      <div class="container">
        <div class="menu">
          <div class="info">
            <div class="head">
              <a href="#/account/head">
                <img :src="ccmu17 === 1 ? personalInfo.ccmu15 : corpInfo.ccmu15">
              </a>
            </div>
            <p class="name" v-if="isPerfect && loginStatus">
              <span>{{name}}</span>
              <i class="xffont font-anquanshezhi" :class="Number(authenInfo.authenState) === 2 ? 'authened' : 'unAuthen'" :title="Number(authenInfo.authenState) === 2 ? '认证已通过' : '单位未认证'"></i>
              <i class="xffont font-erweima" title="我的二维码" v-if="qrCode && (authenInfo.authenState === 2 || ccmu17 === 1)" @click="dialogVisible = true"></i>
            </p>
            <p class="tip" v-if="!isPerfect && loginStatus">
              点击
              <router-link :to="ccmu17 === 1 ? '/resume' : '/account/info'">
                <el-button type="text">前往</el-button>
              </router-link>
              完善基本信息
            </p>
          </div>
          <div class="list">
            <router-link :to="val.menuUrl" class="item" v-for="val in menu" :key="val.menuUrl">
              <i class="xffont" :class="val.menuIcon"></i>
              <span>{{val.menuName}}</span>
            </router-link>
          </div>
        </div>
        <transition name="el-fade-in" mode="out-in">
          <router-view class="right"></router-view>
        </transition>
      </div>
    </div>
    <el-dialog
      title="我的二维码"
      :visible.sync="dialogVisible"
      width="300px">
      <img :src="qrCode" class="qrcode">
    </el-dialog>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>

import XfHeader from '../../components/xf-header/xf-header.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import event from '../../common/js/event'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      name: '',
      isPerfect: '', // 是否完善基本信息 0否1是
      ccmu17: this.$userInfo.ccmu17,
      loginStatus: !!this.$userInfo.status,
      menu: [],
      isFirst: true,
      qrCode: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'corpInfo',
      'personalInfo',
      'authenInfo'
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
        res.result.authenState = Number(res.result.authenState) // 0为未认证，1为正在认证，2为已认证，3为认证失败，4、未绑定微信
        res.result.infoState = Number(res.result.infoState) // 0为基本信息未完善
        this.isPerfect = res.result.infoState
        this.setAuthenInfo(res.result)
        // 首次进入验证认证状态后处理路由（仅刷新页面时处理一次）
        if (!this.isFirst) return
        if (res.result.infoState === 0) {
          this.$router.push({name: 'info'})
          this.$alert('请先完善单位基本信息', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        } else if (res.result.authenState === 0) {
          this.$router.push({name: 'authen'})
          this.$alert('请先进行单位认证', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        } else if (res.result.authenState === 1) {
          this.$router.push({name: 'authen'})
          this.$alert('您的单位信息正在认证', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        }
        this.isFirst = false
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
        this.isPerfect = Number(o.personInfo.isPerfect)
        this.name = o.personInfo.aac003
      })
    },
    getMenu() {
      this.$post('/service/sys/config/menu/getMenuList.xf', {
        menuType: this.$userInfo.ccmu17
      }).then(res => {
        this.menu = res.result
      })
    },
    getQrCode() { // 获取二维码
      this.$post('/service/business/fm/pic/picInfo/qrCodeGenerate.xf', {
        /// type=1 个人   type=2 单位   type=3 岗位
        type: this.$userInfo.ccmu17,
        paramsId: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001
      }, false).then(res => {
        if (res.result && res.result.qrCodeUrl) {
          this.qrCode = res.result.qrCodeUrl
        }
      })
    }
  },
  created() {
    if (this.$userInfo.status !== 1) return
    this.getPhoneOpen()
    this.getMenu()
    this.getDictionaries()
    this.getCorpInfo()
    this.getPersonalInfo()
    this.getAuthen()
    this.getQrCode()
    event.$on('authen', () => {
      this.getAuthen()
    })
    event.$on('refresh', () => {
      this.getPersonalInfo()
      this.getCorpInfo()
    })
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
      padding: 15px 0 15px 0;
      .head{
        width: 112px;
        height: 112px;
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
        .font-erweima{
          cursor: pointer;
        }
        i{
          vertical-align: top;
          font-size: 14px;
        }
        .unAuthen{
          color: #666;
        }
        .authened{
          color: $--color-primary;
        }
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
  .qrcode{
    width: 260px;
  }
</style>
