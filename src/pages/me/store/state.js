
const state = {
  dictionaries: { // 字典表
    TAB_AFFIL: [], // 政治面貌
    TAB_CITY: [], // 城市
    TAB_WELFARE: [], // 福利
    TAB_WORKYEARS: [], // 工作年限
    CRAFT_AS: [], // 职位
    TAB_SALARY: [], // 薪资
    TAB_SEX: [], // 性别
    TAB_NATURE: [], // 工作性质
    TAB_NATION: [], // 民族
    TAB_EDUCATION: [], // 学历
    TAB_MARRIAGE: [], // 婚姻状况
    TAB_CERTIFICATE_TYPE: [], // 技能证书
    INDUSTRY_AS: [], // 行业类型
    TAB_UNITNATURE: [], // 企业性质
    TAB_PSCALE: [], // 企业规模
    TAB_SREQUIREMENT: [], // 食宿情况
    tab_university_city: [], // 省份字典表（用于选择院校）
    tab_major_type: [], // 专业类别
    TAB_SECURITY: [] // 密保问题
  },
  phoneOpen: false,
  corpInfo: {}, // 企业信息,
  authenInfo: { // 企业认证状态
    authenState: 2, // 0为未认证，1为正在认证，2为已认证，3为认证失败，4、未绑定微信
    infoState: 1 // 0为基本信息未完善
  },
  personalInfo: {} // 个人信息
}

export default state
