<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="就业信息" name="first"></el-tab-pane>
        <el-tab-pane label="图表展示" name="second"></el-tab-pane>
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
    if (this.$route.fullPath === "/employment/infomation") {
      this.$router.push("/employment/infomation/table");
      this.activeName = "first";
    } else if (this.$route.meta.title === "就业信息表格展示") {
      this.activeName = "first";
    } else if (this.$route.meta.title === "就业信息图表展示") {
      this.activeName = "second";
    }
  },
  methods: {
    handleClick(tab, e) {
      if (tab.label === "就业信息") {
        this.$router.push("/employment/infomation/table");
      } else if (tab.label === "图表展示") {
        this.$router.push("/employment/infomation/chart");
      }
    },
  },
};
</script>

<style>
</style>