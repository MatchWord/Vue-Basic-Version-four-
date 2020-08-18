<template>
  <div class="form-edit" :style="{backgroundImage: 'url(' + bgPic + ')' }">
    <form class="published-form" v-if="newFormListData.length">
      <div class="form-body">
        <div class="ant-row">
          <draggable element="div" v-model="newFormListData" class="list-group"
            :options="dragOptions" :move="onMove" @update="datadragEnd"
            @start="isDragging = true" @end="isDragging = false"
          >
            <!-- <transition-group type="transition" :name="'flip-list'"> -->
              <div class="fieldDraggableWrapper" v-for="(element, index) in newFormListData" :key="element.order">
                <div :class="[element.isSelect * 1 === 1 ? 'active' : '', 'field-wrapper']" @click="elementClick(element, index)">
                  <div class="field-container">
                    <div class="ant-form-item">
                      <div class="ant-form-item-label">
                        <label :class="[element.isMustFill === true ? 'ant-form-item-required' : '']">
                          <span class="label-item">{{element.title || element.titlePlaceholder}}</span>
                        </label>
                      </div>
                    </div>
                    <div class="ant-form-item-control-wrapper">
                      <div class="ant-form-item-control" v-if="element.type === 'input'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <el-input v-model="element.defaultVal" readonly :placeholder="element.placeholder"></el-input>
                        </span>
                      </div>
                      <div class="ant-form-item-control" v-if="element.type === 'textarea'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <el-input type="textarea" :rows="3" v-model="element.defaultVal" readonly
                          :placeholder="element.placeholder"></el-input>
                        </span>
                      </div>
                      <div class="ant-form-item-control" v-if="element.type === 'radio'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <el-radio-group v-model="element.defaultVal">
                            <span v-for="(i, index) in element.defaultArr" :key="index">
                              <el-radio :class="[element.direction === 0 ? 'direction' : '']" :label="i.lableV">{{i.val}}</el-radio>
                            </span>
                          </el-radio-group>
                          <div class="mask"></div>
                        </span>
                      </div>
                      <div class="ant-form-item-control" v-if="element.type === 'checkbox'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <span v-for="(i, index) in element.defaultArr" :key="index">
                            <el-checkbox :class="[element.direction === 0 ? 'direction' : '']" v-model="i.checked">{{i.lable}}</el-checkbox>
                          </span>
                          <div class="mask"></div>
                        </span>
                      </div>
                      <div class="ant-form-item-control" v-if="element.type === 'edit'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <editUtils :defaultVal.sync="element.defaultVal" />
                        </span>
                      </div>
                      <div class="ant-form-item-control" v-if="element.type === 'TimePicker'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <el-input v-model="element.defaultVal" readonly :placeholder="element.placeholder"></el-input>
                        </span>
                      </div>
                      <div class="ant-form-item-control" v-if="element.type === 'DatePicker'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <el-input v-model="element.defaultVal" readonly :placeholder="element.placeholder"></el-input>
                        </span>
                      </div>
                      <div class="ant-form-item-control" v-if="element.type === 'DateTimePicker'">
                        <span class="ant-input-affix-wrapper" :style="{ width: (element.widthPos * 100) + '%' }">
                          <el-input v-model="element.defaultVal" readonly :placeholder="element.placeholder"></el-input>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="actions">
                    <div class="actions_position">
                      <el-button class="btn-ud" icon="el-icon-upload2" size="mini" title="上移" @click="moveItem(element, 'up')"></el-button>
                      <el-button class="btn-ud" icon="el-icon-download" size="mini" title="下移" @click="moveItem(element, 'down')"></el-button>
                    </div>
                    <div class="actions_mutation">
                      <el-button type="primary" icon="el-icon-document-copy" title="复制" circle @click="copyItem(element, index)"></el-button>
                      <el-button type="danger" icon="el-icon-delete" title="删除" circle @click="delectItem(element, index)"></el-button>
                      </div>
                  </div>
                </div>
              </div>
            <!-- </transition-group> -->
          </draggable>
        </div>
        <div class="setting-footer">
          <el-button class="btnSave" type="primary" @click="submit">提交</el-button>
        </div>
      </div>
    </form>
    <div class="no-data" v-if="!newFormListData.length">
      <i class="tip el-icon-edit-outline"></i>
      <div class="tip">没有数据字段</div>
      <div class="tip">请在左侧添加字段</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
