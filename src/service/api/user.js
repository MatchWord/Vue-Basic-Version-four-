/**
 * USER API
 * Namespace: User
 */

export const UserApi = {
  user: [
    {
      name: "login",
      method: "POST",
      path: "/auth/user/my/login",
      mockPath: "/auth/user/my/login",
      params: {},
      desc: "用户登录"
    },
    {
      name: "logout",
      method: "POST",
      path: "/auth/user/my/logout",
      mockPath: "/auth/user/my/logout",
      params: {},
      desc: "用户注销"
    },
    {
      name: "info",
      method: "POST",
      path: "/auth/user/my/info/get",
      mockPath: "/auth/user/my/info/get",
      params: {},
      desc: "获取用户信息"
    },
    {
      name: "password.edit",
      method: "POST",
      path: "/auth/user/my/password/update",
      mockPath: "/auth/user/my/password/update",
      params: {},
      desc: "修改登录用户密码"
    }
  ]
};
