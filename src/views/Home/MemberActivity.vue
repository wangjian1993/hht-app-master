<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="activity-list">
				<div class="activity-list-item" v-for="item in activeActivityList" @click="activityRouter(item.links)">
					<div class="item-img"><img :src="item.coverImage" alt="" /></div>
					<p>{{ item.name }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLoading: false,
			activityList: []
		};
	},
	computed: {
		activeActivityList: function() {
			return this.activityList.filter(function(item, index) {
				if(item.activityStateStr == "进行中"){
					return item;
				}
			});
		}
	},
	created() {
		this.getVipActivity();
	},
	methods: {
		activityRouter(url) {
			location.href = url;
		},
		getVipActivity() {
			let self =this;
			this.$axios
				.getVipActivity()
				.then(res => {
					this.activityList = res.data.data.list;
					setTimeout(function() {
						self.isLoading = true;
					}, 500);
				})
				.catch(err => {});
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.activity-list {
	width: 95%;
	margin: 0 auto;
	.activity-list-item {
		width: 100%;
		margin: 20px 0;
		.item-img {
			width: 100%;
			height: 152px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}
		p {
			font-size: 14px;
			color: #000000;
			opacity: 0.8;
			padding: 10px 0;
		}
	}
}
</style>
