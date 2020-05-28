<template>
	<div class="app">
		<van-tabs @click="tabClick">
			<van-tab v-for="(item, index) in data" :title="item.name">
				<div class="list-content">
					<p class="list-content-title" @click="EbbinghausClick">
						艾宾浩斯曲线学习计划
						<img src="../assets/image/course/icon_study@2x.png" alt="" />
					</p>
					<div class="list-box">
						<ul v-for="(titleItem, index) in tabData.classHours">
							<div class="list-item-title">
								<span>第{{ titleItem.index }}课时</span>
								<span>新学一首</span>
							</div>
							<li v-for="listItem in titleItem.audios">
								<p class="item-name">{{ listItem.name }}</p>
								<div class="item-time">
									<p>{{ timeCycle(listItem.timeLength) }}</p>
								</div>
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
	props: {
		data: ''
	},
	data() {
		return {
			tabData: []
		};
	},
	created() {
		this.tabData = this.data[0];
	},
	methods: {
		tabClick(index, title) {
			this.$toast.loading({
				message: '加载中...',
				forbidClick: true
			});
			this.tabData = this.data[index];
		},
		timeCycle(val) {
			var h = Math.floor(val / 3600);
			var m = Math.floor((val / 60) % 60) >= 10 ? Math.floor((val / 60) % 60) : '0' + Math.floor((val / 60) % 60);
			var s = Math.floor(val % 60) >= 10 ? Math.floor(val % 60) : '0' + Math.floor(val % 60);
			var format = Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s;
			return format;
		},
		EbbinghausClick() {
			this.$dialog
				.alert({
					title: '什么是艾宾浩斯曲线',
					message:
						'描述了人类大脑对新事物遗忘的规律。人体大脑对新事物遗忘的循序渐进的直观描述，人们可以从遗忘曲线中掌握遗忘规律并加以利用，从而提升自我记忆能力。课程根据大脑的遗忘曲线规律安排学习新课程和复习课程。',
					confirmButtonText: '我知道了'
				})
				.then(() => {
					// on close
				});
		}
	},
	components: {}
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
		img {
			width: 14px;
			height: 14px;
		}
	}
	.list-box {
		width: 345px;
		background-color: #ffffff;
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
