// 获取每页面的title

import defaultSettings from "@/config/settings";

const title = defaultSettings.title || "Vue Admin Template";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
