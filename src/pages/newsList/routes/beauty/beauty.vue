<!--美丽河南图片展示页面-->
<template>
  <div class="beauty">
    <div class="list">
      <div class="item" v-for="val in list" :key="val.caoa01">
        <el-card>
          <div class="img">
            <img :src="val.caoa02" onload="handleBeauty(event)" v-img="val.caoa02">
          </div>
          <div class="con-box">
            <span class="con">{{val.caoa03}}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    getList() {
      this.$post('/service/business/fm/pic/picInfo/getPicList', {
        caoa04: 130,
        rowsNum: 12
      }).then(res => {
        this.list = res.result
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .list{
    @include clearFixed;
    .item{
      width: 276px;
      float: left;
      overflow: hidden;
      margin: 10px 0 10px 10px;
      .img{
        width: 238px;
        height: 200px;
        overflow: hidden;
      }
    }
  }
  .con{
    font-size: 14px;
    color: #666;
  }
  .con-box{
    height: 255px;
    overflow: hidden;
  }
</style>
