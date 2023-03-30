<template>
    <div class="app-container" style="padding: 0 20px">
        <!--   表格     -->
        <div class="filter-container" style="margin: 5px 15px; display: flex">
            <!-- <el-input
                v-model="search.competitionName"
                :placeholder="'竞赛名称'"
                clearable
                style="width: 150px"
                class="filter-item"
            /> -->

            <el-button
                type="primary"
                icon="el-icon-search"
                @click="searchMethod()"
                style="margin: 0 7px"
            >
                搜索
            </el-button>

            <el-radio-group v-model="status" style="display: flex">
                <el-radio :label="0" style="margin: 0; line-height: 2.5"
                    >审核通过</el-radio
                >
                <!--                <el-radio :label="1" style="margin: 0; line-height: 2.5"-->
                <!--                    >审核失败</el-radio-->
                <!--                >-->
                <el-radio :label="2" style="margin: 0; line-height: 2.5"
                    >审核中</el-radio
                >
            </el-radio-group>

            <el-card
                v-show="uploadExcelTurn"
                style="
                    position: absolute;
                    top: 50%;
                    left: 50%;

                    transform: translate(-50%, -50%);
                    z-index: 100;
                    background-color: #ebebeb;
                "
            >
                <el-select v-model="className">
                    <el-option
                        v-for="i in doubleCreation"
                        :key="i.text"
                        :value="i.value"
                        >{{ i.text }}</el-option
                    >
                </el-select>
                <el-upload
                    class="upload-demo"
                    drag
                    :action="
                        'http://116.62.48.128:8008/api/competition/import?className=' +
                        className
                    "
                    :headers="token"
                    :before-upload="beforeUpload"
                    :on-success="importSuccess"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip"></div>
                </el-upload>
                <el-button
                    @click="
                        className = 'superAdmin';
                        uploadExcelTurn = false;
                    "
                    >关闭</el-button
                >
            </el-card>
        </div>

        <!--        -->

        <el-table
            ref="table"
            :data="tableData"
            :height="420"
            element-loading-text="Loading"
            v-loading="listLoading"
            border
            fit
            highlight-current-row
        >
            <el-table-column
                v-show="i.isView"
                v-for="(i, index) in fields"
                :key="index"
                :label="i.chName"
                align="center"
                min-width="150"
            >
                <template slot-scope="scope">
                    {{ scope.row[i.engName] }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="status === 0"
                class-name="status-col"
                label="编辑"
                width="170"
                align="center"
            >
                <template slot-scope="scope">
                    <el-button
                        type="success"
                        size="small"
                        @click="edit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="error"
                        size="small"
                        @click="deleteIdentify(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>

            <el-table-column label="备注" align="center" min-width="120">
                <template slot-scope="scope">
                    <el-image
                        :src="getImageUrl(scope.row.remark)"
                        :alt="1"
                        @click="
                            dialogVisible = true;
                            dialogImageUrl = getImageUrl(scope.row.remark);
                            rowData = scope.row;
                        "
                    >
                        <div slot="error" class="image-slot">
                            <!--                            <i class="el-icon-picture-outline"-->
                            <!--                                >文件不存在或文件格式不支持</i-->
                            <!--                            >-->
                            <el-button
                                type="text"
                                @click="remarkClick(scope.row.remark)"
                                >下载</el-button
                            >
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" align="center" min-width="120">
                <template slot-scope="scope">
                    <el-tag :type="statusColor[scope.row.status]">
                        {{ statusList[scope.row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :page-sizes="[10, 20, 50, 100, 150, 200]"
            @pagination="pagination"
            style="margin: 0; padding: 5px 0 0 0"
        />

        <!--    图片展示     -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
            <el-row type="flex">
                <el-button
                    type="info"
                    icon="el-icon-download"
                    circle
                    style="margin: 0 auto"
                    @click="remarkClick(rowData.remark)"
                ></el-button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
// import zone from "@/json/zone.json";
import doubleCreation from "@/json/DoubleCreation.json";
import college from "@/json/college.json";
import userData from "@/store/modules/user2";
import Pagination from "@/components/Pagination/index";
import UploadExcelComponent from "@/components/UploadExcel/index";

// import {
//     getCertifiedStu,
//     editStudent,
//     deleteCertifiedStu,
// } from "@/api/certified";
import {
    translateChinese,
    translatevariable,
} from "@/vendor/tHeaderConversion";
import {
    deleteContestWinners,
    getContestWinners,
    getContestWinnersByWorkName,
    searchContestWinners,
    getAuditing,
} from "@/api/double_creation_class/double_creation/contestWinners";
import { getDoubleCreationClass, getToken } from "@/utils/auth";
import editForm from "@/store/modules/editFormData";
import { searchCreationStudent } from "@/api/double_creation_class/double_creation/studentData";
import { getFile } from "@/utils/getFile";
import { getField } from "@/api/dontai";
export default {
    components: {
        Pagination,
        UploadExcelComponent,
    },

    data() {
        return {
            token: { token: getToken() },
            className: getDoubleCreationClass(),
            fields: [],
            status: 0,
            statusList: ["审核通过", "审核失败", "审核中"],
            statusColor: ["success", "danger", "info"],
            // 图片放大
            dialogVisible: false,
            dialogImageUrl: "",
            rowData: null,

            total: 0,
            listQuery: {
                page: 1,
                limit: 10,
            },

            // 加载状态
            listLoading: true,
            uploadExcelTurn: false,

            showReviewer: 0,
            // 导入面板开关
            calendarTypeOptions: [],

            search: {
                // 竞赛名称
                competitionName: "",
                // // 级别
                // rank: "",
                // // 获奖时间
                // awardTime: ["", ""],
            },
            // 筛选学院，数组，元素是对象，有text和value两个属性
            college: college,
            // 双创班
            doubleCreation: doubleCreation,
            //
            list: null,
            // 表格数据
            tableData: [],

            // 专业选项：
            major: {
                current: "",
                majorOption: () => import("@/json/college.json"),
            },
        };
    },
    created() {
        //    对页数的处理
        if (this.$route.params.page && this.$route.params.limit) {
            this.listQuery.page = Number(this.$route.params.page);
            this.listQuery.limit = Number(this.$route.params.limit);
        }
        this.getField();
    },
    methods: {
        getField() {
            getField("competitionInfo")
                .then((res) => {
                    console.log(res.data);
                    this.fields = res.data;
                    for (let i = 0; i < res.data.length; i++) {
                        // this.$set(this.form, res.data[i].engName, "");
                        this.$set(this.fields, i, res.data[i]);
                    }
                    this.getTable();
                })
                .catch((err) => {});
        },
        // 分页
        getTable() {
            getContestWinners(
                this.listQuery.page,
                this.listQuery.limit,
                getDoubleCreationClass()
            )
                .then((res) => {
                    // 所有数据都保存在tableData中
                    this.list = res.data.content;
                    // 分页显示
                    this.total = res.data.totalElements;

                    // 序号的处理
                    // for (let i in this.tableData) {
                    //     this.tableData[i].tableID =
                    //         Number(i) +
                    //         1 +
                    //         (this.listQuery.page - 1) * this.listQuery.limit;
                    // }
                    for (let i in this.tableData) {
                        this.tableData[i].status = 0;
                    }
                    for (let i = 0; i < res.data.content.length; i++) {
                        if (res.data.content[i].comField) {
                            this.tableData.push(
                                JSON.parse(res.data.content[i].comField)
                            );
                            this.tableData[i].id = res.data.content[i].id;
                        }
                    }
                    this.listLoading = false;
                })
                .catch((err) => {
                    this.$message.error("获取信息出错！" + err);
                });
        },

        getAuditing() {
            getAuditing(
                this.listQuery.page,
                this.listQuery.limit,
                getDoubleCreationClass()
            )
                .then((res) => {
                    // 所有数据都保存在tableData中
                    this.list = res.data.content;
                    // 分页显示
                    this.total = res.data.totalElements;
                    this.tableData = [];
                    // 序号的处理
                    // for (let i in this.tableData) {
                    //     this.tableData[i].tableID =
                    //         Number(i) +
                    //         1 +
                    //         (this.listQuery.page - 1) * this.listQuery.limit;
                    // }

                    for (let i = 0; i < res.data.content.length; i++) {
                        if (res.data.content[i].comField) {
                            this.tableData.push(
                                JSON.parse(res.data.content[i].comField)
                            );
                        } else {
                            this.tableData.push({});
                        }
                        this.tableData[i].id = res.data.content[i].id;
                    }
                    for (let i in this.tableData) {
                        this.tableData[i].status = 2;
                    }

                    this.listLoading = false;
                })
                .catch((err) => {
                    this.$message.error("获取信息出错！" + err);
                });
        },

        // 删除
        deleteIdentify(index, row) {
            this.listLoading = true;

            deleteContestWinners(row.id)
                .then((res) => {
                    this.$message.success(res.msg);
                    this.getTable();
                })
                .catch((err) => {
                    this.$message.error("出错！" + err);
                    console.log(err);
                });
            this.listLoading = false;
        },

        getImageUrl(remark) {
            // console.log(JSON.parse(remark)[0]);
            if (remark) {
                let file = JSON.parse(remark)[0];
                return (
                    "http://116.62.48.128:8008/api/image?fileName=" +
                    file["filename"]
                );
            } else {
                return "暂无数据";
            }
        },

        handleDownload() {
            if (
                this.search.competitionName ||
                this.search.rank ||
                this.search.awardTime[0]
            ) {
                getFile(
                    `http://116.62.48.128:8008/api/competition/findExport?competitionName=${
                        this.search.competitionName
                    }&className=${getDoubleCreationClass()}&rank=${
                        this.search.rank
                    }&startTime=${this.search.awardTime[0]}&endTime=${
                        this.search.awardTime[1]
                    }`,
                    "双创班竞赛获奖.xlsx"
                );
                return;
            }
            getFile(
                `http://116.62.48.128:8008/api/competition/export?className=${getDoubleCreationClass()}`,
                "双创班竞赛获奖.xlsx"
            );
        },

        beforeUpload(file) {
            if (this.className === "superAdmin") {
                this.$message.error(
                    "超级管理员禁止直接导入，请在权限控制中切换身份！"
                );
                return false;
            }
            return true;
        },

        //  搜索
        searchMethod(page = 1) {
            searchContestWinners(
                page,
                this.listQuery.limit,
                this.search.competitionName,
                this.search.rank,
                this.search.awardTime[0],
                this.search.awardTime[1]
            ).then((res) => {
                this.tableData = res.data.content;
                this.total = res.data.totalElements;
                // 当第一次搜索时，未换页
                if (page === 1) {
                    this.listQuery.page = 1;
                }
                for (let i in this.tableData) {
                    this.tableData[i].tableID =
                        Number(i) +
                        1 +
                        (this.listQuery.page - 1) * this.listQuery.limit;
                }
            });
        },
        // 换页
        pagination() {
            if (
                this.search.competitionName ||
                this.search.rank ||
                this.search.awardTime[0]
            ) {
                this.searchMethod(this.listQuery.page);
                return;
            }
            // 一般时换页
            this.$router.push(
                "/double-creation/results/contest-winners/index/" +
                    this.listQuery.page +
                    "&" +
                    this.listQuery.limit
            );
        },
        edit(index, row) {
            // console.log(row);
            editForm.commit("setEditFormData", row);
            editForm.commit("setPrePage", document.location.href);
            this.$router.push("/double-creation/results/contest-winners/edit");
        },

        importSuccess(res) {
            this.$message(res.msg);
            this.getTable();
        },
        // 备注按钮
        remarkClick(remark) {
            // console.log(typeof JSON.parse(remark));
            if (remark) {
                let file = JSON.parse(remark)[0];
                getFile(
                    `http://116.62.48.128:8008/api/download?fileName=${file["filename"]}`,
                    file["filename"]
                );
            } else {
                this.$message.error("此条目无附件");
            }
        },
    },
    computed: {
        awardTime() {
            return this.search.awardTime;
        },
    },
    watch: {
        // 解决范围性搜索空白时搜索报错的问题
        awardTime(val) {
            if (val === null) {
                this.search.awardTime = ["", ""];
            }
        },

        //  监听选择
        status(val) {
            this.listQuery.page = 1;
            this.listQuery.limit = 10;

            switch (val) {
                case 0: // 审核通过
                    this.tableData.splice(0, this.tableData.length);
                    this.getTable();
                    break;
                case 1: // 审核失败
                    break;
                case 2: // 审核中
                    this.tableData.splice(0, this.tableData.length);
                    this.getAuditing();
                    break;
            }
        },
    },
    mounted() {
        this.getTable();
    },
};
</script>

<style scoped lang="scss">
.addPanel {
    max-height: 600px;
    overflow: auto;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;

    .el-form-item {
        margin: 10px;
    }

    .formButton {
        text-align: center;
    }
}
</style>
