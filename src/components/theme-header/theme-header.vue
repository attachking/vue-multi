<template>
  <div class="header">
    <div class="header-con">
      <a class="logo">
        <img src="../../common/img/logo-color.png" v-if="!en" alt="">
        <img src="../../common/img/logo-color-en.png" v-if="en" alt="">
      </a>
      <a class="item" :href="en ? 'theme.html?lang=en' : 'index.html'">{{en ? 'Home' : '首页'}}</a>
      <a class="item" :href="en ? 'theme.html?lang=en#/about' : 'theme.html#/about'">{{en ? 'About' : '关于大会'}}</a>
      <a class="item" :href="en ? 'theme.html?lang=en#/process' : 'theme.html#/process'">{{en ? 'Agenda' : '大会议程'}}</a>
      <a class="item" :href="en ? 'theme.html?lang=en#/dt' : 'theme.html#/dt'">{{en ? 'Dynamic' : '大会动态'}}</a>
      <a class="item" :href="en ? 'theme.html?lang=en#/topics' : 'theme.html#/topics'">{{en ? 'Special' : '大会专题'}}</a>
      <a class="item" :href="en ? 'theme.html?lang=en#/guide' : 'theme.html#/guide'">{{en ? 'Guide' : '会议指南'}}</a>
      <a class="item" :href="en ? 'theme.html?lang=en#/supporting' : 'theme.html#/supporting'">{{en ? 'Media' : '合作媒体'}}</a>
      <span class="lang">
        <a :href="en ? 'index.html' : 'javascript:;'" :class="{active: !en}">简体中文</a>&nbsp;/&nbsp;
        <a :href="en ? 'javascript:;' : 'theme.html?lang=en'" :class="{active: en}">English</a>
      </span>
    </div>
  </div>
</template>
<script>
import {isEn} from '../../common/js/utils'

export default {
  name: 'theme-header',
  data() {
    return {
      en: isEn()
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .header{
    height: 100px;
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
    .header-con{
      width: 1250px;
      margin: 0 auto;
      .logo{
        vertical-align: middle;
        display: inline-block;
        margin: 3px 0 0 0;
      }
      .item{
        display: inline-block;
        height: 100px;
        line-height: 100px;
        vertical-align: middle;
        color: #666;
        width: 110px;
        text-align: center;
        &:first-child{
          width: 150px;
          overflow: hidden;
          text-align: right;
          &:hover{
            cursor: default;
            background: #fff;
          }
          img{
            width: 93px;
            height: 93px;
            margin: 3px 0 0 0;
          }
        }
        &:hover{
          cursor: pointer;
          background: #f3f3f3;
        }
      }
      .lang{
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        .active{
          color: $--color-primary;
        }
      }
    }
  }
</style>
