<template>
  <div class="center-com">
    <grid-layout :layout="layout"
        :column="columnSize"
        :row-height="itemRowHeight"
        :margin="itemMargin"
        @layout-updated="updateLayout">
        <grid-item v-for="item in layout"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
              @resized="itemResize(item)"
              @moved="itemMoved(item)"
              drag-allow-from=".vue-draggable-handle"
              drag-ignore-from=".no-drag"
              :style="{backgroundImage: theme, border: '3px dotted' + theme  }">
              <div class="item-main">
                <div class="vue-draggable-handle item-move-handle" :style="{color: theme}">
                  <i class="iconfont icon-circle-close"></i>
                </div>
                <div class="item-remove-handle" @click="removeComponent(item)" :style="{color: theme}">
                  <i class="iconfont icon-shanchu"></i>
                </div>
                <div class="item-content no-drag">
                  <dynamic-component :com="item.component" />
                </div>
              </div>
        </grid-item>
      </grid-layout>
  </div>
</template>

<script>
import {GridLayout, GridItem} from 'vue-grid-layout'
import DynamicComponent from './../DynamicComponent'
import EventBus from '@/components/eventBus'
import { mapGetters } from 'vuex'
export default {
  name: 'centerCom',
  components: {
    GridLayout,
    GridItem,
    DynamicComponent
  },
  props: {
    layoutData: Array
  },
  data () {
    return {
      // 布局数据
      layout: [],
      // 初始布局,用于判断布局是否有过变动
      initLayout: [],
      // 默认可配置的列数
      columnSize: 12,
      // 行高度(px),表示默认单行的高度,在数据队形中对应字段'h',
      // 如果配置了'h': 10, 则表示组件默认高度为300px
      itemRowHeight: 30,
      // 默认元素间距
      itemMargin: [10, 10]
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  mounted () {},
  watch: {
    layoutData: function () {
      this.initLayoutData()
    }
  },
  methods: {
    initLayoutData () {
      this.layout = this.layoutData.filter(layout => layout.component)
      this.initLayout = Object.assign({}, this.layout)
    },
    // 当布局更新时,自动保存最新的布局
    updateLayout (newLayout) {
      // TODO: update remote data
    },
    itemResize (item) {
      EventBus.$emit('resized', item)
    },
    itemMoved (item) {
      // console.log('itemMoved', item)
      EventBus.$emit('moved', item)
    },
    removeComponent (item) {
      console.log('item', item)
      this.$confirm(`是否要移除组件:${item.component}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.layout = this.layout.filter(ly => ly.i !== item.i)
        // 移除操作需要自触发
        this.updateLayout(this.layout)

      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.center-com {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-image: url('./img/back.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.vue-grid-layout {
  width:calc(100% - 10px);
  height:100%;
  user-select: none;
  .columns {
    columns: 120px;
  }
  .vue-grid-item {
      display: flex;
      &.vue-grid-placeholder{
          opacity:.7;
          border-radius:8px;
          // background:#13C2C2;
          // border: 3px dotted #F06292;
      }
      &:not(.vue-grid-placeholder) {
          // background: #fff;
          // border: 1px solid #F06292;
          border-radius:8px;
      }
      &.resizing {
          opacity: 0.9;
      }
      &.static {
          background: #cce;
      }
      .text {
          font-size: 24px;
          text-align: center;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          height: 100%;
          width: 100%;
      }
      .no-drag {
          height: 100%;
          width: 100%;
      }
      .minMax {
          font-size: 12px;
      }
      .add {
          cursor: pointer;
      }
  }

  .vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
  }

  .item-main {
    display: flex;
    width:100%;
    height:100%;
    position: relative;
    .item-move-handle, .item-remove-handle, .item-refresh-handle {
        display: flex;
        justify-content: center;
        align-items: center;
        // color: #F06292;
        z-index:2010;
    }
  
    .item-move-handle {
      position: absolute;
      width: 25px;
      height: 25px;
      top: 3px;
      left: 3px;
      padding: 0 8px 8px 0;
      box-sizing: border-box;
      cursor: move;
    }

    .item-remove-handle {
      position: absolute;
      top: 3px;
      left: 30px;
      cursor:pointer;
      transition: all .2s ease-in-out 0s;

      &:hover {
        color: #F06292;
      }

      &:active {
          transform: scale(1.2);
      }

    }

    .item-refresh-handle {
      position: absolute;
      top: 3px;
      left: 45px;
      cursor:pointer;
    }
    .item-content {
      flex:1;
      overflow: hidden;
    }
  }
}
</style>
