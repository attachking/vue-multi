<template>
  <div class="corp">
    <div class="search">
      <div class="search-tit">
        <el-form inline :model="form" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="form.bca112" placeholder="请输入岗位名称/单位名称" @keydown.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item>
            <xf-cascader
              clearable
              change-on-select
              filterable
              :options="dictionaries.CRAFT_AS"
              placeholder="请选择岗位类别"
              v-model="form.bca111"
            ></xf-cascader>
          </el-form-item>
          <el-form-item>
            <xf-cascader
              clearable
              change-on-select
              filterable
              :options="dictionaries.TAB_CITY"
              placeholder="请选择地区"
              v-model="form.acb202">
            </xf-cascader>
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
              <el-select v-model="acc214" clearable collapse-tags multiple placeholder="福利待遇">
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
    <div class="list" ref="list" v-loading="loading">
      <div>
        <div class="item" v-for="val in list" :key="val.acb210">
          <div class="top">
            <p>
              <a :href="'job.html?acb210=' + val.acb210" target="_blank" :title="val.cca113">{{val.cca113}} <i class="xffont font-tubiao- red" title="重点推荐" v-if="Number(val.acb21z) === 3"></i></a>
              <span class="salary">{{val.acc034Name}}</span>
            </p>
            <p>{{val.aac012 || '--'}} / {{val.acb21r || 0}}人 / {{val.acb21iName || '--'}}</p>
            <p>[ {{$dateFormat(val.ccpr05, 'yyyy-MM-dd hh:mm:ss')}} 发布 ]</p>
          </div>
          <div class="bottom">
            <div class="img">
              <img :src="val.ccmu15" alt="">
            </div>
            <div class="corp-info">
              <a :href="'corp.html?aab001=' + val.aab001" target="_blank">{{val.aab004}}</a>
              <p>
                <span>{{val.bcb202 || '--'}}</span>
              </p>
            </div>
            <div class="edit">
              <i class="xffont" v-if="ccmu17 !== 2" @click="collectSingle(val)" :class="Number(val.is_Collection) === 0 ? 'font-shoucang' : 'font-shoucang1'" :title="Number(val.is_Collection) === 0 ? '收藏' : '已收藏'"></i>
              <i class="xffont font-send" v-if="ccmu17 !== 2" :class="Number(val.is_Resume) > 0 ? 'active' : ''" @click="handleResume(val)" :title="Number(val.is_Resume) > 0 ? '已投递简历' : '投递简历'"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <empty v-if="pageBean.totalCount === 0"></empty>
    <div class="page" v-if="pageBean.totalCount > 0">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
  </div>
</template>
<script>
import {echo, handleCity} from '../../../../common/js/utils'
import event from '../../../../common/js/event'
import Pagination from '../../../../components/pagination/pagination.vue'
import Empty from '../../../../components/empty/empty.vue'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'

export default {
  components: {
    XfCascader,
    Empty,
    Pagination},
  name: 'job-search',
  data() {
    return {
      ccmu17: this.$userInfo.ccmu17,
      form: {
        bca112: '', // 关键字
        bca111Name: '', // 岗位
        bca111: '',
        areaWrap: '', // 地区
        acb202: this.$route.query.acb202 || '', // 地区code
        acc034: '', // 薪水
        acc214: '', // 福利待遇
        acc217: '', // 工作经验
        acb21i: '', // 工作性质
        aac011: '', // 学历
        aab019: '', // 单位性质
        aab056: '', // 单位规模
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
        CRAFT_AS: [], // 岗位
        TAB_UNITNATURE: [], // 单位性质
        TAB_PSCALE: [] // 单位规模
      },
      showMore: false,
      bca111: [],
      acb202: [],
      acc214: [],
      pageBean: {},
      list: [],
      loading: false
    }
  },
  methods: {
    handlePage(page) {
      this.form.currentPage = page
      this.getList()
    },
    onSubmit() {
      this.form.currentPage = 1
      this.getList()
    },
    getList() {
      this.form.acc214 = Array.prototype.slice.call(this.acc214).sort((a, b) => a - b).join(',')
      const form = Object.assign({
        aac001: this.$userInfo.aac001,
        ccmu17: this.$userInfo.ccmu17
      }, this.form)
      form.bca112 = encodeURIComponent(form.bca112)
      this.loading = true
      this.$post('/service/business/corp/newPosition/queryPositionList.xf', form).then(res => {
        this.loading = false
        this.pageBean = res.pageBean
        this.list = res.result
      }).catch(() => {
        this.loading = false
      })
    },
    getDictionaries() { // 字典表
      this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_SALARY,TAB_WELFARE,TAB_WORKYEARS,TAB_NATURE,TAB_EDUCATION,TAB_CITY,CRAFT_AS,TAB_UNITNATURE,TAB_PSCALE'
      }).then(res => {
        res.result.CRAFT_AS = handleCity(res.result.CRAFT_AS.children)
        res.result.TAB_CITY = handleCity(res.result.TAB_CITY.children)
        this.dictionaries = {
          TAB_SALARY: res.result.TAB_SALARY, // 薪水
          TAB_WELFARE: res.result.TAB_WELFARE, // 福利
          TAB_WORKYEARS: res.result.TAB_WORKYEARS, // 工作经验
          TAB_NATURE: res.result.TAB_NATURE, // 工作性质
          TAB_EDUCATION: res.result.TAB_EDUCATION, // 学历
          TAB_CITY: res.result.TAB_CITY, // 地区
          CRAFT_AS: res.result.CRAFT_AS, // 岗位
          TAB_UNITNATURE: res.result.TAB_UNITNATURE, // 单位性质
          TAB_PSCALE: res.result.TAB_PSCALE // 单位规模
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
      this.acc214 = []
      echo(this.form)
    },
    collectSingle(val) {
      if (Number(val.is_Collection) === 0) {
        this.collect(val.acb210)
      } else {
        this.delCollect(val.acb210)
      }
    },
    collect(acb210) {
      if (!this.$userInfo.status) {
        event.$emit('login')
        return
      }
      this.loading = true
      this.$post('/service/business/person/positionTalent/saveTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    delCollect(acb210) {
      this.loading = true
      this.$post('/service/business/person/positionTalent/delTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleResume(val) {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (this.$userInfo.ccmu17 === 2) {
        this.$message({
          message: '只有求职者可以收藏岗位',
          type: 'warning'
        })
        return
      }
      if (Number(val.is_Resume) > 0) {
        this.$message({
          message: '您已经投递过该单位的该岗位',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定向该单位投递简历?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.sendResume(val.acb210)
      })
    },
    sendResume(acb210) {
      this.loading = true
      this.$post('/service/business/person/personSendResume/savePositionApplyInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.getDictionaries()
    this.onSubmit()
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
      overflow: hidden;
      .item{
        display: block;
        width: 49%;
        height: 176px;
        margin-bottom: 15px;
        overflow: hidden;
        border: 1px solid #ebebeb;
        &:hover{
          border-color: $--color-primary;
        }
        &:nth-child(2n-1){
          float: left;
        }
        &:nth-child(2n){
          float: right;
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
            width: 340px;
            float: left;
            padding: 0 0 0 15px;
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
          .edit{
            position: absolute;
            right: 18px;
            bottom: 18px;
            .xffont{
              font-size: 22px;
              &:hover{
                cursor: pointer;
                color: #f26b01;
              }
            }
            .active{
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
  .page{
    margin: 10px 0;
    text-align: center;
  }
  .red{
    color: red;
    font-size: 18px;
    font-weight: bold;
  }
</style>
