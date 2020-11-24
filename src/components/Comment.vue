<template>
	<div class="content">
		<div class="comment-list">
			<div class="list" v-for="(item, index) in list" :key="index">
				<div class="list-img"><img :src="setAvatar(item.avatar)" /></div>
				<div class="list-text">
					<p class="list-text-name">
						<span>{{ item.name }}</span>
						<span>{{ item.time }}</span>
					</p>
					<div class="list-text-content">{{ item.comment }}</div>
				</div>
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
		display: flex;
		padding-bottom: 40px;
		.list-img {
			width: 15%;
			height: 100%;
			img {
				width: 32px;
				height: 32px;
				border-radius: 50%;
			}
		}
		.list-text {
			width: 85%;
			.list-text-name {
				font-family: SourceHanSansCN-Normal;
				font-size: 16px;
				color: #000000;
				opacity: 0.8;
				span {
					padding-right: 10px;
				}
			}
			.list-text-content {
				padding-top: 16px;
				font-family: SourceHanSansCN-Normal;
				font-size: 16px;
				color: #000000;
				line-height: 1.2;
			}
		}
	}
}
</style>
