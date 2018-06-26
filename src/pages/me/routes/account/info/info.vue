<!--企业基本信息-->
<template>
  <div class="corp-info">
    <el-form ref="form" :model="form" label-width="100px" class="form">
      <el-form-item label="企业名" prop="aab004">
        <el-input v-model="form.aab004" placeholder="请输入企业名"></el-input>
      </el-form-item>
      <el-form-item label="企业性质" prop="aab019">
        <el-select v-model="form.aab019" placeholder="请选择企业性质">
          <el-option v-for="item in dictionaries.TAB_UNITNATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业类型" prop="ccpr10">
        <el-select v-model="form.ccpr10" placeholder="请选择行业类型">
          <el-option v-for="item in dictionaries.INDUSTRY_AS" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员规模" prop="aab056">
        <el-select v-model="form.aab056" placeholder="请选择企业性质">
          <el-option v-for="item in dictionaries.TAB_PSCALE" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区域" prop="aab301">
        <xf-cascader :options="dictionaries.TAB_CITY" v-model="form.aab301" placeholder="请选择所在区域"></xf-cascader>
      </el-form-item>
      <el-form-item label="联系地址" prop="aae006">
        <el-input v-model="form.aae006" placeholder="请输入联系地址"></el-input>
        <el-button icon="el-icon-location" class="location" circle title="点击在地图上选取坐标" @click="dialogVisible = true"></el-button>
        <span class="tip">未选取坐标</span>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择坐标"
      :visible.sync="dialogVisible"
      width="500px">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
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
      dialogVisible: false,
      form: {
        aab004: '', // 企业名称
        aab019: '', // 企业性质
        ccpr10: '', // 行业类型
        aab056: '', // 人员规模
        aaa021: '', // 所在区域
        aab301: '', // 所在区域code
        aae006: '', // 地图地址
        aab013: '', // 法定代表人
        aae004: '', // 联系人
        aae005: '', // 手机号
        acb205: '', // 乘车路线
        aae016: '', // 公司网址
        acb206: '', // 公司简介
        cabq02: '', // 经度
        cabq03: '' // 维度
      }
    }
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
  .green{
    color: green;
  }
</style>
