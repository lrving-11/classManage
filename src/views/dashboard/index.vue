<template>
  <div class="dashboard-container">
    <el-card>
      <div class="dashboard-text" slot="header">欢迎回来，{{ name }}</div>
      <div style="padding: 5px 10px; font-size: 20px">
        用户学院： {{ userCollege }}
      </div>
      <div style="padding: 5px 10px; font-size: 20px">
        用户班级： {{ userClassName }}
      </div>
      <div style="margin: 2em 0"></div>
      <el-row
        style="
          text-align: center;
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        "
      >
        <el-col :span="5" style="">
          <el-card style="cursor: pointer">
            <div slot="header">学科竞赛总数</div>
            <div class="studentNum" style="">
              <div style="background-color: #ffbb96">
                <div>
                  {{ num.schoolWinner }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="">
          <el-card style="cursor: pointer">
            <div slot="header">双创班竞赛获奖总数</div>
            <div class="studentNum" style="">
              <div style="background-color: #ffbb96">
                <div>
                  {{ num.classWinner }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
      >
        <el-col :span="5">
          <el-card style="cursor: pointer">
            <div slot="header">双创班学生总数</div>
            <div class="studentNum" style="">
              <div style="">
                <div>
                  {{ num.classStudent }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card style="cursor: pointer">
            <div slot="header">双创班毕业生总数</div>
            <div class="studentNum">
              <div>
                <div>{{ num.classGraduate }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import echarts from "@/components/echarts/echarts";
import { mapGetters } from "vuex";
import { getDoubleCreationClass, getUserCollege } from "@/utils/auth";
import { number } from "@/api/mainpage";
export default {
  name: "Dashboard",
  components: {},
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      userClassName: getDoubleCreationClass(),
      userCollege: getUserCollege(),

      num: {
        // 学科竞赛总人数
        schoolWinner: 0,
        // 双创班竞赛获奖总人数
        classWinner: 0,
        // 双创班学生总数
        classStudent: 0,
        // 双创班毕业生总数
        classGraduate: 0,
      },
      refuseReason: "",
      refuseReasonEmpty: true,

      refuseReasonSchool: "",
      refuseReasonEmptySchool: true,
    };
  },
  created() {
    this.getNum();
  },
  methods: {
    getNum() {
      number().then((res) => {
        console.log("homeNum", res.data);
        this.num.schoolWinner = res.data.schoolCompetition;
        this.num.classWinner = res.data.achieveCompetition;
        this.num.classStudent = res.data.student;
        this.num.classGraduate = res.data.graduateStudent;
      });
    },

    // 表
    charts() {
      let certifiedStudent = echarts.init(
        document.getElementById("certifiedStudent")
      );
      let certifiedCompany = echarts.init(
        document.getElementById("certifiedCompany")
      );
      let studentOption = {
        title: {
          text: "已认证学生数",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [82, 93, 99, 103, 129, 133, 132],
            type: "line",
          },
        ],
      };
      let companyOption = {
        title: {
          text: "已认证企业数",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [2, 5, 10, 23, 29, 33, 39],
            type: "line",
          },
        ],
      };

      certifiedStudent.setOption(studentOption);
      certifiedCompany.setOption(companyOption);
    },

    // 格式化数据，使对象数组转换成用户体验友好的字符串格式
    formatData(data) {
      let arr = JSON.parse(data);
      if (arr != null) {
        // 当类型为string时
        if (typeof arr === "string") {
          let str = arr.split(",");
          return str[0] + "(" + str[1] + ")";
        } else {
          // 数据为对象数组的情况时

          if (arr.length === 0) {
            return "数据为空";
          } else if (arr.length === 1) {
            // return ;
            let key = Object.keys(arr[0]);
            return arr[0][key[0]] + "(" + arr[0][key[1]] + ")";
          } else {
            let str = "";
            let key = Object.keys(arr[0]);

            for (let i of arr) {
              //
              str += i[key[0]] + "(" + i[key[1]] + ")" + ",";
            }
            return str;
          }
        }
      } else {
        return "数据为空";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    margin: 20px 5px;
  }
}
.dashboard-container {
  font-family: "华文楷体", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  .studentNum {
    > div {
      width: 90%;
      height: 7em;
      margin: auto;
      background-color: #409eff;
      position: relative;

      > div {
        font-size: 4rem;
        color: #fff;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
