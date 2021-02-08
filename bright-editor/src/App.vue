<template>
  <div id="app">
    <Editor />
  </div>
</template>

<script>
import Editor from '@/components/Editor'
export default {
  name: 'App',
  components: {
    Editor
  }
}
</script>

<style>
@font-face {
  font-family: Varela;
  src: url('~@/assets/fonts/Varela.ttf');
}
#app {
  font-family: Varela, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
