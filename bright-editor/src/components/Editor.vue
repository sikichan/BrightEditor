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
      <!-- 图片上传 -->
      <PhotoIcon class="editor-tools-icon" @click.native="$refs['photo'].click()" />
      <!-- 文件上传 -->
      <FileIcon class="editor-tools-icon" @click.native="$refs['file'].click()" />
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
    <el-button style="align-self:flex-start" @click="send">发送</el-button>
    <input ref="photo" type="file" style="display:none;" @change="getPhoto">
    <input ref="file" type="file" style="display:none;" @change="getFile">
    <el-dialog
      title="发送文件"
      :visible.sync="file.visible"
      width="460px"
    >
      <CommonIcon :file="file" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="file.visible = false">取 消</el-button>
        <el-button type="primary" @click="file.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Emoji from './Emoji'
import EmojiIcon from './Icon/EmojiIcon'
import PhotoIcon from './Icon/PhotoIcon'
import FileIcon from './Icon/FileIcon'
import { fileSize } from '@/utils'
export default {
  components: {
    Emoji,
    EmojiIcon,
    PhotoIcon,
    FileIcon,
    CommonIcon: () => import('./Icon/CommonIcon')
  },
  data() {
    return {
      emojiVisible: false,
      content: '',
      lastRange: 0,
      file: {
        visible: false,
        src: null,
        name: '',
        ext: ''
      }
    }
  },
  mounted() {
    this.getFocus()
  },
  beforeDestroy() {
    this.onBlur()
  },
  methods: {
    send() {
      const content = this.$refs['editorContent'].innerHTML
      console.log(content)
    },
    getPhoto() {
      const photo = this.$refs['photo'].files[0]
      const obj = URL.createObjectURL(photo)
      console.log(obj)
      const sel = getSelection()
      const range = this.lastRange
      const photoNode = document.createElement('img')
      photoNode.src = obj
      photoNode.style.width = '100px'
      range.insertNode(photoNode)
      sel.removeAllRanges()
      range.collapse(false)
      sel.addRange(range)
      this.emojiVisible = false
    },
    getFile() {
      const file = this.$refs['file'].files[0]
      console.log(file)
      const idx = file.name.lastIndexOf('.')
      this.file = {
        visible: true,
        name: file.name,
        ext: file.name.slice(idx, file.name.length),
        size: fileSize(file.size)
      }
      this.file.visible = true
    },
    onFocus() {
      // document.addEventListener('mousedown', this.preventDefault)
    },
    onBlur() {
      // document.removeEventListener('mousedown', this.preventDefault)
    },
    getFocus() {
      const el = this.$refs.editorContent
      el.focus()
      this.markRange()
    },
    onKeyup() {
      this.markRange()
    },
    markRange() {
      const sel = getSelection()
      if (sel.rangeCount > 0) {
        this.lastRange = sel.getRangeAt(0)
      } else {
        this.lastRange = document.createRange()
      }
    },
    onSelectEmoji(code) {
      const sel = getSelection()
      const range = this.lastRange
      const textNode = document.createTextNode(code)
      range.insertNode(textNode)
      sel.removeAllRanges()
      range.collapse(false)
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
    padding: 12px 12px 50px 12px;
    width: 100%;
    height: 200px;
    overflow-y: scroll;
  }
}
</style>
