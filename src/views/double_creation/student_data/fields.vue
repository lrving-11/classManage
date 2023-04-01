<template>
  <div id="studentField">
    <h2 style="text-align: center; margin: 0">学生信息</h2>
    <el-row class="app-container" type="flex">
      <el-col :span="16" style="min-width: 550px; margin: 0 auto">
        <el-form
          ref="form"
          :model="form"
          label-width="0px"
          :disabled="disabled"
        >
          <el-row style="width: 100%; justify-content: space-between">
            <!-- <el-form-item
                            label="姓名"
                            prop="name"
                            style="width: 50%"
                        >
                            <el-input v-model="form.name" style="width: 100%" />
                        </el-form-item>

                        <el-form-item
                            label="性别"
                            prop="gender"
                            style="width: 50%"
                        >
                            <el-select
                                v-model="form.gender"
                                style="width: 100%"
                                clearable
                            >
                                <el-option :value="'男'"> 男 </el-option>
                                <el-option :value="'女'"> 女</el-option>
                            </el-select>
                        </el-form-item> -->

            <el-form-item v-for="i in fields" :key="i.id">
              <el-input v-model="i.fieldChName" clearable></el-input>
              <el-input v-model="i.fieldEngName" clearable></el-input>
              <el-select
                v-model="i.fieldAttribute"
                clearable
                style="width: 200px; margin: 0 10px"
                placeholder="类型"
              >
                <el-option :value="'String'"> 字符串 </el-option>
                <el-option :value="'Date'"> 日期 </el-option>
              </el-select>

              <!-- <el-switch
                v-model="i.fieldIsView"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="显示"
                inactive-text="隐藏"
              >
              </el-switch> -->
              <el-button
                :size="'mini'"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delFiled(i)"
              ></el-button>
              <el-button
                :size="'mini'"
                type="success"
                icon="el-icon-delete"
                circle
                @click="editFiled(i)"
              >修改</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <el-row v-if="addFieldNum !== 0">
          <div
            v-for="(i, index) in addField"
            :key="index"
            style="display: flex"
          >
            <el-input
              v-model="i.fieldChName"
              placeholder="字段中文名"
              style="width: 200px; margin: 0 10px"
            ></el-input>
            <el-input
              v-model="i.fieldEngName"
              placeholder="字段英文别名"
              style="width: 200px; margin: 0 10px"
            ></el-input>

            <el-select
              v-model="i.fieldAttribute"
              clearable
              style="width: 200px; margin: 0 10px"
              placeholder="类型"
            >
              <el-option :value="'String'"> 字符串 </el-option>
              <el-option :value="'Date'"> 日期 </el-option>
            </el-select>
            <!-- <el-switch
              v-model="i.fieldIsView"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="显示"
              inactive-text="隐藏"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch> -->
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              @click="addFields"
            ></el-button>
          </div>
        </el-row>
        <el-button
          type="primary"
          plain
          style="width: 100px"
          @click="addFieldButton"
          >添加字段</el-button
        >
        
        <em style="color:red">【修改操作】编辑表单后,点击修改即可</em>
        <!-- <el-row type="flex" style="justify-content: center">
          <el-button type="primary" @click="onSubmit"> 提交</el-button>
          <el-button type="warning" @click="resetForm"> 重置</el-button>
        </el-row> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import college from "@/json/college.json";
import doubleCreation from "@/json/DoubleCreation.json";
import { addCreationStudent } from "@/api/double_creation_class/double_creation/studentData";
import { getField, addField, deleteField, updateField } from "@/api/dontai";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      disabled: false,
      token: { token: getToken() },
      form: {},
      fields: [],

      addFieldNum: 0,
      addField: [],
      // 学院
      college: college,
      // 双创班名单
      doubleCreation: doubleCreation,
    };
  },
  created() {
    this.getField();
  },
  mounted() {},
  methods: {
    getField() {
      getField("studentInfo")
        .then((res) => {
          console.log(res.data);
          this.fields = res.data;
          for (let i = 0; i < res.data.length; i++) {
            // this.form[res.data[i].fieldEngName] = ""
            this.$set(this.form, res.data[i].fieldEngName, "");
            this.$set(this.fields, i, res.data[i]);
          }
        })
        .catch((err) => {});
    },
    addFieldButton() {
      this.addFieldNum++;
      this.$set(this.addField, this.addFieldNum - 1, {
        fieldAttribute: "",
        fieldChName: "",
        fieldEngName: "",
        fieldIsView: true,
        fieldSurface: "studentInfo",
      });
    },
    addFields() {
      addField(this.addField[this.addFieldNum - 1]).then((res) => {
        console.log(res);
        this.$message.success(res.msg);
        this.addFieldNum = 0;
        this.addFields = [];
        this.getField();
      });
    },
    delFiled(i) {
      console.log(i, "iiii");
      deleteField(i.fieldId).then((res) => {
        console.log(res);
        this.$message.success(res.msg);
        this.getField();
      });
    },
    editFiled(i) {
      console.log(i, "iiii");
      updateField(i).then((res) => {
        console.log(res);
        this.$message.success(res.msg);
        this.getField();
      });
    },

    // onSubmit() {
    //   // console.log(this.form);
    //   this.$refs.form.validate((valid) => {
    //     if (valid) {
    //       //   let form = {};
    //       //   form.className = this.form.doubleCreationClass;

    //       //   form["stuField"] = this.form;
    //       //   delete form.stuField.doubleCreationClass;

    //       console.log(this.form,"修改");
    //       updateField()
    //         .then((res) => {
    //           this.$message.success(res.msg);

    //           // 清理绑定数据
    //           this.$refs.form.resetFields();
    //         })
    //         .catch((err) => {
    //           this.$message.error("出错！");
    //           console.log(err);
    //         });
    //     }
    //   });
    // },

    // // 重置按钮
    // resetForm() {
    //   this.$refs.form.resetFields();
    //   this.$message({
    //     message: "重置成功!",
    //     type: "warning",
    //   });
    // },
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
#studentField {
  .el-form-item__content {
    display: flex;
  }
  .el-switch {
    // padding: 20px;
    margin: 5px 15px;
  }
  .el-button {
    display: flex;
    padding: 0 12px;
    width: 75px;
    height: 35px;
    justify-content: center;
    align-items: center;
  }
  .el-col > .is-plain {
    width: 100px;
    margin: 10px;
    margin-left: 50px;
  }
  .el-input__inner {
    width: 150px;
  }
}
</style>
