<template>
  <div class="corp">
    <xf-header></xf-header>
    <div class="module" ref="detail">
      <div class="container">
        <div class="left">
          <div class="left-top">
            <div class="title">
              <p class="pos-name">项目工程师</p>
              <p class="info">
                <span class="salary">4000元以上</span>&nbsp;&nbsp;
                <span>2人</span>&nbsp;|&nbsp;
                <span>全职</span>&nbsp;|&nbsp;
                <span>经验不限</span>&nbsp;|&nbsp;
                <span>硕士研究生</span>
                <span class="time">2017-03-08刷新</span>
              </p>
              <div class="edit">
                <i class="xffont font-jubao"></i>
                <i class="xffont font-shoucang"></i>
                <el-button type="primary" size="mini">投递简历</el-button>
              </div>
            </div>
            <div class="welfare">
              <span>养老保险</span>
              <span>养老保险</span>
              <span>养老保险</span>
            </div>
            <div class="desc">
              <div class="tit">职位描述</div>
              <div class="con">1.熟悉android操作系统,懂系统和软件升级、测试
                2.熟悉当前平板电脑方案,并对各方案的优缺点比较熟悉
                3.熟悉平板电脑生产流程,熟悉调试以及新机种导入生产,能分析出生产异常及提出对策
                4.熟悉PADS或Protel电路设计软件,有多层PCB Layout设计经验,熟悉Offic办公软件;
                5.BOM制作、新元器件选择、确认能力强;
                6.熟悉MID、智能手机等数码产品方案,对产品方案的优劣有认识、掌握;
                7.对新产品的导入、产品研发、进度跟进能力强;
                8.有丰富的电子电路设计经验;
                9.有较强的数码产品EMC、ESD问题处理能力;
                10.有较强的文件管理能力,对新产品设计发行文件制作能力强;
                11.较强的沟通能力,有项目管理经验者优先;</div>
            </div>
            <div class="desc">
              <div class="tit">工作地点</div>
              <div class="con">郑州市中原区长椿路冬青街交汇处河南省电子商务产业园3号楼1层</div>
            </div>
            <div class="desc">
              <div class="tit">联系电话</div>
              <div class="con">0379-63091742</div>
            </div>
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
            <div class="contact-tit">
              <img src="./static/logo.png" alt="">
              <a href="">纳斯达工贸有限公司</a>
            </div>
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
            <div class="recommend-tit">推荐岗位</div>
            <div class="list">
              <div class="item">
                <a href="">项目经理</a>
                <span>8000以上</span>
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
    getDetail(acb210) {
      // this.$post('', {acb210})
    },
    collect() {}
  },
  mounted() {
    const search = queryParse(location.search)
    this.getDetail(search.acb210)
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
        background: #fff;
        padding: 30px 20px;
        border-radius: 5px;
        .title{
          padding: 0 0 20px 0;
          border-bottom: 1px solid #ebebeb;
          position: relative;
          .pos-name{
            font-size: 16px;
            color: $--color-primary;
          }
          .info{
            font-size: 14px;
            color: #666;
            padding-top: 12px;
            .salary{
              color: #f26b01;
            }
            .time{
              display: inline-block;
              float: right;
            }
          }
          .edit{
            position: absolute;
            top: -5px;
            right: -1px;
            .xffont{
              font-size: 20px;
              margin: 0 5px 0 0;
              &.font-jubao{
                font-size: 18px;
              }
              &:hover{
                cursor: pointer;
                color: #f26b01;
              }
            }
          }
        }
        .welfare{
          padding: 15px 0;
          border-bottom: 1px solid #ebebeb;
          span{
            display: inline-block;
            padding: 8px 10px;
            border: 1px solid #d9d9d9;
            color: $--color-primary;
            font-size: 14px;
          }
        }
        .desc{
          padding: 0 0 20px 0;
          border-bottom: 1px solid #ebebeb;
          .tit{
            font-size: 16px;
            color: $--color-primary;
            padding: 15px 0;
          }
          .con{
            font-size: 14px;
            line-height: 25px;
            white-space: pre-wrap;
            word-break: break-all;
          }
        }
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
          color: $--color-primary;
          padding: 15px 0 0 0;
          img{
            width: 120px;
            height: 120px;
            display: block;
            margin: 0 auto;
          }
          a{
            padding: 15px 0 0 0;
            font-size: 16px;
            color: $--color-primary;
            text-align: center;
            display: inline-block;
            width: 100%;
            @include ellipsis;
          }
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
          .item{
            padding: 13px 10px;
            white-space: nowrap;
            &:not(:last-child){
              border-bottom: 1px dashed #ebebeb;
            }
            &:hover{
              background: #f3f3f3;
            }
            a{
              display: inline-block;
              max-width: 75%;
              @include ellipsis;
              font-size: 16px;
            }
            span{
              color: #f26b01;
              font-size: 14px;
              width: 25%;
              float: right;
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
