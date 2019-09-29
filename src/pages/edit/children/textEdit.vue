<template>
  <div class="homeRight">
    <index-header></index-header>
    <el-main>
      <quill-editor v-model = "txt" ref = "myEdit" class="editer" :options = "editorOption" @ready = "onEditReady($event)"></quill-editor>
      <p class="tc">
        <el-button type = "primary" @click = "submit">提交</el-button>
      </p>
    </el-main>
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
// 文本编辑器
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      // 文本初始内容
      txt: '<h3>文本编辑器</h3>',
      // 选项数据
      editorOption: {}
    }
  },
  computed: {
    editor () {
      return this.$refs.myEdit
    }
  },
  components: {
    indexHeader,
    indexFooter,
    quillEditor
  },
  methods: {
    // 准备编辑器
    onEditReady (editor) {
      console.log('准备好了', editor)
    },
    // 提交
    submit () {
      console.log(this.txt)
      this.$message.success('提交成功！')
    }
  }
}
</script>

<style lang="scss">
  .ql-container {
    min-height: 350px;
    margin-bottom: 20px;
  }
</style>
