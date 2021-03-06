import Vue from "vue";
import Cookies from "js-cookie";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./config/permission"; // 权限控制
import api from "@/service/request/api"; // ajax请求
// element-ui
import ElementUI from "element-ui";
// 在element-variables.scss中引入
// import "element-ui/lib/theme-chalk/index.css";
// 引入echarts
import echarts from 'echarts'
// css reset
import "normalize.css";
// global css
import "@/styles/index.scss";
// global font
import "@/assets/plateform-font/iconfont.css";
// global css  element变量
import "@/styles/element-variables.scss";
// 全局组件注入
import "@/plugins/index";
/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */
Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium" // 设置element-ui默认大小
  // i18n: (key, value) => i18n.t(key, value)
});


Vue.prototype.$api = Vue.prototype.$ajax = api;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
