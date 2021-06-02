<template>
	<div class="content">
		<div class="comment-list">
			<div class="list" v-for="(item, index) in list" :key="index">
				<div class="list-text">
					<div class="list-img">
						<img :src="setAvatar(item.avatar)" />
						<p class="list-text-name">{{ item.name }}</p>
					</div>
					<p class="list-text-time">{{ item.time }}</p>
				</div>
				<div class="list-text-content">{{ item.comment }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: ''
	},
	data() {
		return {};
	},
	created() {
		console.log('content===', this.list);
	},
	methods: {
		setAvatar(img) {
			return 'https://resource.alilo.com.cn/static/img/xyj/avatar/' + img;
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.comment-list {
	width: 345px;
	margin: 0 auto;
	margin-top: 23px;
	.list {
		width: 100%;
		padding-bottom: 40px;
		.list-text {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.list-img {
				display: flex;
				align-items: center;
				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
				.list-text-name {
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: #fff;
					opacity: 0.8;
					padding-left: 8px;
				}
			}
			.list-text-time {
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(255, 255, 255, 0.5); 
			}
		}
		.list-text-content {
			padding-top: 16px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #fff;
			line-height: 1.4;
		}
	}
}
</style>
