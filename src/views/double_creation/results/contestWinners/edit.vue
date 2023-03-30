<template>
    <div id="introductionAdd">
        <h2 style="text-align: center; margin: 0">学科竞赛获奖</h2>
        <el-row class="app-container" type="flex">
            <el-col :span="16" style="min-width: 550px; margin: 0 auto">
                <el-form ref="form" :model="form" label-width="130px">
                    <el-row>
                        <el-form-item
                            label="备注(获奖证书上传)"
                            label-width="220"
                            prop="remark"
                        >
                            <el-upload
                                class="upload-demo"
                                drag
                                :on-success="uploadSuccess"
                                accept="image/jpeg,image/png,application/pdf"
                                :limit="1"
                                :action="
                                    'http://116.62.48.128:8008/api/competition/upload?id=' +
                                    form.id +
                                    '&className=' +
                                    className
                                "
                                :headers="token"
                                style="margin: 0 auto"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                    将文件拖到此处，或<em>点击上传</em>
                                </div>
                                <div
                                    class="el-upload__tip"
                                    slot="tip"
                                    style="margin-left: 220px"
                                >
                                    仅支持单文件上传,多文件请压缩
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-row>

                    <el-row type="flex" style="justify-content: center">
                        <el-button type="primary" @click="onSubmit">
                            提交</el-button
                        >
                        <el-button type="warning" @click="resetForm">
                            重置</el-button
                        >
                        <el-button type="" @click="$router.go(-1)">
                            返回内容列表</el-button
                        >
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import college from "@/json/college.json";
import doubleCreation from "@/json/DoubleCreation.json";
import {
    addContestWinners,
    editContestWinners,
} from "@/api/double_creation_class/double_creation/contestWinners";
import editForm from "@/store/modules/editFormData";
import { getDoubleCreationClass, getToken } from "@/utils/auth";
import { getField } from "@/api/dontai";
export default {
    data() {
        return {
            token: { token: getToken() },
            uploadId: 0,
            className: getDoubleCreationClass(),

            form: {},
            fields: [],

            college: college,
            // 双创班名单
            doubleCreation: doubleCreation,
        };
    },
    mounted() {
        this.form = editForm.getters.getEditFormData;
        this.getField();
    },
    methods: {
        getField() {
            getField("studentInfo")
                .then((res) => {
                    console.log(res.data);
                    this.fields = res.data;
                    for (let i = 0; i < res.data.length; i++) {
                        // this.$set(this.form, res.data[i].engName, "");
                        this.$set(this.fields, i, res.data[i]);
                    }
                })
                .catch((err) => {});
        },
        onSubmit() {
            // console.log(this.form);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let form = {};
                    form = this.form;
                    if (typeof form.remark != "string") {
                        form.remark = JSON.stringify(form.remark);
                    }

                    editContestWinners(form)
                        .then((res) => {
                            this.$message.success(res.msg);

                            // // 清理绑定数据
                            // this.$refs.form.resetFields();
                            setTimeout(() => {
                                this.$router.go(-1);
                            }, 1000);
                        })
                        .catch((err) => {
                            this.$message.error("出错！");
                            console.log(err);
                        });
                }
            });
        },

        // 重置按钮
        resetForm() {
            this.$refs.form.resetFields();
            this.$message({
                message: "重置成功!",
                type: "warning",
            });
        },
        uploadSuccess(res) {
            this.form.remark = JSON.parse(res.data.remark);
        },
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss">
.line {
    text-align: center;
}
// 命名空间
#introductionAdd {
    .closeLabelWidth {
        .el-form-item__content {
            margin-left: 0 !important;
        }
    }

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
