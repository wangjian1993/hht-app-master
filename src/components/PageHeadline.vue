<template>
	<div class="content">
		<div class="content-head" v-for="item in list">
			<div class="headline-img"><img :src="item.columnPic" alt="" /></div>
			<div class="headline-text">
				<p class="van-ellipsis">{{ item.name }}</p>
				<p class="van-multi-ellipsis--l3">{{ item.name }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			list: []
		};
	},
	created() {
		this.list = this.data.resList;
		console.log('一个数据', this.list);
	},
	components: {}
};
</script>

<style lang="less" scoped>
.content-head {
	width: 345px;
	margin: 0 auto;
	// margin-top: -113px;
	.headline-img {
		width: 345px;
		height: 160px;
		border-radius: 8px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
	.headline-text {
		p {
			&:nth-of-type(1) {
				font-family: SourceHanSansCN-Medium;
				font-size: 17px;
				color: rgba(0, 0, 0, 0.8);
				margin-top: 16px;
			}
			&:nth-of-type(2) {
				font-family: SourceHanSansCN-Normal;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.4);
				margin-top: 5px;
			}
		}
	}
}
</style>
