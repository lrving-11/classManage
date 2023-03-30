<template>
  <div class="app-container" style="padding: 0 20px">
    <div class="filter-container" style="display: flex">
      <el-card
        v-show="uploadExcelTurn"
        style="
          position: absolute;
          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);
          z-index: 100;
          background-color: #ebebeb;
        "
      >
        <el-upload
          class="upload-demo"
          drag
          :action="
            'http://116.62.48.128:8008/api/createdClass/import?className=' +
            className
          "
          :headers="token"
          :before-upload="beforeUpload"
          :on-success="importSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
      </el-card>
    </div>

    <!-- 图表 -->
    <el-table
      ref="graduateTable"
      :data="tableData"
      :height="420"
      element-loading-text="Loading"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        fixed="right"
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
      </el-table-column>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.classId }}
        </template>
      </el-table-column>
      <el-table-column label="班级名称" align="center" min-width="110">
        <template slot-scope="scope">
          {{ scope.row.className }}
        </template>
      </el-table-column>
      <el-table-column label="主办学院" align="center" min-width="110">
        <template slot-scope="scope">
          {{ scope.row.classFoundCollege }}
        </template>
      </el-table-column>
      <el-table-column label="班级成立时间" align="center" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.classFoundTime }}
        </template>
      </el-table-column>
      <el-table-column label="首导姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.classTeacherName }}
        </template>
      </el-table-column>
      <el-table-column label="所属学院" align="center" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.classBelongCollege }}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.classTeacherPhone }}
        </template>
      </el-table-column>

      <el-table-column label="导师团队" align="center" min-width="325">
        <template slot-scope="scope">
          {{ formatData(scope.row.classGroupNameCollege) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="校外导师" min-width="325">
        <template slot-scope="scope">
          {{ formatData(scope.row.outTeacherAndCompany) }}
        </template>
      </el-table-column>
      <el-table-column label="双创教育基地名称" align="center" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.classBaseName }}
        </template>
      </el-table-column>
      <el-table-column label="挂牌时间" align="center" min-width="110">
        <template slot-scope="scope">
          {{ scope.row.classListingTime }}
        </template>
      </el-table-column>
      <el-table-column label="班级简介" align="center" min-width="110">
        <template slot-scope="scope">
          <el-button type="text" @click="findIntroduce(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 表格展示 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      height="480"
      border=""
      size=""
    >
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
      <el-table-column label="联系电话" width="">
        <template slot-scope="scope">
          {{ scope.row.classTeacherPhone }}
        </template>
      </el-table-column>
      <el-table-column label="导师团队" width="">
        <template slot-scope="scope">
          {{ formatData(scope.row.classGroupNameCollege) }}
        </template>
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
      </el-table-column>
    </el-table>
    <!-- 表格展示END -->

    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :page-sizes="[10, 20, 50, 100, 150, 200]"
      @pagination="pagination"
    />
    <!--   简介     -->
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
      "
    >
      <el-image
        v-for="i in rowData.classIntroduceImage"
        :key="i.uid"
        :src="'http://116.62.48.128:8008/api/image?fileName=' + i.filename"
        :fit="'scale-down'"
        style="width: 150px; height: 150px"
        @click="
          dialogVisible = true;
          dialogImageUrl =
            'http://116.62.48.128:8008/api/image?fileName=' + i.filename;
        "
      ></el-image>

      <div
        style="
          min-height: 200px;
          border: 1px solid #dedede;
          border-radius: 4px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          margin: 7px 5px 5px 5px;
          padding: 10px 5px;
        "
      >
        {{ rowData.classIntroduceText }}
      </div>
      <el-row type="flex">
        <el-button
          @click="classIntroductionTurn = false"
          style="margin: 5px auto 2px auto"
          >关闭</el-button
        >
      </el-row>
    </el-card>

    <!--    图片展示     -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import zone from "@/json/zone.json";