// 自定义组件
import editUtils from './editUtils'
export default {
  name: 'centerCom',
  components: {
    draggable,
    editUtils
  },
  props: {
    formListDataCenter: Array,
    selectIndex: Number
  },
  data () {
    return {
      newFormListData: [],
      activeCenterData: {},
      activeRightData: {},
      isDragging: false,
      delayedDragging: false,
      bgPic: ''
    }
  },
  mounted () {
    this.bgPic = require('../img/' + this.selectIndex + '.jpg')
  },
  computed: {
    ...mapGetters(['theme']),
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        sort: true,
        scroll: true,
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    listString () {
      return JSON.stringify(this.newFormListData, null, 2)
    },
    systemThemeColor: function () {
      return this.$store.getters.theme
    }
  },
  watch: {
    formListDataCenter (newVal) {
      this.newFormListData = newVal
    },
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    },
    selectIndex (newVal) {
      this.bgPic = require('../img/' + newVal + '.jpg')
    }
  },
  methods: {
    num () {
      var mm = Math.random()
      var six = ''
      if (mm > 0.1) {
        six = Math.round(mm * 1000000)
      } else {
        mm += 0.1
        six = Math.round(mm * 1000000)
      }
      return six
    },
    backData () {
      this.$emit('centerBackClick', this.newFormListData, this.activeCenterData)
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    datadragEnd (evt) {
      // console.log('拖动前的索引：' + evt.oldIndex);
      // console.log('拖动后的索引：' + evt.newIndex);
      this.newFormListData = this.newFormListData.map((item, index) => {
        return Object.assign({}, item, {orderNew: index, order: index})
      })
      this.backData()
    },
    // 单行删除
    delectItem (item) {
      this.newFormListData = this.newFormListData.filter(el => {
        return el.orderNew !== item.orderNew
      })
      this.activeCenterData = {}
      setTimeout(() => {
        this.newFormListData = this.newFormListData.map((obj, index) => {
          return Object.assign({}, obj, {isSelect: 0, orderNew: index, order: index})
        })
        this.backData()
      }, 100)
    },
    // 单行点击
    elementClick (obj) {
      this.newFormListData = this.newFormListData.map((item, index) => {
        if (obj.orderNew === item.orderNew) {
          this.activeCenterData = Object.assign({}, item, {isSelect: 1})
          return Object.assign({}, item, {isSelect: 1})
        }
        return Object.assign({}, item, {isSelect: 0})
      })
      this.backData()
    },
    // 单行复制
    copyItem (item) {
      let newItem = {}
      if (item.defaultArr) {
        newItem = Object.assign({}, item, {isSelect: 0, orderNew: this.newFormListData.length, order: this.newFormListData.length, itemId: this.num(), defaultArr: JSON.parse(JSON.stringify(item.defaultArr))})
      } else {
        newItem = Object.assign({}, item, {isSelect: 0, orderNew: this.newFormListData.length, order: this.newFormListData.length, itemId: this.num()})
      }
      this.newFormListData.splice(item.orderNew, 0, newItem)
      this.newFormListData = this.newFormListData.map((item, index) => {
        return Object.assign({}, item, {orderNew: index, order: index})
      })
      this.backData()
    },
    // 上移 // 下移
    moveItem (item, str) {
      if (item.orderNew * 1 === 0 && str === 'up') return
      if (item.orderNew * 1 === this.newFormListData.length - 1 && str === 'down') return
      this.newFormListData = this.newFormListData.filter((el, i) => {
        return el.orderNew !== item.orderNew
      })
      if (str === 'up') {
        this.newFormListData.splice(item.orderNew - 1, 0, item)
      }
      if (str === 'down') {
        this.newFormListData.splice(item.orderNew + 1, 0, item)
      }
      setTimeout(() => {
        this.newFormListData = this.newFormListData.map((obj, index) => {
          return Object.assign({}, obj, {orderNew: index, order: index})
        })
        this.backData()
      }, 100)
    },
    submit () {
      this.newFormListData = this.newFormListData.map(item => {
        if (item.type === 'checkbox') {
          let newDefaultVal = []
          item.defaultArr.forEach(i => {
            if (i.checked) {
              newDefaultVal.push(i.val)
            }
          })
          return Object.assign({}, item, {defaultVal: newDefaultVal})
        } else {
          return item
        }
      })
      console.log(this.newFormListData)
      console.log(JSON.stringify(this.newFormListData))
    }
  }
}
</script>

