<template>
  <div class="corp">
    <div class="job-list" v-loading="loading">
      <div class="item" v-for="val in list" :key="val.beNoticeUserId">
        <el-checkbox v-model="checked" class="checkbox" :label="val.beNoticeUserId"></el-checkbox>
        <div class="logo">
          <img :src="val.ccmu15" alt="">
        </div>
        <div class="pos-info">
          <p>
            <a :href="'corp.html?aab001=' + val.beNoticeUserId" target="_blank" class="pos-name">{{val.aab004 || '--'}}</a>
          </p>
          <p class="pos-detail">
            <span>
              <span>行业：{{val.ccpr10Name || '--'}}</span>&nbsp;|&nbsp;
              <span>地址：{{val.aaa021 || '--'}} 人</span>&nbsp;|&nbsp;
              <span>性质：{{val.aab019Name || '--'}}</span>&nbsp;|&nbsp;
              <span>规模：{{val.aab056Name || '--'}}</span>
            </span>
          </p>
        </div>
        <div class="job-control">
          <i class="xffont font-shoucang1" @click="delSingle(val)" title="取消收藏"></i>
        </div>
      </div>
    </div>
    <empty v-if="pageBean.totalCount === 0"></empty>
    <div class="checkAll" v-if="list.length">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
      <el-button size="mini" @click="delAll">取消收藏</el-button>
    </div>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/pagination.vue'
import Empty from '../../../../../components/empty/empty.vue'

export default {
  components: {
    Empty,
    Pagination},
  data() {
    return {
      searchData: {
        rowsNum: 5,
        aac001: this.$userInfo.aac001,
        currentPage: 1
      },
      loading: false,
      list: [],
      pageBean: {},
      isIndeterminate: false,
      checked: [],
      checkAll: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/person/personTalent/getTalentCorpList.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result || []
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    delAll() {
      if (!this.checked.length) return
      this.$confirm('确认投递?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(this.checked.join(','))
      })
    },
    delSingle(val) {
      this.del(val.beNoticeUserId)
    },
    del(aab001) {
      this.$post('/service/business/person/personTalent/delTalentCorpInfo', {
        aab001,
        aac001: this.$userInfo.aac001
      }).then(res => {
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    handleCheckAllChange(e) {
      if (e) {
        this.checked = this.list.map(item => item.beNoticeUserId)
      } else {
        this.checked = []
      }
    }
  },
  created() {
    this.getList()
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
  @import "../../../../../common/style/variables";
  .page{
    padding: 15px 0;
    text-align: center;
  }
  .checkAll{
    padding: 15px 0;
  }
</style>
