<template>
	<div :class="system == 'ios' ? 'appcontent' : 'content'">
		<page-video :videoURL="videoURL" :videoPic="videoPic"></page-video>
		<div class="poetry">
			<p>&nbsp; &nbsp; &nbsp;《火火兔学古诗》选自教育部新课标小学必背古诗词80首，以生动活泼的故事、朗朗上口的音乐、精美童趣的画面，帮助孩子们轻松诵记优秀古诗词。</p>
		</div>
		<div class="lock-video" @click="lockVideo()">
			<img src="../../assets/image/play.png" alt="" />
			<p>学习全套视频</p>
		</div>
		<div class="goods-divder" @click="gooriginal"><van-divider>火火兔学古诗-音频版</van-divider></div>
		<component v-for="item in pageList" :is="setComponent(item)" :componentData="item"></component>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import debug from '@/components/debug.vue';
import PageVideo from '../../components/PageVideo.vue';
import PageBanner from '@/components/PageBanner.vue';
import PageContent from '@/components/PageContent.vue';
export default {
	data() {
		return {
			pageList: [],
			com: PageBanner,
			videoURL: 'https://resource.alilo.com.cn/static/video/gushi.mp4',
			videoPic: 'https://resource.alilo.com.cn/static/img/gushi2.jpg'
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.getAppPage();
	},
	methods: {
		gooriginal() {
			 // this.$router.push({ name: 'xyjvideo' });
				window.location.href = "http://h5.alilo.com.cn/membert/index.html#/apppage/xyjvideo";
		},
		lockVideo() {
			window._czc.push(['_trackEvent', '火火兔学古诗', '点击', '全套视频']);
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
		},
		setComponent(item) {
			switch (item.type) {
				case 10:
					return 'PageContent';
				case 40:
					return 'PageContent';
					break;
				case 70:
					// return 'PageBanner';
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
		PageContent,
		PageVideo
	}
};
</script>

<style lang="less" scoped>
.appcontent {
	width: 375px;
	margin: 0 auto;
	padding-bottom: 140px;
	background: #62b045;
}
.content {
	width: 375px;
	margin: 0 auto;
	background: #62b045;
}
.poetry {
	width: 345px;
	margin: 0 auto;
	p {
		font-family: SourceHanSansCN-Normal;
		font-size: 15px;
		color: #ffffff;
		padding-top: 10px;
		line-height: 1.5;
	}
}
.lock-video {
	width: 236px;
	height: 38px;
	background-color: #ffffff;
	border-radius: 18px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: SourceHanSansCN-Medium;
	font-size: 17px;
	color: #ff6766;
	margin-top: 18px;
	img {
		width: 19px;
		height: 19px;
		margin-right: 5px;
	}
}
.goods-divder {
	width: 345px;
	margin: 0 auto;
	margin-top: 57px;
}
.van-divider {
	color: #fff;
	opacity: 0.6;
}
</style>
