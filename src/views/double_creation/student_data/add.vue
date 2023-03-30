<template>
    <div id="introductionAdd">
        <h2 style="text-align: center; margin: 0">学生信息</h2>
        <el-row class="app-container" type="flex">
            <el-col :span="16" style="min-width: 550px; margin: 0 auto">
                <!-- <el-form
                    ref="form"
                    :model="form"
                    label-width="130px"
                    :disabled="disabled"
                >
                    <el-row
                        type="flex"
                        style="width: 100%; justify-content: space-between"
                    >
                        <el-form-item
                            label="姓名"
                            prop="name"
                            style="width: 50%"
                        >
                            <el-input v-model="form.name" style="width: 100%" />
                        </el-form-item>

                        <el-form-item
                            label="性别"
                            prop="gender"
                            style="width: 50%"
                        >
                            <el-select
                                v-model="form.gender"
                                style="width: 100%"
                                clearable
                            >
                                <el-option :value="'男'"> 男 </el-option>
                                <el-option :value="'女'"> 女</el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex">
                        <el-form-item
                            label="政治面貌"
                            prop="politicalStatus"
                            style="width: 50%"
                        >
                            <el-select
                                v-model="form.politicalStatus"
                                style="width: 100%"
                                clearable
                            >
                                <el-option :value="'中共党员'"
                                    >中共党员</el-option
                                >
                                <el-option :value="'共青团员'"
                                    >共青团员</el-option
                                >
                                <el-option :value="'群众'">群众</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="双创班职务"
                            prop="position"
                            style="width: 50%"
                        >
                            <el-input
                                v-model="form.position"
                                type="text"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                    </el-row>

                    <el-row type="flex">
                        <el-form-item
                            label="双创班名称"
                            prop="doubleCreationClass"
                            style="width: 50%"
                        >
                            <el-select
                                v-model="form.doubleCreationClass"
                                style="width: 100%"
                                clearable
                            >
                                <el-option
                                    v-for="i in doubleCreation"
                                    :key="i.text"
                                    :value="i.value"
                                    >{{ i.text }}</el-option
                                >
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="所在学院"
                            prop="college"
                            style="width: 50%"
                        >
                            <el-select
                                v-model="form.college"
                                style="width: 100%"
                                clearable
                            >
                                <el-option
                                    v-for="i in college"
                                    :key="i.text"
                                    :value="i.value"
                                    >{{ i.text }}</el-option
                                >
                            </el-select>
                        </el-form-item>
                    </el-row>

                    <el-row type="flex">
                        <el-form-item
                            label="专业班级"
                            prop="professionClass"
                            style="width: 50%"
                        >
                            <el-input
                                v-model="form.professionClass"
                                type="text"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="学号"
                            prop="stuNum"
                            style="width: 50%"
                        >
                            <el-input
                                v-model="form.stuNum"
                                type="text"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                    </el-row>

                    <el-row type="flex">
                        <el-form-item
                            label="联系电话"
                            prop="phone"
                            style="width: 50%"
                        >
                            <el-input
                                v-model="form.phone"
                                type="text"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="电子邮箱"
                            prop="email"
                            style="width: 50%"
                        >
                            <el-input
                                v-model="form.email"
                                type="text"
                                style="width: 100%"
                            ></el-input>
                        </el-form-item>
                    </el-row>

                    <el-row type="flex">
                        <el-form-item
                            label="加入班级时间"
                            prop="inDate"
                            style="width: 50%"
                        >
                            <el-date-picker
                                v-model="form.inDate"
                                type="month"
                                format="yyyy 年 MM 月"
                                value-format="yyyy-MM"
                                style="width: 100%"
                            />
                        </el-form-item>
                        <el-form-item
                            label="离开班级时间"
                            prop="outDate"
                            style="width: 50%"
                        >
                            <el-date-picker
                                v-model="form.outDate"
                                type="month"
                                format="yyyy 年 MM 月"
                                value-format="yyyy-MM"
                                style="width: 100%"
                            />
                        </el-form-item>
                    </el-row>

                    <el-row type="flex" style="justify-content: center">
                        <el-button type="primary" @click="onSubmit">
                            提交</el-button
                        >
                        <el-button type="warning" @click="resetForm">
                            重置</el-button
                        >
                    </el-row>
                </el-form> -->

                <el-form
                    ref="form"
                    :model="form"
                    label-width="130px"
                    :disabled="disabled"
                    
                >
                    <el-form-item
                        v-show="i.fieldIsView"
                        v-for="(i, index) in fields"
                        :key="index"
                        :label="i.fieldChName"
                        :prop="i.fieldEngName"
                        style="width: 80%"
                    >
                        <el-input
                            v-if="i.fieldAttribute === 'String'"
                            v-model="form[i.fieldEngName]"
                            style="width: 100%"
                        />
                        <el-date-picker
                            v-else-if="i.fieldAttribute === 'Date'"
                            v-model="form[i.fieldEngName]"
                            type="month"
                            format="yyyy 年 MM 月"
                            value-format="yyyy-MM"
                            style="width: 100%"
                        />
                    </el-form-item>
                </el-form>
                <el-row type="flex" style="justify-content: center">
                    <el-button type="primary" @click="onSubmit">
                        提交</el-button
                    >
                    <el-button type="warning" @click="resetForm">
                        重置</el-button
                    >
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import college from "@/json/college.json";
import doubleCreation from "@/json/DoubleCreation.json";
import { addCreationStudent } from "@/api/double_creation_class/double_creation/studentData";
import { getField } from "@/api/dontai";
import { getDoubleCreationClass, getToken } from "@/utils/auth";

export default {
    data() {
        return {
            disabled: false,
            token: { token: getToken() },
            form: {},
            fields: [],

            // 学院
            college: college,
            // 双创班名单
            doubleCreation: doubleCreation,
        };
    },
    created() {
        this.getField();
    },
    // mounted() {
    //     if (getDoubleCreationClass() === "superAdmin") {
    //         this.$confirm(
    //             "超级管理员禁止直接添加信息，请在权限控制中切换班级身份！"
    //         );
    //         this.disabled = true;
    //     }
    //     console.log(this.form,"11");
    // },
    methods: {
        getField() {
            getField("studentInfo")
                .then((res) => {
                    console.log(res.data);
                    this.fields = res.data;
                    for (let i = 0; i < res.data.length; i++) {
                        this.$set(this.form, res.data[i].fieldEngName, "");
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
                    form.stuId=null;
                    form.stuClassName = getDoubleCreationClass();
                    form.stuUserId = 0;
                    form["stuField"] = this.form;

                    addCreationStudent(form.stuClassName,form,form.stuUserId)
                        .then((res) => {
                            this.$message.success(res.msg);

                            // 清理绑定数据
                            this.$refs.form.resetFields();
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
