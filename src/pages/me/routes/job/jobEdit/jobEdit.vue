<template>
  <div class="job-edit">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="form">
      <el-form-item label="职位类别" prop="bca111">
        <xf-cascader placeholder="请选择职位类别" :options="dictionaries.CRAFT_AS" :show-all-levels="false" v-model="form.bca111"></xf-cascader>
      </el-form-item>
      <el-form-item label="职位名称" prop="cca113">
        <el-input v-model="form.cca113" placeholder="请输入职位名称"></el-input>
      </el-form-item>
      <el-form-item label="招聘人数" prop="acb21r">
        <el-input v-model="form.acb21r" placeholder="请输入招聘人数"></el-input>
      </el-form-item>
      <el-form-item label="失效日期" prop="aae031">
        <el-input v-model="form.aae031" disabled></el-input>
        <span class="tip red">默认有效期为90天</span>
      </el-form-item>
      <el-form-item label="学历要求" prop="aac011">
        <el-select v-model="form.aac011" placeholder="请选择学历要求">
          <el-option v-for="item in dictionaries.TAB_EDUCATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="薪资待遇" prop="acc034">
        <el-select v-model="form.acc034" placeholder="请选择薪资待遇">
          <el-option v-for="item in dictionaries.TAB_SALARY" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验" prop="acc217">
        <el-select v-model="form.acc217" placeholder="请选择工作经验">
          <el-option v-for="item in dictionaries.TAB_WORKYEARS" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业要求" prop="acc01g">
        <xf-cascader :options="dictionaries.TAB_CITY" v-model="form.acc01g" placeholder="请选择专业要求"></xf-cascader>
        <!--<span class="tip red">不选择即为无专业要求</span>-->
      </el-form-item>
      <el-form-item label="福利待遇" prop="acc214">
        <el-select
          v-model="form.acc214"
          multiple
          collapse-tags
          placeholder="请选择福利待遇">
          <el-option
            v-for="item in dictionaries.TAB_WELFARE"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作地点" prop="acb202">
        <xf-cascader placeholder="请选择工作地点" change-on-select :options="dictionaries.TAB_CITY" v-model="form.acb202"></xf-cascader>
      </el-form-item>
      <el-form-item label="工作性质" prop="acb21i">
        <el-select v-model="form.acb21i" placeholder="请选择工作性质">
          <el-option v-for="item in dictionaries.TAB_NATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="食宿情况" prop="acb228">
        <el-select v-model="form.acb228" placeholder="请选择食宿情况">
          <el-option v-for="item in dictionaries.TAB_SREQUIREMENT" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠政策" prop="favouredPolicy">
        <el-input v-model="form.favouredPolicy" placeholder="请输入优惠政策"></el-input>
      </el-form-item>
      <el-form-item label="职位描述" prop="cca114">
        <el-input type="textarea" :rows="6" v-model="form.cca114" placeholder="请输入职位描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
        <el-button @click="$router.go(-1)" v-if="$route.query.acb210">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {echo} from '../../../../../common/js/utils'
import {mapGetters} from 'vuex'
import XfCascader from '../../../../../components/xf-cascader/xf-cascader.vue'

export default {
  components: {XfCascader},
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  data() {
    return {
      loading: false,
      form: {
        bca111: '', // 职位类别code
        bca112: '', // 职位类别
        cca113: '', // 职位名称
        acb21r: '', // 招聘人数
        aae030: '', // 发布日期
        aae031: '', // 失效日期（默认90天后失效）
        aac011: '', // 学历要求
        acc034: '', // 薪资要求
        acc217: '', // 工作经验
        acc01g: '', // 专业要求（可多选）
        acc214: [], // 福利待遇（可多选）
        acb202: '', // 工作地点code
        bcb202: '', // 工作地点
        acb21i: '', // 工作性质
        acb228: '', // 食宿情况
        cca114: '', // 职位描述
        favouredPolicy: '' // 优惠政策
      },
      rules: {
        bca111: [{
          required: true,
          message: '请选择职位类别',
          trigger: 'change'
        }],
        cca113: [{
          required: true,
          message: '请输入职位名称',
          trigger: 'change'
        }, {
          max: 20,
          message: '最多20个字符',
          trigger: 'change'
        }],
        acb21r: [{
          required: true,
          message: '请输入招聘人数',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[1-9][0-9]{0,4}$/.test(value)) {
              callback()
            } else {
              callback(new Error('只能输入1-99999的数字'))
            }
          },
          trigger: 'change'
        }],
        acc034: [{
          required: true,
          message: '请选择薪资待遇',
          trigger: 'change'
        }],
        acc217: [{
          required: true,
          message: '请选择工作经验',
          trigger: 'change'
        }],
        acb202: [{
          required: true,
          message: '请选择工作地点',
          trigger: 'change'
        }],
        acb21i: [{
          required: true,
          message: '请选择工作性质',
          trigger: 'change'
        }],
        acb228: [{
          required: true,
          message: '请选择食宿情况',
          trigger: 'change'
        }],
        cca114: [{
          required: true,
          message: '请输入岗位描述',
          trigger: 'change'
        }, {
          max: 500,
          message: '最多500个字符',
          trigger: 'change'
        }],
        favouredPolicy: [{
          max: 30,
          message: '最多30个字符',
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    handleRouter(router) {
      echo(this.form)
      if (router.query.acb210) {
        this.getInfo(router.query.acb210)
      } else {
        echo(this.form)
        let now = new Date()
        this.form.aae030 = this.$dateFormat(now, 'yyyy-MM-dd')
        this.form.aae031 = this.$dateFormat(now.setTime(now.getTime() + 1000 * 60 * 60 * 24 * 90), 'yyyy-MM-dd')
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const form = Object.assign({
            aab001: this.$userInfo.aab001
          }, this.form)
          form.acc214 = form.acc214.sort((a, b) => a - b).join(',')
          if (this.$route.query.acb210) {
            form.acb210 = this.$route.query.acb210
          }
          this.$post('/service/business/corp/corpPositon/savePositionInfo', form).then(res => {
            this.loading = false
            if (res.error.result === 1) {
              this.$alert(res.error.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.go(-1)
                }
              })
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    getInfo(acb210) {
      const loading = this.$loading({
        target: this.$refs.form,
        fullscreen: false
      })
      this.$post('/service/business/corp/corpPositon/editPositionInfo', {acb210}).then(res => {
        res.result.acc214 = res.result.acc214 ? res.result.acc214.split(',') : []
        echo(this.form, res.result)
        loading.close()
      }).catch(() => {
        loading.close()
      })
    }
  },
  created() {
    this.handleRouter(this.$route)
    this.$watch('$route', this.handleRouter)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .form{
    padding: 20px 0;
    .el-input,.el-select,.el-cascader{
      width: 300px;
    }
    .location{
      margin: 0 0 0 10px;
    }
  }
  .tip{
    margin: 0 0 0 10px;
  }
  .red{
    color: red;
  }
</style>
