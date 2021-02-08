<template>
  <div class="emoji-wrapper">
    <span
      v-for="code in emojiList"
      :key="code"
      class="emoji"
      @click="onSelect(code)"
    >
      {{ code }}
    </span>
  </div>
</template>
<script>
import { emojiList } from '@/assets/emoji.json'
export default {
  name: 'Emoji',
  data() {
    return {
      emojiList
    }
  },
  methods: {
    onSelect(code) {
      this.$emit('on-select', code)
    }
  }
}
</script>
<style lang="scss" scpoed>
$eSize: 24px;
  .emoji-wrapper {
    border-radius: 3px;
    background: #fff;
    outline: none;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    .emoji {
      padding: 4px;
      cursor: pointer;
      font-size: $eSize;
    }
  }
</style>
