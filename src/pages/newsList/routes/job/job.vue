<template>
  <div class="corp">
    <div class="search">
      <div class="search-tit">
        <el-form inline :model="form" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="form.bca112" placeholder="请输入单位名称/关键字" @keydown.enter="onSubmit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-cascader
              filterable
              clearable
              :options="dictionaries.CRAFT_AS"
              v-model="bca111"
              change-on-select
              @change="handleBcalll">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-cascader
              clearable
              change-on-select
              filterable
              :options="dictionaries.TAB_CITY"
              v-model="acb202"
              @change="handleAcb202">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button type="default" size="mini" icon="el-icon-refresh" @click="onReset">重置</el-button>
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
              <el-select v-model="form.acc034" clearable placeholder="薪资待遇">
                <el-option
                  v-for="item in dictionaries.TAB_SALARY"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="aab056" clearable collapse-tags multiple placeholder="福利待遇">
                <el-option
                  v-for="item in dictionaries.TAB_WELFARE"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.acc217" clearable placeholder="工作经验">
                <el-option
                  v-for="item in dictionaries.TAB_WORKYEARS"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.acb21i" clearable placeholder="工作性质">
                <el-option
                  v-for="item in dictionaries.TAB_NATURE"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form inline :model="form" class="demo-form-inline">
            <el-form-item label="">
              <el-select v-model="form.aac011" clearable placeholder="学历要求">
                <el-option
                  v-for="item in dictionaries.TAB_EDUCATION"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.aab019" clearable placeholder="单位性质">
                <el-option
                  v-for="item in dictionaries.TAB_UNITNATURE"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.aab056" clearable placeholder="单位规模">
                <el-option
                  v-for="item in dictionaries.TAB_PSCALE"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.updateDates" clearable placeholder="更新时间">
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
      <div class="item">
        <div class="top">
          <p>
            <a href="" target="_blank">产品经理</a>
            <span class="salary">5000-6999元</span>
          </p>
          <p>大学本科 / 15人 / 全职</p>
          <p>[ 2018-6-21 17:47:51 发布 ]</p>
        </div>
        <div class="bottom">
          <div class="img">
            <img src="../corp/corp.png" alt="">
          </div>
          <div class="corp-info">
            <a href="" target="_blank">郑州石水源教育科技有限公司</a>
            <p>文化/体育/娱乐业</p>
          </div>
          <i class="xffont font-shoucang"></i>
        </div>
      </div>
      <div class="item">
        <div class="top">
          <p>
            <a href="">产品经理</a>
            <span class="salary">5000-6999元</span>
          </p>
          <p>大学本科 / 15人 / 全职</p>
          <p>[ 2018-6-21 17:47:51 发布 ]</p>
        </div>
        <div class="bottom">
          <div class="img">
            <img src="../corp/corp.png" alt="">
          </div>
          <div class="corp-info">
            <a href="">郑州石水源教育科技有限公司</a>
            <p>文化/体育/娱乐业</p>
          </div>
          <i class="xffont font-shoucang"></i>
        </div>
      </div>
      <div class="item">
        <div class="top">
          <p>
            <a href="">产品经理</a>
            <span class="salary">5000-6999元</span>
          </p>
          <p>大学本科 / 15人 / 全职</p>
          <p>[ 2018-6-21 17:47:51 发布 ]</p>
        </div>
        <div class="bottom">
          <div class="img">
            <img src="../corp/corp.png" alt="">
          </div>
          <div class="corp-info">
            <a href="">郑州石水源教育科技有限公司</a>
            <p>文化/体育/娱乐业</p>
          </div>
          <i class="xffont font-shoucang"></i>
        </div>
      </div>
      <div class="item">
        <div class="top">
          <p>
            <a href="" target="_blank">产品经理</a>
            <span class="salary">5000-6999元</span>
          </p>
          <p>大学本科 / 15人 / 全职</p>
          <p>[ 2018-6-21 17:47:51 发布 ]</p>
        </div>
        <div class="bottom">
          <div class="img">
            <img src="../corp/corp.png" alt="">
          </div>
          <div class="corp-info">
            <a href="" target="_blank">郑州石水源教育科技有限公司</a>
            <p>文化/体育/娱乐业</p>
          </div>
          <i class="xffont font-shoucang"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {echo} from '../../../../common/js/utils'

