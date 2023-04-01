<template>
  <div style="margin-top: 40px">
 
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
        width="150px"
      >
        <template slot-scope="{ row }">
          <el-image
          v-if="row.classIntroduceImage"
            style="width: 140px; height: 140px"
            :src="row.classIntroduceImage"
            :preview-src-list="srcList"
          ></el-image>
           <el-tag v-if="!row.classIntroduceImage">未添加图片</el-tag>
        </template>
      </el-table-column>
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
import Pagination from "@/components/Pagination";

import { getUserInfo } from "@/utils/auth";
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
      className: getUserInfo().doubleCreationClass,
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
  },
};
</script>

<style></style>
