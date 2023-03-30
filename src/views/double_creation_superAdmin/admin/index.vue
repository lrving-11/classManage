<!--    管理员权限控制      -->
<template>
  <div class="app-container" style="padding: 0 20px">
    <!--        添加管理员面板      -->
    <el-card
      id="add"
      ref="addAdmin"
      v-show="addAdminTurn || editAdminTurn"
      :style="{
        position: 'absolute',
        top: '48%',
        left: '50%',
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
        <div style="display: flex">
          <el-form-item label="用户名" prop="adminUserName">
            <el-input v-model="addAdmin.adminUserName" style="width: 200px" />
          </el-form-item>
          <el-form-item label="密码" prop="adminPassword">
            <el-input v-model="addAdmin.adminPassword" style="width: 200px" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="联系电话" prop="adminPhone">
            <el-input v-model="addAdmin.adminPhone" style="width: 250px" />
          </el-form-item>
          <el-form-item label="实名" prop="adminName">
            <el-input v-model="addAdmin.adminName" style="width: 250px" />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="公司" prop="adminCompany">
            <!-- <el-select v-model="addAdmin.adminCompany" placeholder="请选择">
              <el-option
                v-for="item in filtersCollege"
                :key="item.text"
                :label="item.text"
                :value="item.text"
              />
            </el-select> -->
             <el-input v-model="addAdmin.adminCompany" style="width: 250px" />
          </el-form-item>
        
        </div>

        <el-form-item label="修改信息" prop="adminIsUpdate">
          <el-switch
            v-model="addAdmin.adminIsUpdate"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-form-item>

        <el-form-item>
          <el-button
            v-show="addAdminTurn && editAdminTurn === false"
            type="primary"
            @click="onSubmit"
            >创建</el-button
          >
          <el-button
            v-show="addAdminTurn === false && editAdminTurn"
            type="primary"
            @click="editOnSubmit"
            >提交</el-button
          >
          <el-button type="warning" @click="resetForm">重置</el-button>
          <el-button
            @click="
              addAdminTurn = false;
              editAdminTurn = false;
            "
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <div class="filter-container" style="margin: 15px; display: flex">
      <!-- <el-input
        v-model="searchName"
        :placeholder="'搜索'"
        style="width: 300px"
        class="filter-item"
      /> -->

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-circle-plus-outline"
        style="margin-left: auto"
        @click="
          addAdminTurn = true;
          addAdmin = {};
        "
      >
        创建管理员
      </el-button>
   
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
      <el-col :span="24">
        <el-table
          ref="graduateTable"
          :data="tableData"
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
              <!--                            <el-button-->
              <!--                                type="text"-->
              <!--                                size="small"-->
              <!--                                @click="authorizeClick(scope.row)"-->
              <!--                                >授权</el-button-->
              <!--                            >-->
              <el-button
                plain
                type="primary"
                size="small"
                @click="editAdmin(scope.row)"
                >编辑</el-button
              >
              <el-button
                plain
                type="danger"
                size="small"
                @click="deleteIdentify(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="ID">
            <template slot-scope="scope">
              {{ scope.$index + 1 + (listQuery.page - 1) * listQuery.limit }}
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
          <el-table-column label="公司" align="center" min-width="120">
            <template slot-scope="scope">
              {{ scope.row.adminCompany }}
            </template>
          </el-table-column>

          <el-table-column label="电话号码" align="center" min-width="110">
            <template slot-scope="scope">
              {{ scope.row.adminPhone }}
            </template>
          </el-table-column>
          <el-table-column label="修改信息" align="center" min-width="110">
            <template slot-scope="scope">
              {{ scope.row.adminIsUpdate }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--            <el-col-->
      <!--                :span="4"-->
      <!--                style="-->
      <!--                    border: 2px solid rgba(116, 192, 252, 0.12);-->
      <!--                    box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.12),-->
      <!--                        0 0 6px rgba(0, 0, 0, 0.04);-->
      <!--                    margin: 5px;-->
      <!--                    position: relative;-->
      <!--                "-->
      <!--            >-->
      <!--                <div style="font-weight: 300; margin: 5px auto 15px 5px;">-->
      <!--                    授权给账号： {{ authorizeData.currentUser }}-->
      <!--                </div>-->
      <!--                <div v-show="authorizeData.currentUser !== ''">-->
      <!--                    &lt;!&ndash;                    <el-checkbox-group&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        v-model="authorizeData.list"&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        style="&ndash;&gt;-->
      <!--                    &lt;!&ndash;                            display: flex;&ndash;&gt;-->
      <!--                    &lt;!&ndash;                            flex-direction: column;&ndash;&gt;-->
      <!--                    &lt;!&ndash;                            margin-left: 10px;&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        "&ndash;&gt;-->
      <!--                    &lt;!&ndash;                    >&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        <el-checkbox label="复选框 A"></el-checkbox>&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        <el-checkbox label="复选框 B"></el-checkbox>&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        <el-checkbox label="复选框 C"></el-checkbox>&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        <el-checkbox label="禁用"></el-checkbox>&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        <el-checkbox label="选中且禁用"></el-checkbox>&ndash;&gt;-->
      <!--                    &lt;!&ndash;                    </el-checkbox-group>&ndash;&gt;-->
      <!--                    &lt;!&ndash;                    <el-button&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        type="primary"&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        style="&ndash;&gt;-->
      <!--                    &lt;!&ndash;                            position: absolute;&ndash;&gt;-->
      <!--                    &lt;!&ndash;                            left: 50%;&ndash;&gt;-->
      <!--                    &lt;!&ndash;                            bottom: 10px;&ndash;&gt;-->
      <!--                    &lt;!&ndash;                            transform: translateX(-50%);&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        "&ndash;&gt;-->
      <!--                    &lt;!&ndash;                        >保存权限</el-button&ndash;&gt;-->
      <!--                    &lt;!&ndash;                    >&ndash;&gt;-->

      <!--                    <div>-->
      <!--                        <el-select v-model="addAdmin.doubleCreationClass">-->
      <!--                            <el-option-->
      <!--                                v-for="i in doubleCreation"-->
      <!--                                :key="i.value"-->
      <!--                                :value="i.value"-->
      <!--                                >{{ i.text }}</el-option-->
      <!--                            >-->
      <!--                        </el-select>-->
      <!--                    </div>-->
      <!--                </div>-->
      <!--                <p-->
      <!--                    v-show="authorizeData.currentUser === ''"-->
      <!--                    style="-->
      <!--                        position: absolute;-->
      <!--                        top: 50%;-->
      <!--                        left: 50%;-->
      <!--                        transform: translate(-50%, -50%);-->
      <!--                    "-->
      <!--                >-->
      <!--                    暂无数据-->
      <!--                </p>-->
      <!--            </el-col>-->
    </el-row>
    <!--        <pagination-->
    <!--            :total="total"-->
    <!--            :page.sync="listQuery.page"-->
    <!--            :limit.sync="listQuery.limit"-->
    <!--            :page-sizes="[10, 20, 50, 100, 150, 200]"-->
    <!--            @pagination="getTable"-->
    <!--            style="margin: 0; padding: 5px 0 0 0;"-->
    <!--        />-->
  </div>
