<template>
  <div id="introductionAdd">
    <h2 style="text-align: center; margin: 0">毕业生信息</h2>
    <el-row class="app-container" type="flex">
      <el-col :span="16" style="min-width: 550px; margin: 0 auto">
        <el-form
          ref="form"
          :model="form"
          label-width="130px"
          :disabled="disabled"
        >
          <el-form-item
            v-show="i.fieldIsView"
            v-for="(i, index) in fields"
            :key="index"
            :label="i.fieldChName"
            :prop="i.fieldEngName"
            style="width: 80%"
          >
            <el-input
              v-if="i.fieldAttribute === 'String'"
              v-model="form[i.fieldEngName]"
              style="width: 100%"
            />
            <el-date-picker
              v-else-if="i.fieldAttribute === 'Date'"
              v-model="form[i.fieldEngName]"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              style="width: 100%"
            />
          </el-form-item>
        </el-form>
        <el-row type="flex" style="justify-content: center">
          <el-button type="primary" @click="onSubmit()"> 提交</el-button>
          <el-button type="warning" @click="resetForm()"> 重置</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import college from "@/json/college.json";
import doubleCreation from "@/json/DoubleCreation.json";
import { addCreationGraduate } from "@/api/graduate_students/creationGraduateData";
import { getField } from "@/api/dontai";
import {  getUserInfo, getToken } from "@/utils/auth";

export default {
  data() {
    return {
      className:  getUserInfo().doubleCreationClass,
      disabled: false,
      token: { token: getToken() },
      form: {},
      fields: [],
      // 学院
      college: college,
      // 双创班名单
      doubleCreation: doubleCreation,
    };
  },
  created() {
    this.getField();
    
  },
  methods: {
    getField() {
      getField("graStudentInfo")
        .then((res) => {
          console.log(res.data);
          this.fields = res.data;
          for (let i = 0; i < res.data.length; i++) {
            // console.log(res.data[i].fieldEngName,"11");
            this.$set(this.form, res.data[i].fieldEngName, "");
            this.$set(this.fields, i, res.data[i]);
          }
        })
        .catch((err) => {});
    },
    onSubmit() {
        console.log(this.className,"className");
      this.$refs.form.validate((valid) => {
        if (valid) {
          let form1 = {};
          form1.graId = null;
          form1.graClassName = this.className;
          form1["graField"] = this.form;
          form1.graUserId = 0;
          console.log(this.className, "className");
          console.log(this.form, "form");
          console.log(form1, "新form");

          addCreationGraduate(form1,0,this.className)
            .then((res) => {
              this.$message.success(res.msg);

              // 清理绑定数据
              this.$refs.form.resetFields();
            })
            .catch((err) => {
              this.$message.error("出错！");
              console.log(err);
            });
        }
      });
    },

    // 重置按钮
    resetForm() {
      this.$refs.form.resetFields();
      this.$message({
        message: "重置成功!",
        type: "warning",
      });
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss">
.line {
  text-align: center;
}
// 命名空间
#introductionAdd {
  .closeLabelWidth {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
