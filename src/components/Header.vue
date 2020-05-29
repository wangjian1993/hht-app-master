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
}
</style>
