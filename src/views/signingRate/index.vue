<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="签约情况统计表" name="first"></el-tab-pane>
        <el-tab-pane label="签约情况统计图" name="second"></el-tab-pane>
      </el-tabs>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
    };
  },
  created() {
    // console.log("fullPath",this.$route.fullPath);
    // console.log("Path",this.$route.path);
    // 根据路由来跳转和高亮标签页
    if (this.$route.fullPath === "/signingRate/infomation") {
      this.$router.push("/signingRate/infomation/table");
      this.activeName = "first";
    } else if (this.$route.meta.title === "签约情况统计表") {
      this.activeName = "first";
    } else if (this.$route.meta.title === "签约情况统计图") {
      this.activeName = "second";
    }
  },
  methods: {
    handleClick(tab, e) {
      if (tab.label === "签约情况统计表") {
        this.$router.push("/signingRate/infomation/table");
      } else if (tab.label === "签约情况统计图") {
        this.$router.push("/signingRate/infomation/chart");
      }
    },
  },
};
</script>

<style>
</style>