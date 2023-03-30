<template>
  <div style="" class="content">
    <div style="height: 400px; width: 25%">
      <h2>就业占比图</h2>
      <div id="chart" style="height: 80%; width: "></div>
    </div>
    <div style="height: 400px; width: 25%">
      <h2>就业城市占比图</h2>
      <div id="chart2" style="height: 80%; width: "></div>
    </div>
    <div style="height: 400px; width: 25%">
      <h2>薪酬占比图</h2>
      <div id="chart3" style="height: 80%; width: "></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import {
  chartAll,
  chartCity,
  chartPay,
} from "@/api/graduate_students/employment";
export default {
  name: "chart",
  created() {},
  mounted() {
    this.initChart();
  },
  data() {
    return {
      chartData1: [],
      chartData3: [],
      chartData2x: [],
      chartData2y: [],
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
      chartAll()
        .then((res) => {
          let keys = Object.keys(res.data);
          let length = keys.length;
          // console.log(keys, "键");
          for (let i = 0; i < length; i++) {
            this.chartData1.push({
              value: res.data[keys[i]],
              name: keys[i],
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

      chartCity()
        .then((res) => {
          let keys = Object.keys(res.data);
          let length = keys.length;
          // console.log(keys, "键");
          // console.log(length, "len");
          for (let i = 0; i < length; i++) {
            this.chartData2x.push(keys[i]);
            this.chartData2y.push(res.data[keys[i]]);
          }
          // console.log("data2x", this.chartData2x);
          // console.log("data2y", this.chartData2y);

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
            xAxis: {
              data: this.chartData2x,
            },
            yAxis: {},
            series: [
              {
                type: "bar",
                data: this.chartData2y,
              },
            ],
          };
          this.chart2.setOption(option2);
        })
        .catch((err) => {});

      chartPay()
        .then((res) => {
          let keys = Object.keys(res.data);
          let length = keys.length;
          for (let i = 0; i < length; i++) {
            this.chartData3.push({
              value: res.data[keys[i]],
              name: keys[i],
            });
          }

          this.chart3 = echarts.init(document.getElementById("chart3"));
          let option3 = {
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
                data: this.chartData3,
                radius: "50%",
              },
            ],
          };

          this.chart3.setOption(option3);
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
.content {
  display: flex;
  margin: 10px;
  justify-content: space-around;
  flex-wrap: wrap;
}
h2 {
  color: #36565c;
  text-align: center;
}
</style>
