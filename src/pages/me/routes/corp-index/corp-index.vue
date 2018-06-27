<template>
  <div class="corp-index">
    <div class="mainTop">
      <div class="welcomeYou">
        <p class="firmUser">
          <span>{{userName}}</span>
        </p>
      </div>
      <div class="mobilePhone">
        <div class="phoneNumber">
          <i class="xffont font-shouji-copy"></i>
          <span>12345678901</span>
        </div>
        <div class="emailNumber">
          <i class="xffont font-youjian"></i>
          <span>12345678@qq.com</span>
        </div>
      </div>
    </div>
      <div class="positionNumber">
        <div class="slideBox">
          <i class="xffont font-zhiwei"></i>
          <div class="surplus">
            <p>
              <a href="#">
                <span class="colTo">已发布职位</span>
                1
              </a>
            </p>
            <p>
              <a href="">
                <span class="colTo">剩余可发布</span>
                59
              </a>
            </p>
          </div>
        </div>
        <div class="slideBox">
          <i class="xffont font-jianli-copy"></i>
          <div class="surplus">
            <p>
              <a href="">
                <span class="colTo">未查看简历</span>
                1
              </a>
            </p>
            <p>
              <a href="">
                <span class="colTo">已收到简历</span>
                59
              </a>
            </p>
          </div>
        </div>
        <div class="slideBox">
          <i class="xffont font-xueshimao-shi"></i>
          <div class="surplus">
            <p>
              <a href="">
                <span class="colTo">已预订宣讲会</span>
                1
              </a>
            </p>
            <p>
              <a href="">
                <span class="colTo">已预订招聘会</span>
                59
              </a>
            </p>
          </div>
        </div>
        <div class="slideBox">
          <div class="surplus newsBox" style="padding:0px 85px;">
            <a href="">
              90
              <p>
                <span class="colTo" style="display: inline-block; margin-left: -45px; width: 120px;">剩余下载简历数量</span>
              </p>
            </a>
          </div>
        </div>
        <div class="slideBoxd">
          <i class="xffont font-tubiao209" style="color:#999; font-size: 40px; margin:0px 8px;"></i>
          <span class="number"></span>
          <div class="surplus newsBox">
            <a href="">
              <p>
                <span class="colTo" style="margin-left: 60px; font-size: 14px;">我的消息</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    <div class="advertisement">
      <a href="">
        <img src="./1.jpg" alt="">
      </a>
    </div>
    <div class="newRecruitment">
      <p class="left">
        <i class="xffont font-ai-user"></i>
        <span>最新招聘会</span>
      </p>
      <p class="more">
        <a href="">更多></a>
      </p>
    </div>
    <div class="recruitmentTable">
      <div class="springAction">
        <div class="springAction_left">
          <div class="action" title="2018夏季招聘会">
            <i>【已结束】</i>
            <a href="">2018夏季招聘会</a>
          </div>
          <p>
            <i class="xffont font-zuobiao"></i>
            <span>教三楼</span>
          </p>
          <p>
            <i></i>
            <span>2018-01-12 10:00~2018-01-12 12:00</span>
          </p>
        </div>
        <div class="springAction_right">
          <a href="">
            <input type="button" value="参会企业" class="enterprises" style="visibility: hidden">
          </a>
          <input type="button" value="已结束" class="end">
        </div>
      </div>
    </div>
    <div class="recommendTalent">
      <ul class="talentTop">
        <li class="recommend">
          <i class="xffont font-admin"></i>
          <span>推荐人才</span>
        </li>
        <li class="recommend">
          <i class="xffont font-user-list"></i>
          <span>专业推荐</span>
        </li>
      </ul>
      <div class="xffont xf-shuaxin3"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: this.$userInfo.name
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .corp-index{
    width:1000px;
    padding:0px 15px;
  }
  .mainTop{
    height:48px;
    line-height:48px;
    padding:0px 10px;
  }
  .welcomeYou{
    float:left;
    .firmUser{
      width:300px;
      span{
        color:#f26b01;
      }
    }
  }
  .mobilePhone{
    float:right;
    .phoneNumber{
      float:left;
    }
    .emailNumber{
      float:right;
    }
    span{
      color:#2a63b3;
    }
    .xffont{
      color:#c3c3c3;
      font-size: 20px;
      margin:0px 8px;
    }
  }
  .positionNumber{
    width: 960px;
    height: 125px;
    border: 1px solid #ebebeb;
    margin:5px;
    .slideBox{
      float:left;
      height:100%;
      width:195px;
      border-right:1px solid #ebebeb;
      box-sizing: border-box;
      .xffont{
        float:left;
        color:#cccccc;
        font-size:40px;
        margin:37px 15px;
      }
      .surplus{
        float:left;
        margin-top:30px;
        .colTo{
          font-size:14px;
          color:#333;
        }
        a{
          color:#2a63b3;
          font-size:20px;
        }
      }
    }
    .slideBoxd{
      position:relative;
      .number{
        display:inline-block;
        width:20px;
        height:20px;
        background: red;
        position:absolute;
        top:22px;
        right:55px;
        border-radius: 50%;
      }
    }
  }
  .advertisement{
    width:100%;
    margin-top:25px;
    text-align: center;
  }
  img{
    width:955px;
    height:90px;
  }
  .newRecruitment{
    height:50px;
    line-height:50px;
    border-bottom:1px solid #e3e3e3;
    .left{
      float:left;
      border-bottom: 2px solid #2a63b3;
      color:#2a63b3;
      margin-top:-2px;
    }
    .more{
      float:right;
      margin-right:10px;
    }
  }
  .springAction{
    height:81px;
    border-bottom:1px solid #e3e3e3;
    padding:0px 10px;
    :hover{
      background:#eee;
    }
    i{
      font-style: normal;
    }
    .springAction_left{
      .action{
        width:700px;
        color:#585858;
        margin-top:15px;
        a :hover{
          color:#faa65e;
        }
      }
      p{
        float: left;
        font-size: 14px;
        margin-top: 10px;
        color: #b5b4b4;
      }
    }
    .springAction_right{
      width:250px;
      float:right;
      input{
        width: 90px;
        height: 35px;
        font-size:16px;
        line-height:30px;
        background:#fff;
        color:#faa65e;
        -webkit-border-radius: 7%;
        border:1px solid #faa65e;
        margin-top:23px;

      }
    }
  }
</style>
