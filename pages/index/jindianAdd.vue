<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="景点名">
        <el-input v-model="form.title" :style="{ width: '50vw' }"></el-input>
      </el-form-item>
      <el-form-item label="景点简述">
        <el-input v-model="form.desc" type="textarea" :style="{ width: '50vw' }" rows="6"></el-input>
      </el-form-item>
      <el-form-item label="景点Logo">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          action="#"
          :show-file-list="true"
          :auto-upload="false"
          :before-upload="beforeArticleLogoUpload"
          :on-error="handleArticleLogoError"
          list-type="picture"
          :multiple="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="handleArticleLogoSubmit"
          >上传到服务器</el-button>
        </el-upload>
      </el-form-item>

      <!-- <el-form-item label="文章类别">
        <el-radio-group v-model="form.category">
          <el-radio label="游记"></el-radio>
          <el-radio label="介绍"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="景点内容">
        <div
          v-quill:myQuillEditor="editorOption"
          class="quill-editor"
          :content="form.content"
          @change="onEditorChange($event)"
        ></div>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="form.author" :style="{ width: '50vw' }"></el-input>
      </el-form-item>
      <el-form-item label="发表时间">
        <el-date-picker
          v-model="form.createAt"
          type="datetime"
          placeholder="请输入日期和时间"
          :default-value="new Date()"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发表</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
import qs from "qs";
import axios from 'axios'
export default {
  data() {
    // const self = this
    return {
      form: {
        title: "",
        desc: "",
        content: "",
        logoLocalImageUrl: "", // 存储在内容中的logo图片的地址，非七牛地址，由URL.createObjectURL创建的一个地址
        author: "zs",
        createAt: new Date()
      },
      uptoken: {
        token: "",
        key: ""
      },
      fullscreenLoading: false,
      editorOption: {
        // 编辑器的配置项
        placeholder: "请输入景点内容",
        modules: {
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Toolbar"]
          },
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ font: [] }],
              [{ align: [] }],
              ["blockquote", "code-block"],
              ["link", "image"],
              ["clean"]
            ]
          }
        }
      }
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      // 编辑器内容改变的时候，将改变的内容放入cotnent中
      this.form.content = html;
    },
    // 单个的头像上传
    handleArticleLogoSubmit() {
      // 获取到 上传的所有文件，它是一个数组
      const fileArray = this.$refs.upload.uploadFiles;
      // 实例化FormData对象
      const fd = new FormData();
      // 遍历文件数组，将所有文件存入fd中
      for (let i = 0; i < fileArray.length; i++) {
        // 在这里数组每一项的.raw才是你需要的文件，有疑惑的可以打印到控制台看一下就清楚了
        fd.append("avatar", fileArray[i].raw);
      }
      // 发送HTTP请求，发送数据
      // this.$axios({
      //   url: "/api/article/upload",
      //   method: "post",
      //   data: fd
      // }).then(res => {
      //   console.log(res.data);
      // });
      this.$axios.post("/api/jindian/upload", fd).then(res => {
        console.log(res);
        if (res.data.result === "success") {
          this.form.logoLocalImageUrl = res.data.data;
          this.$message.success("Logo图片上传成功");
        }
      });
    },
    // 单个的头像上传失败
    handleArticleLogoError() {
      this.$message.error("Logo图片上传失败");
    },
    // 单个的头像上传大小类型验证
    beforeArticleLogoUpload(file) {
      // this.handleImageToken();
      // 以下为上传前判断图片类型图片大小，返回true or false
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // console.log(isJPG && isLt2M)
      return isJPG && isLt2M;
    },
    // 处理文本编辑器图片上传成功
    handleContentImageSuccess(e, file, fileList) {
      this.fullscreenLoading = false;
      // const imgUrl = "http://images.fire.zshawk.cn/" + e.key;
      // 获取光标位置
      // const length = this.myQuillEditor.selection.savedRange.index;
      // 在光标位置插入图片连接
      // this.myQuillEditor.insertEmbed(length, "image", imgUrl);
      // 插入成功后清空已上传的文件列表
      this.$refs.upload2.clearFiles();
    },
    // 处理文本编辑器中的图片上传
    // handleContentImage(handle) {
    //   this.handleImageToken();
    //   const inputfile = document.getElementById("imgInput");
    // 让隐藏的imgInput按钮点击，触发el-upload上传图片
    //   inputfile.click();
    // },
    // 显示全屏的loading
    beforeContentImageUpload(file) {
      this.fullscreenLoading = true;
    },
    // 发表文章
    onSubmit() {
      //向服务器发送保存的数据
      this.$axios.post("/api/jindian", this.form).then(res => {
        if (res.data.result === "success") {
          this.$message.success("发表文章成功");
        }
      });
    }
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
