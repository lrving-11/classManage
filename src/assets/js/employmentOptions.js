// 就业信息
export const cityOptions = [
    { value: "北京", label: "北京" },
    { value: "上海", label: "上海" },
    { value: "广东", label: "广东" },
    { value: "湖北", label: "湖北" },
    { value: "陕西", label: "陕西" },
    { value: "四川", label: "四川" },
    { value: "江苏", label: "江苏" },
    { value: "安徽", label: "安徽" },
    { value: "山东", label: "山东" },
    { value: "湖南", label: "湖南" },
    { value: "天津", label: "天津" },
    { value: "河南", label: "河南" },
    { value: "浙江", label: "浙江" },
    { value: "重庆", label: "重庆" },
    { value: "辽宁", label: "辽宁" },
    { value: "福建", label: "福建" },
    { value: "江西", label: "江西" },
    { value: "吉林", label: "吉林" },
    { value: "黑龙江", label: "黑龙江" },
    { value: "河北", label: "河北" },
    { value: "山西", label: "山西" },
    { value: "云南", label: "云南" },
    { value: "甘肃", label: "甘肃" },
    { value: "广西", label: "广西" }
];

export const graDestinationOptions = [
    {
        value: "签就业协议",
        label: "签就业协议"
    },
    {
        value: "签劳动合同",
        label: "签劳动合同"
    },
    {
        value: "其他录用形式",
        label: "其他录用形式"
    },
    {
        value: "科研助理",
        label: "科研助理"
    },
    {
        value: "国家基层项目",
        label: "国家基层项目"
    },
    {
        value: "应征义务兵",
        label: "应征义务兵"
    },
    {
        value: "留级休学续读",
        label: "留级休学续读"
    },
    {
        value: "自主创业",
        label: "自主创业"
    },
    {
        value: "自由职业",
        label: "自由职业"
    },
    {
        value: "升学",
        label: "升学"
    },
    {
        value: "出国留学工作",
        label: "出国留学工作"
    },
    {
        value: "其它(备注中说明)",
        label: "其它(备注中说明)"
    }
];

export const unitNatureOptions = [
    {
        value: "国有企业",
        label: "国有企业"
    },
    {
        value: "三资企业",
        label: "三资企业"
    },
    {
        value: "金融企业",
        label: "金融企业"
    },
    {
        value: "私营企业",
        label: "私营企业"
    },
    {
        value: "其它(备注中说明)",
        label: "其它(备注中说明)"
    }
];

const tableList = [];
for (let index = 0; index < 100; index++) {
    tableList.push({
        empAgreement: "协议",
        empBirth: "2020-02",
        empCity: "上海",
        empContacts: "就业单位联系人",
        empCounterpart: "专业对口情况",
        empCreatedClass: "双创班名称",
        empDepartment: "入职部门",
        empEmail: "Email",
        empId: 0,
        empName: "姓名",
        empQq: "QQ",
        empSex: "性别",
        empStuNumber: "学号",
        empUnit: "就业单位",
        empUnitNature: "单位性质",
        empUserId: 1234,
        empFunction: "职务职能",
        empPay: "薪酬",
        empGraDestination: "毕业去向",
        empMajor: "专业名称",
        empRemark: "备注"
    });
}
export const tableListemp = tableList;

// 签约
const signingList = [];
for (let index = 0; index < 100; index++) {
    signingList.push({
        siCreateClass: "班名",
        //
        siNum: 200,
        //
        // siFlexibleEmployment: "灵活就业",
        siFlexibleEmployment1: 30,
        siFlexibleEmployment2: 30,
        siId: 0,
        // siIsCounterpart: "对口就业",
        siIsCounterpart1: 40,
        siIsCounterpart2: 40,
        // siNonUnemployment: "非失业",
        siNonUnemployment1: 20,
        siNonUnemployment2: 20,
        siNonUnemployment3: 20,
        // siSign: "签约",
        siSign1: 10,
        siSign2: 10,
        siSign3: 10,
        siSign4: 10,
        siState: 50,
        siTime: "时间 精确到月",
        // 待就业
        siState: 20
    });
}
export const signingList1 = signingList;

// 简历
const resumeList = [];
for (let index = 0; index < 100; index++) {
    resumeList.push({
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
        reUserId: 0
    });
}
export const resumeList1 = resumeList;

// 求职
const jobWantedList = [];
for (let index = 0; index < 100; index++) {
    jobWantedList.push({
        jobAddress: "邮寄地址",
        jobCompany: "应聘公司",
        jobEmail: "联系邮箱",
        jobFirstWorkPlace: "首选工作地点",
        jobGraSchool: "毕业学校",
        jobId: 0,
        jobMajor: "所学专业",
        jobName: "姓名",
        jobPhone: "联系电话",
        jobPosition: "应聘职位",
        jobSalaryRequire: "薪资要求",
        jobUserId: 0
    });
}
export const jobWantedList1 = jobWantedList;

// 企业信息
const enterpriseList = [];
for (let index = 0; index < 100; index++) {
    enterpriseList.push({
        enId: 0,
        enIntroduce: "企业简介",
        enName: "企业名称",
        enProductsAndServices: "产品及服务",
        enQrCode: "二维码图片",
        enType: "企业类型",
        enVideoAddress: "企业宣传视频地址"
    });
}
export const enterpriseList1 = enterpriseList;

// 职位信息
const positioniseList = [];
for (let index = 0; index < 100; index++) {
    positioniseList.push({
        poAddress: "工作地点",
        poCorporate: "公司名称",
        poId: 0,
        poMajor: "面向专业",
        poNumber: "招聘人数",
        poPay: 0,
        poPosition: "招聘职位"
    });
}
export const positioniseList1 = positioniseList;

// 审核通知
const jobExamineList = [];
for (let index = 0; index < 100; index++) {
    jobExamineList.push({
        exExamineId: 0,
        exInterviewAddress: "面试地点",
        exInterviewTime: "面试时间",
        exRemark: "备注",
        exState: "审核状态",
        exWantedId: 0
    });
}
export const jobExamineList1 = jobExamineList;
