<template>
  <div class="app-container" style="padding: 0 20px">
    <!--   表格     -->
    <div class="filter-container" style="margin: 5px 15px; display: flex">
      <el-input
        v-model="search.name"
        :placeholder="'学生姓名'"
        style="width: 150px"
        class="filter-item"
        clearable
      />

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchMethod()"
        style="margin: 0 7px"
      >
        搜索
      </el-button>

      <el-upload
        class="upload-demo"
        v-show="uploadExcelTurn"
        drag
        :action="
          'http://116.62.48.128:8008/api/student/import?className=' + className
        "
        :headers="token"
        :before-upload="beforeUpload"
        :on-success="importSuccess"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          background-color: #dedede;
        "
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"></div>
      </el-upload>
    </div>

    <!--        -->

    <el-table
      ref="table"
      :data="tableData"
      :height="420"
      element-loading-text="Loading"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <el-table-column
        v-show="i.fieldIsView"
        v-for="(i, index) in fields"
        :key="index"
        :label="i.fieldChName"
        align="center"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row[i.fieldEngName] }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="编辑" width="170" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="edit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="error"
            size="small"
            @click="deleteIdentify(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="[10, 20, 50, 100, 150, 200]"
      @pagination="pagination"
      style="margin: 0; padding: 5px 0 0 0"
    />
  </div>
</template>

<script>
// import zone from "@/json/zone.json";
import doubleCreation from "@/json/DoubleCreation.json";
import college from "@/json/college.json";
import userData from "@/store/modules/user2";
import Pagination from "@/components/Pagination/index";
import UploadExcelComponent from "@/components/UploadExcel/index";

// import {
//     getCertifiedStu,
//     editStudent,
//     deleteCertifiedStu,
// } from "@/api/certified";
// import {
//     translateChinese,
//     translatevariable,
// } from "@/vendor/tHeaderConversion";
import {
  deleteCreationStudent,
  findAllStudent,
  findCreationStudentByname,
} from "@/api/double_creation_class/double_creation/studentData";
import { getField } from "@/api/dontai";
import { getDoubleCreationClass, getToken } from "@/utils/auth";
import { getFile } from "@/utils/getFile";

