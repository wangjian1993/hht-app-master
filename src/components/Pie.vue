<template>
	<div>
		<div class="pie">
			<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
			<div id="main1" style="width:100%;height: 150px"></div>
		</div>
	</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入饼状图组件
require('echarts/lib/chart/pie');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
export default {
	data() {
		return {};
	},
	props: {
		pieData: {}
	},
	created() {},
	mounted() {
		this.initData();
	},
	methods: {
		//初始化数据
		initData() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main1'));
			console.log('pieData====', this.pieData);
			// var ydata = [
			// 	{
			// 		name: '财务 10%',
			// 		value: 10,
			// 		size: 10
			// 	},
			// 	{
			// 		name: '商品 10%',
			// 		value: 10,
			// 		size: 10
			// 	},
			// 	{
			// 		name: '暖心 10%',
			// 		value: 10,
			// 		size: 10
			// 	},
			// 	{
			// 		name: '嘉果 10%',
			// 		value: 10,
			// 		size: 10
			// 	},
			// 	{
			// 		name: '优雅 10%',
			// 		value: 10,
			// 		size: 10
			// 	},
			// 	{
			// 		name: '巧克 10%',
			// 		value: 25,
			// 		size: 25
			// 	},
			// 	{
			// 		name: '财税 10%',
			// 		value: 15,
			// 		size: 15
			// 	},
			// 	{
			// 		name: '成本 10%',
			// 		value: 10,
			// 		size: 10
			// 	}
			// ];
			var color = ['#ff6666', '#0091ff', '#c06501', '#78c626', '#ffc21c', '#81baff', '#17bb65', '#ff9000'];
			myChart.setOption({
				color: color,
				legend: {
					itemWidth: 8,
					itemHeight: 8,
					orient: 'vertical',
					right: '0',
					icon: 'circle'
					// data: ['财务', '商品', '暖心', '嘉果', '优雅', '财务', '巧克', '财税', '成本']
				},
				series: [
					{
						text: '合计',
						type: 'pie',
						clockwise: false, //饼图的扇区是否是顺时针排布
						minAngle: 2, //最小的扇区角度（0 ~ 360）
						radius: ['42%', '86%'],
						center: ['25%', '51%'],
						avoidLabelOverlap: false,
						itemStyle: {
							//图形样式
							normal: {
								borderColor: '#ffffff',
								borderWidth: 1
							}
						},
						label: {
							normal: {
								show: false,
								position: 'center',
								// formatter: '{text|{b}}\n{c} ({d}%)',
								rich: {
									text: {
										color: '#666',
										fontSize: 14,
										align: 'center',
										verticalAlign: 'middle',
										padding: 8
									},
									value: {
										color: '#8693F3',
										fontSize: 14,
										align: 'center',
										verticalAlign: 'middle'
									}
								}
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: 10
								}
							}
						},
						data: this.pieData
					}
				]
			});
			// myChart.setOption(option);
			// 绘制图表
			// myChart.setOption({
			// 	title: {
			// 		text: '某站点用户访问来源', //主标题
			// 		subtext: '纯属虚构', //副标题
			// 		x: 'center' //x轴方向对齐方式
			// 	},
			// 	tooltip: {
			// 		trigger: 'item',
			// 		formatter: '{a} <br/>{b} : {c} ({d}%)'
			// 	},
			// 	legend: {
			// 		orient: 'vertical',
			// 		bottom: 'bottom',
			// 		data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
			// 	},
			// 	series: [
			// 		{
			// 			name: '访问来源',
			// 			type: 'pie',
			// 			radius: '55%',
			// 			center: ['50%', '60%'],
			// 			data: [
			// 				{ value: 335, name: '直接访问' },
			// 				{ value: 310, name: '邮件营销' },
			// 				{ value: 234, name: '联盟广告' },
			// 				{ value: 135, name: '视频广告' },
			// 				{ value: 1548, name: '搜索引擎' }
			// 			],
			// 			itemStyle: {
			// 				emphasis: {
			// 					shadowBlur: 10,
			// 					shadowOffsetX: 0,
			// 					shadowColor: 'rgba(0, 0, 0, 0.5)'
			// 				}
			// 			}
			// 		}
			// 	]
			// });
		}
	}
};
</script>
