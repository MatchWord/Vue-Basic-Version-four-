<template>
  <ul
    ref="contextmenu"
    :class="contextmenuCls"
    v-show="visible"
    :style="style">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'VContextmenu',

    provide () {
      return {
        $$contextmenu: this,
      }
    },

    props: {
      eventType: {
        type: String,
        default: 'contextmenu',
      },
      theme: {
        type: String,
        default: 'default',
      },
      autoPlacement: {
        type: Boolean,
        default: true,
      },
      disabled: Boolean,
    },

    data () {
      return {
        visible: false,
        references: [],
        style: {
          top: 0,
          left: 0,
        },
      }
    },
    computed: {
      clickOutsideHandler () {
        return this.visible ? this.hide : () => {}
      },
      isClick () {
        return this.eventType === 'click'
      },
      contextmenuCls () {
        return [
          'v-contextmenu',
          `v-contextmenu--${this.theme}`,
        ]
      },
    },

    watch: {
      visible (value) {
        if (value) {
          this.$emit('show', this)
          document.body.addEventListener('click', this.handleBodyClick)
        } else {
          this.$emit('hide', this)
          document.body.removeEventListener('click', this.handleBodyClick)
        }
      },
      // new add
      references (references) {
        if (window.$$VContextmenu) {
          window.$$VContextmenu[this.$contextmenuId] = this
        } else {
          window.$$VContextmenu = { [this.$contextmenuId]: this }
        }
        this.references && this.references.forEach((ref) => {
          ref.el.addEventListener(this.eventType, () => this.handleReferenceContextmenu(event, ref.binding.value))
        })
        document.body.appendChild(this.$el)
      }
    },
    mounted () {
      // document.body.appendChild(this.$el)
      // if (window.$$VContextmenu) {
      //   window.$$VContextmenu[this.$contextmenuId] = this
      // } else {
      //   window.$$VContextmenu = { [this.$contextmenuId]: this }
      // }
    },
    beforeDestroy () {
      // @before destroy hooks
      this.$emit('beforeDestroy', this)
      // add
      document.body.removeChild(this.$el)
      delete window.$$VContextmenu[this.$contextmenuId]
      this.references.forEach((ref) => {
        ref.el.removeEventListener(this.eventType, this.handleReferenceContextmenu)
      })
      document.body.removeEventListener('click', this.handleBodyClick)
    },

    methods: {
      // 本来在自定义指令中调用
      addRef (ref) {
        // FIXME: 如何处理 removeRef？
        this.references.push(ref)
        ref.el.addEventListener(this.eventType, this.handleReferenceContextmenu)
      },
      handleReferenceContextmenu (event, params) {
        // @beforeShow hooks
        this.$emit('beforeShow', this, event, params)
        // add
        event.preventDefault()
        if (this.disabled) return
        const reference = this.references.find(ref => ref.el.contains(event.target))
        this.$emit('contextmenu', reference ? reference.vnode : null)
        const eventX = event.pageX
        const eventY = event.pageY
        this.show()
        this.$nextTick(() => {
          const contextmenuPosition = {
            top: eventY,
            left: eventX,
          }
          if (this.autoPlacement) {
            const contextmenuWidth = this.$refs.contextmenu.clientWidth
            const contextmenuHeight = this.$refs.contextmenu.clientHeight
            if (contextmenuHeight + eventY >= window.innerHeight) {
              contextmenuPosition.top -= contextmenuHeight
            }
            if (contextmenuWidth + eventX >= window.innerWidth) {
              contextmenuPosition.left -= contextmenuWidth
            }
          }
          this.style = {
            top: `${contextmenuPosition.top}px`,
            left: `${contextmenuPosition.left}px`,
          }
        })
      },
      handleBodyClick (event) {
        const notOutside = this.$el.contains(event.target) || (
          this.isClick && this.references.some(ref => ref.el.contains(event.target))
        )
        if (!notOutside) {
          this.visible = false
        }
      },
      show (position) {
        Object.keys(window.$$VContextmenu)
          .forEach((key) => {
            if (key !== this.$contextmenuId) {
              window.$$VContextmenu[key].hide()
            }
          })
        if (position) {
          this.style = {
            top: `${position.top}px`,
            left: `${position.left}px`,
          }
        }
        this.visible = true
      },
      hide () {
        this.visible = false
      },
      hideAll () {
        Object.keys(window.$$VContextmenu)
          .forEach((key) => {
            window.$$VContextmenu[key].hide()
          })
      },
    },
  }
</script>