export default {
  components: {
    Pagination,
    UploadExcelComponent,
  },

  data() {
    return {
      token: { token: getToken() },
      // 班级名称
      className: getDoubleCreationClass(),

      // 分页
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },

      // 加载状态
      listLoading: true,
      uploadExcelTurn: false,

      showReviewer: 0,
      // 导入面板开关
      calendarTypeOptions: [],

      search: {
        // 姓名
        name: "",
        // 双创班名称
        doubleCreationClass: "",
        stuNum: "",
      },

      // 筛选学院，数组，元素是对象，有text和value两个属性
      college: college,
      // 双创班
      doubleCreation: doubleCreation,
      //
      list: [],
      // 表格数据
      tableData: [],

      // 专业选项：
      major: {
        current: "",
        majorOption: () => import("@/json/college.json"),
      },
      fields: [],
    };
  },
  created() {
    //    对页数的处理
    if (this.$route.params.page && this.$route.params.limit) {
      this.listQuery.page = Number(this.$route.params.page);
      this.listQuery.limit = Number(this.$route.params.limit);
    }
    this.getField();
  },
  methods: {
    getField() {
      getField("studentInfo")
        .then((res) => {
          console.log(res.data);
          this.fields = res.data;
          for (let i = 0; i < res.data.length; i++) {
            // this.$set(this.form, res.data[i].fieldEngName, "");
            this.$set(this.fields, i, res.data[i]);
          }
          this.getTable();
        })
        .catch((err) => {});
    },
    // 分页
    getTable() {
      findAllStudent(
        this.listQuery.page,
        this.listQuery.limit,
        this.className
        // userData.state.adminUserName
      )
        .then((res) => {
          // 所有数据都保存在list中
          console.log(res.data, "res.data");
          this.list = res.data;
          // this.tableData = res.data.;
          // 分页显示
          this.total = res.data.length;

          // 循环添加序号
          let tableData = [];

          for (let i in tableData) {
            tableData[i].tableID =
              Number(i) + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          }
          this.listLoading = false;
          for (let i = 0; i < res.data.length; i++) {
            tableData.push(JSON.parse(res.data[i].stuField));
            tableData[i].id = res.data[i].stuId;
          }
          this.tableData = tableData;
          console.log(this.tableData, "tabledata");
        })
        .catch((err) => {
          this.$message.error("获取信息出错！" + err);
          this.listLoading = false;
        });
    },

    // 删除
    deleteIdentify(index, row) {
      this.listLoading = true;
      console.log(row, "删除row");
      let data = {};
      data.className = this.$store.state.user.doubleCreationClassName;
      data.adminUserName = this.$store.state.user.adminUserName || "superAdmin";
      data.id = row.id;

      deleteCreationStudent(data.adminUserName, data.id)
        .then((res) => {
          this.$message.success(res.msg);
          this.getTable();
        })
        .catch((err) => {
          this.$message.error("出错！" + err);
          console.log(err);
        });
      this.listLoading = false;
    },

    handleDownload() {
      if (
        this.search.name ||
        this.search.doubleCreationClass ||
        this.search.stuNum
      ) {
        getFile(
          `http://116.62.48.128:8008/api/student/findExport?name=${
            this.search.name
          }&className=${getDoubleCreationClass()}&doubleCreationClass=${
            this.search.doubleCreationClass
          }&stuNum=${this.search.stuNum}`,
          "双创班学生信息.xlsx"
        );
        return;
      }

      getFile(
        "http://116.62.48.128:8008/api/student/export" +
          `?className=${getDoubleCreationClass()}`,
        "双创班学生信息.xlsx"
      );

      // this.downloadLoading = true;
      // import("@/vendor/Export2Excel").then((excel) => {
      //     const tHeader = [
      //         "姓名",
      //         "性别",
      //         "政治面貌",
      //         "双创班名称",
      //         "所在学院",
      //         "专业班级",
      //         "学号",
      //         "联系电话",
      //         "QQ号码/邮箱",
      //         "加入班级时间",
      //         "离开班级时间",
      //         "双创班职务",
      //     ];
      //     const filterVal = [
      //         "name",
      //         // 性别
      //         "gender",
      //         // 政治面貌
      //         "politicalStatus",
      //         // 双创班名称
      //         "doubleCreationClass",
      //         "college",
      //         // 专业班级
      //         "professionClass",
      //         // 学号
      //         "stuNum",
      //         "phone",
      //         "email",
      //         // 加入班级时间
      //         "inDate",
      //         "outDate",
      //         // 双创班职务
      //         "position",
      //     ];
      //     const data = this.formatJson(filterVal);
      //     excel.export_json_to_excel({
      //         header: tHeader,
      //         data,
      //         filename: "双创班学生信息表",
      //     });
      //     // this.downloadLoading = false;
      // });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },

    beforeUpload(file) {
      // const isLt1M = file.size / 1024 / 1024 < 1;
      // if (isLt1M) {
      //     return true;
      // }
      // this.$message({
      //     message: "请不要上传大于 1m 大小的文件。",
      //     type: "warning",
      // });
      // return false;

      if (getDoubleCreationClass() === "superAdmin") {
        this.$message.error("超级管理员禁止直接导入，请在权限控制中切换身份！");
        return false;
      }
      return true;
    },

    //  搜索
    searchMethod(page = 1) {
      findCreationStudentByname(
        // page, this.listQuery.limit,
        this.search.name
      ).then((res) => {
        this.tableData = res.data;
        this.total = res.data.length;
        // 当第一次搜索时，未换页
        if (page === 1) {
          this.listQuery.page = 1;
        }
        for (let i in this.tableData) {
          this.tableData[i].tableID =
            Number(i) + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
        }
      });
    },
    // 换页
    pagination() {
      // 搜索时的分页
      if (
        this.search.name ||
        this.search.doubleCreationClass ||
        this.search.stuNum
      ) {
        this.searchMethod(this.listQuery.page);
        return;
      }

      // 一般时换页
      this.$router.push(
        "/double-creation/student-data2/index/" +
          this.listQuery.page +
          "&" +
          this.listQuery.limit
      );
    },
    edit(index, row) {
      // console.log(row);
      this.$router.push(
        "/double-creation/student-data2/edit/" + JSON.stringify(row)
      );
    },

    importSuccess(res) {
      this.$message(res.msg);
      this.getTable();
    },
  },
  watch: {
    // 监听搜索框空白
    "search.name"(val) {
      if (val === "") {
        this.getTable();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.addPanel {
  max-height: 600px;
  overflow: auto;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  .el-form-item {
    margin: 10px;
  }

  .formButton {
    text-align: center;
  }
}
</style>
