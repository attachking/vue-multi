<!--美丽河南图片展示页面-->
<template>
  <div class="beauty">
    <empty v-if="pageBean.totalCount === 0"></empty>
    <div class="list">
      <div class="item" v-for="val in list" :key="val.cand01">
        <el-card>
          <a class="img" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01">
            <img :src="val.cand11" onload="handleBeauty(event)">
          </a>
          <div class="tip" :title="val.cand19">{{val.cand19}}</div>
        </el-card>
      </div>
    </div>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
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
import Empty from '../../../../components/empty/empty.vue'
import Pagination from '../../../../components/pagination/pagination.vue'

export default {
  components: {
    Pagination,
    Empty},
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
      textWidth: 0,
      searchData: {
        rowsNum: 9,
        currentPage: 1,
        countsNum: 50,
        channel_code: ''
      },
      pageBean: {}
    }
  },
  methods: {
    getList2() {
      this.$post('/service/business/fm/pic/picInfo/getPicList', {
        caoa04: 130,
        rowsNum: 12
      }).then(res => {
        this.list = res.result
      })
    },
    getList() {
      this.$post('/service/business/sms/sms/getContentList', this.searchData).then(res => {
        this.list = res.result
        this.pageBean = res.pageBean
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
    },
    handleRoute(route) {
      if (!route.query.channel_code) return
      this.searchData.channel_code = route.query.channel_code
      this.searchData.currentPage = 1
      this.getList()
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    }
  },
  beforeRouteLeave(to, fro, next) {
    // $(document).off('keydown')
    next(true)
  },
  watch: {
    $route(newVal) {
      this.handleRoute(newVal)
    }
  },
  created() {
    /*
    $(document).on('keydown', e => {
      if (e.keyCode === 27) {
        this.hide()
      }
    })
    */
    this.handleRoute(this.$route)
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
        width: 100%;
        height: 200px;
        overflow: hidden;
        display: block;
        &:hover{
          cursor: pointer;
          opacity: .9;
        }
      }
      .el-card{
        height: 275px;
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
  .tip{
    padding: 10px 0 0 0;
    width: 100%;
    font-size: 14px;
    @include ellipsis;
  }
  .page{
    padding: 10px 0;
    text-align: center;
  }
</style>
