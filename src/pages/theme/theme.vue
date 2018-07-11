<template>
  <div class="theme-page">
    <div class="header">
      <div class="header-con">
        <a class="item">
          <img src="../../common/img/logo-color.png" alt="">
        </a>
        <a class="item" href="index.html">首页</a>
        <a class="item" @click="scrollTo('about')">关于大会</a>
        <a class="item" @click="scrollTo('process')">大会议程</a>
        <a class="item" @click="scrollTo('dt')">大会动态</a>
        <a class="item" @click="scrollTo('topics')">大会专题</a>
        <a class="item" @click="scrollTo('guide')">会议指南</a>
        <a class="item" @click="scrollTo('supporting')">赞助单位</a>
        <a class="item" @click="scrollTo('media')">合作媒体</a>
      </div>
    </div>
    <div class="banner">
      <img src="./static/banner.png" alt="">
    </div>
    <div class="module">
      <div class="module-con" ref="about">
        <div class="title">
          <p>关于大会</p>
          <p>ABOUT MEETING</p>
        </div>
        <div class="about-con">
          <div class="about-text">
            <div class="about-tit">总体要求</div>
            <div class="about-info">以习近平新时代中国特色社会主义思想为指导，深入学习贯彻党的十九大精神和省委十届四次全会精神，大力实施人才优先发展战略和人才强省战略，将中国•河南招才引智创新发展大会打造成我省宣传人才政策的平台、展示人才工作成果的平台、集中招才引智的平台、促进人才项目合作对接的平台。着力集聚一批高层次、高技能人才（团队），为实施“三区一群”国家战略、全面建成小康社会、开启新时代河南全面建设社会主义现代化新征程、谱写中原更加出彩新篇章，提供坚强人才支撑。</div>
            <div class="about-tit">办会原则</div>
            <div class="about-info">• 坚持引进“高精尖”人才与引进急需紧缺人才相结合。在着力引进“高精尖”人才的同时，大力延揽青年人才、技能人才、高校毕业生等急需紧缺人才。
              <br>• 坚持刚性引才与柔性引智相结合。在着力刚性引才的同时，注重通过兼职、科研和技术合作、技术（专利）入股、聘请顾问等灵活多样方式柔性引智。
              <br>• 坚持引进人才与引进项目相结合。通过引进高层次创新人才，带动一批项目落地，同时，通过遴选符合河南产业发展方向的项目，吸引一批高层次人才来豫创新创业。
              <br>• 坚持集中引才与长效聚才相结合。注重发挥大会集中招才引智规模效应，广泛激发全社会重视人才、引进人才、激励人才的积极性，营造重视人才的社会环境，建立招才引智长效机制。</div>
            <div class="about-tit">举办单位</div>
            <div class="about-info">主办：中共河南省委、河南省人民政府、欧美同学会（中国留学人员联谊会）。
              <br>承办：中共河南省委组织部（省人才工作领导小组办公室）、河南省人力资源和社会保障厅、郑州市人民政府。
              <br>协办：中共河南省委宣传部、中共河南省委统战部、河南省教育厅、河南省科学技术厅、河南省商务厅、河南省卫生和计划生育委员会、河南省科学技术协会、河南欧美同学会（河南留学人员联谊会）、郑州航空港经济综合实验区管委会。</div>
            <div class="about-tit">参会人员</div>
            <div class="about-info">国内外知名专家、学者、科研人员、留学人员；国内外创新创业团队、创新创业项目代表；人力资源服务机构、猎头公司、知名企业高管；高校、科研院所负责人；境内外主要新闻媒体；有关方面嘉宾；全省有人才需要的机关企事业单位代表等。邀请国家有关部委、有关协会负责同志出席。</div>
          </div>
        </div>
      </div>
    </div>
    <div class="module process-box" ref="process">
      <div class="module-con">
        <div class="title">
          <p>大会议程</p>
          <p>CONFERENCE AGENDA</p>
        </div>
        <div class="radius">
          <div class="radius-item" :class="currentTab2 === 0 ? 'radius-active' : ''" @click="handleCurrentTab2(0)">10月27日</div>
          <div class="radius-item" :class="currentTab2 === 1 ? 'radius-active' : ''" @click="handleCurrentTab2(1)">10月28日</div>
        </div>
        <transition name="el-zoom-in-top" mode="out-in">
          <div class="process-con" key="1027" v-if="currentTab2 === 0">
            <div class="table">
              <div class="th">
                <div class="td">时间</div>
                <div class="td">主题</div>
                <div class="td">地点</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">大会开幕式</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
            </div>
          </div>
          <div class="process-con" key="1028" v-if="currentTab2 === 1">
            <div class="table">
              <div class="th">
                <div class="td">时间</div>
                <div class="td">主题</div>
                <div class="td">地点</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">大会开幕式2</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
              <div class="tr">
                <div class="td">9:00-10:00</div>
                <div class="td">2018中国互联网+建筑产业高峰论坛311会议室</div>
                <div class="td">大会堂B段</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="module dt-box" ref="dt">
      <div class="module-con">
        <div class="title">
          <p>大会动态</p>
          <p>GENERAL ASSEMBLY DYNAMICS</p>
        </div>
        <div class="dt-con">
          <div class="dt-carousel">
            <el-carousel height="523px" @change="handleChange" arrow="never">
              <el-carousel-item v-for="(val, key) in DHDT1" :key="key">
                <a :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" :title="val.cand03" style="width: 100%; height: 100%; display: block;">
                  <img :src="val.cand11" onload="handleBeauty(event)">
                </a>
              </el-carousel-item>
            </el-carousel>
            <div class="dt-info">
              <span>{{DHDT1.length && DHDT1[currentBanner].cand03}}</span>
            </div>
          </div>
          <div class="dt-right">
            <a :title="val.cand03" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" class="dt-right-item" v-for="(val, key) in DHDT2" :key="key">
              <img :src="val.cand11" onload="handleBeauty(event)">
              <div class="dt-info">{{val.cand03}}</div>
            </a>
          </div>
        </div>
        <div class="dt-more">
          <a class="more" href="newsList.html#/module?channel_code=DHDT">查看更多</a>
        </div>
      </div>
    </div>
    <div class="module topics-box" ref="topics">
      <div class="module-con">
        <div class="title">
          <p>大会专题</p>
          <p>CONFERENCE TOPICS</p>
        </div>
        <div class="radius">
          <div class="radius-item" :class="currentTab1 === 0 ? 'radius-active' : ''" @click="handleCurrentTab1(0)">专题活动</div>
          <div class="radius-item" :class="currentTab1 === 1 ? 'radius-active' : ''" @click="handleCurrentTab1(1)">河南行活动</div>
        </div>
        <transition name="el-fade-in" mode="out-in">
          <div class="topics-con" v-if="currentTab1 === 0" key="SDZT">
            <a :title="val.cand03" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" class="topics-item" v-for="(val, key) in SDZT" :key="key">
              <div class="topics-img">
                <img :src="val.cand11" onload="handleBeauty(event)">
              </div>
              <div class="topics-info">{{val.cand03}}</div>
            </a>
          </div>
          <div class="topics-con" v-if="currentTab1 === 1" key="HNXHD">
            <a :title="val.cand03" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" class="topics-item" v-for="(val, key) in HNXHD" :key="key">
              <div class="topics-img">
                <img :src="val.cand11" onload="handleBeauty(event)">
              </div>
              <div class="topics-info">{{val.cand03}}</div>
            </a>
          </div>
        </transition>
      </div>
    </div>
    <div class="module guide-box" ref="guide">
      <div class="module-con">
        <div class="title">
          <p>会议指南</p>
          <p>CONFERENCE GUIDE</p>
        </div>
      </div>
      <a target="_blank" href="http://map.baidu.com/?newmap=1&s=inf%26uid%3D5331383edccbf06ea2d2305e%26wd%3D%E9%83%91%E5%B7%9E%E5%9B%BD%E9%99%85%E4%BC%9A%E5%B1%95%E4%B8%AD%E5%BF%83%26all%3D1%26c%3D268&from=alamap&tpl=map_singlepoint">
        <img src="./static/guide-map.png" class="map">
      </a>
      <div class="module-con">
        <div class="card">
          <div class="card-tit">
            <div class="card-tit-item" :style="'background:' + cards[0] + ';'" @mouseover="handleCard(0)">
              <img src="./static/train.png" alt="">
              <p>火车<br><span>TRAIN</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[1] + ';'" @mouseover="handleCard(1)">
              <img src="./static/bus.png" alt="">
              <p>大巴<br><span>BUS</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[2] + ';'" @mouseover="handleCard(2)">
              <img src="./static/taxi.png" alt="">
              <p>的士<br><span>TAXI</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[3] + ';'" @mouseover="handleCard(3)">
              <img src="./static/train.png" alt="">
              <p>地铁<br><span>METRO</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[4] + ';'" @mouseover="handleCard(4)">
              <img src="./static/train.png" alt="">
              <p>飞机<br><span>AIRCRAFT</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[5] + ';'" @mouseover="handleCard(5)">
              <img src="./static/hotel.png" alt="">
              <p>周边<br>酒店</p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[6] + ';'" @mouseover="handleCard(6)">
              <img src="./static/food.png" alt="">
              <p>品牌<br>餐饮</p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[7] + ';'" @mouseover="handleCard(7)">
              <img src="./static/scenery.png" alt="">
              <p>周边<br>景点</p>
            </div>
          </div>
          <div class="card-con" :style="'background:' + cards[currentCard] + ';'">
            <div v-if="currentCard === 0">
              1）从郑州火车站：乘坐地铁1号线河南大学新区方向到会展中心站C2口下车，东北方向步行900米；
              <br>2）从郑州东站：乘坐地铁1号线河南工业大学方向到会展中心站C2口下车，东北方向步行900米；
              <br>3）从郑州西站：乘坐12路区间公交车西方向到建设西路富民路(大庄)站下车，步行300米到地铁1号线市民中心站上车往河南大学新区方向到会展中心站C2口下车，东北方向步行900米；
            </div>
            <div v-if="currentCard === 1">
              1）从郑州中心站：乘坐地铁1号线河南大学新区方向到会展中心站C2口下车，东北方向步行900米；
              <br>2）从郑州总站：京广路政通路站上车（551路，603路，81路、981路）到火车站西广场下车，乘坐地铁1号线河南大学新区方向到会展中心站C2口下车，东北方向步行900米；
              <br>3）从郑州南站：汽车客运南站上车，乘坐111路到紫荆山路南三环站下车，乘坐地铁2号线到紫荆山站转1号线到会展中心站C2口下车，东北方向步行900米；
            </div>
            <div v-if="currentCard === 2">
              1） 乘坐的士或自驾途径中州大道、会展路到达九如路与商务内环路交叉口西南100米-会展中心停车场；
              <br>2） 乘坐的士或自驾途径中州大道、商务内环路到商务内环路中央公园2号绿地中心-绿地中心千玺广场-南一停车场；
            </div>
            <div v-if="currentCard === 3">
              1） 从郑州火车站：乘坐地铁1号线河南大学新区方向到会展中心站C2口下车，东北方向步行900米；
              <br>2） 从郑州东站：乘坐地铁1号线河南工业大学方向到会展中心站C2口下车，东北方向步行900米；
              <br>3）从郑州西站：乘坐12路区间公交车西方向到建设西路富民路(大庄)站下车，步行300米到地铁1号线市民中心站上车往河南大学新区方向到会展中心站C2口下车，东北方向步行900米；
            </div>
            <div v-if="currentCard === 4">
              1） 从新郑机场站A口或者B口入站，乘坐城郊线南四环方向到南四环站，然后南四环站乘坐2号线刘庄方向到紫荆山站下车，换乘地铁1号线河南大学新区方向到会展中心站C2口下车，东北方向步行900米；
              <br>2） 从新郑机场站A口或者B口入站，乘坐城郊线南四环方向到南四环站，然后南四环站乘坐2号线刘庄方向到黄河路站D口出战，黄河路花园路站上23路公交车到会展中心站下车；
            </div>
            <div v-if="currentCard === 5">
              1）郑州绿地JW万豪酒店：商务中央公园2号千玺广场39层；电话：(0371)88828888；
              <br>2）亚朵轻居酒店(郑州CBD会展中心店)：郑州郑东新区商务内环路25号2单元1层；电话：(0371)55570111；
              <br>3）星木微酒店：中储粮大厦1单元18层(商务内环与商务东四街交汇处)；电话：(0371)55678669；
              <br>4）郑州郑展时尚酒店(会展中心店)：商务内环28号中储粮大厦一单元11楼；电话：17760778259；
              <br>5）微佳酒店(郑州会展中心店)：商务内环路未来国际25号楼1层；电话：(0371)55238989；
            </div>
            <div v-if="currentCard === 6">
              1）固始人家(商务东四街)：商务内环与商务东四街向南50米；电话：(0371)55952088,(0371)55952089；
              <br>2）椒蓉川味湖畔餐厅：千玺广场御湖道3号商铺；电话：(0371)55500500；
              <br>3）郑州绿地JW万豪酒店-万豪中餐厅：商务中央公园2号千玺广场39层(会展中心)；电话：(0371)87078200；
              <br>4）星巴克(郑州绿地千玺店)：商务内环路绿地中心千玺广场B1层；电话：(0371)55377576；
              <br>5）18PLUS(郑东新区CBD店)：商务内环CBD千玺内环1-2商铺（万豪郑州绿地JW万豪酒店）；电话：(0371)67000000；
            </div>
            <div v-if="currentCard === 7">
              1）郑州方特欢乐世界：郑开大道与人文路交叉口向南(绿博园北门正对面)；
              <br>2）世纪欢乐园：郑州市管城回族区石化路1号；电话：(0371)63282288；
              <br>3）河南博物院：郑州市北部农业路8号；(0371)63511237；
              <br>4） 郑州海洋馆：河南郑州市金水区国基路86号；电话：(0371)63567403,(0371)63567402；
              <br>5）郑东新区湿地公园：河南省郑州市金水区郑东新区湿地公园(商务内环路北)；
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module supporting-box" ref="supporting">
      <div class="module-con">
        <div class="title">
          <p>赞助单位</p>
          <p>SUPPORTING AGENCY</p>
        </div>
        <div class="supporting-con">
          <a target="_blank" :href="val.ccmw03" class="supporting-item" v-for="(val, key) in ZZDW" :key="key" :title="val.ccmw02">
            <img :src="val.ccmw07" onload="handleBeauty(event)">
          </a>
        </div>
      </div>
    </div>
    <div class="module supporting-box" ref="media">
      <div class="module-con">
        <div class="title">
          <p>合作媒体</p>
          <p>ASSOCIATED MEDIA</p>
        </div>
        <div class="supporting-con">
          <a target="_blank" :href="val.ccmw03" class="supporting-item" v-for="(val, key) in HZMT" :key="key" :title="val.ccmw02">
            <img :src="val.ccmw07" onload="handleBeauty(event)">
          </a>
        </div>
      </div>
    </div>
    <xf-footer></xf-footer>
    <right-menu ref="right" @onscroll="stop"></right-menu>
  </div>
