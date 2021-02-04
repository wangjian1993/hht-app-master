<template>
	<div class="loadingding center"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {
		this.$axios
			.userLogin()
			.then(res => {
				localStorage.setItem("token",res.data.data)
				// this.$router.push({ path: '/', query: { type: 1 } });
			})
			.catch(err => {
				console.log(err);
			});
	},
	components: {}
};
</script>

<style lang="less" scoped></style>
