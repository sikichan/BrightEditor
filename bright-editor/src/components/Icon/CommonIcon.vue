<template>
  <div class="common-icon">
    <div class="ext">{{ file.ext }}</div>
    <div class="info">
      <span>{{ file.name }}</span>
      <span>{{ file.size }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    file: { type: Object, required: true }
  }
}
</script>
<style lang="scss" scoped>
$color:#707070;
$h: 34px;
.common-icon {
  display: flex;
  .ext {
    border: 2px solid #999;
    background: #f4f4f4;
    border-radius: 4px;
    padding: 10px 8px;
    font-size: 16px;
    color: $color;
    height: $h;
    line-height: $h;
    margin-right: 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
