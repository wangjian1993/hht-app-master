<template>
	<div class="content">
		<div class="page-banner"><img :src="banner.coverImage" alt="" /></div>
		<!-- <div class="lock-video" @click="lockVideo()">
			<img src="../assets/image/play.png" alt="" />
			<p>观看视频</p>
		</div> -->
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	props: {
		componentData: {
			type: Object,
			default: () => {}
		}
	},
	computed: {
		...mapState(['system'])
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
	methods: {
		lockVideo() {
			window._czc.push(['_trackEvent', '火火兔学古诗', '点击', '观看视频']);
			try {
				let data = {
					url: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=1y922shpp6n7k&qr=paidcolumn_1y922shpp6n7k',
					isHW: false
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPause.postMessage(null);
					window.webkit.messageHandlers.redirectToYZ.postMessage(data);
				} else {
					window.android.playCourse('redirectToYZ', JSON.stringify(data));
				}
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				console.log(e);
				//TODO handle the exception
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.page-banner {
	width: 375px;
	height: 268px;
	margin: 0 auto;
	img {
		width: 100%;
		height: 100%;
	}
}
.lock-video {
	position: absolute;
	right: 0;
	top: 200px;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 103px;
	height: 32px;
	font-size: 14px;
	color: #323232;
	border-radius: 20px 0 0 20px;
	box-shadow: 0px 0px 6px 2px rgba(76, 76, 76, 0.04);
	img {
		width: 14px;
		height: 14px;
		margin-right: 10px;
	}
}
</style>
