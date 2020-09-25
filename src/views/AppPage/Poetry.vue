<template>
	<div :class="system == 'ios'?'appcontent':'content'"><component v-for="item in pageList" :is="setComponent(item)" :componentData="item"></component></div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import debug from '@/components/debug.vue';
import PageBanner from '@/components/PageBanner.vue';
import PageContent from '@/components/PageContent.vue';
export default {
	data() {
		return {
			pageList: [],
			com: PageBanner
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.getAppPage();
	},
	methods: {
		setComponent(item) {
			switch (item.type) {
				case 10:
					return 'PageContent';
				case 40:
					return 'PageContent';
					break;
				case 70:
					return 'PageBanner';
					break;
				default:
					break;
			}
		},
		setComponentData(item) {
			switch (item.type) {
				case 10:
					return item;
					break;
				case 70:
					return item;
					break;
				default:
					break;
			}
		},
		getAppPage() {
			let data = {
				pageId: 85,
				channelId: 65
			};
			this.$axios
				.getAppPage(data)
				.then(res => {
					if (res.data.code == 1) {
						this.pageList = res.data.data.activityVoList;
					} else {
						this.$toast.fail(res.data.info);
					}
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		}
	},
	components: {
		debug,
		PageBanner,
		PageContent
	}
};
</script>

<style lang="less" scoped>
.appcontent{
	padding-bottom: 140px;
	background: #62b045;
}
.content{
	background: #62b045;
}
</style>
