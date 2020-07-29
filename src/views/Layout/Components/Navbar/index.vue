<template>
  <div class="navbar">
    <!-- 控制菜单展开 -->
    <div v-if="showNavMenu" class="hamburger-container" @click="toggleSideBar">
      <i v-if="!sidebar.opened" class="iconfont icon-yousuojin"></i>
      <i v-if="sidebar.opened" class="iconfont icon-zuosuojin"></i>
    </div>
    <!-- Breadcrumb 面包屑 -->
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <ul class="right-menu-ul">
        <li class="right-menu-li">
          <header-search id="header-search" class="right-menu-item" />
        </li>
        <li class="right-menu-li">
          <el-tooltip content="文本大小" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>
        </li>
        <li class="right-menu-li" @click="setShowSetting">
          <i class="iconfont icon-shezhi"></i>设置
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// comp 面包屑 全屏 文本大小
import Breadcrumb from "./Comp/Breadcrumb"
import HeaderSearch from './Comp/HeaderSearch'
import SizeSelect from './Comp/SizeSelect'

export default {
  name: "Navbar",
  components: {
    Breadcrumb,
    SizeSelect,
    HeaderSearch
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "size", "showNavMenu"])
  },
  methods: {
    // 动态改变SideBar 的状态
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    setShowSetting () {
      this.$store.dispatch('settings/changeSetting', {
        key: 'showSettings',
        value: true
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 35px;
  overflow: hidden;
  position: relative;
  background-color: #e5e5e5;
  border-bottom: 1px solid #d9d9d9;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 35px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .iconfont {
      font-size: 20px;
      margin-left: 10px;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 35px;
    float: right;

    .right-menu-ul {
      height: 35px;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      li {
        font-size: 1rem;
        display: inherit;
        align-items: center;
        justify-content: center;
        flex: 1 auto;
        padding: 0 15px;
        cursor: pointer;
        font-size: 12px;

        &:hover {
          background-color: #f1f1f1;
        }
        .el-icon {
          margin-right: 5px;
        }
        .iconfont {
          font-size: 12px;
          margin-right: 5px;
          margin-top: -2px;
        }
      }
    }
  }
}
</style>
