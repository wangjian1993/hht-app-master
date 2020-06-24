<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<van-collapse v-model="activeName" accordion>
				<van-collapse-item v-for="(item, index) in helpList" :key="index" :title="item.name" :name="index"><div v-html="item.content"></div></van-collapse-item>
			</van-collapse>
		</div>
	</div>
</template>

<script>
// import collapse from 'vant/lib/collapse';
// import collapseItem from 'vant/lib/collapse-item';
// import 'vant/lib/collapse/style';
// import 'vant/lib/collapse-item/style';
export default {
	data() {
		return {
			isLoading: false,
			helpList: [],
			activeName: '0'
		};
	},
	created() {
		this.getVipHelp();
	},
	methods: {
		getVipHelp() {
			let self = this;
			this.$axios
				.getUserHelp()
				.then(res => {
					this.helpList = res.data.data.list;
					setTimeout(function() {
						self.isLoading = true;
					}, 500);
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		},
		ToText(HTML) {
			var input = HTML;
			return input
				.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
				.replace(/<\/?(img)[^>]*>/gi, '')
				.replace(/<[^>]+?>/g, '')
				.replace(/\s+/g, ' ')
				.replace(/ /g, ' ')
				.replace(/>/g, ' ');
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.content {
	width: 345px;
	margin: 0 auto;
}
</style>
