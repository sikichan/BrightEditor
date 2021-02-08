<template>
  <div class="editor">
    <div class="editor-tools">
      <el-popover
        v-model="emojiVisible"
        width="300"
        placement="right"
        trigger="click"
      >
        <Emoji @on-select="onSelectEmoji" />
        <EmojiIcon slot="reference" class="editor-tools-icon" />
      </el-popover>
    </div>
    <div
      ref="editorContent"
      class="editor-content"
      contenteditable
      @keyup="onKeyup"
      @blur="onBlur"
      @focus="onFocus"
      @click="getFocus"
    >{{ content }}</div>
  </div>
</template>
<script>
import Emoji from './Emoji'
import EmojiIcon from './Icon/EmojiIcon'
export default {
  components: {
    Emoji,
    EmojiIcon
  },
  data() {
    return {
      emojiVisible: false,
      selection: 0,
      content: ''
    }
  },
  mounted() {
    this.getFocus()
  },
  beforeDestroy() {
    this.onBlur()
  },
  methods: {
    onFocus() {
      document.addEventListener('mousedown', this.preventDefault)
    },
    onBlur() {
      document.removeEventListener('mousedown', this.preventDefault)
    },
    getFocus() {
      const el = this.$refs.editorContent
      el.focus()
      this.selection = getSelection().anchorOffset
    },
    onKeyup() {
      this.selection = getSelection().anchorOffset
    },
    onSelectEmoji(code) {
      const el = this.$refs.editorContent
      el.focus()
      const sel = getSelection()
      const range = sel.getRangeAt(0)
      const textNode = document.createTextNode(code)
      range.insertNode(textNode)
      sel.removeAllRanges()
      range.collapse()
      sel.addRange(range)
      this.emojiVisible = false
    },
    preventDefault(e) {
      const toolBar = document.querySelector('.editor-tools')
      const { path } = e
      if (path.includes(toolBar)) {
        console.log('preventDefault')
        e.preventDefault()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$borderColor: #f6f6f6;
.editor {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 2px;
  border: 1px solid $borderColor;
  box-sizing: border-box;
  text-align: left;
  .editor-tools {
    width: 100%;
    height: 40px;
    padding: 2px;
    background: $borderColor;
    .editor-tools-icon {
      cursor: pointer;
      margin: 8px;
    }
  }
  .editor-content {
    outline: none;
    padding: 12px;
    width: 100%;
    height: 200px;
  }
}
</style>
