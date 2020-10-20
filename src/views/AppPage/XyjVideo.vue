<template>
	<div :class="system == 'ios' ? 'xyj-content' : 'content'">
		<!-- <div class="xyj-banner"><img src="https://resource.alilo.com.cn/static/img/xyj/xyj-banner.png" alt="" /></div> -->
		<div class="xyj-video">
			<video-player
				class="video-player vjs-custom-skin"
				ref="videoPlayer"
				:playsinline="true"
				:options="playerOptions"
				@play="onPlayerPlay($event)"
				@ended="onPlayerEnded($event)"
			></video-player>
		</div>
		<xyj-album :xyjList="xyjList"></xyj-album>
	</div>
</template>

<script>
import XyjAlbum from '../../components/XyjAlbum.vue';
import Global from '@/common/global.js';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			xyjList: Global.xyjContent,
			playerOptions: {
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				autoplay: false, //如果true,浏览器准备好时开始回放。
				muted: false, // 默认情况下将会消除任何音频。
				loop: false, // 导致视频一结束就重新开始。
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '4096:2160', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
					{
						type: '', //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
						src: 'https://resource.alilo.com.cn/static/video/hht-xyj.mp4' //url地址
					}
				],
				poster: 'https://resource.alilo.com.cn/static/img/xyj/lADPBGY16kkmHrfNBDjNCAA_2048_1080-2.jpg', //你的封面地址
				// width: document.documentElement.clientWidth, //播放器宽度
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true //全屏按钮
				}
			}
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		console.log(Global.xyjContent);
	},
	methods: {
		onPlayerPlay() {
			console.log('开始播放');
		},
		onPlayerEnded() {
			console.log('播放结束');
		}
	},
	components: {
		XyjAlbum
	}
};
</script>

<style lang="less" scoped>
.content {
	background: #e4caa9;
}
.xyj-content {
	background: #e4caa9;
	padding-bottom: 144px;
}
.xyj-banner {
	width: 375px;
	height: 300px;
	margin: 0 auto;
	// filter: blur(5px);
	img {
		width: 100%;
		height: 100%;
	}
}
.xyj-video {
	width: 375px;
	margin: 0 auto;
	text-align: center;
	background: #fff;
	// position: absolute;
	// top: 52.5px;
	// left: 50%;
	// transform: translate(-50%, 0);
	border-radius: 10px;
	.video-js .vjs-icon-placeholder {
		width: 345px;
		height: 152px;
		margin: 0 auto;
		border-radius: 10px;
	}
}
</style>
