import directive from './directive'

import Contextmenu from './components/Contextmenu.vue'
import ContextmenuItem from './components/ContextmenuItem.vue'
import ContextmenuSubmenu from './components/ContextmenuSubmenu.vue'
import ContextmenuGroup from './components/ContextmenuGroup.vue'

import './styles/index.scss'
import './styles/fonts/iconfont.css'
/**
 * https://github.com/snokier/v-contextmenu/blob/master/README.md
 * https://github.com/snokier/v-contextmenu/blob/master/docs/usage.md#vcontextmenu
 * https://snokier.github.io/v-contextmenu/#Stoneless
 * 由于该插件无法将点击区域的参数传值给菜单，所以重新在此基础重新封装
 * new add tow Events
 *  beforeDestroy 菜单组件的 vm
 * beforeShow 菜单组件的 vm event, params
 */
export {
  directive,

  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu,
  ContextmenuGroup,
}

export default {
  install (Vue) {
    Vue.directive('contextmenu', directive)
  
    Vue.component(Contextmenu.name, Contextmenu)
    Vue.component(ContextmenuItem.name, ContextmenuItem)
    Vue.component(ContextmenuSubmenu.name, ContextmenuSubmenu)
    Vue.component(ContextmenuGroup.name, ContextmenuGroup)
  }
}
