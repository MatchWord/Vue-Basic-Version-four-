<template>
 <el-dialog
  title="基础配置"
  width="650px"
  center
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :destroy-on-close="true"
  :visible.sync="dialogVisible"
  :before-close="handleClose">
    <common-wrapper >
      <el-form ref="basicForm" :model="basicForm" :rules="rules" label-width="65px" size="mini" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="列数X" prop="x">
              <el-input type="number" v-model="basicForm.x" clearable min="0" max="12"
              placeholder="范围0~11,起始位置一般为0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行数Y" prop="y">
              <el-input type="number" v-model="basicForm.y" clearable min="0"
              placeholder="大于或者等于0的自然数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="宽度W" prop="w">
              <el-input type="number" v-model="basicForm.w" clearable min="1"
              placeholder="范围1~12,整行一般为12"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高度H" prop="h">
              <el-input type="number" v-model="basicForm.h" clearable min="5" max="15"
              placeholder="5~15之间的自然数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </common-wrapper>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('basicForm')">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EchartDialog',
  data () {
    var validateX = (rule, value, callback) => {
      if (value * 1 < 0 ||  value * 1 >= 12) {
        callback(new Error('请输入0~11之间的数值'))
      } else {
        callback()
      }
    }
    var validateW = (rule, value, callback) => {
      if (value * 1 <= 0 ||  value * 1 > 12) {
        callback(new Error('请输入1~12之间的数值'))
      } else {
        callback()
      }
    }
    var validateH = (rule, value, callback) => {
      if (value * 1 < 5 ||  value * 1 > 15) {
        callback(new Error('请输入5~15之间的数值'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      basicForm: {
        x: '',
        y: '',
        w: '',
        h: ''
      },
      newLayoutData: [],
      rules: {
        x: [
          { required: true, message: '请输入起始坐标X的位置信息', trigger: 'blur' },
          { validator: validateX, trigger: 'blur' }
        ],
        w: [
          { required: true, message: '请输入宽度比例，整行为12', trigger: 'blur' },
          { validator: validateW, trigger: 'blur' }
        ],
        h: [
          { required: true, message: '请输入高度比例，建议5~12', trigger: 'blur' },
          { validator: validateH, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    isShowdialog: Boolean,
    comParams: Object,
    layoutData: Array
  },
  computed: {
    ...mapGetters(['theme'])
  },
  mounted () {},
  watch: {
    // 显示dialog
    isShowdialog: function (val) {
      this.dialogVisible = val
    },
    // 模块数据
    layoutData: function (arr) {
      if (arr.length) {
        this.newLayoutData = arr
      }
    }
  },
  methods: {
    // 取消
    handleClose(done) {
      this.dialogVisible = false
      this.$emit('update:isShowdialog', false)
      this.$refs['basicForm'].resetFields()
    },
    // 保存
    submitForm (basicForm) {
      this.$refs[basicForm].validate((valid) => {
        if (valid) {
          this.newLayoutData.push(this.handleData())
          this.$emit('layoutDataBack', this.newLayoutData)
          this.handleClose()
        } else {
          return false;
        }
      })
    },
    // 处理数据
    handleData () {
      return {
        x: this.basicForm.x * 1,
        y: this.basicForm.y * 1,
        w: this.basicForm.w * 1,
        h: this.basicForm.h * 1,
        i: this.newLayoutData.length ? this.newLayoutData.length + '' : '0',
        component: this.comParams.comName
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


