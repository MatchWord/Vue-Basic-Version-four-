/* eslint-disable no-param-reassign */
// export default {
//   // 之所以用 inserted 而不是 bind，是需要确保 contentmenu mounted 后才进行 addRef 操作
//   inserted (el, binding, vnode) {
//     console.log(el, binding, vnode)
//     const contextmenu = vnode.context.$refs[binding.arg]

//     contextmenu.addRef({ el, vnode })
//     contextmenu.$contextmenuId = el.id || contextmenu._uid // eslint-disable-line no-underscore-dangle
//   }
// }
/**
   * detaile see: https://cn.vuejs.org/v2/guide/custom-directive.html#%E7%AE%80%E4%BB%8B
   *  */
export default {
  bind (el, binding, vnode) {
    const contextmenu = vnode.context.$refs[binding.arg]

    if (Array.isArray(contextmenu.references)) {
      contextmenu.references.push({ el, binding, vnode })
    } else {
      contextmenu.references = [{ el, binding, vnode }]
    }
    contextmenu.$contextmenuId = el.id || contextmenu._uid // eslint-disable-line no-underscore-dangle
  }
}
/**
 * el：指令所绑定的元素，可以用来直接操作 DOM 。
 * binding：一个对象，包含以下属性：
 * name：指令名，不包括 v- 前缀。
 * value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
 * oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
 * expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
 * arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
 * modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
 * vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
 * oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
 */
