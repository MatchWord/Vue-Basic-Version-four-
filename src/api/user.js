import http from "@/utils/http";

/**
 * 用户登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export function login(params) {
  return http.post("/auth/user/my/login", params);
}

/**
 * 用户信息
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getInfo(params) {
  return http.post("/auth/user/my/info/get", params);
}
/**
 * 登出
 * @param {*} token
 */
export function logout(params) {
  return http.post("/auth/user/my/logout", params);
}
