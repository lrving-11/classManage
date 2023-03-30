<template>
  <div>
    <el-button type="primary" @click="addInfo" style="margin-left: 10px"
      >添加信息</el-button
    >

    <!-- 表格展示 -->

    <el-table :data="tableData" height="480" style="margin-top: 10px" border="">
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <el-table-column prop="siCreateClass" label="双创班名称" width="">
      </el-table-column>
      <el-table-column prop="siSign" label="签约" width=""> </el-table-column>

      <el-table-column prop="siFlexibleEmployment" label="灵活就业" width="">
      </el-table-column>
      <el-table-column prop="siIsCounterpart" label="对口就业" width="">
      </el-table-column>
      <el-table-column prop="siNonUnemployment" label="非失业" width="">
      </el-table-column>
      <el-table-column prop="siState" label="待就业" width="">
      </el-table-column>
      <el-table-column prop="siTime" label="签约时间" width="">
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
      <!-- <el-table-column prop="siNum" label="毕业生人数" width="">
      </el-table-column>
      <el-table-column prop="prop" label="未落实" width="">
        <el-table-column prop="siState" label="待就业"> </el-table-column>
      </el-table-column>
      <el-table-column prop="prop" label="签约" width="">
        <el-table-column prop="siSign1" label="协议就业"> </el-table-column>
        <el-table-column prop="siSign2" label="自主创业"> </el-table-column>
        <el-table-column prop="siSign3" label="基层项目"> </el-table-column>
        <el-table-column prop="siSign4" label="科研助理"> </el-table-column>
      </el-table-column>
      <el-table-column prop="prop" label="非失业" width="">
        <el-table-column prop="siNonUnemployment1" label="出国留学就业">
        </el-table-column>
        <el-table-column prop="siNonUnemployment2" label="升学">
        </el-table-column>
        <el-table-column prop="siNonUnemployment3" label="应征入伍">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="prop" label="灵活就业" width="">
        <el-table-column prop="siFlexibleEmployment1" label="其他形式就业">
        </el-table-column>
        <el-table-column prop="siFlexibleEmployment2" label="自由职业">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="prop" label="对口就业" width="">
        <el-table-column prop="siIsCounterpart1" label="是"> </el-table-column>
        <el-table-column prop="siIsCounterpart2" label="否"> </el-table-column>
      </el-table-column>
      <el-table-column prop="prop" label="签约时间" width="">
        <el-table-column prop="siTime" label="签约年月"> </el-table-column>
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

    <!-- 信息添加弹框 -->
    <el-dialog
      title="签约信息添加"
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
        <el-form-item label="双创班名称">
          <el-select v-model="form.siCreateClass" placeholder="请选择">
            <el-option
              v-for="item in doubleCreation"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约">
          <el-select v-model="form.siSign" placeholder="请选择">
            <el-option label="协议就业" value="协议就业"> </el-option>
            <el-option label="自主创业" value="自主创业"> </el-option>
            <el-option label="基层项目" value="基层项目"> </el-option>
            <el-option label="科研助理" value="科研助理"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灵活就业">
          <el-select v-model="form.siFlexibleEmployment" placeholder="请选择">
            <el-option label="其他形式就业" value="其他形式就业"> </el-option>
            <el-option label="自由职业" value="自由职业"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对口就业">
          <el-select v-model="form.siIsCounterpart" placeholder="请选择">
            <el-option label="是" value="true"> </el-option>
            <el-option label="否" value="false"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="非失业">
          <el-select v-model="form.siNonUnemployment" placeholder="请选择">
            <el-option label="出国留学就业" value="出国留学就业"> </el-option>
            <el-option label="升学" value="升学"> </el-option>
            <el-option label="应征入伍" value="应征入伍"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="待就业">
          <el-select v-model="form.siState" placeholder="请选择">
            <el-option label="是" value="是"> </el-option>
            <el-option label="否" value="否"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约时间">
          <el-date-picker
            v-model="form.siTime"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          />
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
              @click="status === 'add' ? addSigningRate() : updateSigningRate()"
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
// import { signingList1 } from "@/assets/js/employmentOptions";
import doubleCreation from "@/json/DoubleCreation.json";

import {
  addSigningRate,
  deleteSigningRate,
  findSigningRate,
  updateSigningRate,
  chartSign,
  chartYear,
} from "@/api/graduate_students/signingRate";
import Pagination from "@/components/Pagination";
import { getDoubleCreationClass } from "@/utils/auth.js";
export default {
  components: { Pagination },
  created() {
    this.findSigningRateInfo();
    this.getTable();
  },
  data() {
    return {
      className: getDoubleCreationClass(),
      doubleCreation: doubleCreation,
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
        siCreateClass: "", //双创班
        siFlexibleEmployment: "", //灵活就业
        siId: 0,
        siIsCounterpart: "", //对口就业
        siNonUnemployment: "", //非失业
        siSign: "", //签约
        siState: "", //待就业
        siTime: "", //签约时间
      },
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
    handleChange(value) {
      // console.log(value);
    },

    findSigningRateInfo() {
      // 查询信息
      findSigningRate(1, 10000, "superAdmin")
        .then((res) => {
          console.log(res.data, "查询签约信息");
          this.list = res.data;
          this.total = this.list.length;
          // console.log(this.total, "total");
          // 分页
          let tableData = this.list.filter((item, index) => {
            if (item.siIsCounterpart === true) {
              item.siIsCounterpart = "是";
            } else {
              item.siIsCounterpart = "否";
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
        siCreateClass: "", //双创班
        siFlexibleEmployment: "", //灵活就业
        siId: 0,
        siIsCounterpart: "", //对口就业
        siNonUnemployment: "", //非失业
        siSign: "", //签约
        siState: "", //待就业
        siTime: "", //签约时间F
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
      // console.log(row.empId, "row");
      this.list.splice(index, 1);
      deleteSigningRate("superAdmin", row.siId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findSigningRateInfo();
        })
        .catch((err) => {});
    },
    // 添加
    addSigningRate() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addSigningRate(this.form)
            .then((res) => {
              console.log(res);
              this.findSigningRateInfo();
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
    updateSigningRate() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.siIsCounterpart == "是"
            ? (this.form.siIsCounterpart = true)
            : (this.form.siIsCounterpart = false);
          updateSigningRate("superAdmin", this.form)
            .then((res) => {
              this.findSigningRateInfo();
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
