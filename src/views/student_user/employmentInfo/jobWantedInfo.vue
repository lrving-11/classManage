<template>
  <div>
    <el-button type="primary" @click="addInfo" style="margin-left: 10px"
      >添加信息</el-button
    >

    <!-- 表格展示 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      height="480"
      border=""
    >
    <el-table-column type="index" width="100" align="center" > </el-table-column>
      <!-- <el-table-column fixed prop="jobId" label="编号" width="">
      </el-table-column> -->
      <el-table-column  prop="jobName" label="姓名" width="">
      </el-table-column>
      <el-table-column prop="jobGraSchool" label="毕业学校" width="">
      </el-table-column>
      <el-table-column prop="jobMajor" label="所学专业" width="">
      </el-table-column>
      <el-table-column prop="jobCompany" label="应聘公司" width="">
      </el-table-column>
      <el-table-column prop="jobPosition" label="应聘职位" width="">
      </el-table-column>
      <el-table-column prop="jobEmail" label="联系邮箱" width="">
      </el-table-column>
      <el-table-column prop="jobFirstWorkPlace" label="首选工作地点" width="">
      </el-table-column>
      <el-table-column prop="jobSalaryRequire" label="薪资要求" width="">
      </el-table-column>
      <el-table-column prop="jobPhone" label="联系电话" width="">
      </el-table-column>
      <el-table-column prop="jobAddress" label="邮寄地址" width="">
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

    <!-- 信息添加弹框 -->
    <el-dialog
      title="简历信息"
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
        <!-- <el-form-item label="编号">
          <el-input v-model="form.jobId"></el-input>
        </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="form.jobName"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input v-model="form.jobGraSchool"></el-input>
        </el-form-item>
        <el-form-item label="所学专业">
          <el-input v-model="form.jobMajor"></el-input>
        </el-form-item>
        <el-form-item label="应聘公司">
          <el-input v-model="form.jobCompany"></el-input>
        </el-form-item>
        <el-form-item label="应聘职位">
          <el-input v-model="form.jobPosition"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="form.jobEmail"></el-input>
        </el-form-item>

        <el-form-item label="首选工作地点">
          <el-input v-model="form.jobFirstWorkPlace"></el-input>
        </el-form-item>
        <el-form-item label="薪资要求">
          <el-input v-model="form.jobSalaryRequire"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.jobPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址">
          <el-input v-model="form.jobAddress"></el-input>
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
              @click="status === 'add' ? addJobWanted() : updateJobWanted()"
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
    <!-- 添加弹框END -->
  </div>
</template>
<script>
import { jobWantedList1 } from "@/assets/js/employmentOptions";
import {
  addJobWanted,
  deleteJobWanted,
  updateJobWanted,
  findJobWanted,
} from "@/api/graduate_students/jobWanted";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  created() {
    this.findJobWantedInfo();
    this.getTable();
  },
  data() {
    return {
      updataIndex: 0,
      status: "",
      total: jobWantedList1.length,
      listQuery: {
        page: 1,
        limit: 10,
      },
      visible: false,
      list: [],
      tableData: [],
      isShow: false,
      form: {
        jobAddress: "",
        jobCompany: "",
        jobEmail: "",
        jobFirstWorkPlace: "",
        jobGraSchool: "",
        jobId: 0,
        jobMajor: "",
        jobName: "",
        jobPhone: "",
        jobPosition: "",
        jobSalaryRequire: "",
        jobUserId: 0,
      },

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
    findJobWantedInfo() {
      // 查询信息
      findJobWanted(1, 10000, 0)
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
    handleDownload() {},
    resetTemp() {
      this.form = {
        jobAddress: "",
        jobCompany: "",
        jobEmail: "",
        jobFirstWorkPlace: "",
        jobGraSchool: "",
        jobId: 0,
        jobMajor: "",
        jobName: "",
        jobPhone: "",
        jobPosition: "",
        jobSalaryRequire: "",
        jobUserId: 0,
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
      console.log(row.jobId, "row");
      this.list.splice(index, 1);
      deleteJobWanted(0, row.jobId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findJobWantedInfo();
        })
        .catch((err) => {});
    },
    // 增
    addJobWanted() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          addJobWanted(this.form, this.form.jobUserId)
            .then((res) => {
              console.log(res);
              this.findJobWantedInfo();
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
    updateJobWanted() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateJobWanted(0, this.form)
            .then((res) => {
              this.findJobWantedInfo();
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

<style>
</style>