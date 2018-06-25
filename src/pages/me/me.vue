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
            <p class="name">张明宇</p>
            <p class="other">20127710150</p>
          </div>
          <div class="list">
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

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {}
  },
  methods: {},
  created() {}
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
        color: $--color-primary
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