</template>

<script>
import college from "@/json/college.json";
import doubleCreationClass from "@/json/DoubleCreation.json";
import userData from "@/store/modules/user2";
import Pagination from "@/components/Pagination/index";
import {
  adminDelete,
  adminUpdate,
  findAllAdmin,
  adminAdd,
} from "@/api/admin/superAdmin";

export default {
  components: {
    Pagination,
  },

  data() {
    return {
      adminForm: {
        adminCollege: "string", //学院
        adminCreatedClass: "string", //双创班
        adminId: 0,
        adminIsAdmin: true, //是否管理员
        adminIsFrozen: true, //
        adminIsSuperAdmin: true,
        adminIsUpdate: true, //是否可修改
        adminName: "string", //实名
        adminPassword: "string", //密码
        adminPhone: "string", //电话
        adminTime: "string", //
        adminTimes: 0, //
        adminToken: "string", //
        adminUserName: "string", //用户名
      },
      // 分页
      total: 0,
      listQuery: {
        page: 1,
        limit: 100,
      },
      // 加载状态
      listLoading: true,

      showReviewer: 0,
      calendarTypeOptions: [],

      // 编辑管理员
      editAdminTurn: false,
      // 添加管理员
      addAdminTurn: false,

      addAdmin: {
        adminCollege: "", //学院
        adminCreatedClass: "", //双创班
        adminId: 0,
        adminIsAdmin: true, //是否管理员
        adminIsFrozen: true, //
        adminIsSuperAdmin: true,
        adminIsUpdate: true, //是否可修改
        adminName: "", //实名
        adminPassword: "", //密码
        adminPhone: "", //电话
        adminTime: "", //
        adminTimes: 0, //
        adminToken: "", //
        adminUserName: "", //用户名
        adminCompany:""//公司
      },
      addAdminRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
        college: [{ required: true, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        phone: [{ required: true, trigger: "blur" }],
        doubleCreationClass: [{ required: true, trigger: "blur" }],
        isExamine: [{ required: true, trigger: "blur" }],
        isLook: [{ required: true, trigger: "blur" }],
        isUpdate: [{ required: true, trigger: "blur" }],
      },

      // 搜索
      searchName: "",
      // tableData复制品
      otableData: "",
      // 筛选双创班
      doubleCreation: doubleCreationClass,
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
    this.getTable();
  },
  methods: {
    // 授权
    authorizeClick(row) {
      this.authorizeData.currentUser = row.username;
    },
    // 获取所有信息

    // 分页
    getTable() {
      findAllAdmin(1, 10000)
        .then((res) => {
          // 所有数据都保存在list中
          this.tableData = res.data;
          // 分页显示
          this.total = res.data.length;
          // 复制品，用于搜索
          this.otableData = res.data;
          this.listLoading = false;
          console.log(this.tableData,"管理员列表");
        })
        .catch((err) => {
          this.$message.error("获取信息出错！" + err);
          this.listLoading = false;
        });
    },

    // 添加管理员
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let form = {};
          form = this.addAdmin;
          adminAdd(form)
            .then((res) => {
              this.getTable();
              this.resetForm();
              this.$message.success(res.msg);
            })
            .catch((err) => {
              this.$message.error("添加管理员失败！ " + err);
              console.log(err);
            });
        }
      });
      this.addAdminTurn=false;
    },
    // 编辑管理员
    editAdmin(row) {
      // console.log(row);
      this.editAdminTurn = true;
      this.addAdmin = row;
    },

    // 编辑管理员提交
    editOnSubmit() {
      let form = this.addAdmin;
      adminUpdate(form)
        .then((res) => {
          this.getTable();
          this.resetForm();
          this.$message.success(res.msg);
        })
        .catch((err) => {
          this.$message.error("修改管理员失败！ " + err);
          console.log(err);
        });
        this.editAdminTurn = false;
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
      adminDelete(row.adminId)
        .then((res) => {
          this.getTable();
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

    handleDownload() {
      // import("@/vendor/Export2Excel").then((excel) => {
      //     if (!this.tableData[0]) {
      //         this.$message.warning("数据为空，无法导出！");
      //         return;
      //     }
      //     const tHeader = [
      //         "用户名",
      //         "密码",
      //         "实名",
      //         "学院",
      //         "双创班名称",
      //         "电话号码",
      //     ];
      //     // 添加说明
      //     let filterVal = [
      //         "username",
      //         "password",
      //         "name",
      //         "college",
      //         // 双创班
      //         "doubleCreationClass",
      //         "phone",
      //     ];
      //     const data = this.formatJson(filterVal);
      //     excel.export_json_to_excel({
      //         header: tHeader,
      //         data,
      //         filename: "管理员信息表",
      //     });
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
