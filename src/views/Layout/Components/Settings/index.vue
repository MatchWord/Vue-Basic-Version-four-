<template>
  <div class="drawer-container">
    <div>
      <div class="greeting">
        <h2>{{ dayTime }}好,</h2>
        <span>{{ name }}</span>
      </div>
      <div class="clock">
        <canvasClock />
      </div>
      <h3 class="drawer-title">导航模式</h3>
      <div class="drawer-item-box">
        <!-- 垂直模式 -->
          <div class="vertical" @click="modeChange('vertical')">
            <div class="left"></div>
            <div class="right">
              <div class="right-top"></div>
              <div class="right-bottom">
                <i v-if="mode === 'vertical'" class="iconfont icon-xuanzhong" :style="{color: themeColor}"></i>
              </div>
            </div>
          </div>
          <div class="horizontal" @click="modeChange('horizontal')">
            <div class="left"></div>
            <div class="right">
              <i v-if="mode === 'horizontal'" class="iconfont icon-xuanzhong" :style="{color: themeColor}"></i>
            </div>
          </div>
      </div>
      <h3 class="drawer-title">整体风格设置</h3>
      <div class="drawer-item-box">
          <div class="vertical" @click="navColorChange('dark')">
            <div class="left"></div>
            <div class="right">
              <div class="right-top"></div>
              <div class="right-bottom">
                <i v-if="navColor === 'dark'" class="iconfont icon-xuanzhong" :style="{color: themeColor}"></i>
              </div>
            </div>
          </div>
          <div class="vertical" @click="navColorChange('light')">
            <div class="left light"></div>
            <div class="right">
              <div class="right-top"></div>
              <div class="right-bottom">
                <i v-if="navColor === 'light'" class="iconfont icon-xuanzhong" :style="{color: themeColor}"></i>
              </div>
            </div>
          </div>
      </div>
      <h3 class="drawer-title">系统布局配置</h3>

      <div class="drawer-item">
        <span>主题色</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>开启访问视图</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定头部</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>开启LOGO</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
      
      <div class="drawer-item" v-if="mode === 'vertical'">
        <span>开启侧边栏</span>
        <el-switch v-model="showNavMenu" class="drawer-switch" />
      </div>
      <div class="bottomFlex">
        <ul>
          <li @click="fullScreeModel">
            <span class="iconfont icon-quanping"></span>
            <span>全屏展示</span>
          </li>
          <li @click="logout">
            <span class="iconfont icon-084tuichu"></span>
            <span>注销登录</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import screenfull from 'screenfull'
import ThemePicker from '@/components/ThemePicker'
import canvasClock from '@/components/canvasClock/clock'
import { setLocalStorage, getLocalStorage } from '@/utils/session.js'

export default {
  components: { ThemePicker, canvasClock },
  data() {
    return {
      mode: getLocalStorage('mode') || 'vertical',
      navColor: getLocalStorage('navColor') || 'dark',
      dayTime: '',
      name: ''
    }
  },
  mounted () {
    this.dayTime = this.getGreetingTime()
    this.init()
  },
  computed: {
    ...mapGetters(['name'])
  },
  computed: {
    themeColor () {
      return this.$store.getters.theme
    },
    // detail see :https://cn.vuejs.org/v2/guide/computed.html
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    },
    showNavMenu: {
      get() {
        return this.$store.state.settings.showNavMenu
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showNavMenu',
          value: val
        })
      }
    }
  },
  methods: {
    // 设置整体颜色
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
      setLocalStorage('theme', val)
    },
    // 设置导航布局模式
    modeChange (val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'mode',
        value: val
      })
      setLocalStorage('mode', val)
      this.mode = val
    },
    // 设置导航颜色
    navColorChange (val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'navColor',
        value: val
      })
      setLocalStorage('navColor', val)
      this.navColor = val
    },
    getGreetingTime () {
      const now = parseInt(moment().format('HH'))
      let dayTime = ''
      if (now < 12) dayTime = '早上'
      else if (now >= 12 && now < 18) dayTime = '下午'
      else if (now >= 18 && now <= 23) dayTime = '晚上'
      else dayTime = ''
      return dayTime
    },
    fullScreeModel () {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
    async logout() {
      await this.$store.dispatch("user/logout")
      this.$router.push(`/login`)
      this.$store.dispatch('settings/changeSetting', {
        key: 'showSettings',
        value: false
      })
    }
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 10px 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: #ffffff;
    font-size: 14px;
    line-height: 22px;
    border-top: 1px solid #e8e8e8;
    padding: 10px 0px;
  }
  .drawer-title:nth-of-type(1) {
    border-top: none !important;
    padding: 0px !important;
  }

  .drawer-item {
    color: #ffffff;
    font-size: 14px;
    padding: 12px 0;
    overflow: auto;
  }

  .drawer-switch {
    float: right
  }
  .drawer-item-box {
    overflow: hidden;
    .vertical {
      width: 50px;
      height: 50px;
      float: left;
      border: 1px solid #f1f1f1;
      margin-right: 20px;
      cursor: pointer;
      overflow: hidden;
      border-radius: 5px;
      position: relative;
      .left {
        width: 10px;
        height: 48px;
        background: #304156;
        float: left;
      }
      .light {
        background: #fff;
      }
      .right {
        width: 38px;
        height: 48px;
        background: #fff;
        float: left;
        .right-top {
          width: 100%;
          height: 10px;
        }
        .right-bottom {
          width: 100%;
          height: 40px;
          background: #E9E8ED;
        }
      }
      .iconfont {
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: 16px;
      }
    }
    .horizontal {
      width: 50px;
      height: 50px;
      float: left;
      border: 1px solid #f1f1f1;
      cursor: pointer;
      overflow: hidden;
      border-radius: 5px;
      position: relative;
      .left {
        width: 100%;
        height: 10px;
        background: #304156;
      }
      .right {
        width: 100%;
        height: 38px;
        background: #E9E8ED;
      }
      .iconfont {
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: 16px;
      }
    }
  }
  .greeting {
    padding: 0;
    background: none;
    color: #ffffff;
    > * {
      display: inline-block;
      font-weight: 400;
    }

    h2 { font-size:1.5rem; }

    span { font-size:1.2rem; }
  }

  .clock {
    height:150px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .bottomFlex {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      
      li {
        flex: 1;
        position: relative;
        display: inherit;
        height: 60px;
        transition: all .2s ease;
        cursor: pointer;
        background: rgba(255,255,255,.1);
        margin:2px;
        box-sizing: border-box;
        color: #ffffff;
        &:hover {
          background: rgba(255,255,255,.2);
        }

        &:active {
          transform: scale(.97)
        }

        span:first-child {
          position: absolute;
          left:6px;
          top:8px;
        }

        span:last-child {
          position: absolute;
          left:6px;
          bottom: 5px;
        }

      }

    }
  }
}
</style>
