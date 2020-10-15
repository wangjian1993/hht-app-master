<template>
	<div class="xyj-content">
		<div class="xyj-banner"><img src="https://resource.alilo.com.cn/static/img/xyj/xyj-bg1.png" alt="" /></div>
		<div class="xyj-video">
			<video
				id="player"
				class="video-js"
				playsinline
				controls
				data-poster="https://resource.alilo.com.cn/static/img/xyj/video-cover.png"
				preload="none"
				poster="https://resource.alilo.com.cn/static/img/xyj/video-cover.png"
			>
				<source src="https://mps-video.yzcdn.cn/multi_trans/2lpSYsMXsLTV5H_PNnLout3gRYG-Wgw-.mp4" type="video/mp4" />
			</video>
		</div>
		<xyj-album :xyjList="xyjList"></xyj-album>
	</div>
</template>

<script>
import XyjAlbum from '../../components/XyjAlbum.vue';
import Global from '@/common/global.js';
export default {
	data() {
		return {
			xyjList: Global.xyjContent
		};
	},
	created() {
		console.log(Global.xyjContent);
	},
	components: {
		XyjAlbum
	}
};
</script>

<style lang="less" scoped>
.xyj-content {
	background: #e4caa9;
	padding-bottom: 144px;
}
.xyj-banner {
	width: 375px;
	height: 300px;
	img {
		width: 100%;
		height: 100%;
	}
}
.xyj-video {
	width: 375px;
	margin: 0 auto;
	text-align:center;
	position: absolute;
	top: 66px;
	video {
		width: 345px;
		height: 182px;
		margin: 0 auto;
		border-radius: 10px;
	}
}
</style>
