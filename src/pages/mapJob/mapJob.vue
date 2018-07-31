<!--个人求职河南地图-->
<template>
  <div>
    <xf-header></xf-header>
    <div class="module">
      <div class="map">
        <div class="henan" ref="map"></div>
      </div>
    </div>
    <right-menu></right-menu>
    <xf-footer></xf-footer>
  </div>
</template>
<script>
import echarts from 'echarts'
import henan from '../newsList/routes/map/henan'
import XfHeader from '../../components/xf-header/xf-header.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'

export default {
  components: {
    XfFooter,
    RightMenu,
    XfHeader},
  data() {
    return {}
  },
  methods: {
    inintMap() {
      this.chart = echarts.init(this.$refs.map)
      echarts.registerMap('henan', henan)
      this.chart.setOption({
        title: {
          text: '个人求职-中国·河南招才引智创新发展大会',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter(params) {
            return params.name
          }
        },
        /*
        visualMap: {
          min: 0,
          max: 100,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true
        },
        */
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          type: 'map',
          mapType: 'henan',
          center: [113.665412, 34.107999],
          zoom: 0.95,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#389BB7',
              areaColor: '#74cce9'
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          },
          animation: false,
          data: [
            {name: '郑州市', id: 1675},
            {name: '洛阳市', id: 1701},
            {name: '开封市', id: 1689},
            {name: '信阳市', id: 1831},
            {name: '驻马店市', id: 1855},
            {name: '南阳市', id: 1805},
            {name: '周口市', id: 1843},
            {name: '许昌市', id: 1783},
            {name: '平顶山市', id: 1718},
            {name: '新乡市', id: 1748},
            {name: '漯河市', id: 1791},
            {name: '商丘市', id: 1820},
            {name: '三门峡市', id: 1797},
            {name: '济源市', id: 1772},
            {name: '焦作市', id: 1762},
            {name: '安阳市', id: 1730},
            {name: '鹤壁市', id: 1741},
            {name: '濮阳市', id: 1775}
          ]
        }]
      })
      this.chart.on('click', params => {
        location.href = `newsList.html#/job?channel_code=GWTJ&acb202=${params.data.id}`
      })
    }
  },
  mounted() {
    this.inintMap()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .map{
    width: 1200px;
    background: #fff;
    border-radius: 5px;
    margin: 0 auto;
  }
  .henan{
    height: 750px;
    padding: 20px 0;
  }
  .module{
    min-height: 640px;
    padding: 50px 0;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
