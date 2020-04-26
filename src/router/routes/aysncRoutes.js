import Layout from "@/views/Layout";

// const _import_ = file => () => import("@/views/" + file + ".vue");
/**
 * 静态路由表配置
 *
 * 可根据{role}字段来模拟权限访问. 用户登录后必须含有{role}字段, 与之匹配的路由会被最终过滤出来供访问.
 * 不匹配的则不会包含在内.
 *  默认 roles = ['admin', 'user']
 */
export const aysncRoutesMap = [
  {
    path: "/componentCaseList",
    component: Layout,
    redirect: "noRedirect",
    // alwaysShow: true, // 将始终显示根菜单
    meta: {
      title: "组件案列",
      icon: "iconfont icon-zujian1",
      roles: ["admin"]
    },
    children: [
      {
        path: "wrapper",
        name: "Wrapper",
        component: () => import("@/views/componentCaseList/wrapper"),
        meta: { title: "包装器", icon: "iconfont icon-baozhuang" }
      },
      {
        path: "/tableList",
        name: "TableList",
        alwaysShow: true, // 将始终显示根菜单
        redirect: "/tableList/tableListOne",
        component: () => import("@/views/componentCaseList/tableList/index"),
        meta: { title: "表格", icon: "iconfont icon-biaoge" },
        children: [
          {
            path: "tableListOne",
            name: "TableListOne",
            component: () =>
              import("@/views/componentCaseList/tableList/tableListOne"),
            meta: { title: "表格一", icon: "iconfont icon-biaoge" }
          },
          {
            path: "tableListTwo",
            name: "TableListTwo",
            component: () =>
              import("@/views/componentCaseList/tableList/tableListTwo"),
            meta: { title: "表格二", icon: "iconfont icon-biaoge" }
          }
        ]
      },
      {
        path: "contextmenu",
        name: "Contextmenu",
        component: () => import("@/views/componentCaseList/contextmenu"),
        meta: { title: "右键菜单", icon: "iconfont icon-biaoge" }
      },
      {
        path: "calendar",
        name: "Calendar",
        component: () => import("@/views/componentCaseList/calendar"),
        meta: { title: "日历组件", icon: "iconfont icon-rili" }
      },
      {
        path: "dragKanban",
        name: "DragKanban",
        component: () => import("@/views/componentCaseList/dragKanban"),
        meta: { title: "拖拽看板", icon: "iconfont icon-tuodong" }
      },
      {
        path: "tinymce",
        name: "tinymce",
        component: () => import("@/views/componentCaseList/tinymce"),
        meta: { title: "富文本编辑器", icon: "iconfont icon-tuodong" }
      }
    ]
  },
  {
    path: "/exportAndimport",
    component: Layout,
    redirect: "noRedirect",
    alwaysShow: true, // 将始终显示根菜单
    meta: { title: "导入导出", icon: "iconfont icon-daoru", roles: ["editor"] },
    children: [
      {
        path: "exportExcel",
        name: "ExportExcel",
        component: () => import("@/views/exportAndimport/exportExcel"),
        meta: { title: "导出EXCEL", icon: "iconfont icon-daochuexcel" }
      },
      {
        path: "uploadExcel",
        name: "UploadExcel",
        component: () => import("@/views/exportAndimport/uploadExcel"),
        meta: { title: "上传EXCEL", icon: "iconfont icon-inport" }
      },
      {
        path: "exportZip",
        name: "ExportZip",
        component: () => import("@/views/exportAndimport/exportZip"),
        meta: { title: "导出Zip", icon: "iconfont icon-import" }
      }
    ]
  },
  {
    path: "/tableManagement",
    component: Layout,
    redirect: "noRedirect",
    alwaysShow: true, // 将始终显示根菜单
    meta: {
      title: "表格管理",
      icon: "iconfont icon-biaoge",
      roles: ["editor"]
    },
    children: [
      {
        path: "dragTable",
        name: "DragTable",
        component: () => import("@/views/tableManagement/dragTable"),
        meta: { title: "拖拽表格", icon: "iconfont icon-biaoge" }
      }
    ]
  },
  {
    path: "/menuManagement",
    component: Layout,
    redirect: "noRedirect",
    meta: {
      title: "菜单管理",
      icon: "iconfont icon-caidan",
      roles: ["admin", "editor"]
    }, // 可以在根导航中设置角色
    children: [
      {
        path: "/menuOne",
        name: "MenuOne",
        redirect: "/menuOne/menuTelephone",
        component: () => import("@/views/menuManagement/menuOne/index"),
        meta: {
          title: "菜单一",
          icon: "iconfont icon-caidan1",
          roles: ["admin"]
        }, // 或者只能在子导航中设置角色
        children: [
          {
            path: "menuTelephone",
            name: "MenuTelephone",
            component: () =>
              import("@/views/menuManagement/menuOne/menuTelephone"),
            meta: { title: "菜单电话", icon: "iconfont icon-caidan_dianhua" } // 如果不设置角色，则表示：此页不需要权限
          },
          {
            path: "menuAccount",
            name: "MenuAccount",
            component: () =>
              import("@/views/menuManagement/menuOne/menuAccount"),
            meta: { title: "菜单账单", icon: "iconfont icon-978caidan_zhanghu" }
          }
        ]
      },
      {
        alwaysShow: true, // 将始终显示根菜单
        path: "/menuTwo",
        name: "menuTwo",
        redirect: "/menuTwo/menuMoney",
        component: () => import("@/views/menuManagement/menuTwo/index"),
        meta: { title: "菜单二", icon: "iconfont icon-caidan1" },
        children: [
          {
            path: "menuMoney",
            name: "MenuMoney",
            component: () => import("@/views/menuManagement/menuTwo/menuMoney"),
            meta: { title: "菜单钱包", icon: "iconfont icon-957caidan_qianbao" }
          }
        ]
      }
    ]
  },
  {
    path: "/formManagement",
    component: Layout,
    redirect: "noRedirect",
    meta: {
      title: "表单管理",
      icon: "iconfont icon-biaodan",
      roles: ["editor"]
    },
    children: [
      {
        path: "formLabel",
        name: "FormLabel",
        component: () => import("@/views/formManagement/formLabel"),
        meta: { title: "自定义表单", icon: "iconfont icon-biaodanbiaoqian" }
      },
      {
        path: "formEchart",
        name: "formEchart",
        component: () => import("@/views/formManagement/formEchart"),
        meta: { title: "可视化数据", icon: "iconfont icon-biaodanbiaoqian" }
      },
      {
        path: "formUpdate",
        name: "FormUpdate",
        component: () => import("@/views/formManagement/formUpdate"),
        meta: { title: "高德地图", icon: "iconfont icon-biaodanbiaoqian" }
      }
    ]
  }
];
