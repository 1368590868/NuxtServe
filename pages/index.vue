<!--
 * @Author: your name
 * @Date: 2019-10-28 09:28:39
 * @LastEditTime: 2019-10-28 10:07:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\pages\index.vue
 -->
<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box">
      <div class="content">
        <nuxt-child />
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "@/components/Header.vue";
import vSidebar from "@/components/Sidebar.vue";
export default {
  components: {
    vHead,
    vSidebar
  }
};
</script>

<style>
</style>