export default {
  data() {
    return {
      form: {
        bca112: '', // 关键字
        bca111Name: '', // 职位
        bca111: '',
        areaWrap: '', // 地区
        acb202: '', // 地区code
        acc034: '', // 薪水
        acc214: '', // 福利待遇
        acc217: '', // 工作经验
        acb21i: '', // 工作性质
        aac011: '', // 学历
        aab019: '', // 单位性质
        aab056: '', // 企业规模
        updateDates: '', // 更新时间
        rowsNum: 6,
        currentPage: 1
      },
      dictionaries: {
        TAB_SALARY: [], // 薪水
        TAB_WELFARE: [], // 福利
        TAB_WORKYEARS: [], // 工作经验
        TAB_NATURE: [], // 工作性质
        TAB_EDUCATION: [], // 学历
        TAB_CITY: [], // 地区
        CRAFT_AS: [], // 职位
        TAB_UNITNATURE: [], // 企业性质
        TAB_PSCALE: [] // 企业规模
      },
      showMore: false,
      bca111: [],
      acb202: [],
      aab056: []
    }
  },
  methods: {
    handleBcalll(e) {
      if (e && e.length) {
        this.form.bca111 = e[e.length - 1]
      } else {
        this.form.bca111 = ''
      }
    },
    handleAcb202(e) {
      if (e && e.length) {
        this.form.acb202 = e[e.length - 1]
      } else {
        this.form.acb202 = ''
      }
    },
    onSubmit() {
      this.form.aab056 = Array.slice.call(this.aab056).sort((a, b) => a - b).join(',')
      const form = Object.assign({}, this.form)
      form.bca112 = encodeURIComponent(form.bca112)
    },
    getDictionaries() { // 字典表
      this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_SALARY,TAB_WELFARE,TAB_WORKYEARS,TAB_NATURE,TAB_EDUCATION,TAB_CITY,CRAFT_AS,TAB_UNITNATURE,TAB_PSCALE'
      }).then(res => {
        res.result.CRAFT_AS = this.handleCascader(res.result.CRAFT_AS.children)
        res.result.TAB_CITY = this.handleCascader(res.result.TAB_CITY.children)
        this.dictionaries = {
          TAB_SALARY: res.result.TAB_SALARY, // 薪水
          TAB_WELFARE: res.result.TAB_WELFARE, // 福利
          TAB_WORKYEARS: res.result.TAB_WORKYEARS, // 工作经验
          TAB_NATURE: res.result.TAB_NATURE, // 工作性质
          TAB_EDUCATION: res.result.TAB_EDUCATION, // 学历
          TAB_CITY: res.result.TAB_CITY, // 地区
          CRAFT_AS: res.result.CRAFT_AS, // 职位
          TAB_UNITNATURE: res.result.TAB_UNITNATURE, // 企业性质
          TAB_PSCALE: res.result.TAB_PSCALE // 企业规模
        }
      })
    },
    handleCascader(arr) {
      return arr.map(item => {
        return {
          label: item.text,
          value: item.id,
          children: item.children && item.children.length ? item.children.map(item => {
            return {
              label: item.text,
              value: item.id
            }
          }) : null
        }
      })
    },
    onReset() {
      this.bca111 = []
      this.acb202 = []
      this.aab056 = []
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
      .el-form-item{
        margin-bottom: 0;
      }
      .search-tit{
        background: #f8f8f8;
        padding: 15px 10px;
        border-top: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        .el-input{
          width: 255px;
        }
        .el-select,.el-cascader{
          width: 150px;
        }
        .more-rotate{
          transform: rotate(180deg);
        }
      }
      .search-more{
        padding: 15px 10px;
        border-bottom: 1px solid #ebebeb;
        .el-select{
          width: 170px;
        }
        .demo-form-inline{
          &:not(:last-child){
            margin: 0 0 15px 0;
          }
          &:nth-child(2){
            margin: 0 0 0 68px;
          }
        }
      }
    }
    .list{
      @include clearFixed;
      padding: 15px 0 0 0;
      .item{
        display: block;
        float: left;
        width: 395px;
        height: 176px;
        margin-bottom: 15px;
        overflow: hidden;
        border: 1px solid #ebebeb;
        &:nth-child(2n-1){
          margin-right: 15px;
        }
        .top{
          height: 103px;
          margin: 0 10px;
          padding: 15px 0;
          border-bottom: 1px dashed #ebebeb;
          .salary{
            display: inline-block;
            width: 30%;
            text-align: right;
            color: #f26b01;
          }
          a{
            @include ellipsis;
            font-size: 16px;
            display: inline-block;
            width: 70%;
          }
          p{
            white-space: nowrap;
            font-size: 14px;
            color: #666;
            &:not(:first-child){
              margin: 5px 0 0 0;
            }
          }
        }
        .bottom{
          position: relative;
          padding: 16px 15px;
          @include clearFixed;
          .img{
            width: 40px;
            height: 40px;
            float: left;
            img{
              width: 100%;
            }
          }
          .corp-info{
            width: 310px;
            float: right;
            a{
              display: inline-block;
              width: 100%;
              @include ellipsis;
              font-size: 14px;
            }
            p{
              font-size: 14px;
              color: #666;
            }
          }
          .xffont{
            position: absolute;
            right: 18px;
            bottom: 18px;
            font-size: 22px;
            &:hover{
              cursor: pointer;
              color: #f26b01;
            }
          }
          .font-shoucang1{
            color: #f26b01;
          }
        }
      }
    }
  }
</style>
