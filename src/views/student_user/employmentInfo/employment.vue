<template>
  <div>
    <!-- <h2>就业信息</h2> -->

    <el-button type="primary" @click="addInfo" style="margin-left: 10px"
      >添加信息</el-button
    >

    <!-- 表格展示 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      height="480"
      border=""
      size=""
      ><el-table-column type="index" width="100" align="center">
      </el-table-column>
      <el-table-column prop="empName" label="姓名" width=""> </el-table-column>
      <el-table-column prop="empBirth" label="出生年月" width="">
      </el-table-column>
      <el-table-column prop="empStuNumber" label="学号" width="">
      </el-table-column>
      <el-table-column prop="empSex" label="性别" width=""> </el-table-column>
      <el-table-column prop="empMajor" label="专业名称" width="">
      </el-table-column>
      <el-table-column prop="empCreatedClass" label="双创班名称" width="">
      </el-table-column>
      <el-table-column prop="empContacts" label="就业单位联系人" width="">
      </el-table-column>
      <el-table-column prop="empEmail" label="Email" width="">
      </el-table-column>
      <el-table-column prop="empQq" label="QQ" width=""> </el-table-column>
      <el-table-column prop="empCity" label="就业城市" width="">
      </el-table-column>
      <el-table-column prop="empCounterpart" label="专业对口情况" width="">
      </el-table-column>
      <el-table-column prop="empDepartment" label="入职部门" width="">
      </el-table-column>
      <el-table-column prop="empUnit" label="就业单位" width="">
      </el-table-column>
      <el-table-column prop="empUnitNature" label="单位性质" width="">
      </el-table-column>

      <el-table-column prop="empFunction" label="职务职能" width="">
      </el-table-column>
      <el-table-column prop="empPay" label="薪酬" width=""> </el-table-column>
      <el-table-column prop="empGraDestination" label="毕业去向" width="">
      </el-table-column>

      <el-table-column prop="empAgreement" label="协议" width="">
      </el-table-column>
      <el-table-column prop="empRemark" label="备注" width="">
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

    <!-- 分页 -->
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getTable"
    />
    <!-- 分页END -->

    <!-- 就业信息添加弹框 -->
    <el-dialog
      title="就业信息"
      :visible.sync="isShow"
      :before-close="handleClose"
      center
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        size="small"
        :inline="true"
        highlight-current-row
      >
        <el-form-item label="姓名">
          <el-input v-model="form.empName"></el-input>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker
            v-model="form.empBirth"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.empStuNumber"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.empSex"></el-input>
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input v-model="form.empMajor"></el-input>
        </el-form-item>
        <el-form-item label="双创班名称">
          <!-- <el-input v-model="form.empCreatedClass"></el-input> -->
          <el-select v-model="form.empCreatedClass" placeholder="请选择">
            <el-option
              v-for="item in doubleCreation"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业对口情况">
          <el-select v-model="form.empCounterpart" placeholder="请选择">
            <el-option label="是" value="true"> </el-option>
            <el-option label="否" value="false"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.empEmail"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.empQq"></el-input>
        </el-form-item>
        <el-form-item label="就业城市">
          <el-select v-model="form.empCity" placeholder="请选择">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="就业单位">
          <el-input v-model="form.empUnit" @blur="checkUnitInfo()"></el-input>
        </el-form-item>

        <el-form-item label="就业单位联系人">
          <el-input v-model="form.empContacts"></el-input>
        </el-form-item>
        <el-form-item label="入职部门">
          <el-input v-model="form.empDepartment"></el-input>
        </el-form-item>
        <el-form-item label="单位性质">
          <el-select v-model="form.empUnitNature" placeholder="请选择">
            <el-option
              v-for="item in unitNatureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务职能">
          <el-input v-model="form.empFunction"></el-input>
        </el-form-item>
        <el-form-item label="薪酬">
          <el-input v-model="form.empPay"></el-input>
        </el-form-item>
        <el-form-item label="毕业去向">
          <el-select v-model="form.empGraDestination" placeholder="请选择">
            <el-option
              v-for="item in graDestinationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协议">
          <el-input v-model="form.empAgreement"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.empRemark"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item> -->
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
              @click="status === 'add' ? addEmployment() : updateEmployment()"
              >确定</el-button
            >
          </div>
          <el-button slot="reference" type="primary" style="margin-left: 20px"
            >提 交</el-button
          >
          <!-- <el-button slot="reference">hover 激活</el-button> -->
        </el-popover>
      </div>
    </el-dialog>
    <!-- 信息添加弹框END -->

    <!-- <chart></chart> -->
  </div>
