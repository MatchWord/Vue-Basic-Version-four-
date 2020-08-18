<template>
  <div class="form-edit__add-field">
    <div class="field-group__add-field">添加字段</div>
    <div class="field-group__container" v-for="(leftItem, index) in leftData" :key="index">
      <div class="field-group__title">
        <span>{{leftItem.headTitle}}</span>
      </div>
      <div class="field-group__body">
        <div class="fieldDraggableWrapper field-group__button-wrapper" v-for="(item, index) in leftItem.headItem" :key="index">
          <a class="field-group__button" @click='addFormData(item)'>
            <i :class="['iconfont', item.icon]"></i>
            <span>{{item.name}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftData from '../js/left.js'
import centerData from '../js/center.js'
import rightData from '../js/right.js'
export default {
  name: 'leftCom',
  components: {},
  props: {
    formListDataLeft: Array
  },
  data () {
    return {
      leftData: [],
      centerData: [],
      rightData: [],
      formListData: [],
      activeCenterData: {}
    }
  },
  watch: {
    formListDataLeft (newVal) {
      this.formListData = newVal
    }
  },
  mounted () {
    this.leftData = leftData
    this.centerData = centerData
    this.rightData = rightData
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
    addFormData (item) {
      // console.log(this.centerData)
      this.centerData.forEach(el => {
        if (el.type === item.type && el.id === item.id) {
          if (el.type === 'radio' || el.type === 'checkbox') {
            this.rightData.forEach(pm => {
              if (pm.type === item.type && pm.id === item.id) {
                this.formListData.push(Object.assign({}, el, {fixed: false, itemId: this.num(), defaultArr: JSON.parse(JSON.stringify(pm.defaultArr))}))
              }
            })
          } else {
            this.formListData.push(Object.assign({}, el, {fixed: false, itemId: this.num()}))
          }
        }
      })
      this.formListData = this.formListData.map((item, index) => {
        if (index === this.formListData.length - 1) {
          this.activeCenterData = Object.assign({}, item, {isSelect: 1, orderNew: index, order: index})
          return Object.assign({}, item, {isSelect: 1, orderNew: index, order: index})
        }
        return Object.assign({}, item, {isSelect: 0, orderNew: index, order: index})
      })
      this.$emit('leftBackClick', this.formListData, this.activeCenterData)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-edit__add-field {
  max-width: 290px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 14px 7px 45px;
  background-color: #fafafa;
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  .field-group__add-field {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-transform: capitalize;
  }
}
.field-group__container {
  color: #333;
  .field-group__title {
    padding: 14px 0 7px;
    width: 100%;
    font-size: 14px;
  }
  .field-group__body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .field-group__button-wrapper {
      width: 48.5%;
      margin-bottom: 7px;
    }
    .field-group__button {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #333;
      border: 1px solid #ebebeb;
      padding: 7px;
      background-color: #fff;
      flex: none;
      font-size: 12px;
    }
    .field-group__button span {
      margin-left: 7px;
    }
  }
}
</style>
