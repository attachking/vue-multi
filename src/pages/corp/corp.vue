<template>
  <div class="corp">
    <xf-header></xf-header>
    <div class="module" ref="detail">
      <div class="container">
        <div class="left">
          <div class="left-top">
            <div class="logo">
              <img src="./static/logo.png" alt="">
            </div>
            <div class="corp-tit">
              <p>纳斯达工贸有限公司</p>
              <p>
                <span>北京市 市辖区 海淀区</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span>私企</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span>10--99人</span>
              </p>
            </div>
            <div class="collect">
              <i class="xffont" :class="isCollect ? 'font-shoucang1' : 'font-shoucang'" @click="collect"></i>
            </div>
          </div>
          <div class="left-middle">
            <p class="tit">单位介绍</p>
            <div class="corp-info">深圳市纳斯达工贸有限公司, 成立于2007年, 专业生产平板电脑和数码相框的电子消费品, 同时为客户量身订制多媒体广告设备，并以先进的技术和完美的品质置于同行领先地位.
              工厂位于布吉红门科技园, 面积6000平方米, 员工200多人, 由高尖技术人才组成的专家研发团队有20人。拥有多项产品专利，强大的研发能力一直是纳斯达的传统优势。
              海纳百川，有容乃大。这正是纳斯达研发创新新征途的迷人风景和深沉内涵，纳斯达人懂得用智者的眼光来审视自身和看待行业与社会。兼容并蓄，恒则达。纳斯达人终将为纳斯达品牌打出“科技创新，于斯为盛”的盛名。
              工厂位于布吉红门科技园, 面积6000平方米, 员工200多人, 由高尖技术人才组成的专家研发团队有20人。拥有多项产品专利，强大的研发能力一直是纳斯达的传统优势。
              海纳百川，有容乃大。这正是纳斯达研发创新新征途的迷人风景和深沉内涵，纳斯达人懂得用智者的眼光来审视自身和看待行业与社会。兼容并蓄，恒则达。纳斯达人终将为纳斯达品牌打出“科技创新，于斯为盛”的盛名。</div>
          </div>
          <div class="left-bottom">
            <p class="position-tit">
              <span>该单位招聘岗位</span>
              <span>
                <a href="javascript:;">&lt;</a>&nbsp;
                <span class="current-page">1</span>&nbsp;/&nbsp;<span>3</span>&nbsp;
                <a href="javascript:;">&gt;</a>
              </span>
            </p>
            <div class="list">
              <div class="item">
                <p>
                  <a href="">项目工程师</a>
                  <span>2016-8-5</span>
                </p>
                <p>
                  <span>
                    <span>河南省 郑州市 市辖区</span>&nbsp;&nbsp;|
                    <span>2人</span>&nbsp;&nbsp;|
                    <span>全职</span>&nbsp;&nbsp;|
                    <span>经验不限</span>&nbsp;&nbsp;|
                    <span>硕士研究生</span>
                  </span>
                  <span class="salary">8000以上</span>
                </p>
              </div>
              <div class="item">
                <p>
                  <a href="">项目工程师</a>
                  <span>2016-8-5</span>
                </p>
                <p>
                  <span>
                    <span>河南省 郑州市 市辖区</span>&nbsp;&nbsp;|
                    <span>2人</span>&nbsp;&nbsp;|
                    <span>全职</span>&nbsp;&nbsp;|
                    <span>经验不限</span>&nbsp;&nbsp;|
                    <span>硕士研究生</span>
                  </span>
                  <span class="salary">8000以上</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-top">
            <div class="contact-tit">联系我们</div>
            <div class="contact-con">
              <p>
                <span class="label">网址：</span>
                <a href="http://www.lyrpec.com" target="_blank">http://www.lyrpec.com</a>
              </p>
              <p>
                <span class="label">电话：</span>
                <span>0379-63091742</span>
              </p>
              <p>
                <span class="label">邮箱：</span>
                <span>lyrpec_bgs@163.com</span>
              </p>
              <p>
                <span class="label">地址：</span>
                <span>郑州市中原区长椿路冬青街交汇   处河南省电子商务产业园3号楼1层</span>
              </p>
            </div>
          </div>
          <div class="right-middle">
            <img src="./static/qrcode.png" alt="">
            <p>扫描二维码在手机查看单位详情</p>
          </div>
          <div class="right-bottom">
            <div class="recommend-tit">热门单位</div>
            <div class="list">
              <div class="item">
                <div class="pos-logo">
                  <img src="./static/logo.png" alt="">
                </div>
                <div class="recommend-info">
                  <a href="">河南逸菲医疗科技有限公司</a>
                  <span>51-100人</span>
                </div>
              </div>
              <div class="item">
                <div class="pos-logo">
                  <img src="./static/logo.png" alt="">
                </div>
                <div class="recommend-info">
                  <a href="">河南逸菲医疗科技有限公司</a>
                  <span>51-100人</span>
                </div>
              </div>
            </div>
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
import {queryParse} from '../../common/js/utils'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      detail: {},
      isCollect: false
    }
  },
  methods: {
    getDetail(aab001) {
      // this.$post('', {aab001})
    },
    collect() {}
  },
  mounted() {
    const search = queryParse(location.search)
    this.getDetail(search.aab001)
  }
}
</script>
<style lang="scss">
  @import "../../common/style/variables";
  .module{
    width: 100%;
    min-height: 650px;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .container{
    width: 1200px;
    @include clearFixed;
    margin: 0 auto;
    padding: 50px 0;
    .left{
      width: 908px;
      float: left;
      & > div:not(:last-child){
        margin-bottom: 20px;
      }
      .left-top{
        height: 160px;
        @include clearFixed;
        padding: 20px 30px;
        background: #fff;
        border-radius: 5px;
        .logo{
          height: 120px;
          width: 120px;
          float: left;
        }
        .corp-tit{
          width: 666px;
          float: left;
          padding: 0 0 0 16px;
          p{
            padding-top: 18px;
            &:nth-child(1){
              font-size: 18px;
              color: $--color-primary;
            }
            &:nth-child(2){
              font-size: 14px;
              color: #666;
            }
          }
        }
        .collect{
          width: 35px;
          float: left;
          .xffont{
            font-size: 22px;
            &:hover{
              color: #f26b01;
              cursor: pointer;
            }
          }
          .font-shoucang1{
            color: #f26b01;
          }
          .font-shoucang{
            color: #333;
          }
        }
      }
    }
    .left-middle{
      background: #fff;
      border-radius: 5px;
      padding: 25px 25px;
      .corp-info{
        padding: 20px 0;
        white-space: pre-wrap;
        word-break: break-all;
        font-size: 14px;
        line-height: 25px;
      }
    }
    .left-bottom{
      background: #fff;
      border-radius: 5px;
      .position-tit{
        color: $--color-primary;
        padding: 15px 25px;
        border-bottom: 1px solid #ebebeb;
        & > span{
          display: inline-block;
          &:nth-child(1){
            font-size: 18px;
            color: $--color-primary;
          }
          &:nth-child(2){
            float: right;
            font-size: 14px;
            color: #333;
            .current-page{
              color: $--color-primary;
            }
          }
        }
      }
      .list{
        padding: 15px 25px;
        .item{
          padding: 20px 20px;
          &:not(:last-child){
            border-bottom: 1px dashed #ebebeb;
          }
          &:hover{
            background: #f3f3f3;
          }
          p{
            &:nth-child(1){
              font-size: 16px;
              color: #333;
              span{
                display: inline-block;
                float: right;
                font-size: 14px;
                color: #666;
              }
            }
            &:nth-child(2){
              padding: 10px 0 0 0;
              font-size: 14px;
              color: #666;
              .salary{
                color: #f26b01;
                display: inline-block;
                float: right;
              }
            }
          }
        }
      }
    }
    .right{
      width: 271px;
      float: right;
      & > div:not(:last-child){
        margin-bottom: 20px;
      }
      .right-top{
        border-radius: 5px;
        background: #fff;
        .contact-tit{
          font-size: 18px;
          color: $--color-primary;
          padding: 15px 20px;
          border-bottom: 1px solid $--color-primary;
        }
        .contact-con{
          padding: 15px 20px;
          font-size: 14px;
          p{
            &:not(:last-child){
              padding: 0 0 8px 0;
            }
          }
          .label{
            color: #666;
          }
        }
      }
      .right-middle{
        height: 304px;
        border-radius: 5px;
        background: #fff url("./static/qrcode-bg.png") no-repeat;
        padding: 44px 0 0 0;
        img{
          display: block;
          width: 186px;
          height: 186px;
          margin: 0 auto;
        }
        p{
          padding: 10px 0;
          color: #666;
          font-size: 14px;
          text-align: center;
        }
      }
      .right-bottom{
        border-radius: 5px;
        background: #fff;
        .recommend-tit{
          font-size: 18px;
          color: $--color-primary;
          padding: 15px 20px;
          border-bottom: 1px solid $--color-primary;
        }
        .list{
          padding: 0 15px;
          .item{
            padding: 13px 10px;
            @include clearFixed;
            &:not(:last-child){
              border-bottom: 1px dashed #ebebeb;
            }
            &:hover{
              background: #f3f3f3;
            }
            .pos-logo{
              width: 59px;
              height: 59px;
              overflow: hidden;
              float: left;
              img{
                width: 100%;
              }
            }
            .recommend-info{
              width: 153px;
              float: right;
              a{
                font-size: 16px;
                display: inline-block;
                width: 100%;
                @include ellipsis;
                padding: 5px 0 5px 0;
              }
              span{
                font-size: 14px;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
  .tit{
    color: $--color-primary;
    font-size: 18px;
  }
</style>
