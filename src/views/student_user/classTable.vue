<template>
  <div style="margin-top: 40px">
    <!-- <el-button type="primary" @click="addInfo" style="margin-left: 10px"
      >添加信息</el-button
    > -->
    <!-- 表格展示 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      height="480"
      border=""
      size=""
    >
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <el-table-column prop="className" label="班级名称" width="">
      </el-table-column>
      <el-table-column prop="classFoundCollege" label="主办学院" width="">
      </el-table-column>
      <el-table-column prop="classFoundTime" label="班级成立时间" width="">
      </el-table-column>
      <el-table-column prop="classTeacherName" label="首导姓名" width="">
      </el-table-column>
      <el-table-column prop="classBelongCollege" label="所属学院" width="">
      </el-table-column>
      <el-table-column prop="classTeacherPhone" label="联系电话" width="">
      </el-table-column>
      <el-table-column prop="classGroupNameCollege" label="导师团队" width="">
      </el-table-column>
      <el-table-column prop="classOutTeacherCompany" label="校外导师" width="">
      </el-table-column>
      <el-table-column prop="classBaseName" label="双创教育基地名称" width="">
      </el-table-column>
      <el-table-column prop="classListingTime" label="挂牌时间" width="">
      </el-table-column>
      <el-table-column label="班级简介" width="">
        <template slot-scope="scope">
          <el-button type="text" @click="findIntroduce(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="classIntroduceImage"
        label="班级图片(点击查看大图)"
        width=""
      >
        <template slot-scope="{ row }">
          <el-image
          v-if="row.classIntroduceImage"
            style="width: 100px; height: 100px"
            :src="row.classIntroduceImage"
            :preview-src-list="srcList"
          ></el-image>
           <el-tag v-if="!row.classIntroduceImage">未添加图片</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            @click="updateInfo(row, $index)"
          >
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="deleteInfo(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 表格展示END -->

    <!-- 班级信息卡片 -->
    <el-card
      class="center"
      v-if="classIntroductionTurn"
      style="
        min-width: 800px;
        min-height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;

        border: 1px solid;
      "
    >
      <div
        style="
          min-height: 200px;
          border: 1px solid #dedede;
          border-radius: 4px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          margin: 47px 5px 5px 5px;
          padding: 10px 5px;
        "
      >
        {{ playintroduceText }}
      </div>
      <el-row type="flex">
        <el-button
          @click="classIntroductionTurn = false"
          style="margin: 5px auto 2px auto"
          >关闭</el-button
        >
      </el-row>
    </el-card>
    <!-- 班级信息卡片END -->

    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getTable"
    />
    <!-- 分页END -->

    <!-- 双创班信息添加弹框 -->
    <el-dialog
      title="双创班信息"
      :visible.sync="isShow"
      :before-close="handleClose"
      center
    >
      <el-form
        ref="form"
        :model="form"
        label-width="140px"
        size="small"
        :inline="true"
        highlight-current-row
      >
        <el-form-item label="班级名称">
          <el-select v-model="form.className" placeholder="请选择">
            <el-option
              v-for="item in doubleCreation"
              :key="item.text"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="主办学院">
          <el-select
            v-model="form.classFoundCollege"
            style="width: 100%"
            clearable
          >
            <el-option v-for="i in college" :key="i.text" :value="i.value">{{
              i.text
            }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级成立时间">
          <el-date-picker
            v-model="form.classFoundTime"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="班级成立时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="首导姓名及学院">
          <el-input
            v-model="form.classTeacherName"
            placeholder="姓名(学院)"
          ></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="form.classTeacherPhone"></el-input>
        </el-form-item>
        <el-form-item label="导师成员及学院">
          <el-input
            v-model="form.classGroupNameCollege"
            placeholder="姓名(学院)"
          ></el-input>
        </el-form-item>

        <el-form-item label="校外导师及所属单位">
          <el-input
            v-model="form.classOutTeacherCompany"
            placeholder="姓名(所属单位)"
          ></el-input>
        </el-form-item>
        <el-form-item label="双创教育基地名称">
          <el-input
            v-model="form.classBaseName"
            placeholder="双创教育基地名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="挂牌时间">
          <el-date-picker
            v-model="form.classListingTime"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="挂牌时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="班级简介">
          <el-input
            v-model="form.classIntroduceText"
            type="textarea"
            placeholder="班级简介"
          ></el-input>
        </el-form-item>
        <el-form-item label="班级图片">
          <el-upload
            ref="upload"
            drag
            accept="image/jpeg,image/png,application/pdf"
            :limit="1"
            :file-list="fileList"
            action="123"
            :before-upload="beforeUpload"
            :http-request="uploadImg"
            style="margin: 0 auto"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              仅支持单文件上传,多文件请压缩
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-popover
          placement="top-start"
          width="200"
          trigger="click"
          v-model="visible"
        >
          <p>确定提交吗?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="status === 'add' ? addIntroduce() : updateEmployment()"
              >确定</el-button
            >
          </div>
          <el-button slot="reference" type="primary" style="margin-left: 20px"
            >提 交</el-button
          >
        </el-popover>
      </div>
    </el-dialog>
    <!-- 信息添加弹框END -->
  </div>
</template>
<script>
import doubleCreation from "@/json/DoubleCreation.json";
import college from "@/json/college.json";

import {
  findAllIntroduce,
  addIntroduce,
  createdClassUpload,
} from "@/api/double_creation_class/double_creation/introduce";
import { findCreatedClass } from "@/api/student";
import Pagination from "@/components/Pagination";

import { getDoubleCreationClass, getToken } from "@/utils/auth";
export default {
  components: { Pagination },
  created() {
    this.findAllIntroduceInfo();
    this.getTable();
  },
  data() {
    return {
      srcList: [],
      fileList: [],
      uploadFile: undefined,
      className: getDoubleCreationClass(),
      //
      doubleCreation: doubleCreation,
      college: college,
      //
      updataIndex: 0,
      status: "",
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      visible: false,
      list: [],
      tableData: [],
      isShow: false,
      form: {
        classBaseName: "", //双创教育基地名称
        classBelongCollege: "", //所属学院
        classElse: "",
        classFoundCollege: "", //主办学院
        classFoundTime: "", //班级成立时间
        classGroupNameCollege: "", //导师团队
        classId: 0,
        classIntroduceImage: "", //图片
        classIntroduceText: "", //简介
        classListingTime: "", //挂牌时间
        className: "", //班级名称
        classOutTeacherCompany: "", //校外导师及单位
        classTeacherName: "", //首导姓名
        classTeacherPhone: "", //联系电话
      },
      //
      classIntroductionTurn: false,
      playintroduceText: "",
    };
  },
  methods: {
    findIntroduce(row) {
      this.classIntroductionTurn = true;

      this.playintroduceText = row.classIntroduceText;
    },
    beforeUpload(file) {
      this.$refs.upload.clearFiles();
      this.uploadFile = file;
    },
    uploadImg(img) {
      console.log("上传二维码");
      let formData = new FormData();
      formData.append("file", this.uploadFile);
      createdClassUpload(this.className, formData, this.form.classId)
        .then((res) => {
          this.form.classIntroduceImage = res.data.classIntroduceImage;

          console.log("上传成功");
          this.$notify({
            title: "成功",
            message: "图片上传成功",
            type: "success",
            duration: 1500,
          });
          img.onSuccess();
        })
        .catch((err) => {
          console.log("上传失败");
          img.onError();
        });
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          // done();
          this.isShow = false;
        })
        .catch((_) => {});
    },

    findAllIntroduceInfo() {
      // 查询信息
      findAllIntroduce(1, 10000, "superAdmin")
        .then((res) => {
          console.log(res.data, "查班级信息");
          this.list = res.data;
          this.total = this.list.length;
          // console.log(this.total, "total");
          // 分页
          let tableData = this.list.filter((item, index) => {
            this.srcList.push(item.classIntroduceImage);
            if (
              index >= this.listQuery.limit * (this.listQuery.page - 1) &&
              index <= this.listQuery.limit * this.listQuery.page - 1
            ) {
              return item;
            }
          });
          // console.log(tableData, "11");
          this.tableData = tableData;
          // console.log(this.tableData, "tableData");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //分页
    getTable() {
      // 查询信息
      // 分页
      let tableData = this.list.filter((item, index) => {
        if (
          index >= this.listQuery.limit * (this.listQuery.page - 1) &&
          index <= this.listQuery.limit * this.listQuery.page - 1
        ) {
          return item;
        }
      });

      this.tableData = tableData;
      // console.log(this.tableData, "tableData");
    },
    handleDownload() {},
    resetTemp() {
      this.form = {
        classBaseName: "",
        classBelongCollege: "",
        classElse: "",
        classFoundCollege: "",
        classFoundTime: "",
        classGroupNameCollege: "",
        classId: 0,
        classIntroduceImage: "",
        classIntroduceText: "",
        classListingTime: "",
        className: "", //班级名称
        classOutTeacherCompany: "",
        classTeacherName: "",
        classTeacherPhone: "",
      };
    },

    addInfo() {
      this.resetTemp();
      this.isShow = true;
      this.status = "add";
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },

    updateInfo(row, index) {
      this.form = Object.assign({}, row);
      this.status = "update";
      this.isShow = true;
      this.updataIndex = index;
    },

    // 删
    deleteInfo(row, index) {
      console.log(row.empId, "row");
      this.list.splice(index, 1);
      deleteEmployment("", row.empId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findAllIntroduceInfo();
        })
        .catch((err) => {});
    },
    // 添加
    addIntroduce() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addIntroduce(this.form)
            .then((res) => {
              console.log(res);
              this.findAllIntroduceInfo();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      this.isShow = false;
      this.visible = false;
    },
    // 改
    updateEmployment() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateEmployment("", this.form)
            .then((res) => {
              this.findAllIntroduceInfo();
            })
            .catch((err) => {});
        }
      });
      this.isShow = false;
      this.visible = false;
    },
  },
};
</script>

<style></style>
