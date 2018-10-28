<template>
  <div class="theme-page">
    <theme-header></theme-header>
    <div class="banner">
      <img src="./static/banner.jpg" alt="" v-if="!en">
      <img src="./static/banner-en.jpg" alt="" v-if="en">
    </div>
    <div class="module normal-bg">
      <div class="module-con" ref="about" id="about">
        <div class="title">
          <p v-if="!en">关于大会</p>
          <p>ABOUT MEETING</p>
        </div>
        <div class="about-con" v-if="!en">
          <div class="about-text">
            <div class="about-tit">总体要求</div>
            <div class="about-info">以习近平新时代中国特色社会主义思想为指导，深入学习贯彻党的十九大精神和省委十届六次全会精神，大力实施人才优先发展战略和人才强省战略，将中国·河南招才引智创新发展大会打造成我省宣传人才政策的平台、展示人才工作成果的平台、集中招才引智的平台、促进人才项目合作对接的平台。着力集聚一批高层次、高技能人才（团队），为实施“三区一群”国家战略、全面建成小康社会、开启新时代河南全面建设社会主义现代化新征程、谱写中原更加出彩新篇章，提供坚强人才支撑。</div>
            <div class="about-tit">办会原则</div>
            <div class="about-info">• 坚持引进“高精尖”人才与引进急需紧缺人才相结合。在着力引进“高精尖”人才的同时，大力延揽青年人才、技能人才、高校毕业生等急需紧缺人才。
              <br>• 坚持刚性引才与柔性引智相结合。在着力刚性引才的同时，注重通过兼职、科研和技术合作、技术（专利）入股、聘请顾问等灵活多样方式柔性引智。
              <br>• 坚持引进人才与引进项目相结合。通过引进高层次创新人才，带动一批项目落地，同时，通过遴选符合河南产业发展方向的项目，吸引一批高层次人才来豫创新创业。
              <br>• 坚持集中引才与长效聚才相结合。注重发挥大会集中招才引智规模效应，广泛激发全社会重视人才、引进人才、激励人才的积极性，营造重视人才的社会环境，建立招才引智长效机制。</div>
            <div class="about-tit">举办单位</div>
            <div class="about-info">主办：中共河南省委、河南省人民政府、欧美同学会（中国留学人员联谊会）。
              <br>承办：中共河南省委组织部（省人才工作领导小组办公室）、河南省人力资源和社会保障厅、郑州市人民政府。
              <br>协办：中共河南省委宣传部、中共河南省委统战部、河南省编制委员会办公室、河南省教育厅、河南省科学技术厅（郑洛新国家自主创新示范区领导小组办公室）、河南省商务厅（河南自贸试验区工作办公室）、河南省卫生和计划生育委员会、河南省科学技术协会、河南省外事侨务办公室、河南欧美同学会（河南留学人员联谊会）、郑州航空港经济综合实验区管委会。</div>
            <div class="about-tit">参会人员</div>
            <div class="about-info">国内外知名专家、学者、科研人员、留学人员；国内外创新创业团队、创新创业项目代表；人力资源服务机构、猎头公司、知名企业高管；高校、科研院所负责人；境内外主要新闻媒体；有关方面嘉宾；全省有人才需求的机关企事业单位代表等。邀请国家有关部委、有关协会负责同志出席。</div>
          </div>
        </div>
        <div class="about-con en" v-if="en">
          <div class="about-text">
            <div class="about-tit">Overall Requirement</div>
            <div class="about-info">Under the guidance of Xi Jinping Thought on Socialism with Chinese Characteristics for a New Era and in response to the call of the 19th CPC National Congress and the Sixth Plenary Session of the 10th CPC Henan Provincial Committee on reinvigorating China through human resource development, the Conference is committed to putting the strategy of reinvigorating Henan through human resource development into action. It aims to build the Talent Recruitment Conference for Innovation and Development, Henan, China into an effective platform for Henan province to promote talent policies, showcase talent work achievement, recruit more talents and advance matchmaking of talent projects. Focusing on gathering a group of high-level and highly-skilled talent (group), it will provide strong intellectual support for implementing the national strategy of “Three Zones and One Cluster” and building a moderately prosperous society in all respects, which will promote the process of Henan’s modernization drive in the new era and contribute to a brighter future of Central Plains.</div>
            <div class="about-tit">Principle</div>
            <div class="about-info">• Focus on introducing both top talents and urgently needed talents. In addition to top notch talents in the profession, we make great efforts to bring in young and skilled personnel, graduates from colleges and universities and other talents whose skills are in short supply.
              <br>• Combine traditional ways with flexible strategies. Except for traditional employment, we explore various flexible ways to channel brains to Henan in forms of part-time job, research and technological cooperation, technology (patent) investment, and advisory service, etc.
              <br>• Bring in both talents and projects. The settlement of high-level innovation talents will boost a group of projects. In the meanwhile, the selected projects that conform to the industrial advancement trend will further attract more high-level talents to Henan for innovation and entrepreneurship.
              <br>• Establish long-term talent recruitment mechanism driven by regular talent recruitment event. We will give full play to the scale effect of the regular recruitment event to raise the awareness of the whole society on the importance of talents and encourage them to introduce talents and motivate talents and establish a long-term talent recruitment mechanism.
            </div>
            <div class="about-tit">Sponsors</div>
            <div class="about-info">Sponsors:The CPC Henan Provincial Committee;The People’s Government of Henan Province;Western Returned Scholars Association· Overseas-educated Scholars;
              <br>Organizers:Organization Department of the CPC Henan Provincial Committee (Office of Leading Group of Provincial Human Resources Work);Department of Human Resources and Social Security of Henan Province;The People’s Government of Zhengzhou;
              <br>Co-organizers:Publicity Department of the CPC Henan Provincial Committee;The United Front Work Department of the CPC Henan Provincial Committee;Education Department of Henan Province;Department of Science and Technology of Henan Province;Henan Provincial Commerce Department;Health and Family Planning Commission of Henan Province;Henan Association for Science and Technology;Henan Returned Scholars Association;Management Committee of Zhengzhou Airport Economy Zone;
            </div>
            <div class="about-tit">Participants</div>
            <div class="about-info">Renowned experts, scholars, researchers and overseas-educated scholars at home and abroad; innovation and entrepreneurship groups and project representatives at home and abroad; senior managers of human resources service organizations, head-hunting companies and well-known enterprises; principals from colleges and universities and research institutes; domestic and foreign media; distinguished guests from concerned fields; representatives of authorities, enterprises and institutions in need of talents across the province, etc. Officers from relevant ministries and commissions and associations will be invited to the Conference.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="module live-con" v-if="false">
      <div class="live">
        <div class="left-top">
          <span>27</span>
          <span>2018-10</span>
        </div>
        <div class="tit">
          <span v-if="!en">开幕式直播</span>
          <span>OPENING CEREMONY LIVE</span>
        </div>
        <div class="time">[ 2018.10.27 09:00 ]</div>
        <div class="live-list">
          <div class="item"><img src="./static/live-huya.png" alt=""></div>
          <div class="item"><img src="./static/live-huajiao.png" alt=""></div>
          <div class="item"><img src="./static/live-yingke.png" alt=""></div>
        </div>
        <div class="live-news-list">
          <a class="live-news-item" target="_blank" v-for="(val, key) in lives" :key="key" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" :title="val.cand03">
            <img :src="val.cand11"  onload="handleBeauty(event)">
            <div class="tip">{{val.cand03 || '--'}}</div>
          </a>
        </div>
      </div>
    </div>
    <div class="module process-box normal-bg" ref="process" id="process">
      <div class="module-con">
        <div class="title">
          <p v-if="!en">大会议程</p>
          <p>CONFERENCE AGENDA</p>
        </div>
        <div class="radius" style="width: 570px;">
          <div class="radius-item" :class="currentTab2 === 0 ? 'radius-active' : ''" @click="handleCurrentTab2(0)">{{en ? 'October 26' : '10月26日'}}</div>
          <div class="radius-item" :class="currentTab2 === 1 ? 'radius-active' : ''" @click="handleCurrentTab2(1)">{{en ? 'October 27' : '10月27日'}}</div>
          <div class="radius-item" :class="currentTab2 === 2 ? 'radius-active' : ''" @click="handleCurrentTab2(2)">{{en ? 'October 28' : '10月28日'}}</div>
        </div>
        <transition name="el-zoom-in-top" mode="out-in">
          <div class="process-con" key="1026" v-if="currentTab2 === 0">
            <div class="table">
              <div class="th">
                <div class="td">{{en ? 'Time' : '时间'}}</div>
                <div class="td">{{en ? 'Theme' : '主题'}}</div>
                <div class="td">{{en ? 'Venue' : '地点'}}</div>
              </div>
              <div class="tr">
                <div class="td">09:00-17:00</div>
                <div class="td">{{en ? 'Visit to Henan (Nanyang) by Academicians of Chinese Academy of Sciences and Chinese Academy of Engineering' : '两院院士河南行-南阳行'}}</div>
                <div class="td">{{en ? 'Nanyang' : '南阳'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728030218" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372830218" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">09:00-17:00</div>
                <div class="td">{{en ? 'Visit to Henan by Education Specialists' : '教育专家河南行'}}</div>
                <div class="td">{{en ? 'Henan Agricultural University, Henan University of Technology, Zhengzhou University, Henan University, Henan University of Chinese Medicine, North China University of Water Resources and Electric Power ' : '河南农业大学、河南工业大学、郑州大学、河南大学、河南中医药大学、华北水利水电大学'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533727948968" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372948968" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">15:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan (Zhengzhou) by Overseas Academicians' : '海外院士河南行-郑州考察调研'}}</div>
                <div class="td">{{en ? 'Zhengzhou' : '郑州'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728018671" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372818671" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">15:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Returned Expert Service Group of Western Returned Scholars Association' : '欧美同学会海归专家服务团河南行'}}</div>
                <div class="td">{{en ? 'Zhengzhou' : '郑州'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728008093" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153378008093" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">20:00-22:00</div>
                <div class="td">{{en ? 'Artistic performance of Goddess and the Dreamer' : '文艺演出《水月洛神》'}}</div>
                <div class="td">{{en ? 'Theater of Henan Arts Center' : '河南艺术中心大剧院'}}</div>
              </div>
            </div>
          </div>
          <div class="process-con" key="1027" v-if="currentTab2 === 1">
            <div class="table">
              <div class="th">
                <div class="td">{{en ? 'Time' : '时间'}}</div>
                <div class="td">{{en ? 'Theme' : '主题'}}</div>
                <div class="td">{{en ? 'Venue' : '地点'}}</div>
              </div>
              <div class="tr">
                <div class="td">09:00-09:50</div>
                <div class="td">{{en ? 'Opening Ceremony' : '大会开幕式'}}</div>
                <div class="td">{{en ? 'Xuanyuan Hall at Convention Center' : '会议中心轩辕堂'}}</div>
              </div>
              <div class="tr">
                <div class="td">09:00-17:00</div>
                <div class="td">{{en ? '“Introduce Elites from Famous Universities to Henan” Session' : '“名校英才入豫计划”专场'}}</div>
                <div class="td">{{en ? 'Recruitment Zone in Zhengzhou International Convention and Exhibition Center' : '郑州国际会展中心大会招聘区'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727487031&key=5" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372487031&key=5" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Academicians of Chinese Academy of Sciences and Chinese Academy of Engineering' : '两院院士河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728030218" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372830218" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Overseas Academicians' : '海外院士河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728018671" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372818671" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Returned Expert Service Group of Western Returned Scholars Association' : '欧美同学会海归专家服务团河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728008093" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153378008093" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Postdoctor Technological Service Group and Overseas Returnees' : '博士后科技服务团暨留学回国人员河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533727960296" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372760296" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:30-17:00</div>
                <div class="td">{{en ? 'On-site Recruitment Activities' : '大会现场招聘活动'}}</div>
                <div class="td">{{en ? 'Zone B, C, D, E, F in the exhibition center of Zhengzhou International Convention and Exhibition Center' : '郑州国际会展中心展览馆BCDEF区'}}</div>
              </div>
              <div class="tr">
                <div class="td">10:30-12:30</div>
                <div class="td">{{en ? 'Summit of Talent Development in Central Plains' : '中原人才发展高层论坛'}}</div>
                <div class="td">{{en ? 'Xuanyuan Hall at Convention Center' : '会议中心轩辕堂'}}</div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Talent (Project) Outcome Exhibition & Recruitment Session for Cities in Henan Province ' : '各省辖市人才（项目）成果展示暨招聘专场'}}</div>
                <div class="td">{{en ? 'Zhengzhou International Convention and Exhibition Center, Zijingshan Hotel' : '国际会展中心、紫荆山宾馆'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727423281&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153370423281&key=9" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">14:00-17:00</div>
                <div class="td">{{en ? 'Talent Recruitment Session for Zhengzhou Airport Economy Zone' : '郑州航空港经济综合实验区招才引智专场启动仪式'}}</div>
                <div class="td">{{en ? 'Expo Garden Jianguo Hotel' : '园博园建国饭店'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727660750&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372660750&key=0" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">14:30-17:00</div>
                <div class="td">{{en ? 'Talent Recruitment Session for China (Henan) Pilot Free Trade Zone' : '中国（河南）自由贸易试验区招才引智专场启动仪式'}}</div>
                <div class="td">{{en ? 'Millennium Hall on F3, JW Marriott Hotel' : '绿地JW万豪酒店三楼千玺宴会厅'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727637218&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372737218&key=1" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">15:00-18:00</div>
                <div class="td">{{en ? 'Talent Recruitment for Zheng-Luo-Xin National Innovation Demonstration Area & Leading Technological Innovation Talent (Group) Recruitment Session' : '郑洛新国家自主创新示范区招才引智暨科技创新领军人才（团队）招聘专场启动仪式'}}</div>
                <div class="td">{{en ? 'Taishi Hall of Zhengzhou International Convention and Exhibition Center' : '郑州国际会展中心太室厅'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727616203&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372616203&key=2" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">15:00-18:00</div>
                <div class="td">{{en ? '“Healthy Henan” Talent Recruitment Session' : '“健康河南”招才引智专场启动仪式'}}</div>
                <div class="td">{{en ? 'Dahe Hall of Zhengzhou International Convention and Exhibition Center' : '郑州国际会展中心大河厅'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727589328&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372589328&key=3" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">15:30-16:30</div>
                <div class="td">{{en ? 'High-level Talent Recruitment Session for Colleges and Universities' : '高等院校引进高层次人才专场启动仪式'}}</div>
                <div class="td">{{en ? 'Xuanyuan Hall at Convention Center C' : '郑州国际会展中心轩辕堂C厅'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727573218&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372573218&key=4" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">14:00-15:00</div>
                <div class="td">{{en ? 'Overseas High-level Talents (Returned Talents) Program Matchmaking Session' : '海外高层次人才暨项目对接洽谈专场启动仪式'}}</div>
                <div class="td">{{en ? 'Zhongyuan Hall of Sheraton Hotel' : '喜来登酒店中原厅'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727471015&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153370471015&key=6" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">14:30-17:30</div>
                <div class="td">{{en ? 'Highly Skilled Talent Recruitment Session' : '高技能人才招聘专场启动仪式'}}</div>
                <div class="td">{{en ? 'VIP1 meeting room of Zhengzhou International Convention and Exhibition Center' : '郑州国际会展中心VIP1会议室'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727447921&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153370447921&key=7" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">15:00-16:30</div>
                <div class="td">{{en ? 'Talent (Group) Outcome Exhibition & Recruitment Session for All Cities' : '“智汇郑州”高层次人才暨项目对接洽谈专场启动仪式'}}</div>
                <div class="td">{{en ? 'Xuanyuan Hall at Convention Center B' : '郑州国际会展中心轩辕B'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727436593&key=0" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372436593&key=8" v-if="en">more</a>
                </div>
              </div>
            </div>
          </div>
          <div class="process-con" key="1028" v-if="currentTab2 === 2">
            <div class="table">
              <div class="th">
                <div class="td">{{en ? 'Time' : '时间'}}</div>
                <div class="td">{{en ? 'Theme' : '主题'}}</div>
                <div class="td">{{en ? 'Venue' : '地点'}}</div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Academicians of Chinese Academy of Sciences and Chinese Academy of Engineering' : '两院院士河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728030218" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372830218" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Overseas Academicians' : '海外院士河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728018671" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372818671" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Returned Expert Service Group of Western Returned Scholars Association' : '欧美同学会海归专家服务团河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533728008093" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153378008093" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by China Postdoctor Technological Service Group' : '博士后科技服务团暨留学回国人员河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533727960296" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153372760296" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">10:00-18:00</div>
                <div class="td">{{en ? 'Visit to Henan by Medical and Health Specialists' : '医疗卫生专家河南行'}}</div>
                <div class="td">{{en ? 'Cities in Henan Province' : '各地市'}}
                  <a href="newsDetail.html?channel_code=HNXHD&cand01=1533727927750" v-if="!en">详情</a>
                  <a href="newsDetail.html?channel_code=HNXHD_EN&cand01=153377927750" v-if="en">more</a>
                </div>
              </div>
              <div class="tr">
                <div class="td">09:00-15:00</div>
                <div class="td">{{en ? 'On-site recruitment activities' : '大会现场招聘活动'}}</div>
                <div class="td">{{en ? 'Zone B, C, D, E, F in the exhibition center of Zhengzhou International Convention and Exhibition Center' : '郑州国际会展中心展览馆BCDEF区'}}</div>
              </div>
              <div class="tr">
                <div class="td">09:00-15:00</div>
                <div class="td">{{en ? '“Introduce Elites from Famous Universities to Henan” Session' : '“名校英才入豫计划”专场'}}</div>
                <div class="td">{{en ? 'Recruitment Zone in Zhengzhou International Convention and Exhibition Center' : '郑州国际会展中心大会招聘区'}}
                  <a href="subject.html?channel_code=SDZT&cand01=1533727487031&key=5" v-if="!en">详情</a>
                  <a href="subject.html?channel_code=SDZT_EN&cand01=153372487031&key=5" v-if="en">more</a>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="module" ref="dt">
      <div class="module-con">
        <div class="title">
          <p v-if="!en">大会动态</p>
          <p>GENERAL ASSEMBLY DYNAMICS</p>
        </div>
        <br>
        <iframe width="100%" height="650" class="share_self"  frameborder="0" scrolling="no" src="https://widget.weibo.com/weiboshow/index.php?language=&width=0&height=650&fansRow=1&ptype=1&speed=0&skin=1&isTitle=1&noborder=1&isWeibo=1&isFans=0&uid=6535737664&verifier=2e167da5&dpc=1"></iframe>
      </div>
    </div>
    <div class="module dt-box" ref="dt" id="dt" v-if="false">
      <div class="module-con">
        <div class="title">
          <p v-if="!en">大会动态</p>
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
          <a class="more" :href="'newsList.html?lang=' + (en ? 'en' : 'cn') + '#/module?channel_code=DHDT' + (en ? '_EN' : '')">{{en ? 'MORE' : '查看更多'}}</a>
        </div>
      </div>
    </div>
    <div class="module topics-box normal-bg" ref="topics" id="topics">
      <div class="module-con">
        <div class="title">
          <p v-if="!en">大会专题</p>
          <p>CONFERENCE TOPICS</p>
        </div>
        <div class="radius">
          <div class="radius-item" :class="currentTab1 === 0 ? 'radius-active' : ''" @click="handleCurrentTab1(0)">{{en ? 'Special Events' : '专题活动'}}</div>
          <div class="radius-item" :class="currentTab1 === 1 ? 'radius-active' : ''" @click="handleCurrentTab1(1)">{{en ? 'Tours in Henan' : '河南行活动'}}</div>
        </div>
        <transition name="el-fade-in" mode="out-in">
          <div class="topics-con topic-special" v-if="currentTab1 === 0" key="SDZT">
            <a :title="val.cand03" :href="'subject.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01 + '&key=' + key" class="topics-item" v-for="(val, key) in SDZT" :key="key">
              <div class="topics-img">
                <img :src="val.cand11" onload="handleBeauty(event)">
              </div>
              <div class="topics-info">
                <div style="height: 100%; width: 100%; overflow: hidden;">{{val.cand03}}</div>
              </div>
            </a>
          </div>
          <div class="topics-con" v-if="currentTab1 === 1" key="HNXHD">
            <a :title="val.cand03" :href="'newsDetail.html?channel_code=' + val.channelCode + '&cand01=' + val.cand01" class="topics-item" v-for="(val, key) in HNXHD" :key="key">
              <div class="topics-img">
                <img :src="val.cand11" onload="handleBeauty(event)">
              </div>
              <div class="topics-info">
                <div style="height: 100%; width: 100%; overflow: hidden;">{{val.cand03}}</div>
              </div>
            </a>
          </div>
        </transition>
      </div>
    </div>
    <div class="module guide-box" ref="guide" id="guide">
      <div class="module-con">
        <div class="title">
          <p v-if="!en">会议指南</p>
          <p>CONFERENCE GUIDE</p>
        </div>
      </div>
      <a target="_blank" href="http://map.baidu.com/?newmap=1&s=inf%26uid%3D5331383edccbf06ea2d2305e%26wd%3D%E9%83%91%E5%B7%9E%E5%9B%BD%E9%99%85%E4%BC%9A%E5%B1%95%E4%B8%AD%E5%BF%83%26all%3D1%26c%3D268&from=alamap&tpl=map_singlepoint">
        <img src="./static/guide-map.png" class="map">
      </a>
      <div class="module-con">
        <!--中文版交通方式-->
        <div class="card" v-if="!en">
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
              <img src="./static/plane.png" alt="">
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
        <!--中文版交通方式结束-->
        <!--英文版交通方式-->
        <div class="card" v-if="en">
          <div class="card-tit">
            <div class="card-tit-item" :style="'background:' + cards[0] + ';'" @mouseover="handleCard(0)">
              <img src="./static/train.png" alt="">
              <p><span style="margin: 10px 0 0 0; display: inline-block;" >TRAIN</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[1] + ';'" @mouseover="handleCard(1)">
              <img src="./static/bus.png" alt="">
              <p><span style="margin: 18px 0 0 0; display: inline-block;" >BUS</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[2] + ';'" @mouseover="handleCard(2)">
              <img src="./static/taxi.png" alt="">
              <p><span style="margin: 18px 0 0 0; display: inline-block;" >TAXI</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[3] + ';'" @mouseover="handleCard(3)">
              <img src="./static/train.png" alt="">
              <p><span style="margin: 18px 0 0 0; display: inline-block;" >METRO</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[4] + ';'" @mouseover="handleCard(4)">
              <img src="./static/plane.png" alt="">
              <p><span style="margin: 18px 0 0 0; display: inline-block;" >AIRCRAFT</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[5] + ';'" @mouseover="handleCard(5)">
              <img src="./static/hotel.png" alt="">
              <p><span style="display: inline-block; margin: 13px 0 0 -6px;">Surrounding hotels</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[6] + ';'" @mouseover="handleCard(6)">
              <img src="./static/food.png" alt="">
              <p><span>Catering brands</span></p>
            </div>
            <div class="card-tit-item" :style="'background:' + cards[7] + ';'" @mouseover="handleCard(7)">
              <img src="./static/scenery.png" alt="">
              <p><span style="display: inline-block; margin: 23px 0 0 0;">Attractions</span></p>
            </div>
          </div>
          <div class="card-con" :style="'background:' + cards[currentCard] + ';'">
            <div v-if="currentCard === 0">
              1) From Zhengzhou Railway Station: take metro Line 1 towards the New Campus of Henan University, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
              <br>2) From Zhengzhou East Railway Station: take metro Line 1 towards the Henan University of Technology, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
              <br>3) From Zhengzhou West Railway Station: Take No. 12 inter-zone bus towards west, get off at the Jianshexi Road and Fumin Road (Dazhuang) Station, walk 300 m to take metro Line 1 at Civic Center Station towards the New Campus of Henan University, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
            </div>
            <div v-if="currentCard === 1">
              1) From Zhengzhou Central Coach Station: take metro Line 1 towards the New Campus of Henan University, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
              <br>2) From Zhengzhou Master Coach Station: take bus (No. 551, No. 603, No. 81, No. 981) at Jingguang Road and Zhengtong Road Station and get off at West Square of Zhengzhou Railway Station, and then take metro Line 1 towards the New Campus of Henan University, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
              <br>3) From Zhengzhou South Coach Station: take No. 111 bus at the South Coach Station, get off at the Zijingshan Road and South 3rd Ring Road Station, and then take metro Line 2 to Zijingshan Station, transfer to Line 1 at Zijingshan Station, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
            </div>
            <div v-if="currentCard === 2">
              1) Take taxi or drive, by Zhongzhou Avenue and Huizhan Road, to 100 m Southwest of the intersection of Jiuru Road and Shangwu Inner Ring Road and then to the parking lot of the Convention & Exhibition Center;
              <br>2) Take taxi or drive, by Zhongzhou Avenue and Shangwu Inner Ring Road, to the Greenland Center at No. 2 Central Business District and then to the No. 1 South Parking Lot of the Millennium Plaza;
            </div>
            <div v-if="currentCard === 3">
              1) From Zhengzhou Railway Station: take metro Line 1 towards the New Campus of Henan University, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
              <br>2) From Zhengzhou East Railway Station: take metro Line 1 towards the Henan University of Technology, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
              <br>3) From Zhengzhou West Railway Station: Take No. 12 inter-zone bus towards west, get off at the Jianshexi Road and Fumin Road (Dazhuang) Station, walk 300 m to take metro Line 1 at Civic Center Station towards the New Campus of Henan University, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
            </div>
            <div v-if="currentCard === 4">
              1) Take Chengjiao Line towards the South 4th Ring Station at the Exit A or B of Xinzheng Airport Station, get off at South 4th Ring Station and then transfer to metro Line 2 towards Liuzhuang Station, get off at Zijingshan Station and transfer to metro Line 1 towards the New Campus of Henan University, get down at the Convention & Exhibition Center Station and get out from the Exit C2, and then walk 900 m northeast;
              <br>2) Take Chengjiao Line towards the South 4th Ring Station at the Exit A or B of Xinzheng Airport Station, get off at South 4th Ring Station and then transfer to metro Line 2 towards Liuzhuang Station, get off at Huanghe Road Station and get out from Exit D, and then take No. 23 bus at Huanghe Road and Huanyuan Road Station to the Convention & Exhibition Center Station;
            </div>
            <div v-if="currentCard === 5">
              1) JW Marriott Hotel Zhengzhou: 39/F, Millennium Plaza, No. 2 Central Business District; Tel: (0371)88828888;
              <br>2) A.T. Hotel (Zhengzhou CBD): 1/F, Unit 2, No. 25 Shangwu Inner Ring Road, Zhengdong New District; Tel: (0371)55570111;
              <br>3) Xingmu Hotel: 18/F, Unit 1, Sinograin Building (intersection of Shangwu Inner Ring Road and E Shangwu 4th Street); Tel: (0371)55678669;
              <br>4) Zhengzhou Zhengzhan Fashion Hotel (Zhengzhou Convention & Exhibition Center): 11/F, Unit 1, Sinograin Building, No. 28 Shangwu Inner Ring Road; Tel: 17760778259;
              <br>5) Weijia Hotel (Zhengzhou Convention & Exhibition Center): 1/F, No. 25 Building, Future International, Shangwu Inner Ring Road; Tel: (0371)55238989;
            </div>
            <div v-if="currentCard === 6">
              1) Gushi Renjia (E Shangwu 4th Street): 50 m South of the Intersection of Shangwu Inner Ring Road and E Shangwu 4th Street; Tel: (0371)55952088,(0371)55952089;
              <br>2) Jiaorong Chuanwei Lakeside Restaurant: No. 3 Shop, Yuhu Path, Millennium Plaza; Tel: (0371)55500500
              <br>3) JW Marriott Hotel Zhengzhou – Marriott Chinese Restaurant: 39/F, Millennium Plaza, No. 2 Central Business District (Zhengzhou Convention & Exhibition Center); Tel: (0371)87078200;
              <br>4) Starbucks (Zhengzhou Greenland Plaza): B1/F, Millennium Plaza, Greenland Center, Shangwu Inner Ring Road; Tel: (0371)55377576
              <br>5) 18PLUS (Zhengdong CBD): No. 1-2 Shop, CBD Millennium Inner Ring, Shangwu Inner Ring Road (JW Marriott Hotel Zhengzhou); Tel: (0371)67000000;
            </div>
            <div v-if="currentCard === 7">
              1) Fantawild Adventure: South of the Intersection of Zhengzhou-Kaifeng Expressway and Renwen Road (across from the north door of the Zhengzhou Green Expo Garden);
              <br>2) Century Amusement Park: No. 1 Shihua Road, Guancheng Hui District, Zhengzhou; Tel: (0371)63282288;
              <br>3) Henan Museum: No. 8, N Nongye Road, Zhengzhou; (0371)63511237;
              <br>4) Zhengzhou Aquariums: No. 86, Guoji Road, Jinshui District, Zhengzhou City, Henan Province; Tel: (0371)63567403,(0371)63567402;
              <br>5) Zhengdong New District Wetland Park: Zhengdong New District Wetland Park, Jinshui District, Zhengzhou City, Henan Province (N Shangwu Inner Ring Road);
            </div>
          </div>
        </div>
        <!--英文版交通方式结束-->
      </div>
    </div>
    <div class="module supporting-box normal-bg" ref="supporting" id="supporting">
      <div class="module-con">
        <div class="title">
          <p v-if="!en">合作媒体</p>
          <p>ASSOCIATED MEDIA</p>
        </div>
        <div class="supporting-con">
          <a target="_blank" :href="val.ccmw03" class="supporting-item" v-for="(val, key) in ZZDW" :key="key" :title="val.ccmw02">
            <img :src="val.ccmw07" onload="handleBeauty(event)">
          </a>
        </div>
      </div>
    </div>
    <div class="module supporting-box normal-bg" ref="media">
      <div class="module-con">
        <div class="title">
          <p v-if="!en">友情链接</p>
          <p>FRIENDSHIP LINK</p>
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
import {queryParse} from '../../common/js/utils'
import ThemeHeader from '../../components/theme-header/theme-header.vue'

