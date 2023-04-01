<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="内容列表" name="first"></el-tab-pane>
        <el-tab-pane label="信息录入" name="second"></el-tab-pane>
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
    // 根据路由来跳转和高亮标签页
    if (this.$route.fullPath === "/student_user/graduate-data2") {
      this.$router.push("/student_user/graduate-data2/index/1&10");
      this.activeName = "first";
    } else if (this.$route.meta.title === "内容列表") {
      this.activeName = "first";
    } else if (this.$route.meta.title === "信息录入") {
      this.activeName = "second";
    } 
  },
  methods: {
    handleClick(tab, e) {
      if (tab.label === "内容列表") {
        this.$router.push("/student_user/graduate-data2/index/1&10");
      } else if (tab.label === "信息录入") {
        this.$router.push("/student_user/graduate-data2/add");
      } 
    },
  },
};
</script>

<style scoped></style>
