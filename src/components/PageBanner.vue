<template>
	<div class="content">
		<div class="page-banner"><img :src="banner.coverImage" alt="" /></div>
	</div>
</template>

<script>
export default {
	props: {
		componentData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			banner: []
		};
	},
	created() {
		console.log('11111', this.componentData.resList);
		this.banner = this.componentData.resList[0];
	},
	components: {}
};
</script>

<style lang="less" scoped>
.page-banner {
	width: 375px;
	height: 268px;
	margin: 0 auto;
	img{
		width: 100%;
		height: 100%;
	}
}
</style>
