<template>
  <div class="app-container" style="padding: 0 20px">
    <!--   编辑面板     -->
    <el-col :span="14" class="editPanel" v-show="editPanelTurn" style="">
      <el-card class="editForm">
        <el-form ref="form" :model="form" :rules="formRules">
          <div style="display: flex">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="form.name" style="width: 250px" />
            </el-form-item>
            <el-form-item label="学院" prop="college">
              <el-select
                multiple="multiple"
                v-model="form.college"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in filtersCollege"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" style="width: 250px" />
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email">
              <el-input v-model="form.email" style="width: 250px" />
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="职位" prop="profession">
              <el-select
                multiple="multiple"
                v-model="form.profession"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in filtersProfession"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="地区" prop="zone">
              <el-select
                v-model="form.zone"
                multiple="multiple"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in filtersZone"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="公司介绍" prop="description">
            <el-input
              v-model="form.description"
              type="textarea"
              maxlength="100"
              show-word-limit="show-word-limit"
            />
          </el-form-item>

          <el-form-item class="formButton">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button type="warning" @click="resetForm">重置</el-button>
            <el-button @click="closeForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>

    <div class="filter-container" style="margin: 15px; display: flex">
      <el-input
        v-model="searchKeys"
        :placeholder="'搜索'"
        style="width: 250px"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="searchField"
        placeholder="请选择"
        style="width: 150px"
      >
        <el-option
          v-for="item in searchOption"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="search"
        style="margin: 0 7px"
      >
        搜索
      </el-button>
      <!--
            <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="addClick"
                style="margin-left: auto;"
            >
                添加招聘信息
            </el-button>
            <el-button
                v-if="isAdmin"
                class="filter-item"
                type="primary"
                icon="el-icon-download"
                @click="handleDownload"
            >
                导出
            </el-button>

            <el-button
                v-if="isAdmin"
                class="filter-item"
                type="primary"
                icon="el-icon-upload2"
                @click="uploadExcelTurn = !uploadExcelTurn"
            >
                {{ uploadExcelTurn === true ? "关闭面板" : "导入" }}
            </el-button> -->
      <upload-excel-component
        v-show="uploadExcelTurn"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          background-color: #ebebeb;
        "
      />

      <!--            <el-checkbox-->
      <!--                v-model="showReviewer"-->
      <!--                class="filter-item"-->
      <!--                style="margin-left: 15px;"-->
      <!--                @change="tableKey = tableKey + 1"-->
      <!--            >-->
      <!--                只看有荣誉-->
      <!--            </el-checkbox>-->
    </div>

    <!--        -->

    <!--      暂时关掉  v-loading="listLoading"-->
    <el-table
      ref="graduateTable"
      :data="tableData"
      :height="400"
      element-loading-text="Loading"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        fixed="right"
        v-if="isAdmin"
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
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="企业" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="意向学院"
        align="center"
        column-key="college"
        :filter-method="filterCollege"
        :filters="filtersCollege"
      >
        <template slot-scope="scope">
          {{ scope.row.college }}
        </template>
      </el-table-column>
      <el-table-column label="意向专业" align="center">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="130">
        <template slot-scope="scope">
          邮箱：
          <p>{{ scope.row.email }}</p>
          电话：
          <p>{{ scope.row.phone }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="就业地区"
        align="center"
        column-key="zone"
        :filter-method="filterZone"
        :filters="filtersZone"
      >
        <template slot-scope="scope">
          {{ scope.row.zone }}
        </template>
      </el-table-column>
      <el-table-column
        label="职业"
        align="center"
        column-key="profession"
        :filter-method="filterProfession"
        :filters="filtersProfession"
      >
        <template slot-scope="scope">
          {{ scope.row.profession }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="毕业时间"
        min-width="100"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.date1 }} - {{ scope.row.date2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个人介绍" align="center" min-width="150">
        <template slot-scope="scope">
          <!--                    {{ scope.row.pageviews }}-->
          {{ scope.row.description }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getTable"
    />
  </div>
</template>

<script>
import zone from "@/json/zone.json";
import profession from "@/json/profession.json";
import college from "@/json/college.json";
import userData from "@/store/modules/user2";

import Pagination from "@/components/Pagination/index";
import UploadExcelComponent from "@/components/UploadExcel/index";
import { getAllRecruitment } from "@/api/company";

zone.forEach((item, value, array) => {
  item.text = item.name;
  item.value = item.name;
});

export default {
  components: {
    Pagination,
    UploadExcelComponent,
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      // 加载状态
      listLoading: true,
      // 上传面板开关
      uploadExcelTurn: false,

      showReviewer: 0,
      calendarTypeOptions: [],

      // 判断是否是管理员
      isAdmin: userData.getters.getIsAdmin || userData.getters.getSuperAdmin,

      // 搜索字段,默认是名字
      searchField: "name",
      // 搜索关键字
      searchKeys: "",
      // tableData复制品
      otableData: "",
      // 搜索选项
      searchOption: [
        { label: "企业", value: "name" },
        { label: "电话", value: "phone" },
        // { value: "班级" },
        { label: "个人介绍", value: "description" },
      ],

      // 筛选地区
      filtersZone: zone,
      // 筛选职业
      filtersProfession: profession,
      // 筛选学院，数组，元素是对象，有text和value两个属性
      filtersCollege: college,
      // 表格所有数据
      list: null,
      // 表格数据（分页）
      tableData: null,

      // 编辑面板
      editPanelTurn: false,
      editRow: undefined,
      form: {
        name: "",
        email: "",
        phone: "",
        zone: "",
        domain: "",
        description: "",
        // 用于后端判断是学生认证还是企业认证
        role: "student",
      },
      // 添加表单规则
      formRules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入公司名称",
          },
        ],
        college: [
          {
            required: true,
            trigger: "blur",
            message: "请输入学院",
          },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            message: "请输入电话号码",
          },
        ],
        email: [
          {
            required: true,
            type: "email",
            trigger: "blur",
            message: "请输入邮箱地址",
          },
        ],
        description: [
          {
            required: true,
            trigger: "blur",
            message: "请输入职位介绍",
          },
        ],
        zone: [
          {
            required: true,
            trigger: "blur",
            message: "请输入地区",
          },
        ],
        profession: [
          {
            required: true,
            trigger: "blur",
            message: "请输入职位",
          },
        ],
      },

      // 专业选项：
      major: {
        current: "",
        majorOption: college,
      },
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      // this.$axios
      //     .get(this.baseUrl + "/api/enterprise/recruitFindAll")
      getAllRecruitment()
        .then((res) => {
          // 所有数据都保存在list中
          this.list = res;
          // 分页显示
          this.total = res.length;
          this.getTable();
          // 复制品，用于搜索
          this.otableData = res;
          this.listLoading = false;
        })
        .catch((err) => {
          this.$message.error("获取信息出错！" + err);
        });
    },
    // 分页
    getTable() {
      let tableData = this.list.filter((item, index) => {
        if (
          index >= this.listQuery.limit * (this.listQuery.page - 1) &&
          index <= this.listQuery.limit * this.listQuery.page - 1
        ) {
          return item;
        }
      });
      this.tableData = tableData;
    },
    // 筛选职业
    filterProfession(value, row) {
      return row.profession === value;
    },
    // 筛选学院事件
    filterCollege(value, row) {
      if (row.college.indexOf(value) >= 0) {
        return row.college;
      }
    },
    // 筛选地区事件
    filterZone(value, row) {
      if (row.zone.indexOf(value) >= 0) {
        return row.zone;
      }
    },

    // 删除
    deleteIdentify(index, row) {
      console.log("后端");
      // let delId = index + 1;
      // this.$axios
      //     .post(this.baseUrl + "/api/employment/delete", {
      //         id: delId.toString(),
      //     })
      //     .then((res) => {
      //         this.$message.success(res.data.msg);
      //     })
      //     .catch((err) => {
      //         this.$message.error("出错！");
      //         console.log(err);
      //     });
    },

    //  搜索
    search() {
      // 每次搜索需要重新获取tableData
      this.getTable();
      this.tableData = this.otableData.filter((item) => {
        // 根据搜索字段的不同，搜索不同的内容
        if (this.searchField === "name") {
          if (item.name) {
            return ~item.name.indexOf(this.searchKeys);
          }
        } else if (this.searchField === "phone") {
          if (item.phone) {
            return ~item.phone.indexOf(this.searchKeys);
          }
        } else if (this.searchField === "description") {
          if (item.description) {
            return ~item.description.indexOf(this.searchKeys);
          }
        }
      });
    },

    addClick() {
      // 管理员或认证企业用户才可添加
      if (this.isAdmin === true || userData.getters.getIdentify === "company") {
        this.$router.push("/company/recruitment");
      } else {
        this.$message.error("请先认证");
      }
    },

    handleDownload() {
      import("@/vendor/Export2Excel").then((excel) => {
        // const tHeader = [
        //     "id",
        //     "名字",
        //     "学院",
        //     "电话",
        //     "邮箱",
        //     "地区",
        //     "专业",
        //     "入学时间",
        //     "毕业时间",
        //     "个人简介",
        // ];
        // const filterVal = [
        //     "id",
        //     "name",
        //     "college",
        //     "phone",
        //     "email",
        //     "zone",
        //     "profession",
        //     "date1",
        //     "date2",
        //     "description",
        // ];
        if (!this.tableData[0]) {
          this.$message.warning("数据为空，无法导出！");
          return;
        }
        const tHeader = Object.keys(this.tableData[0]);
        const filterVal = tHeader;
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "招聘信息表",
        });
        // this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
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
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "请不要上传大于 1m 大小的文件。",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },

    edit(index, row) {
      console.log(index);
      console.log(this.tableData[index]);

      let { name, phone, email, zone, profession, college, description } =
        this.tableData[index];
      let data = {
        name,
        phone,
        email,
        zone,
        profession,
        college,
        description,
      };
      // 小处理,把多选选择框数据由字符串转为数组
      data.zone = data.zone ? data.zone.split(",") : "";
      data.college = data.college ? data.college.split(",") : "";
      data.profession = data.profession ? data.profession.split(",") : "";
      this.form = data;
      this.editRow = row;
      this.editPanelTurn = true;
    },
    // 编辑提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let form = {};
          form = this.form;
          form.username = this.editRow.username;
          form.role = "student";
          // 数组转字符串
          // form.domain = form.domain.toString();
          form.zone = form.zone.toString();
          form.profession = form.profession.toString();
          form.college = form.college.toString();

          // this.$axios.put()
          //     .then((res) => {
          //         this.$message.success(res.msg);
          //         this.getList();
          //         // 清理绑定数据
          //         this.$refs.form.resetFields();
          //     })
          //     .catch((err) => {
          //         this.$message.error("出错！");
          //         console.log(err);
          //     });
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
    closeForm() {
      this.editPanelTurn = false;
    },
  },
  watch: {
    // 监听搜索框空白
    searchKeys(val) {
      if (val === "") {
        this.getTable();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.editPanel {
  min-width: 600px;
  max-height: 600px;
  overflow: auto;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  .el-form-item {
    margin: 10px;
  }

  .formButton {
    text-align: center;
  }
}
</style>
