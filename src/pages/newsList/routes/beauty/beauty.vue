<!--美丽河南图片展示页面-->
<template>
  <div class="beauty">
    <div class="list">
      <div class="item" v-for="val in list" :key="val.caoa01">
        <el-card>
          <div class="img">
            <img :src="val.caoa02" onload="handleBeauty(event)" @click="showImg(val)">
          </div>
        </el-card>
      </div>
    </div>
    <div class="beauty-shade" v-if="show"></div>
    <div class="beauty-img" v-if="show" @click="hide">
      <img :src="currentImg" :style="'transform: rotate(' + currentRotate + 'deg);'" @click.stop @animationend="handleAnimation($event)">
      <div v-if="showText" class="text" :style="`left: ${textLeft}px; bottom: ${textBottom}px; width: ${textWidth}px;`">{{text}}</div>
      <!--<span class="el-icon-refresh beauty-rotate" @click.stop="rotate"></span>-->
    </div>
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  data() {
    return {
      list: [],
      currentImg: '',
      show: false,
      showText: false,
      currentRotate: 0,
      text: '',
      textLeft: 0,
      textBottom: 0,
      textWidth: 0
    }
  },
  methods: {
    getList() {
      this.$post('/service/business/fm/pic/picInfo/getPicList', {
        caoa04: 130,
        rowsNum: 12
      }).then(res => {
        this.list = res.result
      })
    },
    rotate() {
      this.currentRotate -= 90
    },
    hide() {
      this.show = false
      this.showText = false
    },
    showImg(val) {
      this.currentImg = val.caoa02
      this.text = val.caoa03
      this.currentRotate = 0
      this.show = true
    },
    handleAnimation(e) {
      const $el = $(e.target)
      this.textWidth = $el.width()
      this.textLeft = $el.offset().left
      this.textBottom = $el.offset().top
      this.showText = true
    }
  },
  beforeRouteLeave(to, fro, next) {
    $(document).off('keydown')
    next(true)
  },
  created() {
    $(document).on('keydown', e => {
      if (e.keyCode === 27) {
        this.hide()
      }
    })
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .list{
    @include clearFixed;
    .item{
      width: 276px;
      float: left;
      overflow: hidden;
      margin: 10px 0 10px 10px;
      .img{
        width: 238px;
        height: 200px;
        overflow: hidden;
        &:hover{
          cursor: pointer;
          opacity: .9;
        }
      }
    }
  }
  .beauty-shade{
    z-index: 19891021;
    background-color: rgb(0, 0, 0);
    opacity: 0.9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .beauty-img{
    user-select: none;
    z-index: 19891022;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    img{
      max-height: 90%;
      max-width: 90%;
      opacity: 1;
      animation: xfScale .4s ease;
      transition: all .4s ease;
    }
    .text{
      position: absolute;
      padding: 20px 20px;
      background: rgba(0,0,0,.6);
      color: #fff;
      font-size: 14px;
    }
  }
  .beauty-rotate{
    position: absolute;
    bottom: 50px;
    right: 50px;
    font-size: 40px !important;
    color: #fff;
    opacity: .7;
    transition: all .3s ease;
    &:hover{
      cursor: pointer;
      opacity: 1;
    }
  }
</style>
