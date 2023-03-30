<template>
  <div id="introductionAdd">
    <h2 style="text-align: center">双创班简介</h2>
    <el-row class="app-container" type="flex">
      <el-col :span="16" style="min-width: 550px; margin: 0 auto">
        <el-form
          ref="form"
          :model="form"
          :rules="formRules"
          label-width="130px"
          :disabled="disabled"
        >
          <el-row
            type="flex"
            style="width: 100%; justify-content: space-between"
          >
            <el-form-item label="班级名称" prop="name" style="width: 50%">
              <el-select v-model="form.name" style="width: 100%" clearable>
                <el-option
                  v-for="i in doubleCreation"
                  :key="i.text"
                  :value="i.value"
                  >{{ i.text }}</el-option
                >
              </el-select>
            </el-form-item>
            <el-form-item
              label="主办学院"
              prop="foundCollege"
              style="width: 50%"
            >
              <el-select
                v-model="form.foundCollege"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="i in college"
                  :key="i.text"
                  :value="i.value"
                  >{{ i.text }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-row>

          <el-form-item
            label="班级成立时间"
            prop="foundTime"
            style="width: 50%"
          >
            <el-date-picker
              v-model="form.foundTime"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="班级成立时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-row type="flex" style="justify-content: space-between">
            <el-form-item
              label="首导姓名"
              prop="teacherName"
              style="width: 50%"
            >
              <el-input v-model="form.teacherName" style="width: 100%" />
            </el-form-item>

            <el-form-item
              label="所属学院"
              prop="belongCollege"
              style="width: 50%"
            >
              <el-select
                v-model="form.belongCollege"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="i in college"
                  :key="i.text"
                  :value="i.value"
                  >{{ i.text }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="联系电话" prop="telephone" style="width: 50%">
              <el-input v-model="form.telephone" style="width: 100%" />
            </el-form-item>
          </el-row>
          <el-row type="flex" style="justify-content: left">
            <el-col :span="24">
              <el-form-item
                label="导师团队成员"
                prop="groupNameAndCollegeName"
                style="width: 100%"
              >
                <el-input
                  v-model="form.groupNameAndCollegeName"
                  placeholder="姓名"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item
                prop="groupNameAndCollegeCollege"
                style="width: 100%"
              >
                <el-select
                  v-model="form.groupNameAndCollegeCollege"
                  style="width: 100%; margin-left: 0"
                  placeholder="所属学院"
                  clearable
                >
                  <el-option
                    v-for="i in college"
                    :key="i.text"
                    :value="i.value"
                    >{{ i.text }}</el-option
                  >
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="addMentorMembers"
                  style="margin-left: 15px"
                  >添加</el-button
                >
              </el-form-item>
            </el-col>
            <!--                                     -->
            <el-col>
              <el-form-item label-width="0" prop="groupNameAndCollege">
                <div
                  v-show="groupNameAndCollegeUl"
                  style="
                    margin: 0 auto 10px 10px;
                    padding: 10px;
                    border: 1px solid #777bce;
                    border-top-width: 5px;
                    border-radius: 5px;
                  "
                >
                  <el-tag
                    v-for="i in form.groupNameAndCollege"
                    :key="
                      i.name + i.college + groupNameAndCollegeKeys.toString()
                    "
                    :closable="true"
                    @close="deleteMentorMembers(i)"
                    style="margin: 5px"
                    size="small"
                    >{{ `${i.name}(${i.college})` }}
                  </el-tag>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex">
            <el-col :span="24" style="margin-left: auto">
              <el-form-item
                label="校外导师"
                prop="outTeacherAndCompanyName"
                style="width: 100%"
              >
                <el-input
                  v-model="form.outTeacherAndCompanyName"
                  placeholder="姓名"
                />
              </el-form-item>
              <el-form-item
                prop="outTeacherAndCompanyUnitName"
                style="width: 100%"
              >
                <el-input
                  v-model="form.outTeacherAndCompanyUnitName"
                  placeholder="单位名称"
                />
              </el-form-item>
              <el-form-item style="margin: 0 auto">
                <el-button
                  type="primary"
                  @click="addOutsideTeacher"
                  style="margin: 0 15px 15px 15px"
                  >添加</el-button
                >
              </el-form-item>
            </el-col>
            <el-col style="margin-left: 20px">
              <el-form-item label-width="0" prop="outTeacherAndCompany">
                <div
                  v-show="outTeacherAndCompanyUl"
                  style="
                    margin: 0 auto 10px auto;
                    padding: 10px;
                    border: 1px solid #ffd43b;
                    border-top-width: 5px;
                    border-radius: 5px;
                    min-height: 228px;
                  "
                >
                  <el-tag
                    v-for="i in form.outTeacherAndCompany"
                    :key="i.name + i.work"
                    :closable="true"
                    @close="deleteOutsideTeacher(i)"
                    style="margin: 5px"
                    size="small"
                    >{{ `${i.name}(${i.work})` }}
                  </el-tag>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex">
            <el-form-item
              label="双创教育基地名称"
              prop="baseName"
              style="width: 50%"
            >
              <el-input v-model="form.baseName" />
            </el-form-item>
            <el-form-item
              label="挂牌时间"
              prop="listingTime"
              style="width: 50%"
            >
              <el-date-picker
                v-model="form.listingTime"
                type="month"
                format="yyyy 年 MM 月"
                value-format="yyyy-MM"
                placeholder="班级成立时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-row>
          <el-form-item label="班级简介" prop="description">
            <el-button @click="classDescriptionTurn = true"> 打开 </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>

          <!--      班级简介弹窗              -->

          <el-card
            class="center"
            v-show="classDescriptionTurn"
            style="min-width: 850px; min-height: 400px"
          >
            <el-form-item label-width="0" prop="introduceImage">
              <el-row>
                <el-upload
                  :action="
                    'http://116.62.48.128:8008/api/createdClass/upload?id=' +
                    uploadId +
                    '&className=' +
                    className
                  "
                  :headers="token"
                  list-type="picture-card"
                  :file-list="fileList"
                  :on-success="uploadSuccess"
                  :limit="5"
                  :multiple="false"
                  accept="image/*"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="
                        'http://116.62.48.128:8008/api/image?fileName=' +
                        file.filename
                      "
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <!--                                            <span-->
                      <!--                                                v-if="!disabled"-->
                      <!--                                                class="el-upload-list__item-delete"-->
                      <!--                                                @click="handleDownload(file)"-->
                      <!--                                            >-->
                      <!--                                                <i class="el-icon-download"></i>-->
                      <!--                                            </span>-->
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-row>
            </el-form-item>
            <el-form-item label-width="0" prop="introduceText">
              <el-input
                class="introduceText"
                type="textarea"
                maxlength="300"
                show-word-limit
                v-model="form.introduceText"
              ></el-input>
            </el-form-item>
            <el-button
              @click="classDescriptionTurn = false"
              style="position: relative; left: 50%; transform: translateX(-50%)"
              >关闭</el-button
            >
          </el-card>
        </el-form>
      </el-col>
    </el-row>

    <!--    图片展示     -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import college from "@/json/college.json";
import doubleCreation from "@/json/DoubleCreation.json";
// import { studentIdentify } from "@/api/identify";
import { addIntroduce } from "@/api/double_creation_class/double_creation/introduce";
import { getDoubleCreationClass, getToken, getUserCollege } from "@/utils/auth";

export default {
  data() {
    return {
      className: getDoubleCreationClass(),
      token: { token: getToken() },
      fileID: 0,
      // 上传id，第一次为0
      uploadId: 0,

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],

      // // 导师团队成员列表开关
      // groupNameAndCollegeUlTurn: false,
      // 班级简介弹窗开关
      classDescriptionTurn: false,

      form: {
        name: "",
        //    主办学院
        foundCollege: "",
        //    班级成立时间
        foundTime: "",
        //     首导姓名
        teacherName: "",
        //     首导所属学院
        belongCollege: "",
        //     首导联系电话
        telephone: "",
        //    导师团队成员姓名
        groupNameAndCollegeName: "",
        //    导师团队成员所属学院
        groupNameAndCollegeCollege: "",
        //     导师团队成员
        groupNameAndCollege: [],
        //     校外导师姓名
        outTeacherAndCompanyName: "",
        //    校外导师单位名称
        outTeacherAndCompanyUnitName: "",
        outTeacherAndCompany: [],
        //    双创教育基地名称
        baseName: "",
        //    挂牌时间
        listingTime: "",
        //    班级简介
        introduceText: "",
        introduceImage: [],
      },

      formRules: {
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        //    主办学院
        foundCollege: [
          {
            required: true,
            trigger: "blur",
            message: "请输入主办学院",
          },
        ],
        //    班级成立时间
        foundTime: [
          {
            required: true,
            trigger: "blur",
            message: "请输入班级成立时间",
          },
        ],
        //     首导姓名
        teacherName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入首导姓名",
          },
        ],
        //     首导所属学院
        belongCollege: [
          {
            required: true,
            trigger: "blur",
            message: "请输入所属学院",
          },
        ],
        //     首导联系电话
        telephone: [
          {
            required: true,
            trigger: "blur",
            message: "请输入联系电话",
          },
        ],
        //     导师团队成员
        groupNameAndCollege: [
          {
            required: true,
            trigger: "blur",
            message: "请输入导师团队成员",
          },
        ],
        // 校外导师
        outTeacherAndCompany: [
          {
            required: true,
            trigger: "blur",
            message: "请输入校外导师",
          },
        ],
        //    双创教育基地名称
        baseName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入双创教育基地名称",
          },
        ],
        //    挂牌时间
        listingTime: [
          {
            required: true,
            trigger: "blur",
            message: "请输入挂牌时间",
          },
        ],
        //    班级简介
        introduceText: [
          {
            required: true,
            trigger: "blur",
            message: "请输入班级简介",
          },
        ],
        introduceImage: [
          {
            required: true,
            trigger: "blur",
            message: "请输入班级简介",
          },
        ],
      },

      // 学院
      college: college,
      // 双创班名单
      doubleCreation: doubleCreation,

      groupNameAndCollegeKeys: Math.floor(Math.random() * 10000).toString(),
      outTeacherAndCompanyKeys: "",
    };
  },
  mounted() {
    if (getDoubleCreationClass() === "superAdmin") {
      this.$confirm("超级管理员禁止直接添加信息，请在权限控制中切换班级身份！");
      this.disabled = true;
    }
  },
  methods: {
    // 添加校外导师
    addOutsideTeacher() {
      if (
        this.form.outTeacherAndCompanyName &&
        this.form.outTeacherAndCompanyUnitName
      ) {
        let name = this.form.outTeacherAndCompanyName;
        let work = this.form.outTeacherAndCompanyUnitName;
        let obj = {
          name,
          work,
        };
        this.form.outTeacherAndCompany.push(obj);
      } else {
        this.$message.error("请先填写姓名和单位名称");
      }
    },
    // 删除校外导师
    deleteOutsideTeacher(obj) {
      let index = this.form.outTeacherAndCompany.indexOf(obj);
      if (index === -1) {
        console.log("无法删除");
      } else {
        this.form.outTeacherAndCompany.splice(index, 1);
      }
    },
    // 添加导师团队成员
    addMentorMembers() {
      if (
        this.form.groupNameAndCollegeCollege &&
        this.form.groupNameAndCollegeName
      ) {
        let name = this.form.groupNameAndCollegeName;
        let college = this.form.groupNameAndCollegeCollege;
        let obj = {
          name,
          college,
        };
        this.form.groupNameAndCollege.push(obj);
      } else {
        this.$message.error("请先填写姓名和学院");
      }
    },
    // 删除导师团队成员
    deleteMentorMembers(obj) {
      let index = this.form.groupNameAndCollege.indexOf(obj);
      if (index === -1) {
        console.log("无法删除");
      } else {
        this.form.groupNameAndCollege.splice(index, 1);
      }
    },

    onSubmit() {
      // console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          let form = { ...this.form };
          // console.log(form);
          // form = this.form;
          form.outTeacherAndCompany = JSON.stringify(form.outTeacherAndCompany);
          form.groupNameAndCollege = JSON.stringify(form.groupNameAndCollege);
          form.classIntroduction = JSON.stringify(form.classIntroduction);
          form.id = this.fileID;

          addIntroduce(form)
            .then((res) => {
              this.$message.success(res.msg);

              // 清理绑定数据
              this.$refs.form.resetFields();
              this.fileList = [];
              this.uploadId = 0;
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
      this.form.outTeacherAndCompany = [];
      this.form.groupNameAndCollege = [];
      this.$message({
        message: "重置成功!",
        type: "warning",
      });
    },

    // 上传成功
    uploadSuccess(res) {
      this.uploadId = res.data.id;
      this.form.introduceImage = res.data.introduceImage;
      this.fileID = res.data.id;
      // 重要，获取数组里面的最后一项并添加到视图数组中才能触发视图刷新，切勿直接使用=
      let arr = JSON.parse(res.data.introduceImage);
      let index = arr.length - 1;
      this.fileList.push(arr[index]);
    },
    handleRemove(file) {
      let index = 0;
      let count = 0;
      for (let i of this.fileList) {
        if (i.filename === file.name) {
          this.fileList.splice(count, 1);
          return;
        }
        count++;
      }

      this.form.introduceImage = JSON.stringify(this.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
  computed: {
    groupNameAndCollegeUl() {
      return !!this.form.groupNameAndCollege[0];
    },
    outTeacherAndCompanyUl() {
      return !!this.form.outTeacherAndCompany[0];
    },
  },
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

  .introduceText > textarea {
    min-height: 150px !important;
  }
}
</style>
