<template>
  <div>
    <!-- <el-button type="primary" @click="addInfo" style="margin-left: 10px"
      >添加信息</el-button
    > -->
    <el-button type="primary" @click="inquireInfo" style="margin-left: 10px"
      >薪资查询</el-button
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
      <el-table-column prop="poCorporate" label="公司名称" width="">
      </el-table-column>
      <el-table-column prop="poPosition" label="招聘职位" width="">
      </el-table-column>
      <el-table-column prop="poMajor" label="面向专业" width="">
      </el-table-column>
      <el-table-column prop="poNumber" label="招聘人数" width="">
      </el-table-column>
      <el-table-column prop="poAddress" label="工作地点" width="">
      </el-table-column>
      <el-table-column prop="poPay" label="薪酬" width=""> </el-table-column>
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
        label-width="125px"
        size="small"
        :inline="true"
        highlight-current-row
      >
        <el-form-item label="公司名称">
          <el-input v-model="form.poCorporate"></el-input>
        </el-form-item>
        <el-form-item label="招聘职位">
          <el-input v-model="form.poPosition"></el-input>
        </el-form-item>
        <el-form-item label="面向专业">
          <el-input v-model="form.poMajor"></el-input>
        </el-form-item>
        <el-form-item label="招聘人数">
          <el-input v-model="form.poNumber"></el-input>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-input v-model="form.poAddress"></el-input>
        </el-form-item>
        <el-form-item label="薪酬">
          <el-input v-model="form.poPay"></el-input>
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
              @click="status === 'add' ? addPosition() : updatePosition()"
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

    <!-- 薪资查询 -->
    <el-dialog
      title="薪资范围"
      :visible.sync="isShow1"
      :before-close="handleClose1"
      width="400px"
      center
    >
      <el-form
        ref="form"
        :model="inquireForm"
        size="small"
        :inline="true"
        highlight-current-row
      >
        <el-form-item label="薪资范围">
          <el-input
            style="width: 80px"
            size="small"
            v-model="inquireForm.payStart"
          ></el-input></el-form-item
        >_
        <el-form-item label="">
          <el-input
            style="width: 80px"
            size="small"
            v-model="inquireForm.payEnd"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-alert
        title="请输入非零数"
        type="info"
        center
        :closable="false"
        show-icon
      >
      </el-alert>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow1 = false">取 消</el-button>
        <el-popover
          placement="top-start"
          width="200"
          trigger="click"
          v-model="visible1"
        >
          <p>确定提交吗?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible1 = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="status === inquirePosition()"
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
    <!-- 薪资查询END -->
  </div>
</template>
<script>
import { positioniseList1 } from "@/assets/js/employmentOptions";
import {
  addPosition,
  deletePosition,
  findPosition,
  updatePosition,
} from "@/api/position";
import Pagination from "@/components/Pagination";
import LogoVue from "../../../layout/components/Sidebar/Logo.vue";
export default {
  components: { Pagination },
  created() {
    this.findPositionInfo();
    this.getTable();
  },
  data() {
    return {
      updataIndex: 0,
      status: "",
      total: positioniseList1.length,
      listQuery: {
        page: 1,
        limit: 10,
      },
      visible: false,
      visible1: false,
      list: positioniseList1,
      tableData: [],
      isShow: false,
      isShow1: false,

      form: {
        poAddress: "工作地点",
        poCorporate: "公司名称",
        poId: 0,
        poMajor: "面向专业",
        poNumber: "招聘人数",
        poPay: 0,
        poPosition: "招聘职位",
      },
      inquireForm: {
        payStart: 1,
        payEnd: 0,
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
    handleClose1() {
      this.$confirm("确认关闭？")
        .then((_) => {
          // done();
          this.isShow1 = false;
        })
        .catch((_) => {});
    },

    findPositionInfo() {
      // 查询信息
      findPosition(1, 10000, 0, 0)
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
        poAddress: "",
        poCorporate: "",
        poId: 0,
        poMajor: "",
        poNumber: "",
        poPay: null,
        poPosition: "",
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
    inquireInfo() {
      this.isShow1 = true;
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
      console.log(row.poId, "row");
      this.list.splice(index, 1);
      deletePosition(row.poId)
        .then((result) => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
          });
          this.findPositionInfo();
        })
        .catch((err) => {});
    },
    // 添加
    addPosition() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addPosition(this.form)
            .then((res) => {
              console.log(res);
              this.findPositionInfo();
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
    updatePosition() {
      console.log("更新函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updatePosition(this.form)
            .then((res) => {
              this.findPositionInfo();
            })
            .catch((err) => {});
        }
      });
      this.isShow = false;
      this.visible = false;
    },
    inquirePosition() {
      this.isShow1 = false;
      this.visible1 = false;
      // console.log(this.inquireForm.payEnd,this.inquireForm.payStart);
      findPosition(1, 10000, this.inquireForm.payEnd, this.inquireForm.payStart)
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
  },
};
</script>

<style></style>
