<template>
  <div class="app-container" style="padding: 0 20px">
    <!--   表格     -->
    <div class="filter-container" style="margin: 5px 0px; display: flex">
      <el-input
        v-model="search.name"
        :placeholder="'学生姓名'"
        style="width: 120px"
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
          'http://116.62.48.128:8008/api/graduateStudent/import?className=' +
          className
        "
        :headers="token"
        :before-upload="beforeUpload"
        :on-success="importSuccess"
        :on-error="importError"
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
      <!-- <el-table-column
        class-name="status-col"
        label="编辑"
        width="170"
        align="center"
      >
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
    />
  </div>
</template>

<script>
import zone from "@/json/zone.json";
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
import {
  translateChinese,
  translatevariable,
} from "@/vendor/tHeaderConversion";
import {
  deleteCreationGraduate,
  findCreationGraduate,
  findByNameCreationGraduate,
  // searchCreationGraduate,
  // searchExportCreationGraduate,
} from "@/api/graduate_students/creationGraduateData";
import {
  getDoubleCreationClass,
  getToken,
  getAdminUserName,
} from "@/utils/auth";
import { getField } from "@/api/dontai";

export default {
  components: {
    Pagination,
    UploadExcelComponent,
  },

  data() {
    return {
      adminUserName: getAdminUserName() || "superAdmin",
      token: { token: getToken() },
      // className: getDoubleCreationClass(),
      className: "信息处理与计算创新创业实验班",

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
        // // 双创班名称
        // doubleCreationClass: "",
        // stuNum: "",
      },

      // 搜索字段,默认是名字
      searchField: "",
      // 搜索关键字
      searchKeys: "",
      // tableData复制品
      otableData: "",
      // 搜索选项
      searchOption: [
        { label: "姓名", value: "name" },
        // { label: "学号", value: "stuNum" },
        // { label: "QQ号码", value: "qq" },
      ],
      // 筛选学院，数组，元素是对象，有text和value两个属性
      college: college,
      // 双创班
      doubleCreation: doubleCreation,
      //
      list: null,
      // 表格数据
      tableData: [],
      fields: [],
      // 编辑面板
      addPanelTurn: false,
      editRow: undefined,
      form: {},

      // 专业选项：
      major: {
        current: "",
        majorOption: () => import("@/json/college.json"),
      },
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
  mounted() {
    // this.getTable();
    // console.log(this.tableData,"tableData");
  },
  methods: {
    getField() {
      getField("graStudentInfo")
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
      findCreationGraduate(
        this.listQuery.page,
        this.listQuery.limit,
        this.className
      )
        .then((res) => {
          // 所有数据都保存在list中
          this.list = res.data;
          // 分页显示
          this.total = res.data.length || 0;

          // 循环添加序号
          let tableData = [];

          for (let i in tableData) {
            tableData[i].tableID =
              Number(i) + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          }

          this.listLoading = false;
          let length1 = res.data.length || 0;

          console.log(length1, "length1");
          for (let i = 0; i < length1; i++) {
            tableData.push(JSON.parse(res.data[i].graField));
            tableData[i].id = res.data[i].graId;
          }
          this.tableData = tableData;
        })
        .catch((err) => {
          this.$message.error("获取信息出错！" + err);
          this.listLoading = false;
        });
    },

    // 删除
    deleteIdentify(index, row) {
      this.listLoading = true;
      console.log(row, "11");

      deleteCreationGraduate(this.adminUserName, row.id)
        .then((res) => {
          this.$message.success(res.msg);
          this.getTable();
        })
        .catch((err) => {
          this.$message.error("出错！" + err);
          this.listLoading = false;
          console.log(err);
        });
      this.listLoading = false;
    },

    handleCreate() {},

    handleDownload() {
      if (
        this.search.name ||
        this.search.stuNum ||
        this.search.doubleCreationClass
      ) {
        getFile(
          `http://116.62.48.128:8008/api/graduateStudent/findExport?name=${
            this.search.name
          }&stuNum=${this.search.stuNum}&doubleCreationClass=${
            this.search.doubleCreationClass
          }&className=${getDoubleCreationClass()}`,
          "双创班毕业生信息表.xlsx"
        );

        return;
      }
      getFile(
        `http://116.62.48.128:8008/api/graduateStudent/export?className=${getDoubleCreationClass()}`,
        "双创班毕业生信息表.xlsx"
      );

      // this.downloadLoading = true;
      // import("@/vendor/Export2Excel").then((excel) => {
      //     const tHeader = [
      //         "ID",
      //         "姓名",
      //         "性别",
      //         "双创班名称",
      //         "毕业学院",
      //         "专业班级",
      //         "学号",
      //         "电话号码",
      //         "QQ号码",
      //         "常用邮箱",
      //         "加入双创班时间",
      //         "离开双创班时间",
      //         "毕业时间",
      //         "就业单位名称",
      //         "就业岗位",
      //         "创办企业名称",
      //     ];
      //     const filterVal = [
      //         "id",
      //         "name",
      //         // 性别
      //         "gender",
      //         // 双创班名称
      //         "doubleCreationClass",
      //         // 毕业学院
      //         "college",
      //         // 专业班级
      //         "professionClass",
      //         // 学号
      //         "stuNum",
      //         "phone",
      //         "qq",
      //         "email",
      //         // 加入双创班时间
      //         "inDate",
      //         "outDate",
      //         // 毕业时间
      //         "graduationTime",
      //         // 就业单位名称
      //         "unitName",
      //         // 就业岗位
      //         "work",
      //         // 创办企业名称
      //         "companyName",
      //     ];
      //     const data = this.formatJson(filterVal);
      //     excel.export_json_to_excel({
      //         header: tHeader,
      //         data,
      //         filename: "双创班毕业生信息表",
      //     });
      //     // this.downloadLoading = false;
      // });
    },
    formatJson(filterVal) {
      return this.tableData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },

    handleSuccess({ results, header }) {
      // console.log(results);
      this.tableData = translateChinese(results, "学生");
      // console.log(this.tableData);
      // this.tableHeader = header;
    },
    //  搜索
    searchMethod(page = 1) {
      findByNameCreationGraduate(
        // page,
        // this.listQuery.limit,
        this.search.name
      ).then((res) => {
        this.tableData = res.data;
        this.total = res.data.length || 0;
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
        "/double-creation/graduate-data-2/index/" +
          this.listQuery.page +
          "&" +
          this.listQuery.limit
      );
    },
    edit(index, row) {
      this.$router.push(
        "/double-creation/graduate-data-2/edit/" + JSON.stringify(row)
      );
    },

    // 导入
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
    importSuccess() {
      this.$message.success("导入成功！");
      this.getTable();
    },
    importError() {
      this.$message.error("导入成功！");
      this.getTable();
    },

    // 筛选性别
    filterGender(value, row) {
      return row.gender === value;
    },
    // 筛选政治面貌
    filterPoliticalStatus(value, row) {
      return row.politicalStatus === value;
    },
    // 筛选学院事件
    filterCollege(value, row) {
      return row.college === value;
    },
    // 筛选
    filterDoubleCreation(value, row) {
      return row.doubleCreation === value;
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
[v-cloak] {
  display: none;
}
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
