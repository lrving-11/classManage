<template>
  <div>
    <!-- <h2>就业信息</h2> -->
    <el-button type="primary" @click="updateBtn" style="margin: 10px 20px"
      >点击更新</el-button
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
      <el-table-column prop="spName" label="姓名" width=""> </el-table-column>
      <el-table-column prop="spCreateClass" label="双创班级" width="">
      </el-table-column>
      <el-table-column prop="spPoint" label="双创积分" width="">
      </el-table-column>
      >
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
      title="星级评定"
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
          <el-input v-model="form.spName"></el-input>
        </el-form-item>
        <el-form-item label="双创班级">
          <el-input v-model="form.spCreateClass"></el-input>
        </el-form-item>
        <el-form-item label="双创积分">
          <el-input v-model="form.spPoint"></el-input>
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
              @click="status === 'add' ? addStarLevel() : updateEmployment()"
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
import {
  addStarLevel,
  findStarLevel,
  findAllStarPoint,
  starPoint,
} from "@/api/startLevel";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  created() {
    // this.unitNatureOptionsFun();
    this.findStarLevelInfo();
    this.getTable();
  },

  data() {
    return {
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
        spId: 0,
        spName: "",
        spCreateClass: "",
        spPoint: "",
      },

      //
    };
  },
  methods: {
    updateBtn() {
      starPoint()
        .then((res) => {
          this.$notify({
            title: "成功",
            message: "更新成功",
            type: "success",
            duration: 1500,
          });
          this.findStarLevelInfo();
        })
        .catch((err) => {});
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          // done();
          this.isShow = false;
        })
        .catch((_) => {});
    },

    findStarLevelInfo() {
      // 查询信息
      findAllStarPoint(1, 10000)
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
        spId: 0,
        spName: "",
        spCreateClass: "",
        spPoint: "",
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
    // 添加
    addStarLevel() {
      console.log("添加函数");
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // this.list.push(this.form);
          addStarLevel(this.form)
            .then((res) => {
              console.log(res);
              this.findStarLevelInfo();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      this.isShow = false;
      this.visible = false;
    },
  },
};
</script>

<style></style>
