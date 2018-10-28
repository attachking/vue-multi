<template>
  <div class="count-down" v-if="show">
    <span class="text">距离大会开幕还有：</span>
    <span class="item" ref="day1"></span>
    <span class="item" ref="day2"></span>
    <span class="text">天</span>
    <span class="item" ref="hour1"></span>
    <span class="item" ref="hour2"></span>
    <span class="text">小时</span>
    <span class="item" ref="mini1"></span>
    <span class="item" ref="mini2"></span>
    <span class="text">分</span>
    <span class="item" ref="sec1"></span>
    <span class="item" ref="sec2"></span>
    <span class="text">秒</span>
  </div>
</template>
<script>

export default {
  name: 'count-down',
  data() {
    return {
      show: false
    }
  },
  methods: {
    change(dom, num) {
      dom.style.background = `url("./static/assets/num/${num}.png") no-repeat center center`
    },
    getTime() {
      let target = new Date('2018/10/27 09:00')
      let now = new Date()
      let c = target.getTime() - now.getTime()
      if (c < 0) {
        c = 0
        this.show = false
        clearInterval(this.timer)
        return
      }
      this.show = true
      if (!this.$refs.day1) return
      let day = Math.floor(c / (1000 * 60 * 60 * 24)) + ''
      c -= day * 1000 * 60 * 60 * 24
      let hour = Math.floor(c / (1000 * 60 * 60)) + ''
      c -= hour * 1000 * 60 * 60
      let min = Math.floor(c / (1000 * 60)) + ''
      c -= min * 1000 * 60
      let sec = Math.floor(c / 1000) + ''
      day.length < 2 && (day = '0' + day)
      hour.length < 2 && (hour = '0' + hour)
      min.length < 2 && (min = '0' + min)
      sec.length < 2 && (sec = '0' + sec)
      this.change(this.$refs.day1, day.substr(0, 1))
      this.change(this.$refs.day2, day.substr(1))
      this.change(this.$refs.hour1, hour.substr(0, 1))
      this.change(this.$refs.hour2, hour.substr(1))
      this.change(this.$refs.mini1, min.substr(0, 1))
      this.change(this.$refs.mini2, min.substr(1))
      this.change(this.$refs.sec1, sec.substr(0, 1))
      this.change(this.$refs.sec2, sec.substr(1))
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.getTime()
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .count-down{
    text-align: center;
  }
  .ani{
    transition: background .2s ease;
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
  }
  .item{
    width: 50px;
    height: 50px;
    display: inline-block;
    background-size: auto 100%;
    vertical-align: middle;
  }
</style>