<style lang="scss" scoped>
.form-edit {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .published-form {
    margin:0 auto 30px;
    max-width: 700px;
    background-color: #fff;
    .form-body {
      padding-bottom: 30px;
      counter-reset: section;
      border-color: rgb(195, 201, 208);
      .ant-row {
        position: relative;
        height: auto;
        margin-right: 0;
        margin-left: 0;
        zoom: 1;
        display: block;
        box-sizing: border-box;
        .fieldDraggableWrapper:hover {
          background-color: hsla(0,0%,95.7%,.7);
          cursor: pointer;
        }
        .fieldDraggableWrapper:active {
          background-color: #ffffff;
          cursor: mover;
        }
        .field-wrapper {
          position: relative;
          padding-left: 3px;
          padding-right: 3px;
          border: 1px dashed transparent;
          .field-container {
            padding: 15px;
            word-wrap: break-word;
            display: block;
            box-sizing: border-box;
            width: 100%;
            clear: left;
            position: relative;
            .ant-form-item {
              box-sizing: border-box;
              padding: 0;
              color: rgba(0,0,0,.65);
              font-size: 14px;
              font-variant: tabular-nums;
              line-height: 1.5;
              list-style: none;
              vertical-align: top;
              .ant-form-item-label {
                line-height: 1.4;
                padding-bottom: 4px;
                font-size: 14px;
                white-space: pre-wrap;
                text-align: left;
                word-break: break-all;
                .ant-form-item-required:before {
                  display: inline-block;
                  margin-right: 4px;
                  color: #f5222d;
                  font-size: 14px;
                  font-family: SimSun,sans-serif;
                  line-height: 1;
                  content: "*";
                }
                .label-item {
                  font-family: inherit;
                  font-size: 14px;
                  font-weight: bold;
                  color: rgb(34, 34, 34);
                }
              }
            }
            .ant-form-item-control-wrapper {
              width: 94%;
            }
            .ant-form-item-control {
              position: relative;
              line-height: 40px;
              zoom: 1;
              .ant-input-affix-wrapper {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                color: rgba(0,0,0,.65);
                font-size: 14px;
                font-variant: tabular-nums;
                line-height: 1.5;
                list-style: none;
                position: relative;
                display: inline-block;
                width: 50%;
                text-align: start;
                position: relative;
                .mask {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 0;
                  top: 0;
                  z-index: 4;
                }
                .direction {
                  display: block;
                  width: 100%;
                  padding: 2px 0px;
                }
              }
            }
          }
          .actions {
            display: none;
          }
        }
        .field-wrapper.active {
          background-color: hsla(0,0%,95.7%,.7);
          border-color: #b3b3b3;
          .actions {
            display: block;
            .actions_position {
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 25;
              .btn-ud {
                flex: none;
                margin: 3px 0px;
              }
            }
            .actions_mutation {
              position: absolute;
              right: 50px;
              bottom: 0;
              transform: translateY(50%);
              z-index: 25;
            }
          }
        }
      }
      .setting-footer {
        width: auto;
        display: flex;
        padding: 14px 0;
        background-color: #fff;
        margin: 20px;
        .btnSave {
          display: block;
          width: 50%;
          margin: auto;
        }
      }
    }
  }
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40vh;
    color: #ffffff;
    .tip {
      font-size: 20px;
    }
    .el-icon-edit-outline {
      font-size: 30px;
    }
  }
  .flip-list-move {
    transition: transform 0.1s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  ::v-deep{
    .el-radio__input.is-disabled+span.el-radio__label {
      color: #000000 !important;
    }
    .el-checkbox:last-of-type {
      margin-right: 11px;
    }
    .el-radio:last-child {
      margin-right: 11px;
    }
  }
}
</style>
