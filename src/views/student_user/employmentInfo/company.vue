<template>
  <div>
    <!-- <el-button type="primary" @click="addInfo" style="margin-left: 10px"
      >添加信息</el-button
    > -->
    <!-- 表格展示 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      height="480"
      border=""
    >
      <el-table-column type="index" width="100" align="center">
      </el-table-column>
      <el-table-column prop="enName" label="企业名称" width="">
      </el-table-column>
      <el-table-column prop="enType" label="企业类型" width="">
      </el-table-column>
      <el-table-column prop="enIntroduce" label="企业简介" width="">
      </el-table-column>
      <el-table-column prop="enVideoAddress" label="企业宣传视频地址" width="">
        <template slot-scope="{ row }">
          <el-link :href="row.enVideoAddress" target="_blank" type="primary">{{
            row.enVideoAddress
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="enQrCode" label="二维码图片" width="">
        <template slot-scope="{ row }">
          <el-image
          v-if="row.enQrCode"
            style="width: 100px; height: 100px"
            :src="row.enQrCode"
            :preview-src-list="srcList"
          ></el-image>
          <el-tag v-if="!row.enQrCode">未添加图片</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="enProductsAndServices" label="产品及服务" width="">
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
      title="企业信息"
      :visible.sync="isShow"
      :before-close="handleClose"
      center
    >
      <el-form
        ref="form"
        :model="form"
        label-width="125px"
        size="small"
        :inline="true"
        highlight-current-row
      >
        <el-form-item label="企业名称">
          <el-input v-model="form.enName"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input v-model="form.enType"></el-input>
        </el-form-item>
        <el-form-item label="企业简介">
          <el-input v-model="form.enIntroduce"></el-input>
        </el-form-item>
        <el-form-item label="企业宣传视频地址">
          <el-input v-model="form.enVideoAddress"></el-input>
        </el-form-item>

        <el-form-item label="二维码图片">
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
        </el-form-item>

        <el-form-item label="产品及服务">
          <el-input v-model="form.enProductsAndServices"></el-input>
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
              @click="status === 'add' ? addEnterprise() : updateEnterprise()"
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
import { enterpriseList1 } from "@/assets/js/employmentOptions";
import {
  addEnterprise,
  deleteEnterprise,
  updateEnterprise,
  findEnterprise,
  uploadImg,
} from "@/api/enterprise";
import Pagination from "@/components/Pagination";
import { getToken } from "@/utils/auth";
export default {
  components: { Pagination },
  created() {
    this.findEnterpriseInfo();
    this.getTable();
  },
  data() {
    return {
      srcList: [],
      uploadFile: undefined,
      fileList: [],
      token: { token: getToken() },
      updataIndex: 0,
      status: "",
      total: enterpriseList1.length,
      listQuery: {
        page: 1,
        limit: 10,
      },
      visible: false,
      list: [],
      tableData: [],
      isShow: false,
      form: {
        enId: 0,
        enIntroduce: "",
        enName: "",
        enProductsAndServices: "",
        enQrCode: "",
        enType: "",
        enVideoAddress: "",
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

    findEnterpriseInfo() {
      // 查询信息
      findEnterprise(1, 10000)
        .then((res) => {
          this.list = res.data;
          this.total = this.list.length;
          // 分页
          let tableData = this.list.filter((item, index) => {
            this.srcList.push(item.enQrCode);
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
        enId: 0,
        enIntroduce: "",
        enName: "",
        enProductsAndServices: "",
        enQrCode: "",
        enType: "",
        enVideoAddress: "",
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
      console.log(row.enId, "row");
      this.list.splice(index, 1);
      deleteEnterprise(row.enId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findEnterpriseInfo();
        })
        .catch((err) => {});
    },
    // 增
    addEnterprise() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addEnterprise(this.form)
            .then((res) => {
              console.log(res);
              this.findEnterpriseInfo();
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
    updateEnterprise() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateEnterprise(this.form)
            .then((res) => {
              this.findEnterpriseInfo();
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
      console.log("上传二维码");
      let formData = new FormData();
      formData.append("file", this.uploadFile);
      uploadImg(formData, this.form.enId)
        .then((res) => {
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
