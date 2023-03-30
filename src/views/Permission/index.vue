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
          <el-button type="warning" @click="resetForm">重置</el-button>
          <el-button @click="addAdminTurn('none')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="filter-container" style="margin: 15px; display: flex">
      <el-input
        v-model="searchName"
        :placeholder="'搜索'"
        style="width: 300px"
        class="filter-item"
      />

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
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>

    <!--        -->

    <!--      暂时关掉  v-loading="listLoading"-->
    <el-row style="display: flex">
      <el-col :span="20">
        <el-table
          ref="graduateTable"
          :data="tableData"
          :height="450"
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
                type="text"
                size="small"
                @click="authorizeClick(scope.row)"
                >授权</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteIdentify(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="ID">
            <template slot-scope="scope">
              {{ scope.row.adminId }}
            </template>
          </el-table-column>
          <el-table-column label="用户名" align="center">
            <template slot-scope="scope">
              {{ scope.row.adminUserName }}
            </template>
          </el-table-column>
          <el-table-column label="密码" align="center">
            <template slot-scope="scope">
              {{ scope.row.adminPassword }}
            </template>
          </el-table-column>
          <el-table-column label="实名" align="center">
            <template slot-scope="scope">
              {{ scope.row.adminName }}
            </template>
          </el-table-column>
          <el-table-column label="学院" align="center">
            <template slot-scope="scope">
              {{ scope.row.adminCollege }}
            </template>
          </el-table-column>
          <el-table-column label="双创班" align="center">
            <template slot-scope="scope">
              {{ scope.row.adminCreatedClass }}
            </template>
          </el-table-column>

          <el-table-column label="联系方式">
            <template slot-scope="scope">
              <!--                    邮箱：-->
              <!--                    <p>{{ scope.row.email }}</p>-->
              电话：
              <p>{{ scope.row.adminPhone }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col
        :span="4"
        style="
          border: 2px solid rgba(116, 192, 252, 0.12);
          box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.12),
            0 0 6px rgba(0, 0, 0, 0.04);
          margin: 5px;
          position: relative;
        "
      >
        <div style="font-weight: 300; margin: 5px auto 15px 5px">
          授权给账号： {{ authorizeData.currentUser }}
        </div>
        <div v-show="authorizeData.currentUser !== ''">
          <el-checkbox-group
            v-model="authorizeData.list"
            style="display: flex; flex-direction: column; margin-left: 10px"
          >
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用"></el-checkbox>
            <el-checkbox label="选中且禁用"></el-checkbox>
          </el-checkbox-group>
          <el-button
            type="primary"
            style="
              position: absolute;
              left: 50%;
              bottom: 10px;
              transform: translateX(-50%);
            "
            >保存权限</el-button
          >
        </div>
        <p
          v-show="authorizeData.currentUser === ''"
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "
        >
          暂无数据
        </p>
      </el-col>
    </el-row>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getTable"
      style="margin: 0; padding: 5px 0 0 0"
    />
  </div>
</template>

<script>
import zone from "@/json/zone.json";
import profession from "@/json/profession.json";
import college from "@/json/college.json";
import userData from "@/store/modules/user2";
import Pagination from "@/components/Pagination/index";
import { findAllAdmin } from "@/api/admin/superAdmin";

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
    //   isAdmin: userData.getters.getIsAdmin || userData.getters.getSuperAdmin,
      isAdmin:true,
      // 搜索
      searchName: "",
      // tableData复制品
      otableData: "",
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
      //  管理员授权
      authorizeData: {
        // 选中用户
        currentUser: "",
        // 权限列表
        list: [],
      },
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    // 授权
    authorizeClick(row) {
      this.authorizeData.currentUser = row.username;
    },
    // 获取所有信息
    getList() {
      findAllAdmin(1, 100000)
        .then((res) => {
          console.log(res.data, "data");
          // 所有数据都保存在list中
          this.list = res.data;
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
    // 添加管理员
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let form = {};
          form = this.addAdmin;
          addAdmin(form)
            .then((res) => {
              this.getList();
              this.resetForm();
              this.$message.success(res.msg);
            })
            .catch((err) => {
              this.$message.error("添加管理员失败！ " + err);
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
      // this.$axios
      //     .post(this.baseUrl + "/api/superAdmin/adminDelete", {
      //         username,
      //     })
      deleteIdentify(username)
        .then((res) => {
          this.getList();
          this.$message.success(res.msg);
        })
        .catch((err) => {
          this.$message.error("出错！");
          console.log(err);
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

    handleCreate() {},

    handleDownload() {
      import("@/vendor/Export2Excel").then((excel) => {
        if (!this.tableData[0]) {
          this.$message.warning("数据为空，无法导出！");
          return;
        }
        const tHeader = ["序号", "用户名", "密码", "实名", "电话号码", "学院"];
        let filterVal = Object.keys(this.tableData[0]);
        // // 添加说明
        // let explanation = {
        //     id: "序号",
        //     name: "实名",
        //     username: "用户名",
        //     password: "密码",
        //     college: "学院",
        //     email: "邮箱",
        //     phone: "电话号码",
        // };
        // let tableDataCopy = this.tableData;
        // tableDataCopy.unshift(explanation);
        //
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "管理员信息表",
        });
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
  },
  watch: {
    // 模糊搜索
    searchName: function (val, oldVal) {
      this.tableData = this.otableData.filter((item) => {
        if (item.name) {
          return ~item.name.indexOf(val);
        }
      });
    },
  },
};
</script>
