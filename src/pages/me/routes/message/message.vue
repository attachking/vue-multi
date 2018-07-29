<template>
  <div class="message">
    <div class="card-tit">
      <span class="item active"><i class="xffont font-xiaoxi"></i>我的消息</span>
    </div>
    <div ref="list">
      <div class="list">
        <el-checkbox-group v-model="selections" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="val in list" :key="val.ccmc01" :label="val.ccmc01"></el-checkbox>
        </el-checkbox-group>
        <div class="item" v-for="(val, key) in list" :key="key">
          <a class="title" :class="Number(val.ccmc05) === 0 ? 'unread' : ''" href="javascript:;" @click="show(val)">{{val.ccmc03}}</a>
          <p>{{val.ccmc04}}</p>
        </div>
      </div>
      <empty v-if="pageBean.totalCount === 0"></empty>
      <div class="edit" v-if="pageBean.totalCount > 0">
        <el-checkbox class="all" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
        <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" size="mini" class="btn" @click="delConfirm">删除</el-button>
        <el-button type="text" size="mini" class="btn" @click="signAll">标记为已读</el-button>
      </div>
      <div class="page">
        <pagination :bean="pageBean" @current-change="handlePage"></pagination>
      </div>
    </div>
    <el-dialog
      title="消息详情"
      :visible.sync="dialogVisible"
      width="500px">
      <span>{{message}}</span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '../../../../components/pagination/pagination.vue'
import Empty from '../../../../components/empty/empty.vue'
import event from '../../../../common/js/event'

export default {
  components: {
    Empty,
    Pagination},
  data() {
    return {
      searchData: {
        ccmu01: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        ccmc17: this.$userInfo.ccmu17,
        rowsNum: 5,
        currentPage: 1,
        aab001: this.$userInfo.aab001,
        aac001: this.$userInfo.aac001
      },
      message: '',
      list: [],
      checkAll: false,
      selections: [],
      isIndeterminate: false,
      dialogVisible: false,
      pageBean: {}
    }
  },
  methods: {
    getList() {
      const loading = this.$loading({
        target: this.$refs.list,
        fullscreen: false
      })
      this.$post('/service/business/corp/corpNotice/getNoticeList', this.searchData).then(res => {
        loading.close()
        this.pageBean = res.pageBean
        this.list = res.result
        this.resetCheck()
      }).catch(() => {
        loading.close()
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    handleCheckAllChange(val) {
      this.selections = val ? this.list.map(item => item.ccmc01) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
    },
    resetCheck() {
      this.selections = []
      this.isIndeterminate = false
      this.checkAll = false
    },
    sign(ccmc01, tip) {
      let url = ''
      if (this.$userInfo.ccmu17 === 1) {
        url = '/service/business/corp/corpNotice/noticeEdit.xf'
      } else {
        url = '/service/business/corp/corpNotice/updateNotice'
      }
      this.$post(url, {
        ccmu01: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        ccmc17: this.$userInfo.ccmu17,
        ccmc01
      }).then(res => {
        if (res.error && res.error.result === 1) {
          if (tip) {
            this.$message({
              message: res.error.message,
              type: 'success'
            })
          }
          event.$emit('refresh')
          this.getList()
        }
      })
    },
    signAll() {
      if (!this.selections.length) {
        this.$message({
          message: '没有选中任何消息',
          type: 'warning'
        })
        return
      }
      this.sign(this.selections.join(','), true)
    },
    delConfirm() {
      if (!this.selections.length) {
        this.$message({
          message: '没有选中任何消息',
          type: 'warning'
        })
        return
      }
      this.$confirm('此操作将永久删除消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(this.selections.join(','))
      })
    },
    del(ccmc01) {
      this.$post('/service/business/corp/corpNotice/noticeDel.xf', {
        ccmu01: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        ccmc17: this.$userInfo.ccmu17,
        ccmc01
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
    show(val) {
      this.message = val.ccmc03
      this.dialogVisible = true
      this.sign(val.ccmc01)
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .message{
    padding: 20px 20px;
  }
  .list{
    position: relative;
    .el-checkbox-group{
      overflow: hidden;
      width: 18px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .el-checkbox{
      margin: 10px 0 0 0;
      &:first-child{
        margin: 37px 0 0 0;
      }
      &:not(:first-child){
        margin: 70px 0 0 0;
      }
    }
    .item{
      padding: 20px 15px 20px 30px;
      &:not(:first-child),&:not(:last-child){
        border-bottom: 1px solid #ebebeb;
      }
      &:hover{
        background: #f3f3f3;
      }
      p{
        padding: 6px 0 0 0;
        color: #666;
        font-size: 14px;
      }
      .title{
        font-size: 16px;
        display: inline-block;
        width: 100%;
        @include ellipsis;
      }
      .unread{
        position: relative;
        padding-left: 8px;
        &:before{
          display: block;
          content: '';
          width: 5px;
          height: 5px;
          position: absolute;
          border-radius: 50%;
          left: 0;
          top: 0;
          background: red;
        }
      }
    }
  }
  .edit{
    padding: 15px 0;
    @include clearFixed;
    .btn{
      margin: 0 10px 0 0;
    }
  }
  .page{
    margin: 10px 0;
    text-align: center;
  }
</style>
