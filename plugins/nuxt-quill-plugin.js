import Vue from 'vue'
import VueQuillEditor, { Quill } from 'vue-quill-editor/dist/ssr'
import ImageResize from 'quill-image-resize-module'
// 注册quill编辑器的额外的图片拉伸模块
Vue.use(VueQuillEditor)
Quill.register('modules/imageResize', ImageResize)
