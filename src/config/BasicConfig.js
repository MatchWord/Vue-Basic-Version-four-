/**
 * BASE URL 访问接口的路径
 * 模块ajax 调用 ajax拦截在工具utils下面的http.js 接口定义在api目录下
 */
export const BASE_PER_FIX_URL = process.env.NODE_ENV === "production" ? window.systemConfig.baseUrl.prod : window.systemConfig.baseUrl.dev;

/**
 * API接口默认参数配置
 * 全局ajax 调用 ajax拦截在服务service下面的request 接口定义在服务service下面的api
 */
export const API_DEFAULT_CONFIG = Object.assign({}, window.systemConfig.apiDefaultConfig, {isMocked: process.env.NODE_ENV !== "production"})

/**
 * 路由表默认参数配置
 */
export const ROUTER_DEFAULT_CONFIG = {
  isUseStaticeRouter: true
};

/**
 *是否调用接口
 */
export const USE_API = {
  isUseApi: false
};

/**
 *调用接口的方式 1 全局调用 / 0 模块引入调用
 */

export const API_TYPE = {
  apiType: 1
};
