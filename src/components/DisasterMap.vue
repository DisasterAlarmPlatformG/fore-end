<template>
  <!-- <div>
    <div>
      <el-card class="box-card">
        <img src="../assets/img/code.png" class="image" />
      </el-card>
    </div>
  </div> -->
  <div
    ref="myChart"
    id="myChart"
    :style="{ width: '1000px', height: '600px' }"
  ></div>

</template>

<script>
import { getCurrentInstance, ref, onMounted,reactive } from "vue";
import { fetchChina } from "../api/index";
export default {
  setup() {
    const temp = reactive({
      name:"衡水",
      position:[115.6754061376161, 37.745191408077424],
      desc:"发生地震"
    });

    const dealWithData = () => {
      var geoCoordMap = {
        衡水: [115.6754061376161, 37.745191408077424],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
      };
      var data = [];
      for (var key in geoCoordMap) {
        console.log(geoCoordMap[key]);
        data.push({ name: key, value: geoCoordMap[key], desc: "发生地震" });
      }
      return data;
    };

    const ChangeData = (OneDis) => {
      var data = [];
      data.push({
        name: OneDis.name,
        value: OneDis.position,
        desc: OneDis.desc,
      });

      var option_ = {
        series: [
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: data,
            symbolSize: 15,
            tooltip: {
              formatter(value) {
                return value.data.name + "<br/>" + "描述：" + value.data.desc;
              },
              show: true,
            },
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              color: "#0efacc",
              period: 9,
              scale: 5,
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#0efacc",
              shadowBlur: 2,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      };
      myChart.setOption(option_);
    };

    let internalInstance = getCurrentInstance();
    let echarts = internalInstance.appContext.config.globalProperties.$echarts;
    var dom;
    var myChart;
    onMounted(() => {
      // const dom = document.getElementById("myChart");
      // const myChart = echarts.init(dom); // 初始化echarts实例
      dom = document.getElementById("myChart");
      myChart = echarts.init(dom);
      fetchChina()
        .then((res) => {
          let china = res;
          echarts.registerMap("echina", china);
          const option = {
            title: {
              text: "灾情显示",
              subtext: "Data from Wikipedia",
            },
            tooltip: {
              show: false,
            },
            geo: {
              //中国地图设置
              map: "echina",
              scaleLimit: {
                min: 1,
                max: 2,
              },
              zoom: 1.5,
              top: 140,
              x: "center",
              //y: "bottom",
              label: {
                normal: {
                  show: false,
                  fontSize: "10",
                  color: "rgba(0,0,0,0.7)",
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                emphasis: {
                  areaColor: "#f2d5ad",
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  borderWidth: 0,
                },
              },
            },
            series: [
              {
                name: "突发事件",
                type: "map",
                geoIndex: 0,
                data: [],
              },
            ],
          };

          // 设置实例参数
          myChart.setOption(option);

          // var dataValue = dealWithData();
          // var data1 = dataValue.splice(0, 6);
          // var option_ = {
          //   series: [
          //     {
          //       name: "Top 5",
          //       type: "effectScatter",
          //       coordinateSystem: "geo",
          //       data: data1,
          //       symbolSize: 15,
          //       tooltip: {
          //         formatter(value) {
          //           return (
          //             value.data.name + "<br/>" + "描述：" + value.data.desc
          //           );
          //         },
          //         show: true,
          //       },
          //       encode: {
          //         value: 2,
          //       },
          //       showEffectOn: "render",
          //       rippleEffect: {
          //         brushType: "stroke",
          //         color: "#0efacc",
          //         period: 9,
          //         scale: 5,
          //       },
          //       hoverAnimation: true,
          //       label: {
          //         formatter: "{b}",
          //         position: "right",
          //         show: true,
          //       },
          //       itemStyle: {
          //         color: "#0efacc",
          //         shadowBlur: 2,
          //         shadowColor: "#333",
          //       },
          //       zlevel: 1,
          //     },
          //   ],
          // };

          // myChart.setOption(option_);
        })
        .catch((res) => {
          console.log("error");
        });
    });
    return {
      ChangeData,
      temp,
    };
  },
};
</script>

<style>
</style>