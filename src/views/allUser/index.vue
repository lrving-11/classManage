<template>
  <div class="app-container" style="padding: 0 20px">
    <!--        添加管理员面板      -->
    <el-card
      id="add"
      ref="addAdmin"
      :style="{
        display: addAdminDisplay,
        position: 'absolute',
        top: '48vh',
        left: '45vw',
        transform: 'translate(-50%, -50%)',
        'z-index': '100',
      }"
    >
      <el-form
        ref="form"
        :model="addAdmin"
        :rules="addAdminRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addAdmin.username" style="width: 200px" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addAdmin.password" style="width: 200px" />
        </el-form-item>
        <el-form-item label="实名" prop="name">
          <el-input v-model="addAdmin.name" style="width: 200px" />
        </el-form-item>

        <div style="display: flex">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="addAdmin.phone" style="width: 250px" />
          </el-form-item>
          <!--                    <el-form-item label="联系邮箱" prop="email">-->
          <!--                        <el-input-->
          <!--                            v-model="addAdmin.email"-->
          <!--                            style="width: 250px;"-->
          <!--                        />-->
          <!--                    </el-form-item>-->
        </div>

        <el-form-item label="学院" prop="college">
          <el-select v-model="addAdmin.college" placeholder="请选择">
            <el-option
              v-for="item in filtersCollege"
              :key="item.text"
              :label="item.text"
              :value="item.text"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="addAdminTurn('none')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-circle-plus-outline"
        style="margin-left: auto"
        @click="addAdminTurn('block')"
      >
        创建管理员
      </el-button>
      <!--            <el-button-->
      <!--                class="filter-item"-->
      <!--                style="margin-left: 10px;"-->
      <!--                type="primary"-->
      <!--                icon="el-icon-edit"-->
      <!--                @click="handleCreate"-->
      <!--            >-->
      <!--                添加-->
      <!--            </el-button>-->
      <!--            <el-button-->
      <!--                class="filter-item"-->
      <!--                type="primary"-->
      <!--                icon="el-icon-download"-->
      <!--                @click="handleDownload"-->
      <!--            >-->
      <!--                导出-->
      <!--            </el-button>-->
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
          <!--                    <el-button type="success" size="small">编辑</el-button>-->
          <el-button
            size="small"
            type="danger"
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
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column label="实名" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>

      <el-table-column label="管理员">
        <template slot-scope="scope">
          {{ scope.row.isisAdmin }}
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
import { getAllUser } from "@/api/login&register";
import user from "@/store/modules/user";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      // 分页
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },

      // 加载状态
      listLoading: true,

      showReviewer: 0,
      calendarTypeOptions: [],

      // 添加管理员
      addAdminDisplay: "none",

      addAdmin: {
        username: "",
        password: "",
        name: "",
        phone: "",
        college: "",
      },
      addAdminRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
        college: [{ required: true, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        phone: [{ required: true, trigger: "blur" }],
      },

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
        { label: "姓名", value: "name" },
        { label: "实名", value: "title" },
        // { value: "班级" },
        // { label: "个人介绍", value: "description" },
      ],

      // 筛选地区
      filtersZone: zone,
      // 筛选职业
      filtersProfession: profession,
      // 筛选学院，数组，元素是对象，有text和value两个属性
      filtersCollege: college,
      //
      list: null,
      // 表格数据
      tableData: null,
      // 信息
      // graduateData: {
      //     id: 0,
      //     name: "",
      //     phone: "",
      //     // 管理员实名
      //     realName: "",
      //     college: "",
      // },
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    // 获取所有信息
    getList() {
      // this.$axios
      //     .get(this.baseUrl + "/api/admin/findAllUser")
      getAllUser()
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
          this.listLoading = false;
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
    // 面板开关
    addAdminTurn(turn) {
      this.addAdminDisplay = turn.toString();
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let form = {};
          form = this.addAdmin;
          this.$axios
            .post(this.baseUrl + "/api/superAdmin/adminAdd", {
              ...form,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },

    // 筛选职业
    filterProfession(value, row) {
      return row.profession === value;
    },
    // 筛选学院事件
    filterCollege(value, row) {
      return row.college === value;
    },
    // 筛选地区事件
    filterZone(value, row) {
      return row.zone === value;
    },

    // 删除
    deleteIdentify(index, row) {
      let username = row.username;
      console.log(row);
      this.$axios
        .post(this.baseUrl + "/api/employment/delete", {
          username,
        })
        .then((res) => {
          this.$message.success(res.msg);
        })
        .catch((err) => {
          this.$message.error("出错！");
          console.log(err);
        });
    },

    handleCreate() {},

    handleDownload() {
      // this.downloadLoading = true;
      //     import("@/vendor/Export2Excel").then((excel) => {
      //         const tHeader = [
      //             "timestamp",
      //             "title",
      //             "type",
      //             "importance",
      //             "status",
      //         ];
      //         const filterVal = [
      //             "timestamp",
      //             "title",
      //             "type",
      //             "importance",
      //             "status",
      //         ];
      //         const data = this.formatJson(filterVal);
      //         excel.export_json_to_excel({
      //             header: tHeader,
      //             data,
      //             filename: "table-list",
      //         });
      //         this.downloadLoading = false;
      //     });
    },

    //  搜索
    search() {
      // 每次搜索需要重新获取tableData
      this.getTable();
      this.tableData = this.otableData.filter((item) => {
        // 根据搜索字段的不同，搜索不同的内容
        if (this.searchField === "name") {
          if (item.username) {
            return ~item.username.indexOf(this.searchKeys);
          }
        } else if (this.searchField === "title") {
          if (item.title) {
            return ~item.title.indexOf(this.searchKeys);
          }
        }
      });
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
