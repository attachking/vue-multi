<!--大会报名成功-->
<template>
  <div class="success">
    <p>
      <i class="el-icon-success"></i>
      <span>恭喜您，报名成功 ！</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'sign-success'
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .success{
    padding: 50px 0;
    color: #67c23a;
    text-align: center;
    i{
      font-size: 30px;
      vertical-align: middle;
    }
    span{
      font-size: 26px;
      vertical-align: middle;
    }
  }
</style>
