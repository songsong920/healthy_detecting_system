<template>

  <section class="app-main" style="min-height: 100%;background:#F0F3F7">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive> -->
      <router-view :key="key"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
import bus from "./bus";
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  },
  created() {
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>
