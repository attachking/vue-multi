<template>
  <div>
    <xf-header></xf-header>
    <div class="map">
      <div class="map-con">
        <div class="search">
          <div class="search-tit">
            <el-form inline :model="form" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="form.bca112" placeholder="请输入单位名称/关键字" @keydown.native.enter="onSubmit"></el-input>
              </el-form-item>
              <el-form-item>
                <xf-cascader
                  v-model="form.bca111"
                  change-on-select
                  placeholder="请选择职位类别"
                  filterable
                  clearable
                  :options="dictionaries.CRAFT_AS"
                ></xf-cascader>
              </el-form-item>
              <el-form-item>
                <xf-cascader
                  v-model="form.acb202"
                  change-on-select
                  placeholder="请选择地区"
                  filterable
                  clearable
                  :options="dictionaries.TAB_CITY"
                ></xf-cascader>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">搜索</el-button>
                <el-button type="default" size="mini" icon="el-icon-refresh" @click="onReset">重置</el-button>
              </el-form-item>
              <el-form-item>
                <a href="javascript:;" @click="showMore = !showMore">更多<i class="el-icon-arrow-down"
                                                                          :class="showMore ? 'more-rotate' : ''"></i></a>
              </el-form-item>
            </el-form>
          </div>
          <transition name="el-zoom-in-top" mode="out-in">
            <div class="search-more" v-if="showMore">
              <el-form inline :model="form" class="demo-form-inline">
                <el-form-item label="更多筛选">
                  <el-select v-model="form.acc034" clearable placeholder="薪资待遇">
                    <el-option
                      v-for="item in dictionaries.TAB_SALARY"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="acc214" clearable collapse-tags multiple placeholder="福利待遇">
                    <el-option
                      v-for="item in dictionaries.TAB_WELFARE"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="form.acc217" clearable placeholder="工作经验">
                    <el-option
                      v-for="item in dictionaries.TAB_WORKYEARS"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="form.acb21i" clearable placeholder="工作性质">
                    <el-option
                      v-for="item in dictionaries.TAB_NATURE"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-form inline :model="form" class="demo-form-inline">
                <el-form-item label="">
                  <el-select v-model="form.aac011" clearable placeholder="学历要求">
                    <el-option
                      v-for="item in dictionaries.TAB_EDUCATION"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="form.aab019" clearable placeholder="单位性质">
                    <el-option
                      v-for="item in dictionaries.TAB_UNITNATURE"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="form.aab056" clearable placeholder="单位规模">
                    <el-option
                      v-for="item in dictionaries.TAB_PSCALE"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="form.updateDates" clearable placeholder="更新时间">
                    <el-option label="不限" value="0"></el-option>
                    <el-option label="三天以内" value="3"></el-option>
                    <el-option label="一周以内" value="7"></el-option>
                    <el-option label="十天以内" value="7"></el-option>
                    <el-option label="十天以内" value="10"></el-option>
                    <el-option label="一个月以内" value="30"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </transition>
        </div>
        <div class="bmap">
          <div class="left" id="bMap"></div>
          <div class="right">
            <div class="list">
              <div class="item" v-for="val in list" :key="val.acb210">
                <a href="" class="pos-name">{{val.cca113 || '--'}}</a>
                <a href="" class="corp-name">{{val.aab004 || '--'}}</a>
                <p class="other">
                  <span>学历：{{val.aac012 || '--'}}</span>
                  <span class="red">{{val.acc034Name || '--'}}</span>
                </p>
              </div>
            </div>
            <empty v-if="!list.length"></empty>
            <div class="page">
              <pagination layout="prev,pager,next" small :bean="pageBean" @current-change="handlePage"></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfHeader from '../../components/xf-header/xf-header.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import XfCascader from '../../components/xf-cascader/xf-cascader.vue'
import {echo} from '../../common/js/utils'
import Pagination from '../../components/pagination/pagination.vue'
import Empty from '../../components/empty/empty.vue'

const BMap = window.BMap

