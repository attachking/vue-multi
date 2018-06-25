<template>
  <div class="user">
    <div class="title">
      <span>欢迎您！</span>
      <span class="name normal">张明宇</span>
      <span class="tit-right">
        <span>
          <i class="xffont font-shouji-copy"></i>
          <span class="normal">18695881292</span>
        </span>&nbsp;&nbsp;
        <span>
          <i class="xffont font-youjian"></i>
          <span class="normal">zhangmingyu1228@126.com</span>
        </span>
      </span>
    </div>
    <div class="menu">
      <div class="item">
        <div class="text">
          <p class="big">22</p>
          <p>我申请的职位</p>
        </div>
      </div>
      <div class="item">
        <div class="text">
          <p class="big">08</p>
          <p>我的面试邀请</p>
        </div>
      </div>
      <div class="item">
        <div class="img">
          <i class="xffont font-youjian"></i>
          <p>我的消息</p>
        </div>
      </div>
      <div class="item">
        <div class="img">
          <i class="xffont font-suo"></i>
          <p>保密简历</p>
        </div>
      </div>
      <div class="item">
        <div class="img">
          <i class="xffont font-shoucang"></i>
          <p>我的收藏</p>
        </div>
      </div>
      <div class="item">
        <div class="img">
          <i class="xffont font-tupian-copy"></i>
          <p>我的风采</p>
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="../../static/banner.png" alt="">
    </div>
    <div class="job-fair">
      <div class="card-tit">
        <span class="item active"><i class="xffont font-zhiwei"></i>最新招聘会</span>
      </div>
      <div class="list">
        <div class="item">
          <a href="">2017年4月春风行动大型计算机专场招聘会</a>
          <p>
            <i class="xffont font-zuobiao"></i><span>理工院教学楼</span>
            <i class="xffont font-msnui-time"></i><span>2017-02-17</span>
          </p>
          <el-button class="btn" type="primary" plain>参会企业</el-button>
        </div>
        <div class="item">
          <a href="">2017年4月春风行动大型计算机专场招聘会</a>
          <p>
            <i class="xffont font-zuobiao"></i><span>理工院教学楼</span>
            <i class="xffont font-msnui-time"></i><span>2017-02-17</span>
          </p>
          <el-button class="btn" type="primary" plain>参会企业</el-button>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="card-tit">
        <span class="item" :class="currentTab === 1 ? 'active' : ''"><i class="xffont font-iconzhiwei"></i>推荐职位</span>
        <span class="item" :class="currentTab === 2 ? 'active' : ''"><i class="xffont font-gongsixinxi"></i>推荐单位</span>
      </div>
      <transition name="el-zoom-in-top" mode="out-in">
        <div class="job-list" key="jobList" v-if="currentTab === 1">
          <div class="item">
            <div class="logo">
              <img src="../../static/logo.png" alt="">
            </div>
            <div class="pos-info">
              <p>
                <a href="" class="pos-name">软件工程师</a>
                <a href="" class="corp-name">百世物流科技（中国）有限公司</a>
                <span class="salary">3000元以上</span>
              </p>
              <p class="pos-detail">
              <span>
                <span>地点：北京</span>&nbsp;|&nbsp;
                <span>招聘人数：2 人</span>&nbsp;|&nbsp;
                <span>经验：不限</span>&nbsp;|&nbsp;
                <span>学历：大学本科</span>&nbsp;|&nbsp;
                <span>工作性质：全职</span>
              </span>
                <span class="date">2016-8-2</span>
              </p>
            </div>
          </div>
          <div class="item">
            <div class="logo">
              <img src="../../static/logo.png" alt="">
            </div>
            <div class="pos-info">
              <p>
                <a href="" class="pos-name">软件工程师</a>
                <a href="" class="corp-name">百世物流科技（中国）有限公司</a>
                <span class="salary">3000元以上</span>
              </p>
              <p class="pos-detail">
              <span>
                <span>地点：北京</span>&nbsp;|&nbsp;
                <span>招聘人数：2 人</span>&nbsp;|&nbsp;
                <span>经验：不限</span>&nbsp;|&nbsp;
                <span>学历：大学本科</span>&nbsp;|&nbsp;
                <span>工作性质：全职</span>
              </span>
                <span class="date">2016-8-2</span>
              </p>
            </div>
            <div class="job-control">
              <i class="xffont font-shoucang"></i>
              <i class="xffont font-shoucang"></i>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentTab: 1
    }
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
      width: 16.666%;
      float: left;
      height: 105px;
      margin: 10px 0;
      text-align: center;
      overflow: hidden;
      font-size: 14px;
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
</style>
