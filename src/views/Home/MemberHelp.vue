<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<van-collapse v-model="activeName" accordion>
				<!-- <van-collapse-item title="购买VIP年卡后如何领取早教机赠品？" name="1" :border="false">
					<div @click="navigite('https://j.youzan.com/9Fm9NM')"  style="color: #0088CC;">点此查看VIP年卡激活状态和领取早教机赠品</div>
				</van-collapse-item> -->
				<van-collapse-item v-for="(item, index) in helpList" :key="index" :title="item.name" :name="index + 1"><div v-html="item.content"></div></van-collapse-item>
			</van-collapse>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
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
	computed: {
		...mapState(['system'])
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
		navigite(url) {
			try {
				let data = {
					url: url
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.web_navigite.postMessage(data);
				} else {
					window.android.playCourse('web_navigite', JSON.stringify(data));
				}
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				//TODO handle the exception
			}
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