export default {
  components: {
    ThemeHeader,
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
      HZMT: [],
      lives: [],
      en: queryParse(location.search).lang === 'en'
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
      if (!this.$refs[el]) return
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
        channel_code: 'DHDT' + (this.en ? '_EN' : '')
      }).then(res => {
        this.DHDT1 = res.result
      })
    },
    getDHDT2() { // 大会动态右侧图片
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 4,
        currentPage: 2,
        countsNum: 50,
        channel_code: 'DHDT' + (this.en ? '_EN' : '')
      }).then(res => {
        this.DHDT2 = res.result
      })
    },
    getSDZT() { // 十大专题
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 10,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'SDZT' + (this.en ? '_EN' : '')
      }).then(res => {
        this.SDZT = res.result
      })
    },
    getHNXHD() { // 河南行活动
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 6,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'HNXHD' + (this.en ? '_EN' : '')
      }).then(res => {
        this.HNXHD = res.result
      })
    },
    getZZDW() { // 合作媒体
      this.$post('/service/business/fm/link/links/getLinksList.xf', {
        ccmw05: 0
      }).then(res => {
        this.ZZDW = res.result.links
      })
    },
    getHZMT() { // 友情链接
      this.$post('/service/business/fm/link/links/getLinksList.xf', {
        ccmw05: 1
      }).then(res => {
        this.HZMT = res.result.links
      })
    },
    getLives() { // 开幕式新闻
      this.$post('/service/business/sms/sms/getContentList', {
        rowsNum: 4,
        currentPage: 1,
        countsNum: 50,
        channel_code: 'KMSZB' + (this.en ? '_EN' : '')
      }).then(res => {
        this.lives = res.result
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
    this.getLives()
    this.getHZMT()
  },
  mounted() {
    const to = queryParse(location.search).to
    if (to) {
      location.hash = '#' + to
    }
    $(window).on('hashchange', () => {
      this.scrollTo(location.hash.substr(2))
    })
  }
}
</script>
<style lang="scss">
  @import "../../common/style/variables";
  a{
    text-decoration: none;
  }
  .theme-page{
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
      &.en{
        height: 1100px;
        background-size: 110%;
        .about-text{
          left: 130px;
          top: 114px;
          width: 997px;
        }
      }
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
      background: url("static/radius.png") no-repeat;
      background-size: 100% 100%;
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
            white-space: normal;
            vertical-align: middle;
            &:nth-child(1){
              width: 25%;
            }
            &:nth-child(2){
              width: 50%;
            }
            &:nth-child(3){
              width: 25%;
            }
            a{
              font-size: 14px;
              color: $--color-primary;
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
      padding: 75px 0;
      .topics-con{
        padding: 30px 0 0 0;
        @include clearFixed;
      }
      .topic-special{
        .topics-item{
          &:last-child{
            width: 100%;
            .topics-img{
              height: 192px;
            }
            .topics-info{
              height: 51px;
              div{
                @include ellipsis;
              }
            }
          }
        }
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
          overflow: hidden;
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
          height: 137px;
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
  .live-con{
    background: url("./static/live-bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .live{
    width: 1200px;
    margin: 0 auto;
    padding: 75px 0;
    position: relative;
    .left-top{
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 124px;
      background: url("./static/live-1.png") no-repeat;
      background-size: 100% 100%;
      padding: 0 10px;
      span{
        color: #fff;
        display: inline-block;
        width: 100%;
        text-align: center;
        padding: 5px 0;
        &:nth-child(1){
          font-size: 36px;
          border-bottom: 1px solid $--color-primary;
        }
        &:nth-child(2){
          font-size: 16px;
        }
      }
    }
    .tit{
      text-align: center;
      color: #fff;
      span{
        display: inline-block;
        width: 100%;
        &:nth-child(1){
          font-size: 32px;
        }
        &:nth-child(2){
          font-size: 16px;
        }
      }
    }
    .time{
      text-align: center;
      font-size: 30px;
      color: #fff001;
      padding: 10px 0;
    }
    .live-list{
      padding: 20px 0 40px 0;
      @include clearFixed;
      .item{
        width: 382px;
        height: 150px;
        margin: 0 8px;
        float: left;
        padding: 10px;
        background: url("./static/live-2.png");
        background-size: 100% 100%;
        display: block;
        img{
          width: 100%;
          &:hover{
            opacity: .9;
          }
        }
      }
    }
    .live-news-list{
      border-top: 1px solid #493c64;
      padding: 40px 0 20px 0;
      @include clearFixed;
    }
    .live-news-item{
      width: 278px;
      height: 247px;
      position: relative;
      float: left;
      margin-bottom: 28px;
      margin-right: 28px;
      overflow: hidden;
      display: block;
      &:nth-child(4n){
        margin-right: 0;
      }
      &:hover{
        opacity: .9;
      }
      .tip{
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
    }
  }
</style>
