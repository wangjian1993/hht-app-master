<template>
	<div :class="system == 'ios' ? 'xyj-content' : 'content'"><page-story v-for="(item, index) in pageList" :key="index" :pageList="item"></page-story></div>
</template>
<script>
import PageStory from '../../components/PageStory.vue';
import Comment from '../../components/Comment.vue';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			pageList: []
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.getAppPage();
	},
	methods: {
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
				pageId: 97,
				channelId: 95
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
		PageStory
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
	background: #fff;
}
.xyj-content {
	background: #fff;
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
