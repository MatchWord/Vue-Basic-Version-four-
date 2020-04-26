// 模块ajax请求使用 （已放弃）
import axios from "axios";
import store from "@/store";

import { MessageBox, Message } from "element-ui";

import { BASE_PER_FIX_URL } from "@/config/BasicConfig.js";

// Per fix url
const basePerfix = BASE_PER_FIX_URL;
// detail see: https://www.npmjs.com/package/axios or https://www.kancloud.cn/yunye/axios/234845

// 创建一个拥有通用配置的axios实例
const service = axios.create({
  baseURL: basePerfix, // url = base url + request url
  timeout: 5000 // request timeout
});
// 请求拦截 success Func
function requestSuccessFunc(config) {
  // 配置全局请求token
  if (store.getters.token) {
    config.headers["Authorization"] = store.getters.token;
  }
  return config;
}
// 请求拦截 error Func
function requestErrorFunc(error) {
  return Promise.reject(error);
}
// 请求拦截器
service.interceptors.request.use(requestSuccessFunc, requestErrorFunc);

// 响应拦截 success Func
function responseSuccessFunc(response) {
  return response;
}
// 响应拦截 error Func
function responseErrorFunc(error) {
  Message({
    message: error.message,
    type: "error",
    duration: 5 * 1000
  });
  return Promise.reject(error);
}
// 响应拦截器
service.interceptors.response.use(responseSuccessFunc, responseErrorFunc);

// 提示
function logoutWithResponse() {
  MessageBox.alert("您的登录已过期，点击确认后重新登录.", "提醒", {
    confirmButtonText: "确定",
    callback: action => {
      // 清空token
      store.dispatch("user/resetToken").then(() => {
        location.reload();
      });
    }
  });
}

// check response code
function checkResponseStatus(response) {
  if (response.status * 1 === 200 || response.status * 1 === 304) {
    return response.data;
  }
  return response;
}
function cactchError(error) {
  if (error.status * 1 === 400 || error.status * 1 === 404 || error.status * 1 === 500) {
    return Message({
      message: `服务器访问出错. Error:${error.error},Message:${error.message}`,
      type: "error",
      duration: 5000
    });
  }
}

// check server response
function checkResponseCode(response) {
  const header = response.head;
  if (header && (header.success === "true" || header.success === true)) {
    return response.data || { message: "success" };
  } else {
    if (header.code === "401") {
      logoutWithResponse();
    } else {
      Message({
        message: header.msg,
        type: "error",
        duration: 2000
      });
      return { message: "error" };
    }
  }
}
// export default service;
/*
 * 这里定义的接口都应该符合RESTFul规范
 */
export default {
  // normal method
  get(url, params) {
    if (!url) return;
    return service
      .get(url, params)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError);
  },
  // post request
  post(url, data) {
    if (!url) return;
    return service
      .post(url, data)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError);
  },
  // update request for All data
  put(url, data) {},
  // update request path data
  patch(url, data) {},
  // delete request
  delete(url, data) {},
  // head
  head(url, data) {}
};
