<template>
  <div class="talent">
    <div class="card-tit">
      <span class="item active"><i class="xffont font-search"></i>人才搜索</span>
    </div>
    <div class="search">
      <div class="search-tit">
        <el-form inline class="demo-form-inline">
          <el-form-item>
            <el-input v-model="searchData.keyword" placeholder="请输入关键字" @keydown.enter="onSubmit"></el-input>
          </el-form-item>
          <el-form-item>
            <xf-cascader :options="dictionaries.tab_major_type" v-model="searchData.bcc01g" placeholder="请选择专业类别" clearable></xf-cascader>
          </el-form-item>
          <el-form-item>
            <xf-cascader change-on-select :options="dictionaries.TAB_CITY" v-model="searchData.acb202" placeholder="请选择意向地区" clearable></xf-cascader>
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
          <el-form inline class="demo-form-inline">
            <el-form-item label="更多筛选">
              <el-select v-model="searchData.acc034" clearable placeholder="薪资待遇">
                <el-option
                  v-for="item in dictionaries.TAB_SALARY"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="searchData.aac011" clearable placeholder="学历要求">
                <el-option
                  v-for="item in dictionaries.TAB_EDUCATION"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchData.acb21i" clearable placeholder="工作性质">
                <el-option
                  v-for="item in dictionaries.TAB_NATURE"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
    <div class="job-list" v-loading="loading">
      <div class="item" v-for="val in list" :key="val.aac001">
        <el-checkbox v-model="checked" class="checkbox" :label="val.aac001"></el-checkbox>
        <div class="logo">
          <img :src="val.ccmu15" alt="">
        </div>
        <div class="pos-info">
          <p>
            <a href="" class="pos-name" target="_blank">{{val.aac003 || '--'}}</a>
            <span class="corp-name">{{val.aac004name || '--'}} | {{val.acb223name || '--'}} | {{val.aac011name || '--'}}</span>
            <span class="salary">{{val.acc034name || '--'}}</span>
          </p>
          <p class="pos-detail">
              <span>
                <span>求职意向：{{val.bca112 || '--'}}</span>&nbsp;|&nbsp;
                <span>期待工作地点：{{val.bcb202 || '--'}} 人</span>&nbsp;|&nbsp;
                <span>专业：{{val.bcc01g || '--'}}</span>
              </span>
            <span class="date">{{$dateFormat(val.ccpr05, 'yyyy-MM-dd')}}</span>
          </p>
        </div>
        <div class="job-control">
          <i class="xffont"
             :class="Number(val.is_Collection) > 0 ? 'font-shoucang1' : 'font-shoucang'"
             @click="collectSingle(val)"
             :title="Number(val.is_Collection) > 0 ? '已收藏' : '收藏'"></i>
          <i class="xffont font-yaoqingchengyuan" :class="Number(val.is_Resume) > 0 ? 'active' : ''" @click="confirmInvite(val)" :title="Number(val.is_Resume) > 0 ? '已邀请过该用户' : '面试邀请'"></i>
        </div>
      </div>
    </div>
    <empty v-if="pageBean.totalCount === 0"></empty>
    <div class="checkAll" v-if="list.length">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
      <el-button type="primary" size="mini" @click="inviteAll" style="margin-left: 10px;">面试邀请</el-button>
      <el-button type="warning" size="mini" @click="collectAll">收藏</el-button>
    </div>
    <div class="page" v-if="pageBean.totalCount > 0">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
    <xf-invitation ref="invitation"></xf-invitation>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Pagination from '../../../../components/pagination/pagination.vue'
import Empty from '../../../../components/empty/empty.vue'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'
import {echo} from '../../../../common/js/utils'
import XfInvitation from '../../../../components/xf-invitation/xf-invitation.vue'

export default {
  components: {
    XfInvitation,
    XfCascader,
    Empty,
    Pagination},
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  data() {
    return {
      list: [],
      pageBean: {},
      searchData: {
        rowsNum: 5,
        currentPage: 1,
        aab001: this.$userInfo.aab001,
        keyword: '', // 关键字
        bcc01g: '', // 专业
        acb202: '', // 意向地区
        acc034: '', // 薪资
        aac011: '', // 学历
        acb21i: '' // 工作性质
      },
      showMore: false,
      loading: false,
      checked: [],
      isIndeterminate: false,
      checkAll: false
    }
  },
  methods: {
    onSubmit() {
      this.searchData.currentPage = 1
      this.getList()
    },
    getList() {
      this.loading = true
      this.$post('/service/business/search/stuApplyJob/seachPersonnel.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    onReset() {
      echo(this.searchData)
    },
    collectSingle(val) {
      if (Number(val.is_Collection) > 0) {
        this.del(val.ccpg01)
      } else {
        this.collect(val.aac001)
      }
    },
    confirmInvite(val) {
      this.$refs.invitation.show(val.aac001).then(() => {
        this.getList()
      }).catch(() => {
        console.log('close')
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    collect(aac001) {
      this.loading = true
      this.$post('/service/business/corpResume/corpTalentCollection/corpTalentSave.xf', {
        aac001,
        aab001: this.$userInfo.aab001
      }).then(res => {
        this.loading = false
        if (res.result && res.result.result === 1) {
          this.$message({
            message: res.result.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    del(ccpg01) {
      this.loading = true
      this.$post('/service/business/corpResume/corpTalentCollection/delTalentInfo.xf', {ccpg01}).then(res => {
        this.loading = false
        if (res.result && res.result.result === 1) {
          this.$message({
            message: res.result.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    inviteAll() {
      if (!this.checked.length) return
      this.confirmInvite(this.checked.join(','))
    },
    collectAll() {
      if (!this.checked.length) return
      this.collect(this.checked.join(','))
    },
    handleCheckAllChange(e) {
      if (e) {
        this.checked = this.list.map(item => item.aac001)
      } else {
        this.checked = []
      }
    }
  },
  created() {
    this.onSubmit()
    this.$watch('checked', (newVal, oldVal) => {
      if (newVal.length >= this.list.length) {
        this.checkAll = true
      } else if (newVal.length > 0) {
        this.isIndeterminate = true
      } else {
        this.isIndeterminate = false
        this.checkAll = false
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .talent{
    padding: 20px 20px;
  }
  .search{
    .el-form-item{
      margin-bottom: 0;
    }
    .search-tit{
      padding: 15px 10px;
      border-bottom: 1px solid #ebebeb;
      .el-input{
        width: 280px;
      }
      .el-select,.el-cascader{
        width: 180px;
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
  .page{
    padding: 15px 0;
    text-align: center;
  }
  .checkAll{
    padding: 15px 0;
  }
</style>
