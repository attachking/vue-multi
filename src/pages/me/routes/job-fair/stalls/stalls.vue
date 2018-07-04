<template>
  <div class="stalls">
    <div class="title">
      <p>{{jobFairName}}</p>
      <div class="tip">
        <span class="unused bg"></span>
        <span class="text">未预定</span>
        <span class="temped bg"></span>
        <span class="text">预占中</span>
        <span class="reserved bg"></span>
        <span class="text">已预定</span>
      </div>
    </div>
    <div class="list">
      <el-popover
        v-for="val in list"
        :key="val.ace200"
        placement="bottom"
        :title="Number(val.cczy05) === 4 ? '已预定' : '已预占'"
        width="200"
        :disabled="!val.cczy05"
        trigger="hover">
        <span>单位：<a :href="'corp.html?aab001=' + val.aab001" target="_blank">{{val.aab004}}</a></span>
        <span
          slot="reference"
          class="stall"
          @click="confirmBook(val)"
          :class="Number(val.cczy05) === 4 ? 'reserved' : Number(val.cczy05) === 3 ? 'temped' : 'unused'"
        >{{val.ace201}}</span>
      </el-popover>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      jobFairName: ''
    }
  },
  methods: {
    getList() {
      this.$post('/service/business/jobfair/jobFairInfo/getBoothBookInfo.xf', {
        acb330: this.$route.query.acb330,
        cczy05: 0
      }).then(res => {
        this.list = res.result
      })
    },
    book(ace200) {
      this.$post('/service/business/jobfair/jobFairInfo/boothBookJobFair.xf', {
        ace200,
        aab001: this.$userInfo.aab001
      }).then(res => {
        if (res.error && res.error.result === 1) {
          this.$alert(`${res.error.message}`, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.replace({
                name: 'reserved'
              })
            }
          })
        }
      })
    },
    confirmBook(val) {
      if (val.cczy05) return
      this.$confirm(`确定预定摊位号 ${val.ace201} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.book(val.ace200)
      })
    }
  },
  created() {
    this.getList()
    this.jobFairName = decodeURIComponent(this.$route.query.acb331)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .title{
    @include ellipsis;
    margin: 20px 0 30px 0;
    p{
      color: $--color-primary;
      font-size: 16px;
      display: inline-block;
      padding: 10px 10px;
      border-bottom: 1px solid $--color-primary;
    }
    .tip{
      width: 345px;
      padding: 15px 0;
      text-align: center;
      border: 1px solid #ebebeb;
      border-radius: 3px;
      float: right;
      .bg{
        display: inline-block;
        width: 30px;
        height: 15px;
        border-radius: 3px;
      }
      .text{
        display: inline-block;
        padding: 0 5px 0 0;
      }
      span{
        vertical-align: middle;
      }
    }
  }
  .stall{
    width: 52px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    display: inline-block;
    margin: 0 10px 10px 0;
    border-radius: 3px;
    &:hover{
      cursor: pointer;
    }
  }
  .unused{
    background: #e7e7e7;
    color: #333;
  }
  .temped{
    background: #67c23a;
    color: #fff;
  }
  .reserved{
    background: $--color-primary;
    color: #fff;
  }
</style>