function ComplexCustomOverlay({mp, point, text, text2, cb}) {
  this._point = point
  this._text = text
  this._text2 = text2
  this.mp = mp
  this.cb = cb
}
// 继承BMap.Overlay()
ComplexCustomOverlay.prototype = new BMap.Overlay()
ComplexCustomOverlay.prototype.constructor = ComplexCustomOverlay
ComplexCustomOverlay.prototype.initialize = function (map) {
  var _this = this
  this._map = map
  var div = this._div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)
  div.style.height = '24px'
  div.style.padding = '2px'
  div.style.whiteSpace = 'nowrap'
  div.style.MozUserSelect = 'none'
  div.style.fontSize = '12px'
  div.style.display = 'inline-block'
  div.style.cursor = 'pointer'
  div.onclick = function() {
    _this.cb(_this._point)
  }

  var arrow = document.createElement('span')
  arrow.style.display = 'inline-block'
  arrow.style.padding = '2px 5px'
  arrow.style.background = 'url("./static/assets/bmap.png") no-repeat'
  arrow.style.backgroundSize = '100% 100%'
  arrow.style.height = '24px'
  arrow.style.textAlign = 'center'
  arrow.style.overflow = 'hidden'
  arrow.style.verticalAlign = 'top'
  arrow.style.lineHeight = '14px'
  arrow.style.color = '#fff'
  arrow.innerText = this._text
  div.appendChild(arrow)
  let right = document.createElement('span')
  right.style.display = 'inline-block'
  right.style.verticalAlign = 'top'
  right.style.border = '1px solid #ec7708'
  right.style.background = '#fff'
  right.style.padding = '0 5px'
  right.innerText = this._text2

  div.appendChild(right)
  this.mp.getPanes().labelPane.appendChild(div)
  return div
}
ComplexCustomOverlay.prototype.draw = function () {
  var map = this._map
  var pixel = map.pointToOverlayPixel(this._point)
  this._div.style.left = pixel.x - 10 + 'px'
  this._div.style.top = pixel.y - 30 + 'px'
}

