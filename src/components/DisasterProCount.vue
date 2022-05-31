<template>
  <div>
  </div>
  <div
    class="echart"
    id="myChart"
    :style="{ float: 'center', width: '100%', height: '400px' }"
  ></div>
</template>

<script>
import { getCurrentInstance, ref, onMounted, reactive } from "vue";
import { CountDisProvince } from "../api/index";
export default {
  setup() {
    const temp = reactive({
      name: "衡水",
      position: [115.6754061376161, 37.745191408077424],
      desc: "发生地震",
    });

    let internalInstance = getCurrentInstance();
    let echarts = internalInstance.appContext.config.globalProperties.$echarts;
    var dom;
    var myChart;

    onMounted(() => {
      dom = document.getElementById("myChart");
      myChart = echarts.init(dom);
      CountDisProvince()
        .then((res) => {
          console.log(res);

          var list = res.data;

          var prodata = [];

          for (let i in list) {
            console.log(list[i].location_province);
            console.log(list[i].disaster_num);
            prodata.push({
              name: list[i].location_province,
              value: list[i].disaster_num,
            });
          }

          const option = {

            title: {
              // 设置饼图标题，位置设为顶部居中
              text: "各省灾情数据对比",
              top: "0%",
              left: "center",
            },

            series: [
              {
                type: "pie", // type设置为饼图
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)", // b代表名称，c代表对应值，d代表百分比
                },
                data: prodata,
              },
            ],
          };

          myChart.setOption(option);
        })

        .catch((res) => {
          console.log("error");
        });
    });
    return {};
  },
};
</script>