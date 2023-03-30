/*
 *       转换excel表头，中文->英文变量，英文变量->中文
 * */

let chart = {
    name: name === "学生" ? "学生姓名" : "企业名称",
    stuNum: "学号",
    userClass: "班级",
    role: "身份（学生/企业）",
    zone: "地区",
    username: "用户名",
    college: "学院",
    email: "邮箱",
    phone: "电话号码",
    profession: "专业",
    description: name === "学生" ? "学生简介" : "企业介绍",
    domain: "领域",
    date1: "入学日期",
    date2: "毕业日期",
};

/*
       英文变量转中文
    @params: val ,数组
* */
export function translatevariable(arr, name) {
    let result = [];
    let keys = Object.keys(chart);
    let values = Object.values(chart);

    for (let i of arr) {
        let index = keys.indexOf(i);
        if (index !== -1) {
            result.push(values[index]);
        } else {
            result.push(i);
        }
    }
    return result;
}
/*
       中文转英文
       这和英文变量转中文不同，数组是嵌套数组
* */
export function translateChinese(arr, name) {
    let result = [];
    let keys = Object.keys(chart);
    let values = Object.values(chart);
    console.log(arr);
    for (let j of arr) {
        // 内嵌对象(内层)
        let obj = {};
        let objKeys = Object.keys(j);
        let objValues = Object.values(j);
        // 用与计算遍历次数
        let count = 0;
        for (let i of objKeys) {
            let index = values.indexOf(i);
            if (index !== -1) {
                obj[keys[index]] = objValues[count];
            } else {
                console.log("excel转换中有变量未转换,请检查！");
                obj[i] = objValues[count];
            }
            count++;
        }
        result.push(obj);
    }
    return result;
}
