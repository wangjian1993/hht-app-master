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
		<xyj-album :xyjList="xyjList" :xyjMusic="xyjMusic" :recommendList="recommendList" :xyjMusic2="xyjMusic2" :xyjMusic3="xyjMusic3" :xyjMusic4="xyjMusic4"></xyj-album>
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
					img: 'https://resource.alilo.com.cn/static/img/xyj/cover1.jpg',
					name: '第一部',
					count: 20,
					link: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2oqgpdc2g2t7k&qr=paidcolumn_2oqgpdc2g2t7k',
					yzCode: '2oqgpdc2g2t7k',
					isBuy: false,
					id: 81395
				},
				{
					img: 'https://resource.alilo.com.cn/static/img/xyj/cover2.jpg',
					name: '第二部',
					count: 21,
					link: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=1ydyf54ig5vvk&qr=paidcolumn_1ydyf54ig5vvk',
					yzCode: '1ydyf54ig5vvk',
					isBuy: false,
					id: 107045
				},
				{
					img: 'https://resource.alilo.com.cn/static/img/xyj/cover3.jpg',
					name: '第三部',
					count: 20,
					link: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2fmt4nomiayow&qr=paidcolumn_2fmt4nomiayow',
					yzCode: '2fmt4nomiayow',
					isBuy: false,
					id: 107158
				},
				{
					img: 'https://resource.alilo.com.cn/static/img/xyj/cover4.jpg',
					name: '第四部',
					count: 20,
					link: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=3nrsorv83f7s0&qr=paidcolumn_3nrsorv83f7s0',
					yzCode: '3nrsorv83f7s0',
					isBuy: false,
					id: 107327
				}
			]
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.getAppPage();
		this.getUserXyj();
	},
	methods: {
		getUserXyj() {
			var parma;
			console.log("浏览器====",this.isWeiXin())
			if (this.isWeiXin()) {
				parma = {
					userId: this.$route.query.openId
				};
			} else {
				if (localStorage.getItem('user') == '') {
					self.$toast('请先登陆');
					self.onRedirect();
					return;
				}
				console.log("不是微信浏览器=====")
				parma = {
					userId: localStorage.getItem('user')
				};
				console.log('用户id====', localStorage.getItem('user'));
				console.log('parma', parma);
			}
			console.log('data=======', parma);
			this.$axios
				.getUserXyj(parma)
				.then(res => {
					let list = res.data.data;
					this.recommendList.forEach((item, index) => {
						list.forEach((i, index) => {
							if (item.yzCode == i) {
								item.isBuy = true;
							}
						});
					});
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		},
		getCookie(name) {
			var arr,
				reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
			if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
			else return null;
		},
		//判断是否是微信浏览器的函数
		isWeiXin() {
			//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
			var ua = window.navigator.userAgent.toLowerCase();
			//通过正则表达式匹配ua中是否含有MicroMessenger字符串
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
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
	background: #568dab;
}
.xyj-content {
	background: #568dab;
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
	.xyj-tag {
		span {
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
		color: #ffffff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		span {
			margin-top: 4px;
		}
	}
}
</style>
