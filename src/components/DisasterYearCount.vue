<template>
	<div>
		<div>
			<el-button type="text">不同年份的灾害的总数</el-button>
		</div>
		<div class="chartLine_wrap">
			<div id="yourChart" :style="{ width: '100%', height: '438px' }"></div>
		</div>
	</div>

</template>
<script>
import { ref, reactive } from "vue";
import * as echarts from "echarts";
import { AllDisasterCount } from "../api/index";
import { CountDisProvince, categoryDisasterCount, CountDis } from "../api/index";

// require("echarts/theme/macarons"); //引入主题
export default {
	name: "hello",


	data() {
		return {
			a: [],
			// b: [],
			// c: [],
			date: [],
		};

	},
	mounted() {
		this.getData();
		// this.searchData();
	},
	methods: {
		getData() {
			AllDisasterCount().then((res) => {
				// console.log(res);
				var yeardata = res.data;
				// console.log(yeardata);
				this.date = yeardata.map((i) => {
					return i.year;
				});
				this.a = yeardata.map((i) => {
					return i.disaster_num;
				});
				// this.b = data.map((i) => {
				// 	return i.b;
				// });
				// this.c = data.map((i) => {
				// 	return i.c;
				// });
				this.drawLine(); //折线图
			})
			let data = [
				{ year: "2020-10", a: "2" },
				{ year: "2020-11", a: "2" },
				{ year: "2020-12", a: "4" },
				{ year: "2021-01", a: "8" },
				{ year: "2021-02", a: "4" },
				{ year: "2021-03", a: "23" },
				{ year: "2021-04", a: "10" },
				{ year: "2021-05", a: "3" },
				{ year: "2021-06", a: "22" },
				{ year: "2021-07", a: "5" },
				{ year: "2021-08", a: "9" },
				{ year: "2021-09", a: "7" },
			];


			this.date = data.map((i) => {
				return i.year;
			});
			this.a = data.map((i) => {
				return i.a;
			});
			// this.b = data.map((i) => {
			// 	return i.b;
			// });
			// this.c = data.map((i) => {
			// 	return i.c;
			// });
			this.drawLine(); //折线图
			// CountDisProvince().then((res) => {
			// 	console.log(res);
			// })
			// categoryDisasterCount().then((res) => {
			// 	console.log(res);
			// })
			// CountDis().then((res) => {
			// 	console.log(res);
			// })
		},
		searchData() {
			this.getData();
			//这里写的是假数据，实际应该是调接口，本文主要是样式的实现，这里就不写啦~
			let data = [
				{ year: "2020-10", a: "2" },
				{ year: "2020-11", a: "2" },
				{ year: "2020-12", a: "4" },
				{ year: "2021-01", a: "8" },
				{ year: "2021-02", a: "4" },
				{ year: "2021-03", a: "23" },
				{ year: "2021-04", a: "10" },
				{ year: "2021-05", a: "3" },
				{ year: "2021-06", a: "22" },
				{ year: "2021-07", a: "5" },
				{ year: "2021-08", a: "9" },
				{ year: "2021-09", a: "7" },
			];

			this.date = data.map((i) => {
				return i.year;
			});
			this.a = data.map((i) => {
				return i.a;
			});
			// this.b = data.map((i) => {
			// 	return i.b;
			// });
			// this.c = data.map((i) => {
			// 	return i.c;
			// });
			this.drawLine(); //折线图
		},
		drawLine() {
			// 基于准备好的dom，初始化echarts实例
			let yourChart = this.$echarts.init(document.getElementById("yourChart"));
			// 绘制图表
			yourChart.setOption({
				title: {
					text: "",
					top: "30",
					left: "32",
					textStyle: {
						fontSize: 16, //字体大小
						color: "#333", //字体颜色
						fontWeight: "500",
					},
				},
				tooltip: {
					//触发类型：坐标轴触发
					trigger: "none", //触发类型  'item'图形触发：散点图，饼图等无类目轴的图表中使用； 'axis'坐标轴触发；'none'：什么都不触发。
					axisPointer: {
						type: "line", //默认为line，line直线，cross十字准星，shadow阴影
						lineStyle: {
							type: "dashed",
							color: "#808BA9",
						},
					},
					backgroundColor: "#fff", //也可以通过设置rgba调节背景颜色与透明度
					color: "#333",
					borderWidth: "1",
					borderColor: "#D9E1F8",
					textStyle: {
						color: "#333",
						fontSize: "12",
						lineHeight: "17",
					},
					formatter: function (arg) {
						// 自定义提示
						return (
							arg[0].name +
							"<br>" +
							'<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
							arg[0].color +
							';"></span>' +
							arg[0].seriesName +
							'<span style="margin-left:10px;">' +
							arg[0].data +
							"</span>" +
							"<br>" +
							'<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
							arg[1].color +
							';"></span>' +
							arg[1].seriesName +
							'<span style="margin-left:10px;">' +
							arg[1].data +
							"</span>" +
							"<br>" +
							'<span style="margin:0 5px 2px 0;display:inline-block;width:6px;height:6px;border-radius:5px;background-color:' +
							arg[2].color +
							';"></span>' +
							arg[2].seriesName +
							'<span style="margin-left:10px;">' +
							arg[2].data +
							"</span>"
						);
					},
				},
				legend: {
					icon: "circle",
					itemHeight: 10, //修改icon图形大小
					textStyle: {
						fontSize: 14,
						color: "#333",
					},
					x: "left", //可设定图例在左、右、居中
					y: "top", //可设定图例在上、下、居中
					padding: [81, 0, 0, 32], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
				},
				grid: {
					top: "145",
					left: "17",
					right: "17",
					bottom: "41",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: this.date,
					//使坐标轴刻度与标签对齐
					axisTick: {
						alignWithLabel: true,
					},
					axisLine: {
						// 改变x轴颜色
						lineStyle: {
							// color: "#D9E1F8",
							color: "#666",
							width: "1",
						},
					},
					axisLabel: {
						// 改变x轴字体颜色和大小
						formatter(val) {
							return "{a|" + `${val}` + "}";
						},
						rich: {
							a: {
								height: 40, // 设置字体行高
								color: "#666",
								fontSize: 14,
							},
						},
					},
				},
				yAxis: {
					type: "value",
					axisLine: {
						show: true, //y轴线消失
					},
					axisTick: {
						show: false, //y轴坐标点消失
					},
					boundaryGap: [0, 0], //有负数设置这个
					splitLine: {
						show: true,
						lineStyle: {
							type: "dashed",
							color: "#D9E1F8",
						},
					},
					axisLabel: {
						textStyle: {
							fontSize: 14,
							color: "#92A5E3",
						},
					},
				},
				series: [
					{
						name: "灾害数量",
						type: "line", //bar:柱状 line:折线图
						data: this.a,
						color: "#00C5AB",
						// symbol: "circle", //折线点设置为实心点
						symbolSize: 8, //折线点的大小
					},
					// {
					// 	name: "海啸",
					// 	type: "line",
					// 	data: this.b,
					// 	color: "#3F53FF",
					// 	symbolSize: 8, //折线点的大小
					// },
					// {
					// 	name: "台风",
					// 	type: "line",
					// 	data: this.c,
					// 	color: "#8DF3E8",
					// 	symbolSize: 8, //折线点的大小
					// },
				],
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.chartLine_wrap {
	width: auto;
	height: 438px;
	background: #fff;
}
</style>
