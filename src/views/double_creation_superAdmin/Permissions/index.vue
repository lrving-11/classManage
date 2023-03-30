<template>
    <el-card>
        <el-row class="row">
            双创班身份
            <el-radio-group v-model="doubleCreationSelectTurn">
                <el-radio-button :label="false">超级管理员</el-radio-button>
                <el-radio-button :label="true">单独选择</el-radio-button>
            </el-radio-group>
            <el-select
                v-show="doubleCreationSelectTurn"
                v-model="doubleCreationClassSelect"
                @change="selectClass"
                style="margin-left: 20px"
            >
                <el-option
                    v-for="i in doubleCreationClass"
                    :key="i.text"
                    :value="i.value"
                    >{{ i.text }}</el-option
                >
            </el-select>
        </el-row>
        <el-row class="row">
            学院身份
            <el-radio-group v-model="collegeSelectTurn">
                <el-radio-button :label="false">超级管理员</el-radio-button>
                <el-radio-button :label="true">单独选择</el-radio-button>
            </el-radio-group>
            <el-select
                v-show="collegeSelectTurn"
                v-model="collegeSelect"
                @change="selectCollege"
                style="margin-left: 20px"
            >
                <el-option
                    v-for="i in college"
                    :key="i.text"
                    :value="i.value"
                    >{{ i.text }}</el-option
                >
            </el-select>
        </el-row>
    </el-card>
</template>

<script>
import doubleCreation from "@/json/DoubleCreation.json";
import college from "@/json/college.json";
import {
    getDoubleCreationClass,
    getUserCollege,
    removeDoubleCreationClass,
    setDoubleCreationClass,
    setUserCollege,
} from "@/utils/auth";
export default {
    data() {
        return {
            // 双创班查看
            doubleCreationSelectTurn: this.judgeDoubleSelectTurn(),
            doubleCreationClassSelect: getDoubleCreationClass(),

            doubleCreationClass: doubleCreation,

            // 学院
            collegeSelectTurn: this.judgeCollegeSelectTurn(),
            collegeSelect: getUserCollege(),
            college: college,
        };
    },
    methods: {
        /*------------双创班------------------------*/
        // 判断是否存在双创班
        judgeDoubleSelectTurn() {
            console.log(getDoubleCreationClass());
            if (getDoubleCreationClass() !== "superAdmin") {
                return true;
            } else {
                return false;
            }
        },
        // 选择框选择时
        selectClass() {
            setDoubleCreationClass(this.doubleCreationClassSelect);
        },
        selectAll() {},

        /*------------学院------------------------*/
        judgeCollegeSelectTurn() {
            console.log(getUserCollege());
            if (getUserCollege() !== "superAdmin") {
                return true;
            } else {
                return false;
            }
        },
        // 选择框选择时
        selectCollege() {
            setUserCollege(this.collegeSelect);
        },
    },
    watch: {
        doubleCreationSelectTurn(value) {
            // 所有人
            if (value === false) {
                setDoubleCreationClass("superAdmin");
            } else {
                setDoubleCreationClass("superAdmin");
            }
        },
        collegeSelectTurn(value) {
            // 所有人
            if (value === false) {
                setUserCollege("superAdmin");
            } else {
                setUserCollege("superAdmin");
            }
        },
    },
};
</script>

<style scoped>
.row {
    margin: 20px 0;
}
</style>
