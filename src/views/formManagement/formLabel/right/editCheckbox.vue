<template>
  <div class="container">
    <form>
      <div class="section-container">
        <div class="section-title">{{activeCenterBackData.name}}</div>
        <div class="section-collapse_container">
          <div class="section-content">
            <div class="ant-form-item">
              <div class="ant-form-item-label">标题</div>
              <div class="ant-form-item-control-wrapper">
                <el-input size="mini" v-model="activeCenterBackData.title" :placeholder="activeCenterBackData.titlePlaceholder"></el-input>
              </div>
            </div>
            <div class="ant-form-item">
              <div class="ant-form-item-label">选项</div>
              <div class="ant-form-item-control-wrapper">
                <draggable element="div" v-model="activeCenterBackData.defaultArr" class="list-group"
                  :options="dragOptions" :move="onMove" @update="datadragEnd"
                  @start="isDragging = true" @end="isDragging = false"
                >
                  <div class="choice-item" v-for="(el, index) in activeCenterBackData.defaultArr" :key="index">
                    <i class="el-icon-rank"></i>
                    <el-checkbox v-model="el.checked"></el-checkbox>
                    <el-input size="mini" style="width: 70%;" class="inputM" v-model="el.lable"></el-input>
                    <i class="el-icon-delete" @click="deleteLable(index)"></i>
                  </div>
                </draggable>
                <el-button class="add-new-choice-wrapper" size="small" type="primary" plain @click="addItem">添加项</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="section-title">校验</div>
        <div class="section-collapse_container">
          <div class="section-content">
            <div class="ant-form-item">
              <el-checkbox v-model="activeCenterBackData.isMustFill">必须填</el-checkbox>
            </div>
          </div>
        </div>
        <div class="section-title">布局设置</div>
        <div class="section-collapse_container">
          <div class="section-content">
            <div class="ant-form-item">
              排列方式<el-select v-model="activeCenterBackData.direction" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "editCheckbox",
  components: {draggable},
  props: {
    activeCenterData: Object
  }, 
  data() {
    return {
      activeCenterBackData: [],
      options: [
        {label: '纵向',value: 0},
        {label: '横向',value: 1}
      ],
      isDragging: false,
      delayedDragging: false,
      defaultNewArr: []
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        sort: true,
        scroll: true,
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },
  mounted () {
    this.activeCenterBackData = this.activeCenterData
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      })
    },
    activeCenterData (newVal) {
      this.activeCenterBackData = newVal
    },
    'activeCenterBackData.title': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.defaultArr': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.defaultVal': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.isMustFill': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.direction': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    }
  },
  methods: {
    onMove({ relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    datadragEnd (evt) {
      console.log('拖动前的索引：' + evt.oldIndex);
      console.log('拖动后的索引：' + evt.newIndex);
    },
    deleteLable (index) {
      this.activeCenterBackData.defaultArr = this.activeCenterBackData.defaultArr.filter((el, i) => {
        return index !== i
      })
    },
    num () {
      var mm = Math.random()
      var six = ""
      if (mm > 0.1) {
        six = Math.round(mm * 1000)
      } else {
        mm += 0.1
        six = Math.round(mm * 1000)
      }
      return six
    },
    addItem () {
      this.activeCenterBackData.defaultArr.push({checked: false, lable: '选择'})
    }
  }
};
</script>

<style lang="scss" scoped>
.section-container {
  .section-title {
    font-weight: 600;
    background-color: #fff;
    padding: 4px 14px;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    text-transform: capitalize;
  }
  .section-collapse_container {
    .section-content {
      padding: 14px;
      .ant-form-item {
        font-size: 14px;
        margin-bottom: 14px;
        .ant-form-item-label {
          margin-bottom: 4px;
        }
        .ant-form-item-control-wrapper {
          .choice-item {
            display: flex;
            align-items: center;
            .el-icon-rank {
              cursor: all-scroll;
              color: #b3b3b3;
              font-size: 20px;
              margin-right: 5px;
            }
            .el-icon-delete {
              cursor: pointer;
              color: #b3b3b3;
              font-size: 20px;
              margin-left: 5px;
            }
            .inputM {
              margin-left: 7px;
            }
          }
          .choice-item:not(:last-child) {
            margin-bottom: 7px;
          }
        }
        .add-new-choice-wrapper {
          display: block;
          width: 70%;
          margin-top: 7px;
          margin-left: 47px;
        }
      }
    }
  }
}
</style>
