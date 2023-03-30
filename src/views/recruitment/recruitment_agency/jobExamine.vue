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
     <el-table-column type="index" width="100"> </el-table-column>
      <el-table-column  prop="exWantedId" label="求职编号" width="">
      </el-table-column>
      <el-table-column prop="exState" label="审核状态" width="">
        <template slot-scope="{ row }">
          <el-tag>
            {{ row.exState }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="exInterviewTime" label="面试时间" width="">
      </el-table-column>
      <el-table-column prop="exInterviewAddress" label="面试地点" width="">
      </el-table-column>
      <el-table-column prop="exRemark" label="备注" width=""> </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            size="mini"
            @click="updateInfo(row, $index)"
          >
            审核
          </el-button>
          <el-button type="danger" size="mini" @click="deleteInfo(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
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
      title="求职审核"
      :visible.sync="isShow"
      :before-close="handleClose"
      center
    >
      <el-form
        ref="form2"
        :model="form2"
        label-width="120px"
        size="small"
        :inline="true"
        highlight-current-row
        disabled
      >
        <!-- <el-form-item label="编号">
          <el-input v-model="form.jobId"></el-input>
        </el-form-item> -->
       
        <el-form-item label="姓名">
          <el-input v-model="form2.jobName"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input v-model="form2.jobGraSchool"></el-input>
        </el-form-item>
        <el-form-item label="所学专业">
          <el-input v-model="form2.jobMajor"></el-input>
        </el-form-item>
        <el-form-item label="应聘公司">
          <el-input v-model="form2.jobCompany"></el-input>
        </el-form-item>
        <el-form-item label="应聘职位">
          <el-input v-model="form2.jobPosition"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="form2.jobEmail"></el-input>
        </el-form-item>

        <el-form-item label="首选工作地点">
          <el-input v-model="form2.jobFirstWorkPlace"></el-input>
        </el-form-item>
        <el-form-item label="薪资要求">
          <el-input v-model="form2.jobSalaryRequire"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form2.jobPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址">
          <el-input v-model="form2.jobAddress"></el-input>
        </el-form-item>
      </el-form>
      <h2 style="text-align: center">请填写审核意见</h2>
      <el-form
        ref="form"
        :model="form"
        label-width="125px"
        size="small"
        :inline="true"
        highlight-current-row
      >
        <el-form-item label="求职编号">
          <el-input v-model="form.exWantedId" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <!-- <el-input v-model="form.exState"></el-input> -->
          <el-select v-model="form.exState" placeholder="请选择">
            <el-option label="通过" value="已通过"> </el-option>
            <el-option label="不通过" value="未通过"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面试时间">
          <el-input v-model="form.exInterviewTime"></el-input>
        </el-form-item>
        <el-form-item label="面试地点">
          <el-input v-model="form.exInterviewAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.exRemark"></el-input>
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
              @click="status === 'add' ? addJobExamine() : updateJobExamine()"
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
import { jobExamineList1 } from "@/assets/js/employmentOptions";
import {
  addJobExamine,
  deleteJobExamine,
  findJobExamine,
  updateJobExamine,
} from "@/api/jobExamine";
import { findJobWanted } from "@/api/graduate_students/jobWanted";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  created() {
    this.findExamineInfo();
    this.getTable();
  },
  data() {
    return {
      updataIndex: 0,
      status: "",
      total: jobExamineList1.length,
      listQuery: {
        page: 1,
        limit: 10,
      },
      visible: false,
      list: [],
      tableData: [],
      isShow: false,
      form2: {
        jobAddress: "2",
        jobCompany: "2",
        jobEmail: "2",
        jobFirstWorkPlace: "2",
        jobGraSchool: "2",
        jobId: 0,
        jobMajor: "2",
        jobName: "2",
        jobPhone: "2",
        jobPosition: "2",
        jobSalaryRequire: "",
        jobUserId: 0,
      },
      form: {
        exExamineId: 0,
        exInterviewAddress: "面试地点",
        exInterviewTime: "面试时间",
        exRemark: "备注",
        exState: "审核状态",
        exWantedId: 0,
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
    findExamineInfo() {
      // 查询信息
      findJobExamine(1, 10000, 0)
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
        exExamineId: 0,
        exInterviewAddress: "",
        exInterviewTime: "",
        exRemark: "",
        exState: "",
        exWantedId: 0,
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
      findJobWanted(1, 10000, 0)
        .then((res) => {
          this.list = res.data;
          // this.total = this.list.length;
          // console.log(this.total, "total");
          // 分页
          let formArr = this.list.filter((item, index) => {
            if (item.jobId == row.exWantedId) {
              return item;
            }
          });
          this.form2 = formArr[0];
          // console.log(tableData, "11");
          // this.tableData = tableData;
          // console.log(this.tableData, "tableData");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 删
    deleteInfo(row, index) {
      console.log(row.exExamineId, "row");
      this.list.splice(index, 1);
      deleteJobExamine(row.exExamineId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findExamineInfo();
        })
        .catch((err) => {});
    },
    // 添加
    addJobExamine() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addJobExamine(this.form)
            .then((res) => {
              console.log(res);
              this.findExamineInfo();
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
    updateJobExamine() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateJobExamine(this.form)
            .then((res) => {
              this.findExamineInfo();
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
