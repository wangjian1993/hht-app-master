<template>
	<div class="app"><van-nav-bar class="iphonex-pt app-header" :title="title" left-arrow @click-left="onClickLeft" /></div>
</template>

<script>
export default {
	props:{
		title:null
	},
	data() {
		return {};
	},
	methods: {
		onClickLeft() {
			// Toast('返回');
			this.$router.go(-1); //返回上一层
		},
		onClickRight() {
			// Toast('按钮');
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.app-header{
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	/* 因为header导航栏是基于屏幕进行定位，所以要做单独的padding挤压处理 */
	padding-right: constant(safe-area-inset-right);
	padding-left: constant(safe-area-inset-left);
	padding-right: env(safe-area-inset-right);
	padding-left: env(safe-area-inset-left);
}
</style>
