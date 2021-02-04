<template>
	<div :class="system == 'ios' ? 'xyj-content' : 'content'">
		<!-- <page-video :videoURL="videoURL" :videoPic="videoPic" :aspectRatio="aspectRatio"></page-video> -->
		<div class="xyj-head-img"><img src="https://resource.alilo.com.cn/static/img/xyj/xyj-top-bg.jpg" alt="" /></div>
		<div class="xyj-more" @click="goAnchor('demo')">
			<div class="xyj-tag">
				<span>经典名著</span>
				<span>情商培养</span>
				<span>原创精品</span>
			</div>
			<p class="xyj-more-p">
				精选留言
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<xyj-album-scroll :recommendList="recommendList"></xyj-album-scroll>
		<xyj-album :xyjList="xyjList" :xyjMusic="xyjMusic" :xyjMusic2="xyjMusic2" :xyjMusic3="xyjMusic3" :xyjMusic4="xyjMusic4"></xyj-album>
		<div class="title" ref="comment"><p>留言</p></div>
		<comment :list="commentList"></comment>
	</div>
</template>

<script>
import XyjAlbum from '../../components/XyjAlbum.vue';
import XyjAlbumScroll from '../../components/XyjAlbumScroll.vue';
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
			xyjMusic3: [],
			videoURL: 'https://resource.alilo.com.cn/static/video/hht-xyj.mp4',
			videoPic: 'https://resource.alilo.com.cn/static/img/xyj/lADPBGY16kkmHrfNBDjNCAA_2048_1080-2.jpg',
			aspectRatio: '4096:2160',
			recommendList: [
				{
					img: 'https://resource.alilo.com.cn/static/img/xyj/chapter1.jpg',
					name: '第一部',
					count: 20,
					link:"https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2oqgpdc2g2t7k&qr=paidcolumn_2oqgpdc2g2t7k"
				},
				{
					img: 'https://resource.alilo.com.cn/static/img/xyj/chapter2.jpg',
					name: '第二部',
					count: 21,
					link:"https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=1ydyf54ig5vvk&qr=paidcolumn_1ydyf54ig5vvk"
				},
				{
					img: 'https://resource.alilo.com.cn/static/img/xyj/chapter3.jpg',
					name: '第三部',
					count: 20,
					link:"https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2fmt4nomiayow&qr=paidcolumn_2fmt4nomiayow"
				},
				{
					img: 'https://resource.alilo.com.cn/static/img/xyj/chapter4.jpg',
					name: '第四部',
					count: 20,
					link:"https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=3nrsorv83f7s0&qr=paidcolumn_3nrsorv83f7s0"
				}
			]
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.getAppPage();
	},
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
						this.xyjMusic3 = res.data.data.activityVoList[2].resList;
						this.xyjMusic4 = res.data.data.activityVoList[3].resList;
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
		Comment,
		XyjAlbumScroll
	}
};
</script>

<style lang="less" scoped>
.xyj-head-img {
	width: 375px;
	margin: 0 auto;
	img {
		width: 375px;
		height: 100%;
	}
}
.title {
	width: 345px;
	margin: 20px auto 20px;
	p {
		font-family: SourceHanSansCN-Medium;
		font-size: 16px;
		color: #fff;
	}
}
.content {
	background: #568DAB;
}
.xyj-content {
	background: #568DAB;
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
	color: rgba(0, 0, 0, 0.7);
	margin-top: 19px;
	line-height: 1.5;
	text-align: center;
}
.xyj-more {
	width: 343px;
	margin: 2px auto 0;
	// text-align: right;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.xyj-tag{
		span{
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 11px;
			padding: 3px 6px;
			font-size: 10px;
			color: rgba(255, 255, 255, 0.8);
			font-family: PingFangSC-Regular;
			margin-right: 10px;
		}
	}
	.xyj-more-p {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color:#ffffff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		span {
			margin-top: 4px;
		}
	}
}
</style>
