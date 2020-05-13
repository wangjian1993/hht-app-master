<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<van-tabs animated v-model="active">
				<van-tab v-for="(item, index) in equityList" :title="item.name"><v-content :id="item.id"></v-content></van-tab>
			</van-tabs>
		</div>
	</div>
</template>
<script>
import Content from '@/components/EquityContent.vue';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			isLoading: false,
			active: 0
		};
	},
	computed: {
		...mapState(['equityList'])
	},
	created() {
		// this.getVipHelp();
		this.isLoading = true;
	},
	activated: function() {
		this.active = this.$route.query.id;
	},
	methods: {
		ToText(HTML) {
			var input = HTML;
			return input
				.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
				.replace(/<[^>]+?>/g, '')
				.replace(/\s+/g, ' ')
				.replace(/ /g, ' ')
				.replace(/>/g, ' ');
		}
	},
	components: {
		'v-content': Content
	}
};
</script>

<style lang="less" scoped></style>
