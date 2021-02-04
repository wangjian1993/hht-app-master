<template>
	<div class="original-content" :style="{ background: originalBg }">
		<div class="original-head-bg"><img :src="headImg" alt="" /></div>
		<div class="original-boby">
			<original-list @tabClick="tabClick" :originalBg="originalBg" :list="list" :musicList="musicList" :tabFont="tabFont"></original-list>
		</div>
		<div class="bot-content"></div>
	</div>
</template>

<script>
import OriginalList from '@/components/OriginalList.vue';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';	
export default {
	data() {
		return {
			list: [],
			tabFont: '',
			originalBg: '',
			headImg: 'https://resource.alilo.com.cn/static/img/original1.png',
			musicList: [],
			isMore: false
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.getAppPage();
	},
	methods: {
		tabClick(item, index) {
			this.tabFont = item.font;
			this.originalBg = item.bg;
			this.headImg = `https://resource.alilo.com.cn/static/img/original${index + 1}.png`;
			this.getDetail(item.resList[0].id);
			this.$toast.loading({
				message: '加载中...',
				forbidClick: true
			});
		},
		getUrlKey(name, url) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null;
		},
		getAppPage() {
			let data = {
				pageId: 91,
				channelId: 65
			};
			this.$axios
				.getAppPage(data)
				.then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data.activityVoList;
						this.list.forEach((item, index) => {
							let nameArray = item.name.split('?');
							item.font = '#' + this.getUrlKey('font', item.name);
							item.bg = '#' + this.getUrlKey('bg', item.name);
							item.title = nameArray[0];
						});
						this.tabFont = this.list[0].font;
						this.originalBg = this.list[0].bg;
						this.getDetail(this.list[0].resList[0].id);
					} else {
						this.$toast.fail(res.data.info);
					}
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		},
		getDetail(id) {
			let data = {
				audioGroupId: id,
				channelId: 65,
				pageNo: 1,
				pageSize: 10
			};
			this.$axios
				.getDetail(data)
				.then(res => {
					if (res.data.code == 1) {
						this.$toast.clear();
						this.musicList = res.data.data;
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
		OriginalList
	}
};
</script>

<style lang="less" scoped>
.ios-content {
	position: absolute;
	width: 100%;
	padding-bottom: 144px;
}
.bot-content{
	width: 375px;
	height: 144px;
	background: transparent;
}
.original-content {
	position: absolute;
}
.original-head-bg {
	width: 10rem;
	height: 4.64rem;
	margin: 0 auto;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