</template>
<script>
import DoubleCreation from "@/json/DoubleCreation.json";
import chart from "@/views/employment_info/chart.vue";
import {
  cityOptions,
  graDestinationOptions,
  unitNatureOptions,
  tableListemp,
} from "@/assets/js/employmentOptions";
import { getUserInfo, getUserId } from "@/utils/auth";
import {
  addEmployment,
  findEmployment,
  deleteEmployment,
  updateEmployment,
} from "@/api/graduate_students/employment";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination, chart },
  created() {
    this.unitNatureOptionsFun();
    this.findEmploymentInfo();
    this.getTable();
    console.log(getUserId(), "ididd");
  },

  data() {
    return {
      doubleCreation: DoubleCreation,

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
        empAgreement: "",
        empBirth: "",
        empCity: "",
        empContacts: "",
        empCounterpart: "",
        empCreatedClass: "",
        empDepartment: "",
        empEmail: "",
        empId: 0,
        empName: "",
        empQq: "",
        empSex: "",
        empStuNumber: "",
        empUnit: "",
        empUnitNature: "",
        empUserId: 0,
        empFunction: "",
        empPay: "",
        empGraDestination: "",
        empMajor: "",
        empRemark: "",
      },
      //
      unitNatureOptionsArr: [],
      cityOptions: cityOptions,
      graDestinationOptions: graDestinationOptions,
      unitNatureOptions: [],
      //
    };
  },
  methods: {
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          // done();
          this.isShow = false;
        })
        .catch((_) => {});
    },

    unitNatureOptionsFun() {
      this.unitNatureOptionsArr = unitNatureOptions;
      this.unitNatureOptions = this.unitNatureOptionsArr;
    },
    // 就业单位 ==> 单位性质
    checkUnitInfo() {
      let unit = this.form.empUnit;
      let arr = ["公司", "店", "培训", "室"];
      let key = 0;
      for (let i = 0; i < 4; i++) {
        if (unit.indexOf(arr[i]) != -1) {
          key = 1;
          break;
        }
      }
      if (key == 1) {
        this.unitNatureOptions = this.unitNatureOptionsArr.slice(0, 4);
        if (this.form.empUnitNature == "其它(备注中说明)") {
          this.form.empUnitNature = "";
        }
      } else {
        this.unitNatureOptions = this.unitNatureOptionsArr;
      }
    },

    findEmploymentInfo() {
      // console.log();
      // 查询信息
      findEmployment(1, 10000, 0)
        .then((res) => {
          // console.log(res.data, "查询就业信息");
          this.list = res.data;
          this.total = this.list.length;
          // console.log(this.total, "total");
          // 分页
          let tableData = this.list.filter((item, index) => {
            console.log(item.empCounterpart, "11");
            if (item.empCounterpart == true) {
              item.empCounterpart = "是";
            } else {
              item.empCounterpart = "否";
            }
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
          // this.$message({
          //   message: "当前可能没查到你的信息，请点击添加",
          //   type: "warning",
          // });
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
        empAgreement: "",
        empBirth: "",
        empCity: "",
        empContacts: "",
        empCounterpart: "",
        empCreatedClass: getUserInfo.doubleCreationClass,
        empDepartment: "",
        empEmail: "",
        empId: null,
        empQq: "",
        empSex: "",
        empStuNumber: "",
        empUnit: "",
        empUnitNature: "",
        empUserId: 0,
        empFunction: "",
        empPay: "",
        empGraDestination: "",
        empMajor: "",
        empRemark: "",
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
          this.findEmploymentInfo();
        })
        .catch((err) => {});
    },
    // 添加
    addEmployment() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addEmployment(this.form, this.form.empUserId)
            .then((res) => {
              console.log(res);
              this.findEmploymentInfo();
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
          console.log(this.form.empCounterpart);
          this.form.empCounterpart == "true"
            ? (this.form.empCounterpart = "true")
            : (this.form.empCounterpart = "false");
          updateEmployment("", this.form)
            .then((res) => {
              this.findEmploymentInfo();
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
