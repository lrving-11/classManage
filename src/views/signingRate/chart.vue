<template>
  <div style="" class="content">
    <div style="height: 400px; width: 35%">
      <h2>签约情况</h2>
      <el-select
        v-model="className"
        placeholder="请选择实验班级"
        style="margin: 10px 10px"
        @change="classChange()"
      >
        <el-option
          v-for="item in DoubleCreation"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div id="chart" style="height: 80%; width: "></div>
    </div>
    <div style="height: 400px; width: 45%">
      <h2 style="margin: ">年度变化比</h2>
      <el-date-picker
        style="margin: 10px 10px"
        v-model="year"
        value-format="yyyy"
        type="year"
        placeholder="选择年份"
        @change="yearChange()"
      >
      </el-date-picker>
      <div id="chart2" style="height: 80%; width: "></div>
    </div>
  </div>
</template>
<script>
import DoubleCreation from "@/json/DoubleCreation";
import echarts from "echarts";
import { chartSign, chartYear } from "@/api/graduate_students/signingRate";
export default {
  name: "chart",
  created() {},
  mounted() {
    this.initChart();
  },
  data() {
    return {
      DoubleCreation: DoubleCreation,
      className: "",
      year: "",
      yearArr: [],
      chartData1: [],
      chart: null,
      chart2: null,
      chart3: null,
    };
  },
  beforeDestroy() {
    if (!this.chart && !this.chart2 && !this.chart3) {
      return;
    }
    this.chart.dispose();
    this.chart2.dispose();
    this.chart3.dispose();
  },
  methods: {
    initChart() {
      chartSign(this.className)
        .then((res) => {
          this.chartData1 = [];
          console.log(res.data, "res");
          for (let i = 0; i < res.data.length; i++) {
            this.chartData1.push({
              value: res.data[i].proportion,
              name: res.data[i].content,
            });
          }
          // console.log("data1", this.chartData1);
          this.chart = echarts.init(document.getElementById("chart"));
          let option = {
            backgroundColor: "#BBFFFF",
            color: [
              "#3682e1",
              "#35d789",
              "#9dcfd8",
              "#ba5879",
              "#d3da1d",
              "#21f1ef",
            ],
            series: [
              {
                type: "pie",
                data: this.chartData1,
                radius: "50%",
              },
            ],
          };
          this.chart.setOption(option);
        })
        .catch((err) => {});

      chartYear(this.year)
        .then((res) => {
          console.log("年度", res.data);
          let year1 = res.data[0].year;
          let noEmploy = [];
          let sign = [];
          let noUnEmploy = [];
          let flexible = [];
          console.log(year1);
          this.yearArr = [year1 - 2, year1 - 1, year1];
          res.data.forEach((item) => {
            if (item.content == "未就业") {
              noEmploy.push(item.proportion);
            } else if (item.content == "签约") {
              sign.push(item.proportion);
            } else if (item.content == "非失业") {
              noUnEmploy.push(item.proportion);
            } else {
              flexible.push(item.proportion);
            }
          });

          this.chart2 = echarts.init(document.getElementById("chart2"));
          let option2 = {
            backgroundColor: "#BBFFFF",
            color: [
              "#3682e1",
              "#35d789",
              "#9dcfd8",
              "#ba5879",
              "#d3da1d",
              "#21f1ef",
            ],
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["未就业", "签约", "非失业", "灵活就业"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: this.yearArr,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "未就业",
                type: "line",
                // stack: "Total",
                data:noEmploy,
              },
              {
                name: "签约",
                type: "line",
                // stack: "Total",
                data: sign,
              },
              {
                name: "非失业",
                type: "line",
                // stack: "Total",
                data: noUnEmploy,
              },
              {
                name: "灵活就业",
                type: "line",
                // stack: "Total",
                data: flexible,
              },
            ],
          };
          this.chart2.setOption(option2);
        })
        .catch((err) => {});
    },
    yearChange() {
      if (!this.chart2) {
        return;
      }
      this.chart2.dispose();
      this.initChart();
    },
    classChange() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();

      this.initChart();
    },
  },
};
</script>

<style>
.content {
  display: flex;
  margin: 10px;
  justify-content: space-around;
  /* flex-wrap: wrap; */
}
h2 {
  color: #235761;
  color: #36565c;
  text-align: center;
}
</style>
