// 主要设置 公用的参数
import defaultSettings from "@/config/settings";
import elementVariables from "@/styles/element-variables.scss";

import { getLocalStorage } from "@/utils/session.js";

const {
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  showNavMenu,
  mode,
  navColor
} = defaultSettings;

const state = {
  theme: getLocalStorage("theme") || elementVariables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  showNavMenu: showNavMenu,
  mode: getLocalStorage("mode") || mode,
  navColor: getLocalStorage("navColor") || navColor
};

const mutations = {
  // changeSetting
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
