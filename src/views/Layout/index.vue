<template>
  <!-- 动态绑定class名 -->
  <div :class="classObj" class="app-wrapper">
    <!-- 左侧的菜单栏 -->
    <sidebar
      v-if="showNavMenu && mode === 'vertical'"
      class="sidebar-container"
      :style="{
        'background-color':
          navColor === 'dark' ? variables.menuBg : variables.menuBgligth,
      }"
    />
    <!-- 右侧头部和内容 -->
    <!-- Element UI 隐藏滚动条el-scrollbar -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div
        :class="{
          hasTagsView: tagsView,
          hasTagsViewHorizontal: mode === 'horizontal' && tagsView,
          noTagsViewHorizontal: mode === 'horizontal',
        }"
        class="main-container"
      >
        <div :class="{ 'fixed-header': fixedHeader }">
          <!-- 头部菜单栏 -->
          <sidebar-horizontal v-if="mode === 'horizontal'" />
          <navbar />
          <tags-view v-if="tagsView" />
        </div>
        <app-main />
        <!-- <right-panel v-if="showSettings">
          <settings />
        </right-panel> -->
      </div>
    </el-scrollbar>
    <!-- 全局遮罩 -->
    <global-mask />
    <notification-bar :notificationInfo="notificationInfo" />
  </div>
</template>

<script>
/** 
 * 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
或者在computed中用下列方式取出带有命名空间的store存储的全局数据
sidebar() {
  return this.$store.state.app.sidebar;
},
*/
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapGetters } from "vuex";
// 引入css 变量 样式
import variables from "@/styles/variables.scss";
// 右侧设置面板
import RightPanel from "@/components/RightPanel";
// 引入左侧的菜单栏
import sidebar from "./Components/Sidebar";
// 引入Navbar 头部
import Navbar from "./Components/Navbar";
// 引入主体内容
import AppMain from "./Components/Appmain";
// 引入TagsView
import TagsView from "./Components/TagsView";
// 引入settings
import settings from "./Components/Settings";
// 引入头部的菜单栏
import sidebarHorizontal from "./Components/sidebarHorizontal";
// 引入遮罩层
import GlobalMask from "./Components/BasicSetting/GlobalMask";
// 基础提示
import NotificationBar from "./Components/BasicSetting/NotificationBar";
export default {
  name: "Layout",
  components: {
    sidebar,
    Navbar,
    AppMain,
    TagsView,
    RightPanel,
    settings,
    sidebarHorizontal,
    GlobalMask,
    NotificationBar,
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapGetters([
      "sidebar",
      "device",
      "fixedHeader",
      "tagsView",
      "showSettings",
      "showNavMenu",
      "navColor",
      "mode",
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        hideNavMenu: !this.showNavMenu || this.mode === "horizontal",
      };
    },
    // 样式变量
    variables() {
      return variables;
    },
  },
  data() {
    return {
      notificationInfo: {
        Width: 250,
        dark: true,
        component: settings,
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
// 菜单展开的样式 openSidebar (默认样式)
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth;
    background-color: $menuBg;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    border-right: 1px solid #e8e8e8;
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - #{$sideBarWidth});
      transition: width 0.28s;
    }
  }
}
// 菜单隐藏的样式 hideSidebar
.hideSidebar {
  .sidebar-container {
    width: $sideBarHideWidth !important;
  }
  .main-container {
    margin-left: $sideBarHideWidth;
    .fixed-header {
      width: calc(100% - #{$sideBarHideWidth});
    }
  }
}
// 不显示左侧菜单
.hideNavMenu {
  .main-container {
    margin-left: 0px;
    .fixed-header {
      width: 100%;
    }
  }
}
</style>
