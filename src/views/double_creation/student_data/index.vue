<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="内容列表" name="first"> </el-tab-pane>
        <el-tab-pane label="信息录入" name="second"> </el-tab-pane>
        <el-tab-pane
          v-if="this.$store.state.user.doubleCreationClassName == 'superAdmin'"
          label="动态字段"
          name="three"
        ></el-tab-pane>
      </el-tabs>
      <!-- v-if="className == 'superAdmin'" -->
      <!-- <keep-alive :include="['stuAdd', 'stuField', 'stuTable']"> -->
        <!-- <router-view :key="key"></router-view> -->
        <router-view></router-view>
        <!-- <router-view :key="this.$route.fullPath"></router-view> -->
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
// import index from "@/views/double_creation/student_data/index";
export default {
  name: "indexStu",
  data() {
    return {
      activeName: "",
      className: this.$store.state.user.doubleCreationClassName,
      key:this.$route.fullPath,
    };
  },
  created() {
    // 根据路由来跳转和高亮标签页
    // if (this.$route.fullPath === "/double-creation/student-data2") {
    //   this.$router.push("/double-creation/student-data2/index/1&10");
    //   this.activeName = "first";
    // } else if (this.$route.meta.title === "学生信息") {
    //   this.activeName = "first";
    // } else if (this.$route.meta.title === "信息录入") {
    //   this.activeName = "second";
    // } else if (this.$route.meta.title === "动态字段") {
    //   this.activeName = "three";
    // }
    console.log("a创建");
  },
  activated() {
    if (this.$route.fullPath === "/double-creation/student-data2") {
      this.$router.push("/double-creation/student-data2/index/1&10");
      this.activeName = "first";
    } else if (this.$route.meta.title === "学生信息") {
      this.activeName = "first";
    } else if (this.$route.meta.title === "信息录入") {
      this.activeName = "second";
    } else if (this.$route.meta.title === "动态字段") {
      this.activeName = "three";
    }
    console.log(this.activeName);
  },
  methods: {
    handleClick(tab, e) {
      if (tab.label === "内容列表") {
        // this.activeName = "first";
        console.log(1);
        this.$router.push("/double-creation/student-data2/index/1&10");
      } else if (tab.label === "信息录入") {
        console.log(2);
        // this.activeName = "second";
        this.$router.push("/double-creation/student-data2/add");
      } else if (tab.label === "动态字段") {
        // this.activeName = "three";
        console.log(3);
        this.$router.push("/double-creation/student-data2/field");
      }
    },
  },
  beforeDestroy() {
    console.log("a销毁");
  },
};
</script>

<style scoped></style>
