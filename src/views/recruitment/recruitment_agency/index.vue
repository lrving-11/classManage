<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="公司简介发布" name="first"></el-tab-pane>
        <el-tab-pane label="职位发布" name="second"></el-tab-pane>
        <el-tab-pane label="求职审核" name="third"></el-tab-pane>
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
    if (this.$route.fullPath === "/recruitment/recruitmentAgency") {
      this.$router.push("/recruitment/recruitmentAgency/enterprise");
      this.activeName = "first";
    } else if (this.$route.meta.title === "公司简介发布") {
      this.activeName = "first";
    } else if (this.$route.meta.title === "职位发布") {
      this.activeName = "second";
    } else if (this.$route.meta.title === "求职审核") {
      this.activeName = "third";
    }
  },
  methods: {
    handleClick(tab, e) {
      if (tab.label === "公司简介发布") {
        this.$router.push("/recruitment/recruitmentAgency/enterprise");
      } else if (tab.label === "职位发布") {
        this.$router.push("/recruitment/recruitmentAgency/position");
      } else if (tab.label === "求职审核") {
        this.$router.push("/recruitment/recruitmentAgency/jobExamine");
      }
    },
  },
};
</script>

<style>
</style>