</template>
<script>
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import $ from 'jquery'
import RightMenu from '../../components/right-menu/right-menu.vue'

export default {
  components: {
    RightMenu,
    XfFooter},
  data() {
    return {
      currentBanner: 0,
      cards: ['#7d7cc2', '#05a5c3', '#0d6fb8', '#3abc8f', '#80c269', '#fa6041', '#fa9d24', '#be9153', '#8fb73c'],
      currentCard: 0,
      DHDT1: [],
      DHDT2: [],
      SDZT: [],
      HNXHD: [], // 河南行活动
      currentTab2: 0, // 大会议程tab
      currentTab1: 0, // 十大专题or河南行活动
      ZZDW: [],
      HZMT: []
    }
  },
  methods: {
    handleCurrentTab1(current) {
      this.currentTab1 = current
    },
    handleCurrentTab2(current) {
      this.currentTab2 = current
    },
    handleChange(currentBanner) {
      this.currentBanner = currentBanner
    },
    handleCard(index) {
      this.currentCard = index
    },
    scrollTo(el) {
      this.$refs.right.stop()
      this.stop()
      this.timer = setInterval(() => {
        let current = $(window).scrollTop()
        let target = $(this.$refs[el]).offset().top
        let cha = current + Math.ceil((target - current) / 10)
        if (Math.abs($(document).height() - $(window).height() - current) < 3) {
          this.stop()
        }
        if (Math.abs(target - current) < 3) {
          this.stop()
        }
        $(window).scrollTop(cha)
      }, 20)
    },
    stop() {
      clearInterval(this.timer)
    },
    getDHDT1() { // 大会动态轮播图
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 4,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'DHDT'
      }).then(res => {
        this.DHDT1 = res.result
      })
    },
    getDHDT2() { // 大会动态右侧图片
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 4,
        currentPage: 2,
        countsNum: 50,
        channel_code: 'DHDT'
      }).then(res => {
        this.DHDT2 = res.result
      })
    },
    getSDZT() { // 十大专题
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 6,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'SDZT'
      }).then(res => {
        this.SDZT = res.result
      })
    },
    getHNXHD() { // 河南行活动
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 6,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'HNXHD'
      }).then(res => {
        this.HNXHD = res.result
      })
    },
    getZZDW() { // 赞助单位
      this.$post('/service/business/fm/link/links/getLinksList.xf', {
        ccmw05: 0
      }).then(res => {
        this.ZZDW = res.result.links
      })
    },
    getHZMT() { // 合作媒体
      this.$post('/service/business/fm/link/links/getLinksList.xf', {
        ccmw05: 1
      }).then(res => {
        this.HZMT = res.result.links
      })
    }
  },
  created() {
    $(document).on('mousewheel DOMMouseScroll', () => {
      clearInterval(this.timer)
    })
    this.getDHDT1()
    this.getDHDT2()
    this.getSDZT()
    this.getHNXHD()
    this.getZZDW()
    this.getHZMT()
  }
}
</script>
<style lang="scss">
  @import "../../common/style/variables";
  a{
    text-decoration: none;
  }
  .theme-page{
    .header{
      height: 100px;
      background: #fff;
      border-bottom: 1px solid #d9d9d9;
      .header-con{
        width: 1200px;
        margin: 0 auto;
        .item{
          display: inline-block;
          height: 100px;
          line-height: 100px;
          vertical-align: middle;
          color: #666;
          width: 124px;
          text-align: center;
          &:first-child{
            width: 150px;
            overflow: hidden;
            text-align: right;
            &:hover{
              cursor: default;
              background: #fff;
            }
            img{
              width: 93px;
              height: 93px;
              margin: 3px 0 0 0;
            }
          }
          &:hover{
            cursor: pointer;
            background: #f3f3f3;
          }
        }
      }
    }
    .banner{
      width: 100%;
      img{
        width: 100%;
      }
    }
    .module{
      width: 100%;
      .module-con{
        width: 1200px;
        margin: 0 auto;
        .title{
          text-align: center;
          p{
            &:first-child{
              color: #05a5c3;
              font-size: 36px;
            }
            &:nth-child(2){
              color: #666;
              font-size: 16px;
              padding: 5px 0;
            }
          }
        }
      }
    }
    .about-con{
      height: 895px;
      width: 100%;
      background: url("static/about.png") no-repeat center center;
      background-size: 90%;
      position: relative;
      .about-text{
        position: absolute;
        left: 236px;
        top: 114px;
        width: 812px;
        .about-tit{
          color: #fff001;
          padding: 0 0 0 15px;
          border-left: 2px solid #fff001;
        }
        .about-info{
          padding: 10px 0 20px 0;
          color: #fff;
          font-size: 14px;
          line-height: 21px;
        }
      }
    }
    .radius{
      width: 380px;
      height: 56px;
      margin: 10px auto;
      background: url("static/radius.png");
      .radius-item{
        width: 178px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin-top: 9px;
        &:nth-child(1){
          margin-left: 9px;
        }
        &:hover{
          cursor: pointer;
        }
      }
      .radius-active{
        border-radius: 20px;
        background: #fff;
        color: #05a5c3;
      }
    }
    .process-box{
      background: #f3f3f3;
      padding: 100px 0;
      .process-con{
        padding: 10px 0 0 0;
        .table{
          .th{
            background: #9f9f9f;
            color: #fff;
            border-radius: 5px;
            white-space: nowrap;
          }
          .td{
            padding: 20px 0;
            text-align: center;
            color: #333;
            display: inline-block;
            &:nth-child(1){
              width: 25%;
            }
            &:nth-child(2){
              width: 50%;
            }
            &:nth-child(3){
              width: 25%;
            }
          }
          .tr{
            white-space: nowrap;
            border-radius: 5px;
            &:nth-child(2n){
              background: #fff;
            }
            &:nth-child(2n+1){
              background: #e3e3e3;
            }
          }
        }
      }
    }
    .dt-box{
      padding: 70px 0;
      background: url("static/dt.png") no-repeat;
      background-size: 100% 100%;
      height: 920px;
      .dt-con{
        width: 100%;
        padding-top: 40px;
        @include clearFixed;
        .dt-carousel{
          width: 48%;
          float: left;
          height: 523px;
          position: relative;
          .dt-info{
            height: 90px;
          }
        }
        .dt-info{
          height: 70px;
          width: 100%;
          background: rgba(32,159,180,.5);
          color: #fff;
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 2;
          padding: 0 10px;
          display: flex;
          align-items: center;
        }
        .dt-right{
          width: 49%;
          float: right;
          .dt-right-item{
            width: 280px;
            height: 247px;
            position: relative;
            float: left;
            margin-bottom: 28px;
            overflow: hidden;
            &:nth-child(2n-1){
              margin-right: 28px;
            }
            &:hover{
              opacity: .9;
            }
          }
        }
      }
    }
    .el-carousel__indicators{
      z-index: 3;
      left: auto;
      right: 5%;
      transform: translateX(0);
      .el-carousel__indicator{
        &.is-active{
          button{
            background: #ff8c4e;
          }
        }
        button{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
    .dt-more{
      text-align: center;
      margin: 45px 0 0 0;
    }
    .more{
      width: 157px;
      height: 50px;
      line-height: 46px;
      text-align: center;
      display: inline-block;
      border: 2px solid #fff;
      color: #fff;
      font-size: 20px;
      &:hover{
        background: $--color-primary;
        cursor: pointer;
      }
    }
    .topics-box{
      background: #f3f3f3;
      padding: 117px 0;
      .topics-con{
        padding: 30px 0 0 0;
        @include clearFixed;
      }
      .topics-item{
        width: 380px;
        height: 243px;
        float: left;
        margin-bottom: 30px;
        display: block;
        &:hover{
          cursor: pointer;
          opacity: .9;
        }
        &:nth-child(3n-1),&:nth-child(3n-2){
          margin-right: 30px;
        }
        .topics-img{
          width: 100%;
          height: 170px;
          overflow: hidden;
        }
        .topics-info{
          height: 73px;
          background: #e2e2e2;
          color: #333;
          padding: 15px 12px;
        }
      }
    }
    .guide-box{
      padding: 30px 0;
      background: url("./static/guide.png") no-repeat;
      background-size: 100% 100%;
      .title{
        p{
          color: #fff !important;
        }
      }
      .map{
        width: 100%;
        margin: 20px 0;
      }
      .card{
        padding: 20px 0 0 0;
        width: 100%;
        .card-tit{
          @include clearFixed;
          .card-tit-item{
            float: left;
            width: 150px;
            height: 89px;
            color: #fff;
            font-size: 20px;
            img{
              float: left;
              width: 33%;
              margin: 19px 0 0 12px;
            }
            p{
              width: 53%;
              float: right;
              margin: 14px 0 0 0;
              span{
                font-size: 14px;
              }
            }
          }
        }
        .card-con{
          padding: 20px 20px;
          color: #fff;
          font-size: 16px;
          line-height: 38px;
          min-height: 260px;
        }
      }
    }
    .supporting-box{
      padding: 65px 0 0 0;
      .supporting-con{
        padding: 50px 0 0 0;
        @include clearFixed;
        .supporting-item{
          float: left;
          width: 215px;
          height: 138px;
          border: 1px solid #d9d9d9;
          margin-right: 30px;
          margin-bottom: 30px;
          display: block;
          overflow: hidden;
          &:hover{
            cursor: pointer;
            opacity: .9;
            transform: scale(1.1);
          }
          &:nth-child(5n){
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
