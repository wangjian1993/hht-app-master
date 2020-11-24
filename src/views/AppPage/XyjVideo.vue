<template>
	<div :class="system == 'ios' ? 'xyj-content' : 'content'">
		<!-- <div class="xyj-banner"><img src="https://resource.alilo.com.cn/static/img/xyj/xyj-banner.png" alt="" /></div> -->
		<page-video :videoURL="videoURL" :videoPic="videoPic" :aspectRatio="aspectRatio"></page-video>
		<div class="xyj-text"><p>为孩子量身打造，聆听耳朵里的“大片盛宴”<br />
100+紧扣剧情对话顺口溜，让故事“活”起来<br />巧妙融入大量诗词和成语，丰富孩子知识储备</p></div>
		<div class="xyj-more" @click="goAnchor('demo')">
			<p>
				精选留言
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<xyj-album :xyjList="xyjList" :xyjMusic="xyjMusic" :xyjMusic2="xyjMusic2"></xyj-album>
		<div class="title" ref="comment"><p>留言</p></div>
		<comment :list="commentList"></comment>
	</div>
</template>

<script>
import XyjAlbum from '../../components/XyjAlbum.vue';
import PageVideo from '../../components/PageVideo.vue';
import Comment from '../../components/Comment.vue';
import Global from '@/common/global.js';
import content from '@/common/content.json';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			xyjList: Global.xyjContent,
			commentList: content.list,
			xyjMusic: [],
			xyjMusic2: [],
			videoURL: 'https://resource.alilo.com.cn/static/video/hht-xyj.mp4',
			videoPic: 'https://resource.alilo.com.cn/static/img/xyj/lADPBGY16kkmHrfNBDjNCAA_2048_1080-2.jpg',
			aspectRatio: '4096:2160'
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.getAppPage();
	},
	mounted: {},
	methods: {
		goAnchor(selector) {
			console.log(selector);
			let anchor = this.$refs['comment'];
			console.log(anchor);
			//document.documentElement.scrollTop = anchor.offsetTop;
			let total = anchor.offsetTop;
			// 平滑滚动，时长500ms，每10ms一跳，共50跳
			// 获取当前滚动条与窗体顶部的距离
			let distance = document.documentElement.scrollTop || document.body.scrollTop;
			// 计算每一小段的距离
			let step = total / 50;
			(function smoothDown() {
				if (distance < total) {
					distance += step; // 移动一小段
					document.body.scrollTop = distance;
					document.documentElement.scrollTop = distance; // 设定每一次跳动的时间间隔为10ms
					setTimeout(smoothDown, 10);
				} else {
					// 限制滚动停止时的距离
					document.body.scrollTop = total;
					document.documentElement.scrollTop = total;
				}
			})();
		},
		getAppPage() {
			let data = {
				pageId: 87,
				channelId: 65
			};
			this.$axios
				.getAppPage(data)
				.then(res => {
					if (res.data.code == 1) {
						this.xyjMusic = res.data.data.activityVoList[0].resList;
						this.xyjMusic2 = res.data.data.activityVoList[1].resList;
						console.log(this.xyjMusic);
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
		XyjAlbum,
		PageVideo,
		Comment
	}
};
</script>

<style lang="less" scoped>
.title {
	width: 345px;
	margin: 20px auto 50px;
	p {
		font-family: SourceHanSansCN-Medium;
		font-size: 16px;
		color: #28241e;
	}
}
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
.xyj-text {
	width: 343px;
	margin: 0 auto;
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #453b2c;
	margin-top: 19px;
	line-height: 1.5;
	text-align: center;
}
.xyj-more {
	width: 343px;
	margin: 22px auto;
	text-align: right;
	p {
		font-family: SourceHanSansCN-Normal;
		font-size: 14px;
		color: #433a30;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		span {
			margin-top: 4px;
		}
	}
}
</style>
