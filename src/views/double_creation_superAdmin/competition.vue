<template>
  <div>
    <div style="margin-top: 10px">
      <el-button type="info" @click="inReview" style="margin-left: 10px"
        >审核中</el-button
      >
      <div v-show="allIsShow">
        <!-- 表格展示 -->
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 10px"
          height="480"
          border=""
          size=""
        >
          <el-table-column type="index" width="100" align="center">
          </el-table-column>
          <el-table-column prop="comAwardsStudent" label="获奖学生" width="">
          </el-table-column>
          <el-table-column prop="comAwardTime" label="获奖时间" width="">
          </el-table-column>
          <el-table-column prop="comClassName" label="双创班级" width="">
          </el-table-column>
          <el-table-column prop="comTeacherName" label="首导姓名" width="">
          </el-table-column>
          <el-table-column prop="comOrganizer" label="主办单位" width="">
          </el-table-column>
          <el-table-column prop="comCategory" label="竞赛类别" width="">
          </el-table-column>
          <el-table-column prop="comLevel" label="级别" width="">
          </el-table-column>
          <el-table-column prop="comName" label="竞赛名称" width="">
          </el-table-column>
          <el-table-column prop="comWorkName" label="参赛作品名称" width="">
          </el-table-column>
          <el-table-column prop="comHonorLevel" label="荣誉等级" width="">
          </el-table-column>
          <el-table-column
            prop="comRemark"
            label="荣誉证书(点击查看大图)"
            width="150"
          >
            <template slot-scope="{ row }">
              <el-image
                v-if="row.comRemark"
                style="width: 140px; height: 140px"
                :src="row.comRemark"
                :preview-src-list="srcList"
              ></el-image>
              <el-tag v-if="!row.comRemark">未添加图片</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
            class-name="small-padding fixed-width"
            v-if="ifShow"
          >
            <template slot-scope="{ row, $index }">
              <el-button type="success" size="mini" @click="check(row, $index)">
                审核
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
      </div>

      <!-- 审核弹框 -->
      <el-dialog center title="审核弹框" :visible.sync="dialogFormVisible">
        <el-form :model="checkForm">
          <el-form-item label="原因" label-width="35%">
            <el-input
              v-model="checkForm.reason"
              style="width: 250px; text-align: center; margin: 0 auto"
            ></el-input>
          </el-form-item>
          <el-form-item label="审核状态" label-width="35%">
            <!-- <el-input
              v-model="checkForm.condition"
              style="width: 250px"
            ></el-input> -->
            <el-select
              v-model="checkForm.condition"
              placeholder="请选择"
              style="width: 250px"
            >
              <el-option label="通过" value="accept"> </el-option>
              <el-option label="打回" value="refuse"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkSubmit()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 审核弹框END -->
    </div>
  </div>
</template>
<script>
// import doubleCreation from "@/json/DoubleCreation.json";
// import college from "@/json/college.json";

import {
  examineCompetition,
  findTempCompetition,
} from "@/api/admin/superAdmin";

