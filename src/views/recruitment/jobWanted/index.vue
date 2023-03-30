<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="个人简历发布" name="first"></el-tab-pane>
        <el-tab-pane label="求职申请提交" name="second"></el-tab-pane>
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
    if (this.$route.fullPath === "/recruitment/jobWanted") {
      this.$router.push("/recruitment/jobWanted/resume");
      this.activeName = "first";
    } else if (this.$route.meta.title === "个人简历发布") {
      this.activeName = "first";
    } else if (this.$route.meta.title === "求职申请提交") {
      this.activeName = "second";
    }
  },
  methods: {
    handleClick(tab, e) {
      if (tab.label === "个人简历发布") {
        this.$router.push("/recruitment/jobWanted/resume");
      } else if (tab.label === "求职申请提交") {
        this.$router.push("/recruitment/jobWanted/jobWantedInfo");
      }
    },
  },
};
</script>

<style>
</style>