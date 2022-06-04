<template>
<div>
	<el-button type="text">不同灾害类别的灾害总数</el-button>
	 <div class="echart" id="chart" :style="{  width: '60%', height: '400px' }"
  ></div>
</div>
</template>
 <script>
import { getCurrentInstance, ref, onMounted, reactive } from "vue";
import { categoryDisasterCount } from "../api/index";
export default {
  setup() {
    // const temp = reactive({
    //   name: "衡水",
    //   position: [115.6754061376161, 37.745191408077424],
    //   desc: "发生地震",
    // });

    let internalInstance = getCurrentInstance();
    let echarts = internalInstance.appContext.config.globalProperties.$echarts;
    var dom;
    var chart;

    onMounted(() => {
      dom = document.getElementById("chart");
      chart = echarts.init(dom);

      categoryDisasterCount()
        .then((res) => {

          console.log(res);

          var list = res.data;

          var prodata = [];

          for (let i in list) {
            console.log(list[i].disaster_main);
            console.log(list[i].disaster_num);
            prodata.push({
              name: list[i].disaster_main,
              value: list[i].disaster_num,
            });
          }

          const option = {

            title: {
              text: "不同类别灾害的灾情数据对比",
			  left: "center",
            },
           
		    xAxis:{
				  data: ['震情', '生命线工程灾情', '次生灾害', '房屋', '伤亡']
			},
			yAxis:{
				
			},
            series: [
              {
                type: "bar", // type设置为柱状图
				barWidth: '50%',               
                data: prodata,

				 barGap: "10%", // 两个柱子之间的距离相对于柱条宽度的百分比;
                 barCategoryGap: "40%", // 每侧空余的距离相对于柱条宽度的百分比

				itemStyle:{
					 barWidth:"50%",
					 borderColor: "#73c0de",
                     shadowColor: "#5470c6",
                     shadowBlur: 10
				}
              },
            ],
          };

          chart.setOption(option);
        })

        .catch((res) => {
          console.log("error");
        });
    });
    return {};
  },
};
 </script>
 <style>
 /* .echart{
	 
	 position:relative;
	 margin-left: 30%;
 } */
 /* .chart{
 
	 position:relative;
	 margin-left: 30%;
 } */
 </style>
