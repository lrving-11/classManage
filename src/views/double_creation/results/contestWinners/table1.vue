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
      size=""
    >
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <!-- <el-table-column prop="comUserId" label="用户ID" width="">
      </el-table-column> -->
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
      <el-table-column prop="comLevel" label="级别" width=""> </el-table-column>
      <el-table-column prop="comName" label="竞赛名称" width="">
      </el-table-column>
      <el-table-column prop="comWorkName" label="参赛作品名称" width="">
      </el-table-column>
      <el-table-column prop="comHonorLevel" label="荣誉等级" width="">
      </el-table-column>
      <el-table-column prop="comRemark" label="荣誉证书(点击查看大图)" width="150">
        <template slot-scope="{ row }">
          <el-image
            v-if="row.comRemark"
            style="width: 100px; height: 100px"
            :src="row.comRemark"
            :preview-src-list="srcList"
          ></el-image>
          <el-tag v-if="!row.comRemark">未添加图片</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150"
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

    <!-- 获奖添加弹框 -->
    <el-dialog
      title="竞赛获奖信息"
      :visible.sync="isShow"
      :before-close="handleClose"
      center
    >
      <el-form
        ref="form"
        :model="form"
        label-width="140px"
        size="small"
        :inline="true"
        highlight-current-row
      >
        <!-- <el-form-item label="用户ID">
          <el-input v-model="form.comUserId" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="获奖学生">
          <el-input
            v-model="form.comAwardsStudent"
            placeholder="姓名"
          ></el-input>
        </el-form-item>

        <el-form-item label="获奖时间">
          <el-date-picker
            v-model="form.comAwardTime"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="获奖时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="双创班级">
          <el-select v-model="form.comClassName" placeholder="请选择">
            <el-option
              v-for="item in doubleCreation"
              :key="item.text"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="首导姓名">
          <el-input v-model="form.comTeacherName"></el-input>
        </el-form-item>

        <el-form-item label="主办单位">
          <el-input v-model="form.comOrganizer" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="竞赛类别">
          <el-input v-model="form.comCategory" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="form.comLevel" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="竞赛名称">
          <el-input v-model="form.comName" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="参赛作品名称">
          <el-input
            v-model="form.comWorkName"
            type=""
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="荣誉等级">
          <el-input
            v-model="form.comHonorLevel"
            type=""
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="备注(荣誉证书)">
          <el-upload
            ref="upload"
            drag
            accept="image/jpeg,image/png,application/pdf"
            :limit="1"
            :file-list="fileList"
            action="123"
            :before-upload="beforeUpload"
            :http-request="uploadImg"
            style="margin: 0 auto"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              仅支持单文件上传,多文件请压缩
            </div>
          </el-upload>
          <el-input
            v-show="false"
            v-model="form.comRemark"
            placeholder=""
          ></el-input>
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
              @click="
                status === 'add' ? addContestWinners() : updateContestWinners()
              "
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
import doubleCreation from "@/json/DoubleCreation.json";
// import college from "@/json/college.json";

import {
  addContestWinners,
  deleteContestWinners,
  findContestWinners,
  updateContestWinners,
  uploadContestWinners,
} from "@/api/double_creation_class/double_creation/contestWinners";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  created() {
    this.findContestWinnersInfo();
    this.getTable();
  },
  data() {
    return {
      srcList: [],
      fileList: [],
      uploadFile: undefined,
      className:"superAdmin",
      doubleCreation: doubleCreation,
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
      //
      classIntroductionTurn: false,
      playintroduceText: "",
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
    findContestWinnersInfo() {
      // 查询信息
      findContestWinners(this.className, 1, 10000)
        .then((res) => {
          this.list = res.data;
          this.total = this.list.length;
          // console.log(this.total, "total");
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
      console.log(row.comId, "row");
      this.list.splice(index, 1);
      deleteContestWinners("superAdmin", row.comId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findContestWinnersInfo();
        })
        .catch((err) => {});
    },
    // 添加
    addContestWinners() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.list.push(this.form);
          addContestWinners(this.form, this.form.comUserId)
            .then((res) => {
              console.log(res);
              this.$message({
                showClose: true,
                message: "上传成功",
                type: "success",
              });
              this.findContestWinnersInfo();
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
    updateContestWinners() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateContestWinners(this.form, "superAdmin")
            .then((res) => {
              this.findContestWinnersInfo();
            })
            .catch((err) => {});
        }
      });
      this.isShow = false;
      this.visible = false;
    },
    // 图片上传
    beforeUpload(file) {
      this.$refs.upload.clearFiles();

      this.uploadFile = file;
    },
    uploadImg(img) {
      console.log("上传荣誉证书", this.form);
      let formData = new FormData();
      formData.append("file", this.uploadFile);
      console.log(this.className, "classname");
      uploadContestWinners(this.className, formData, this.form.comId)
        .then((res) => {
          this.form.comRemark = res.data.comRemark;
          console.log("上传成功");
          this.$notify({
            title: "成功",
            message: "图片上传成功",
            type: "success",
            duration: 1500,
          });
          img.onSuccess();
        })
        .catch((err) => {
          console.log("上传失败");
          img.onError();
        });
    },
  },
};
</script>

<style></style>
