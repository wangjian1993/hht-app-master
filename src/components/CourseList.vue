<template>
	<div class="app">
		<div class="list">
			<ul>
				<li v-for="(item, index) in courseData" :key="item.id">
					<div class="list-name">
						<p>
							{{ item.name }}
							<span v-if="item.status == 20">已完成</span>
						</p>
						<p>
							共
							<span>{{ item.classHourCount }}</span>
							课时 |
							<span>{{ item.avgDuration }}</span>
							分钟
						</p>
					</div>
					<div class="list-btn" @click=""><span>上课</span></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		courseData: ''
	},
	data() {
		return {};
	},
	methods:{
		
	},
	components: {}
};
</script>

<style lang="less" scoped>
.list {
	width: 100%;
	box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
	border-radius: 8px;
	padding: 10px 0;
	ul {
		width: 325px;
		margin: 0 auto;
		li {
			padding: 10px 0;
			display: flex;
			align-items: center;
			.list-name {
				p {
					&:nth-of-type(1) {
						font-size: 16px;
						color: rgba(0, 0, 0, 0.8);
						span {
							font-size: 12px;
							color: #26b8ef;
							padding-left: 10px;
						}
					}
					&:nth-of-type(2) {
						font-size: 13px;
						color: rgba(0, 0, 0, 0.5);
					}
				}
			}
			.list-btn {
				margin-left: auto;
				width: 67px;
				height: 26px;
				border-radius: 13px;
				border: solid 1px #ff985b;
				font-size: 15px;
				color: #ff985b;
				text-align: center;
			}
		}
	}
}
</style>
