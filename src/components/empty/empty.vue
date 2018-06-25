<template>
  <div class="xf-empty">
    <img src="./empty.png">
    <p>{{value}}</p>
  </div>
</template>
<script>
export default {
  name: 'empty',
  props: {
    value: {
      type: String,
      default: '暂无数据~'
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .xf-empty{
    padding: 20px 0 0 0;
    text-align: center;
    p{
      padding: 10px 0 0 0;
      font-size: 14px;
      color: #666;
    }
  }
</style>
