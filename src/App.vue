<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getLocalStorage } from "@/utils/session.js";
export default {
  name: "App",
  created() {},
  mounted() {
    const newStyle = getLocalStorage("newStyle");
    this.getHandler(newStyle, "chalk-style");
  },
  methods: {
    getHandler(newStyle, id) {
      let styleTag = document.getElementById(id);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.setAttribute("id", id);
        document.head.appendChild(styleTag);
      }
      styleTag.innerText = newStyle;
    }
  }
}
</script>