import Pagination from "@/components/Pagination";
import { getUserInfo } from "@/utils/auth";
export default {
  components: { Pagination },
  created() {
    this.inReview();
    this.getTable();
  },
  data() {
    return {
      srcList: [],
      refuseData: [],
      allIsShow: true,
      ifShow: false,
      fileList: [],
      uploadFile: undefined,
      className: getUserInfo().doubleCreationClass,
      //
      dialogFormVisible: false,

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
        comAwardTime: "string", //获奖时间
        comAwardsStudent: "string", //获奖学生
        comCategory: "string", //竞赛类别
        comClassName: "string", //双创班级
        comHonorLevel: "string", //荣誉等级
        comId: 0,
        comIsTemp: "string", //审核状态
        comLevel: "string", //级别
        comName: "string", //竞赛名称
        comOrganizer: "string", //主办单位
        comRemark: "string", //备注
        comTeacherName: "string", //首席导师姓名
        comUserId: 0,
        comWorkName: "string", //参赛作品名称
      },
      checkForm: {
        reason: "",
        condition: "",
      },
      //
      classIntroductionTurn: false,
      playintroduceText: "",
    };
  },
  methods: {
    // 审核
    check(row, index) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.checkForm = {
        reason: "",
        condition: "",
      };
    },
    // 审核提交
    checkSubmit() {
      console.log(this.form, "审核的表单");
      examineCompetition(
        this.form,
        this.checkForm.reason,
        this.checkForm.condition
      )
        .then((res) => {
          this.$notify({
            title: "成功",
            message: "审核成功",
            type: "success",
            duration: 1500,
          });
          this.inReview();
        })
        .catch((err) => {});
      this.dialogFormVisible = false;
    },
    // refuse() {
    //   this.allIsShow = false;
    //   findAllRefuse(0)
    //     .then((res) => {
    //       this.refuseData = res.data;
    //     })
    //     .catch((err) => {});
    // },
    // pass() {
    //   this.allIsShow = true;
    //   this.inReview();
    // },
    inReview() {
      this.allIsShow = true;
      this.ifShow = true;
      // 查询审核中信息
      findTempCompetition(1, 100000)
        .then((res) => {
          this.list = res.data;
          this.total = this.list.length;
          console.log(this.total, "total");
          // 分页
          let tableData = this.list.filter((item, index) => {
            this.srcList.push(item.comRemark);
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
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          // done();
          this.isShow = false;
        })
        .catch((_) => {});
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
        comAwardTime: "",
        comAwardsStudent: "",
        comCategory: "",
        comClassName: "",
        comHonorLevel: "",
        comId: 0,
        comIsTemp: "",
        comLevel: "",
        comName: "",
        comOrganizer: "",
        comRemark: "",
        comTeacherName: "",
        comUserId: 0,
        comWorkName: "",
      };
    },

    // addInfo() {
    //   this.resetTemp();
    //   this.isShow = true;
    //   this.status = "add";
    //   this.$nextTick(() => {
    //     this.$refs["form"].clearValidate();
    //   });
    // },

    // updateInfo(row, index) {
    //   this.form = Object.assign({}, row);
    //   this.status = "update";
    //   this.isShow = true;
    //   this.updataIndex = index;
    // },

    // // 删
    // deleteInfo(row, index) {
    //   console.log(row.comId, "row");
    //   this.list.splice(index, 1);
    //   deleteCompetition(row.comId, 0)
    //     .then((result) => {
    //       this.$notify({
    //         title: "成功",
    //         message: "删除成功",
    //         type: "success",
    //         duration: 1500,
    //       });
    //       this.inReview();
    //     })
    //     .catch((err) => {});
    // },
    // // 添加
    // addContestWinners() {
    //   console.log("添加函数");
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       this.list.push(this.form);
    //       addContestWinners(this.form, this.form.comUserId)
    //         .then((res) => {
    //           console.log(res);
    //           this.inReview();
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //   });
    //   this.isShow = false;
    //   this.visible = false;
    // },
    // // 改
    // updateContestWinners() {
    //   console.log("更新函数");
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       updateCompetition(this.form, 0)
    //         .then((res) => {
    //           this.inReview();
    //         })
    //         .catch((err) => {});
    //     }
    //   });
    //   this.isShow = false;
    //   this.visible = false;
    // },
    // // 图片上传
    // beforeUpload(file) {
    //   this.uploadFile = file;
    // },
    // uploadImg(img) {
    //   console.log("上传荣誉证书", this.form);
    //   let formData = new FormData();
    //   formData.append("file", this.uploadFile);
    //   upload(formData, this.form.comId)
    //     .then((res) => {
    //       console.log("上传成功");
    //       img.onSuccess();
    //     })
    //     .catch((err) => {
    //       console.log("上传失败");
    //       img.onError();
    //     });
    // },
  },
};
</script>

<style></style>