export default {
  components: {
    Empty,
    Pagination,
    XfCascader,
    RightMenu,
    XfFooter,
    XfHeader
  },
  data() {
    return {
      dictionaries: {
        TAB_SALARY: [], // 薪水
        TAB_WELFARE: [], // 福利
        TAB_WORKYEARS: [], // 工作经验
        TAB_NATURE: [], // 工作性质
        TAB_EDUCATION: [], // 学历
        TAB_CITY: [], // 地区
        CRAFT_AS: [], // 职位
        TAB_UNITNATURE: [], // 企业性质
        TAB_PSCALE: [] // 企业规模
      },
      form: {
        bca112: '', // 关键字
        bca111Name: '', // 职位
        bca111: '',
        areaWrap: '', // 地区
        acb202: '', // 地区code
        acc034: '', // 薪水
        acc214: '', // 福利待遇
        acc217: '', // 工作经验
        acb21i: '', // 工作性质
        aac011: '', // 学历
        aab019: '', // 单位性质
        aab056: '', // 企业规模
        updateDates: '', // 更新时间
        rowsNum: 6,
        currentPage: 1
      },
      showMore: false,
      acc214: [],
      search: {},
      list: [],
      pageBean: {}
    }
  },
  methods: {
    onSubmit() {
      this.form.acc214 = Array.prototype.slice.call(this.acc214).sort((a, b) => a - b).join(',')
      this.form.aac001 = this.$userInfo.aac001
      this.form.currentPage = 1
      this.loadpoint()
      this.search = Object.assign({}, this.form)
      this.getList()
    },
    onReset() {
      this.acc214 = []
      echo(this.form)
    },
    handlePage(page) {
      this.search.currentPage = page
      this.getList()
    },
    initMap() {
      let _this = this
      this.mp = new BMap.Map('bMap', {minZoom: 5, maxZoom: 19, enableMapClick: false})
      this.mp.centerAndZoom('郑州', 12)
      // 开启鼠标滚轮缩放
      this.mp.enableScrollWheelZoom(true)
      var navigation = new BMap.NavigationControl({anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT})
      // 添加比例尺
      var ruler = new BMap.ScaleControl({anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT})
      this.mp.addControl(navigation)
      setTimeout(() => {
        this.mp.addControl(ruler)
      }, 2000)
      var myCity = new BMap.LocalCity()
      myCity.get(result => {
        var cityName = result.name
        this.mp.centerAndZoom(cityName, 12)
        // 获取地图显示中心点
      })
      this.mp.addEventListener('tilesloaded', function (e) {
        window.UserRef_setTimeout && window.clearTimeout(window.UserRef_setTimeout)
        window.UserRef_setTimeout = window.setTimeout(function () {
          _this.onSubmit()
        }, 500)
      })
    },
    getDictionaries() { // 字典表
      this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_SALARY,TAB_WELFARE,TAB_WORKYEARS,TAB_NATURE,TAB_EDUCATION,TAB_CITY,CRAFT_AS,TAB_UNITNATURE,TAB_PSCALE'
      }).then(res => {
        res.result.CRAFT_AS = this.handleCascader(res.result.CRAFT_AS.children)
        res.result.TAB_CITY = this.handleCascader(res.result.TAB_CITY.children)
        this.dictionaries = {
          TAB_SALARY: res.result.TAB_SALARY, // 薪水
          TAB_WELFARE: res.result.TAB_WELFARE, // 福利
          TAB_WORKYEARS: res.result.TAB_WORKYEARS, // 工作经验
          TAB_NATURE: res.result.TAB_NATURE, // 工作性质
          TAB_EDUCATION: res.result.TAB_EDUCATION, // 学历
          TAB_CITY: res.result.TAB_CITY, // 地区
          CRAFT_AS: res.result.CRAFT_AS, // 职位
          TAB_UNITNATURE: res.result.TAB_UNITNATURE, // 企业性质
          TAB_PSCALE: res.result.TAB_PSCALE // 企业规模
        }
      })
    },
    handleCascader(arr) {
      return arr.map(item => {
        return {
          label: item.text,
          value: item.id,
          children: item.children && item.children.length ? item.children.map(item => {
            return {
              label: item.text,
              value: item.id
            }
          }) : null
        }
      })
    },
    loadpoint() {
      var bs = this.mp.getBounds() // 获取可视区域

      var swlng = bs.getSouthWest() // 可视区域左下角
      var nslng = bs.getNorthEast() // 可视区域右上角
      var lng = swlng.lng
      var lat = swlng.lat
      var lng1 = nslng.lng
      var lat1 = nslng.lat
      this.form.lng_a = lng
      this.form.lat_a = lat
      this.form.lng_b = lng1
      this.form.lat_b = lat1
    },
    async getList() {
      let _this = this
      this.mp.clearOverlays()
      const res = await this.$post('/service/business/corp/newPosition/mapFindJob', this.search)
      this.list = res.result.positionList
      this.pageBean = res.pageBean
      res.result.corpList.forEach(item => {
        var myCompOverlay = new ComplexCustomOverlay({
          mp: this.mp,
          point: new BMap.Point(item.cabq02, item.cabq03),
          text: item.jobCount,
          text2: item.aab004,
          async cb(point) {
            const jobs = await _this.$post('/service/business/corp/newPosition/getPositionList.xf', {aab001: item.aab001, rowsNum: 1000, currentPage: 1})
            let htmls = jobs.result.map(val => {
              return `<a href="job.html?acb210=${val.acb210}" target="_blank">${val.cca113}</a>`
            })
            var infoWindow = new BMap.InfoWindow(`
            <div style="padding: 0 0 10px 0;"><a href="corp.html?aab001=${item.aab001}" target="_blank">${item.aab004}</a></div>
            <div style="font-size: 14px;">${htmls.join(' ')}</div>
            `)
            _this.mp.openInfoWindow(infoWindow, point)
          }
        })

        this.mp.addOverlay(myCompOverlay)
      })
    }
  },
  mounted() {
    this.getDictionaries()
    this.initMap()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";

  .map {
    min-height: 650px;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 30px 0;
  }

  .map-con {
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    width: 1200px;
  }

  .search {
    padding: 20px 20px;
    .el-form-item {
      margin-bottom: 0;
    }
    .search-tit {
      padding: 15px 10px;
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
      .el-input {
        width: 350px;
      }
      .el-select, .el-cascader {
        width: 230px;
      }
      .more-rotate {
        transform: rotate(180deg);
      }
    }
    .search-more {
      padding: 15px 10px;
      border-bottom: 1px solid #ebebeb;
      .el-select {
        width: 240px;
      }
      .demo-form-inline {
        &:not(:last-child) {
          margin: 0 0 15px 0;
        }
        &:nth-child(2) {
          margin: 0 0 0 68px;
        }
      }
    }
  }

  .bmap {
    @include clearFixed;
    padding: 0 20px 20px 20px;
    .left {
      width: 900px;
      height: 600px;
      float: left;
    }
    .right{
      width: 250px;
      float: right;
      .item{
        padding: 10px 0;
        .pos-name{
          font-size: 16px;
          display: inline-block;
          width: 100%;
          @include ellipsis;
        }
        .corp-name{
          font-size: 14px;
          display: inline-block;
          width: 100%;
          @include ellipsis;
        }
        .other{
          white-space: nowrap;
          font-size: 14px;
          color: #666;
          span{
            width: 50%;
            display: inline-block;
            @include ellipsis;
          }
        }
        &:not(:last-child){
          border-bottom: 1px solid #ebebeb;
        }
      }
    }
  }
  .page{
    text-align: center;
    padding: 15px 0;
    font-size: 14px;
  }
  .red{
    color: red;
  }
  .theme{
    color: $--color-primary;
  }
</style>
