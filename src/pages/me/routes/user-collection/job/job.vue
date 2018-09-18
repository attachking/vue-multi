<!--个人中心我的收藏 岗位-->
<template>
  <div class="job">
    <div class="job-list" v-loading="loading">
      <div class="item" v-for="val in list" :key="val.acb210">
        <el-checkbox v-model="checked" class="checkbox" :label="val.acb210"></el-checkbox>
        <div class="logo">
          <img :src="val.ccmu15" alt="">
        </div>
        <div class="pos-info">
          <p>
            <a :href="'job.html?acb210=' + val.acb210" class="pos-name" target="_blank">{{val.cca113 || '--'}}</a>
            <a :href="'corp.html?aab001=' + val.aab001" class="corp-name" target="_blank">{{val.aab004 || '--'}}</a>
            <span class="salary">{{val.acc034name || '--'}}</span>
          </p>
          <p class="pos-detail">
              <span>
                <span>地点：{{val.bcb202 || '--'}}</span>&nbsp;|&nbsp;
                <span>招聘人数：{{val.acb21r ? val.acb21r + '人' : '若干'}} </span>&nbsp;|&nbsp;
                <span>经验：{{val.acc218 || '--'}}</span>&nbsp;|&nbsp;
                <span>学历：{{val.aac012 || '--'}}</span>&nbsp;|&nbsp;
                <span>工作性质：{{val.acb21iName || '--'}}</span>
              </span>
            <span class="date">{{$dateFormat(val.ccpf02, 'yyyy-MM-dd')}}</span>
          </p>
        </div>
        <div class="job-control">
          <i class="xffont font-shoucang1" @click="delSingle(val)" title="取消收藏"></i>
          <i class="xffont font-send" :class="Number(val.noResume) > 0 ? 'active' : ''" @click="confirmSend(val)" :title="Number(val.noResume) > 0 ? '已投递简历' : '投递简历'"></i>
        </div>
      </div>
    </div>
    <empty v-if="pageBean.totalCount === 0"></empty>
    <div class="checkAll" v-if="list.length">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
      <el-button type="primary" size="mini" @click="confirmSend(0)" style="margin-left: 10px;">投递简历</el-button>
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
      checked: [],
      loading: false,
      list: [],
      pageBean: {},
      searchData: {
        aac001: this.$userInfo.aac001,
        rowsNum: 6,
        currentPage: 1
      },
      checkAll: false,
      isIndeterminate: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/person/positionTalent/getTalentPositionList.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
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
    delSingle(val) {
      this.delCollect(val.acb210)
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
    },
    confirmSend(val) {
      if (!this.checked.length && !val) {
        this.$message({
          message: '没有选取任何选项',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定向该单位投递简历?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (val) {
          if (Number(val.noResume) === 0) {
            this.sendResume(val.acb210)
          }
        } else {
          let arr = []
          this.checked.forEach(item => {
            let index = this.list.findIndex(val => val.acb210 === item)
            if (Number(this.list[index].noResume) === 0) {
              arr.push(item)
            }
          })
          if (arr.length) {
            this.sendResume(arr.join(','))
          } else {
            this.$message({
              message: '您已经投递过该单位的该岗位',
              type: 'warning'
            })
          }
        }
      })
    },
    delAll() {
      if (!this.checked.length) {
        this.$message({
          message: '没有选取任何选项',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认取消收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delCollect(this.checked.join(','))
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    handleCheckAllChange(e) {
      if (e) {
        this.checked = this.list.map(item => item.acb210)
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
