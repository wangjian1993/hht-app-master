<template>
	<div>
		<div class="pie">
			<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
			<div id="main1" style="width:100%;height: 252px"></div>
		</div>
	</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入饼状图组件
require('echarts/lib/chart/radar');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
export default {
	props: {
		radarList: {
			type: Array
		},
		radarNuber: {
			type: Array
		},
	},
	data() {
		return {};
	},
	created() {
	},
	mounted() {
		this.initData(this.radarNuber,this.radarList);
	},
	methods: {
		//初始化数据
		initData(data,array) {
			let self =this;
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main1'));

			myChart.setOption({
				backgroundColor: '#fff',
				color: ['#ff9000','#0091ff','#c06501','#78c626','#ff6100','#3b669a','#ff9000','#0091ff'],
				tooltip: {
					trigger: 'item'
				},
				radar: {
					name: {
						textStyle: {
							color: '#ff9000',
							fontSize: 15
						}
					},
					splitLine: {
						lineStyle: {
							color: array.reverse()
						}
					},
					splitArea: {
						show: false
					},
					axisLine: {
						lineStyle: {
							// color: 'rgba(86,130,245,0.2)'
						}
					},
					triggerEvent: true,
					indicator: [
						{ name: '语言', max: 100 },
						{ name: '逻辑', max: 100 },
						{ name: '空间', max: 100 },
						{ name: '运动', max: 100 },
						{ name: '音乐', max: 100 },
						{ name: '人际', max: 100 },
						{ name: '自然', max: 100 },
						{ name: '内省', max: 100 }
					],
					radius: '70%'
				},
				series: [
					{
						type: 'radar',
						areaStyle: {
							normal: {
								color: '#ffcece'
							}
						},
						label: {
							normal: {
								show: true,
								textStyle: {
									color: '#ff6666',
									fontSize: 12
								}
							}
						},
						data: data
					}
				]
			});
		}
	}
};
</script>
