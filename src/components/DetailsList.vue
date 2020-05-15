<template>
	<div class="app">
		<van-tabs>
			<van-tab v-for="index in 8" :title="'标签 ' + index">
				<div class="list-content">
					<p class="list-content-title">艾宾浩斯曲线学习计划</p>
					<div class="list-box">
						<ul>
							<div class="list-item-title">
								<span>第一课时</span>
								<span>新学一首</span>
							</div>
							<li>
								<p class="item-name">One Little Finger</p>
								<div class="item-time"><p>One Little Finger</p></div>
							</li>
							<li>
								<p class="item-name">One Little Finger</p>
								<div class="item-time"><p>One Little Finger</p></div>
							</li>
							<li>
								<p class="item-name">One Little Finger</p>
								<div class="item-time"><p>One Little Finger</p></div>
							</li>
						</ul>
						<ul>
							<div class="list-item-title">
								<span>第二课时</span>
								<span>新学一首</span>
							</div>
							<li>
								<p class="item-name">One Little Finger</p>
								<div class="item-time"><p>One Little Finger</p></div>
							</li>
							<li>
								<p class="item-name">One Little Finger</p>
								<div class="item-time"><p>One Little Finger</p></div>
							</li>
							<li>
								<p class="item-name">One Little Finger</p>
								<div class="item-time"><p>One Little Finger</p></div>
							</li>
						</ul>
					</div>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {
		
	}
};
</script>

<style lang="less" scoped>
.list-content {
	width: 345px;
	margin: 0 auto;
	margin-top: 20px;
	.list-content-title {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.3);
		margin-bottom: 10px;
	}
	.list-box {
		width: 345px;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
		border-radius: 8px;
		margin: 0 auto;
		ul {
			width: 100%;
			padding: 18px 24px;
			border-bottom: 1px #f3f3f3 solid;
			.list-item-title {
				width: 100%;
				display: flex;
				align-items: center;
				span {
					&:nth-of-type(1) {
						font-size: 15px;
						color: rgba(0, 0, 0, 0.8);
					}
					&:nth-of-type(2) {
						font-size: 12px;
						color: rgba(0, 0, 0, 0.3);
						margin-left: auto;
					}
				}
			}
			li {
				margin-top: 19px;
				.item-name {
					font-size: 16px;
					color: rgba(0, 0, 0, 0.8);
				}
				.item-time {
					display: flex;
					p {
						font-size: 12px;
						color: rgba(0, 0, 0, 0.4);
					}
				}
			}
		}
	}
}
</style>
