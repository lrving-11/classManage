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
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <!-- <el-table-column fixed prop="reId" label="编号" width="">
      </el-table-column> -->
      <el-table-column prop="reName" label="姓名" width=""> </el-table-column>
      <el-table-column prop="reSex" label="性别" width=""> </el-table-column>
      <el-table-column prop="reBirth" label="出生年月" width="">
      </el-table-column>
      <el-table-column prop="rePhone" label="联系电话" width="">
      </el-table-column>
      <el-table-column prop="reUserId" label="用户ID" width="">
      </el-table-column>
      <el-table-column prop="reHeght" label="身高" width=""> </el-table-column>
      <el-table-column prop="reNativePlace" label="籍贯" width="">
      </el-table-column>
      <el-table-column prop="reEducation" label="学历" width="">
      </el-table-column>
      <el-table-column prop="reGraSchool" label="毕业学校" width="">
      </el-table-column>
      <el-table-column prop="reGraTime" label="毕业时间" width="">
      </el-table-column>
      <el-table-column prop="reMajor" label="专业方向" width="">
      </el-table-column>
      <el-table-column prop="reFirstForeign" label="第一外语" width="">
      </el-table-column>
      <el-table-column prop="reFirstForeignLevel" label="第一外语水平" width="">
      </el-table-column>
      <el-table-column prop="reFirstForeignScore" label="第一外语分数" width="">
      </el-table-column>
      <el-table-column
        prop="reProfessionComAward"
        label="专业竞赛获奖"
        width=""
      >
      </el-table-column>
      <el-table-column prop="reScholarship" label="奖学金" width="">
      </el-table-column>
      <el-table-column prop="reSocialPractice" label="社会实践" width="">
      </el-table-column>
      <el-table-column prop="reApplyPositionOne" label="应聘职位1" width="">
      </el-table-column>
      <el-table-column prop="reApplyPositionTwo" label="应聘职位2" width="">
      </el-table-column>
      <el-table-column prop="reExpectPlace" label="期望工作地" width="">
      </el-table-column>
      <el-table-column prop="reExpectPay" label="期望薪酬" width="">
      </el-table-column>
      <el-table-column prop="reSelfEvaluation" label="自我评价" width="">
      </el-table-column>
      <el-table-column prop="reStarRatingLevel" label="双创积分" width="">
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
          <el-input v-model="form.reId"></el-input>
        </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="form.reName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.reSex"></el-input>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker
            v-model="form.reBirth"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.rePhone"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="form.reUserId" disabled></el-input>
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="form.reHeght"></el-input>
        </el-form-item>

        <el-form-item label="籍贯">
          <el-input v-model="form.reNativePlace"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="form.reEducation"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input v-model="form.reGraSchool"></el-input>
        </el-form-item>
        <el-form-item label="毕业时间">
          <el-date-picker
            v-model="form.reGraTime"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="专业方向">
          <el-input v-model="form.reMajor"></el-input>
        </el-form-item>
        <el-form-item label="第一外语">
          <el-input v-model="form.reFirstForeign"></el-input>
        </el-form-item>
        <el-form-item label="第一外语水平">
          <el-input v-model="form.reFirstForeignLevel"></el-input>
        </el-form-item>
        <el-form-item label="第一外语分数">
          <el-input v-model="form.reFirstForeignScore"></el-input>
        </el-form-item>
        <el-form-item label="专业竞赛获奖">
          <el-input v-model="form.reProfessionComAward"></el-input>
        </el-form-item>
         <el-form-item label="奖学金">
          <el-input v-model="form.reScholarship"></el-input>
        </el-form-item>
        <el-form-item label="社会实践">
          <el-input v-model="form.reSocialPractice"></el-input>
        </el-form-item>
        <el-form-item label="应聘职位1">
          <el-input v-model="form.reApplyPositionOne"></el-input>
        </el-form-item>
        <el-form-item label="应聘职位2">
          <el-input v-model="form.reApplyPositionTwo"></el-input>
        </el-form-item>
        <el-form-item label="期望工作地">
          <el-input v-model="form.reExpectPlace"></el-input>
        </el-form-item>
        <el-form-item label="期望薪酬">
          <el-input v-model="form.reExpectPay"></el-input>
        </el-form-item>
        <el-form-item label="自我评价">
          <el-input v-model="form.reSelfEvaluation"></el-input>
        </el-form-item>
        <el-form-item label="双创积分">
          <el-input v-model="form.reStarRatingLevel"></el-input>
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
              @click="status === 'add' ? addResume() : updateResume()"
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
import { resumeList1 } from "@/assets/js/employmentOptions";
import {
  addResume,
  deleteResume,
  updateResume,
  findResume,
} from "@/api/graduate_students/resumeInfo";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  created() {
    this.findResumeInfo();
    this.getTable();
  },
  data() {
    return {
      adminUserName: 0,
      updataIndex: 0,
      status: "",
      total: resumeList1.length,
      listQuery: {
        page: 1,
        limit: 10,
      },
      visible: false,
      list: [],
      tableData: [],
      isShow: false,
      form: {
        reApplyPositionOne: "应聘职位1",
        reApplyPositionTwo: "应聘职位2",
        reBirth: "出生年月",
        reEducation: "学历",
        reExpectPay: "期望薪酬",
        reExpectPlace: "期望工作地",
        reFirstForeign: "第一外语",
        reFirstForeignLevel: "第一外语水平",
        reFirstForeignScore: "第一外语分数",
        reGraSchool: "毕业学校",
        reGraTime: "毕业时间",
        reHeght: "身高",
        reId: 0,
        reMajor: "专业方向",
        reName: "姓名",
        reNativePlace: "籍贯",
        rePhone: "联系电话",
        reProfessionComAward: "专业竞赛获奖",
        reScholarship: "奖学金",
        reSelfEvaluation: "自我评价",
        reSex: "性别",
        reSocialPractice: "社会实践",
        reStarRatingLevel: "评星级别",
        reUserId: 0,
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
    handleChange(value) {
      // console.log(value);
    },

    findResumeInfo() {
      // 查询信息
      findResume(1, 10000, 0)
        .then((res) => {
          // console.log(res.data, "查询就业信息");
          this.list = res.data;
          this.total = this.list.length;
          console.log(this.total, "total");
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
        reApplyPositionOne: "",
        reApplyPositionTwo: "",
        reBirth: "",
        reEducation: "",
        reExpectPay: "",
        reExpectPlace: "",
        reFirstForeign: "",
        reFirstForeignLevel: "",
        reFirstForeignScore: "",
        reGraSchool: "",
        reGraTime: "",
        reHeght: "",
        reId: 0,
        reMajor: "",
        reName: "",
        reNativePlace: "",
        rePhone: "",
        reProfessionComAward: "",
        reScholarship: "",
        reSelfEvaluation: "",
        reSex: "",
        reSocialPractice: "",
        reStarRatingLevel: "",
        reUserId: 0,
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
      console.log(row.reId, "row");
      this.list.splice(index, 1);
      deleteResume(0, row.reId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findResumeInfo();
        })
        .catch((err) => {});
    },
    // 添加
    addResume() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addResume(this.form, this.form.reUserId)
            .then((res) => {
              console.log(res);
              this.findResumeInfo();
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
    updateResume() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateResume("", this.form)
            .then((res) => {
              this.findResumeInfo();
            })
            .catch((err) => {});
          // let index =
          //   this.updataIndex + (this.listQuery.page - 1) * this.listQuery.limit;
          // this.list.splice(index, 1, this.form);
          // this.getTable();
        }
      });
      this.isShow = false;
      this.visible = false;
    },
  },
};
</script>

<style></style>
