<template>
  <div class="sidebarHorizontal" :style="{'background-color': navColor === 'dark' ? variables.menuBg : variables.menuBgligth}">
    <div class="logo-box" :class="isCollapse ? 'logo-box-horizontal' : ''" v-if="showLogo">
      <sidebar-logo :collapse="isCollapse" />
    </div>
    <!-- Element UI 隐藏滚动条el-scrollbar -->
    <!-- :background-color="navColor === 'dark' ? variables.menuBg : variables.menuBgligth" -->
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="navColor === 'dark' ? variables.menuBg : variables.menuBgligth"
        :text-color="navColor === 'dark' ? variables.menuText : variables.menuTextlight"
        :active-text-color="theme || variables.menuActiveText"
        :collapse-transition="true"
        :unique-opened="false"
        :router="true"
        mode="horizontal"
        @select="handleSelect"
      >
        <!-- 路由菜单 -->
        <template v-for="item in routes">
          <template v-if="!item.hidden">
            <!-- no children -->
            <template
              v-if="
                item.children.length === 1 &&
                  !item.children[0].children &&
                  !item.alwaysShow
              "
            >
              <el-menu-item
                :index="item.path + '/' + item.children[0].path"
                :key="item.path + '/' + item.children[0].path"
              >
                <i class="svg-icon" :class="item.children[0].meta.icon"></i>
                <span slot="title">{{ item.children[0].meta.title }}</span>
              </el-menu-item>
            </template>
            <!-- have children -->
            <el-submenu v-else :index="item.name || item.path" :key="item.name">
              <!-- children title -->
              <template slot="title">
                <i
                  class="svg-icon"
                  v-if="item.meta.icon"
                  :class="item.meta.icon"
                ></i>
                <span slot="title" v-if="item.meta.title">{{
                  item.meta.title
                }}</span>
              </template>
              <!-- children have children -->
              <template v-for="child in item.children">
                <template v-if="!child.hidden">
                  <!-- 有第三层 -->
                  <sidebar-item
                    v-if="child.children && child.children.length > 0"
                    :is-nest="true"
                    :routes="[child]"
                    :key="child.path"
                  >
                  </sidebar-item>
                  <!-- 没有第三层 -->
                  <template v-else>
                    <el-menu-item
                      :index="item.path + '/' + child.path"
                      :key="item.path + '/' + child.path"
                    >
                      <i
                        class="svg-icon"
                        v-if="child.meta && child.meta.icon"
                        :class="child.meta.icon"
                      ></i>
                      <span
                        slot="title"
                        v-if="child.meta && child.meta.title"
                        >{{ child.meta.title }}</span
                      >
                    </el-menu-item>
                  </template>
                </template>
              </template>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </scroll-pane>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapGetters } from "vuex";
import SidebarLogo from "./Comp/Logo";
// comp
import SidebarItem from "./Comp/SidebarItem";
import ScrollPane from './Comp/ScrollPane'
// 引入css 变量 样式
import variables from "@/styles/variables.scss";
import { constants } from 'fs';

export default {
  name: "Sidebar",
  components: { SidebarItem ,SidebarLogo, ScrollPane },
  computed: {
    // 左侧菜单展开的状态
    ...mapGetters(["sidebar", "theme", "navColor", "mode"]),
    // 获取静态路由列表（当没有设置用户权限时）
    routes() {
      // return this.$router.options.routes; // 无用户权限
      return this.$store.getters.routes
    },
    // 获取路由列表中需要展开的菜单
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // 是否展示LOGO
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    // 样式变量
    variables() {
      return variables;
    },
    // 是否水平折叠收起菜单
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  mounted() {
    // console.log(this.$router);
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      // this.$refs.scrollPane.moveToTarget(tag)
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebarHorizontal {
  display: flex;
  justify-content: flex-start;
}
.logo-box {
  width: 200px;
  height: 58px;
  overflow: hidden;
}
.logo-box-horizontal {
  width: 80px;
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  background-color: transparent !important;
}
.svg-icon {
  padding: 0px 10px 0px 5px;
}
/deep/ {
  ul.el-menu--horizontal.el-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
/deep/ {
  .el-tooltip {
    position: relative !important;
    top: -2px !important;
    padding: 0px 0px !important;
  }
}
</style>
