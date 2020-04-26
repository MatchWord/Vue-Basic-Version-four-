import axios from "axios";
import store from "@/store";

import { MessageBox, Message } from "element-ui";

let axiosInstance = axios.create({
  timeout: 5000
});

// 请求拦截 success Func
function axiosRequestSucessFunc(config) {
  // 配置全局请求token
  if (store.getters.token) {
    config.headers["Authorization"] = store.getters.token;
  }
  return config;
}

// 请求拦截 error Func
function axiosRequestFailFunc(error) {
  return Promise.reject(error);
}

// 注入request拦截器
axiosInstance.interceptors.request.use(axiosRequestSucessFunc, axiosRequestFailFunc)

// 响应拦截 success Func
function axiosResponseSucessFunc(response) {
  if (response.status * 1 === 200 || response.status * 1 === 304) {
    const header = response.data.head;
    const data = response.data.data;
    if (header && (header.success === "true" || header.success === true)) {
      return data || { message: "success" };
    } else {
      if (header.code * 1 === 401) {
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
}

// 响应拦截 error Func
function axiosResponseFailFunc(error) {
  Message({
    message: error.message,
    type: "error",
    duration: 5 * 1000
  });
  return Promise.reject(error);
}

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

// 注入response拦截器
axiosInstance.interceptors.response.use(axiosResponseSucessFunc, axiosResponseFailFunc)

export default axiosInstance;
