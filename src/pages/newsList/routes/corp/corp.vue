<template>
  <div class="corp">
    <div class="search">
      <div class="search-tit">
        <el-form inline :model="form" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="form.aab004" placeholder="请输入单位名称/关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.ccpr10" placeholder="请选择行业类别">
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.ccpr10" placeholder="请选择地区">
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
            <el-button type="default" size="mini" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item>
            <a href="javascript:;" @click="showMore = !showMore">更多<i class="el-icon-arrow-down" :class="showMore ? 'more-rotate' : ''"></i></a>
          </el-form-item>
        </el-form>
      </div>
      <transition name="el-zoom-in-top" mode="out-in">
        <div class="search-more" v-if="showMore">
          <el-form inline :model="form" class="demo-form-inline">
            <el-form-item label="更多筛选">
              <el-select v-model="form.aab019" placeholder="单位性质">
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.aab056" placeholder="单位规模">
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.updateDates" placeholder="更新时间">
                <el-option label="不限" value="0"></el-option>
                <el-option label="三天以内" value="3"></el-option>
                <el-option label="一周以内" value="7"></el-option>
                <el-option label="十天以内" value="7"></el-option>
                <el-option label="十天以内" value="10"></el-option>
                <el-option label="一个月以内" value="30"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
    <div class="list" ref="list">
      <a class="item">
        <div class="img">
          <img src="./corp.png" alt="">
        </div>
        <div class="info">
          <p>河南立科达医疗用品科技有限公司</p>
          <p>医疗设备/器械</p>
          <p>全程陪伴的融资专家，专注为TMT早全程陪伴的融资专家，专注为TMT早…</p>
        </div>
        <div class="count">在招职位数：<span>8</span></div>
      </a>
      <a class="item">
        <div class="img">
          <img src="./corp.png" alt="">
        </div>
        <div class="info">
          <p>河南立科达医疗用品科技有限公司</p>
          <p>医疗设备/器械</p>
          <p>全程陪伴的融资专家，专注为TMT早全程陪伴的融资专家，专注为TMT早…</p>
        </div>
        <div class="count">在招职位数：<span>8</span></div>
      </a>
      <a class="item">
        <div class="img">
          <img src="./corp.png" alt="">
        </div>
        <div class="info">
          <p>河南立科达医疗用品科技有限公司</p>
          <p>医疗设备/器械</p>
          <p>全程陪伴的融资专家，专注为TMT早全程陪伴的融资专家，专注为TMT早…</p>
        </div>
        <div class="count">在招职位数：<span>8</span></div>
      </a>
      <a class="item">
        <div class="img">
          <img src="./corp.png" alt="">
        </div>
        <div class="info">
          <p>河南立科达医疗用品科技有限公司</p>
          <p>医疗设备/器械</p>
          <p>全程陪伴的融资专家，专注为TMT早全程陪伴的融资专家，专注为TMT早…</p>
        </div>
        <div class="count">在招职位数：<span>8</span></div>
      </a>
      <a class="item">
        <div class="img">
          <img src="./corp.png" alt="">
        </div>
        <div class="info">
          <p>河南立科达医疗用品科技有限公司</p>
          <p>医疗设备/器械</p>
          <p>全程陪伴的融资专家，专注为TMT早全程陪伴的融资专家，专注为TMT早…</p>
        </div>
        <div class="count">在招职位数：<span>8</span></div>
      </a>
      <a class="item">
        <div class="img">
          <img src="./corp.png" alt="">
        </div>
        <div class="info">
          <p>河南立科达医疗用品科技有限公司</p>
          <p>医疗设备/器械</p>
          <p>全程陪伴的融资专家，专注为TMT早全程陪伴的融资专家，专注为TMT早…</p>
        </div>
        <div class="count">在招职位数：<span>8</span></div>
      </a>
    </div>
  </div>
</template>
<script>
import {echo} from '../../../../common/js/utils'

export default {
  data() {
    return {
      form: {
        currentPage: 1,
        rowsNum: 9,
        aab004: '', // 关键字
        ccpr10: '', // 行业类别
        aab301: '', // 城市
        aab019: '', // 企业性质
        aab056: '', // 企业规模
        updateDates: '' // 更新时间
      },
      showMore: false
    }
  },
  methods: {
    onSubmit() {},
    getDictionaries() { // 字典表
      this.$post('/sys/college/config/config/getConditionList', {
        tabStr: 'TAB_UNITNATURE,TAB_PSCALE,TAB_CITY,INDUSTRY_AS'
      }).then(res => {
        console.log(res)
      })
    },
    onReset() {
      echo(this.form)
    }
  },
  created() {
    this.getDictionaries()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .corp{
    padding: 25px 10px;
    .search{
      .el-input{
        width: 255px;
      }
      .el-select{
        width: 150px;
      }
      .el-form-item{
        margin-bottom: 0;
      }
      .search-tit{
        background: #f8f8f8;
        padding: 15px 10px;
        border-top: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        .more-rotate{
          transform: rotate(180deg);
        }
      }
      .search-more{
        padding: 15px 10px;
        border-bottom: 1px solid #ebebeb;
      }
    }
    .list{
      @include clearFixed;
      padding: 15px 0 0 0;
      .item{
        display: block;
        float: left;
        width: 260px;
        height: 260px;
        margin-bottom: 15px;
        overflow: hidden;
        border: 1px solid #ebebeb;
        &:hover{
          background: #f3f3f3;
          border-color: $--color-primary;
        }
        &:nth-child(3n-2),&:nth-child(3n-1){
          margin-right: 15px;
        }
        .img{
          height: 90px;
          width: 90px;
          margin: 20px auto;
          img{
            width: 100%;
          }
        }
        .info{
          margin: 0 10px;
          padding: 0 0 12px 0;
          border-bottom: 1px dashed #ebebeb;
          p{
            text-align: center;
            @include ellipsis;
            margin: 0 0 5px 0;
            &:nth-child(1){
              font-size: 16px;
              color: #000;
            }
            &:nth-child(2){
              color: #666;
              font-size: 14px;
            }
            &:nth-child(3){
              color: #333;
              font-size: 14px;
            }
          }
        }
        .count{
          line-height: 41px;
          text-align: center;
          font-size: 16px;
          color: #666;
          span{
            color: $--color-primary;
          }
        }
      }
    }
  }
</style>