import profession from "@/json/profession.json";
import college from "@/json/college.json";
import doubleCreation from "@/json/DoubleCreation.json";
import userData from "@/store/modules/user2";
import editForm from "@/store/modules/editFormData";
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
  findAllIntroduce,
  deleteIntroduce,
} from "@/api/double_creation_class/double_creation/introduce";
import { getDoubleCreationClass, getToken } from "@/utils/auth";
import { getFile } from "@/utils/getFile";

export default {
  components: {
    Pagination,
    UploadExcelComponent,
  },

  data() {
    return {
      // 该行的数据
      rowData: {},
      token: { token: getToken() },
      //   className: getDoubleCreationClass(),
      className: "信息处理与计算创新创业实验班",

      imgUrl: "",

      dialogVisible: false,
      dialogImageUrl: "",

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
      // 班级简介面板开关
      classIntroductionTurn: false,

      search: {
        // 双创教育基地名称
        baseName: "",
        // 主办学院
        foundCollege: "",
        // 挂牌时间
        listingTime: ["", ""],
      },

      // 筛选学院，数组，元素是对象，有text和value两个属性
      filtersCollege: college,
      //
      doubleCreation: doubleCreation,
      list: null,
      // 表格数据
      tableData: [],

      // 专业选项：
      major: {
        current: "",
        majorOption: () => import("@/json/college.json"),
      },
    };
  },
  created() {
    //    对页数的处理
    // if (this.$route.params.page && this.$route.params.limit) {
    //   this.listQuery.page = Number(this.$route.params.page);
    //   this.listQuery.limit = Number(this.$route.params.limit);
    // }
    this.findAllcreatedClassInfo();
    this.getTable();
  },
  methods: {
    // 获取

    // getTable() {
    //   console.log(this.className);
    //   getIntroduce(
    //     this.listQuery.page,
    //     this.listQuery.limit,
    //     this.className

    //     // getDoubleCreationClass(),
    //     // userData.state.adminUserName
    //   )
    //     .then((res) => {
    //         console.log(res);
    //       // 所有数据都保存在list中
    //       // this.tableData = JSON.parse(res.data.content.stuField);
    //       for (let i = 0; i < res.data.length; i++) {
    //         this.tableData.push(
    //           // JSON.parse(res.data.content[i].stuField)
    //           res.data.content[i]
    //         );
    //       }
    //       console.log(this.tableData);
    //       // this.tableData.className = res.data.content.className;
    //       // 分页显示
    //       this.total = res.data.length;

    //       // 循环添加序号
    //       for (let i in this.tableData) {
    //         this.tableData[i].tableID =
    //           Number(i) + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
    //       }
    //       this.listLoading = false;
    //     })
    //     .catch((err) => {
    //       this.$message.error("获取信息出错！" + err);
    //       this.listLoading = false;
    //     });
    // },

    // 删除
    findAllcreatedClassInfo() {
      // 查询信息
      findAllIntroduce(1, 100000, this.className)
        .then((res) => {
          // console.log(res.data, "查询就业信息");
          this.list = res.data;
          this.total = this.list.length;
          // console.log(this.total, "total");
          // 分页
          let tableData = this.list.filter((item, index) => {
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

    deleteIdentify(index, row) {
      this.listLoading = true;

      deleteIntroduce(row.id)
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
        this.search.baseName ||
        this.search.foundCollege ||
        this.search.listingTime[0]
      ) {
        getFile(
          `http://116.62.48.128:8008/api/createdClass/findExport?baseName=${
            this.search.baseName
          }&className=${getDoubleCreationClass()}&foundCollege=${
            this.search.foundCollege
          }&startTime=${this.search.listingTime[0]}&endTime=${
            this.search.listingTime[1]
          }`,
          "双创班班级简介.xlsx"
        );
        return;
      }
      getFile(
        `http://116.62.48.128:8008/api/createdClass/export?className=${getDoubleCreationClass()}`,
        "双创班班级简介.xlsx"
      );

      // // this.downloadLoading = true;
      // import("@/vendor/Export2Excel").then((excel) => {
      //     const tHeader = [
      //         "班级名称",
      //         "主办学院",
      //         "班级成立时间",
      //         "首导姓名",
      //         "首导所属学院",
      //         "导师团队成员",
      //         "校外导师",
      //         "双创教育基地名称",
      //         "挂牌时间",
      //         "班级简介（文字）",
      //     ];
      //     const filterVal = [
      //         "baseName",
      //         //    主办学院
      //         "foundCollege",
      //         //    班级成立时间
      //         "listingTime",
      //         //     首导姓名
      //         "teacherName",
      //         //     首导所属学院
      //         "belongCollege",
      //         // //    导师团队成员姓名
      //         // "groupNameAndCollegeName",
      //         // //    导师团队成员所属学院
      //         // "groupNameAndCollegeCollege",
      //         //     导师团队成员
      //         "groupNameAndCollege",
      //         // //     校外导师姓名
      //         // "outTeacherAndCompanyName",
      //         // //    校外导师单位名称
      //         // "outTeacherAndCompanyUnitName",
      //         "outTeacherAndCompany",
      //         //    双创教育基地名称
      //         "educationBaseName",
      //         //    挂牌时间
      //         "listingTime",
      //         //    班级简介
      //         "classIntroduction.text",
      //     ];
      //     const data = this.formatJson(filterVal);
      //     excel.export_json_to_excel({
      //         header: tHeader,
      //         data,
      //         filename: "双创班简介",
      //     });
      //     // this.downloadLoading = false;
      // });
    },

    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          // 时间格式化
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },

    // 格式化数据，使对象数组转换成用户体验友好的字符串格式
    formatData(data) {
      let arr = JSON.parse(data);
      if (arr != null) {
        // 当类型为string时
        if (typeof arr === "string") {
          let str = arr.split(",");
          return str[0] + "(" + str[1] + ")";
        } else {
          // 数据为对象数组的情况时

          if (arr.length === 0) {
            return "数据为空";
          } else if (arr.length === 1) {
            // return ;
            let key = Object.keys(arr[0]);
            return arr[0][key[0]] + "(" + arr[0][key[1]] + ")";
          } else {
            let str = "";
            let key = Object.keys(arr[0]);

            for (let i of arr) {
              //
              str += i[key[0]] + "(" + i[key[1]] + ")" + ",";
            }
            return str;
          }
        }
      } else {
        return "数据为空";
      }
    },
    getImage(url) {
      this.$axios
        .get(url, {
          headers: {
            token: getToken(),
          },
        })
        .then((res) => {
          this.data = res.data;
          return this.data;
          // console.log(this.data);
        });
      // console.log(this.data);
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
      searchIntroduce(
        page,
        this.listQuery.limit,
        this.search.baseName,
        this.search.listingTime[1],
        this.search.foundCollege,
        this.search.listingTime[0]
      ).then((res) => {
        this.tableData = res.data.content;
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
      if (
        this.search.baseName ||
        this.search.foundCollege ||
        this.search.listingTime[0]
      ) {
        this.searchMethod(this.listQuery.page);
        return;
      }
      // 一般时换页
      this.$router.push(
        "/double-creation/description/index/" +
          this.listQuery.page +
          "&" +
          this.listQuery.limit
      );
    },

    edit(index, row) {
      // console.log(row);
      editForm.commit("setEditFormData", row);
      this.$router.push("/double-creation/description/edit/");
    },

    importSuccess(res) {
      this.$message(res.msg);
      this.getTable();
    },

    findIntroduce(row) {
      this.classIntroductionTurn = true;

      // console.log(JSON.parse(row.introduceImage));
      this.rowData.introduceImage = JSON.parse(row.introduceImage);
      this.rowData.introduceText = row.introduceText;
    },
  },
  computed: {
    listingTime() {
      return this.search.listingTime;
    },
  },
  watch: {
    // 解决范围性搜索空白时搜索报错的问题
    listingTime(val) {
      if (val === null) {
        this.search.listingTime = ["", ""];
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
