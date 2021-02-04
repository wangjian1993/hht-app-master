<template>
	<div class="vip-content">
		<div class="vip-bg">
			<img src="https://resource.alilo.com.cn/static/img/xmvip-bg.png" alt="" />
			<div class="vip-btn" v-if="!isweixin" @click="goXmly"><p>免费领取</p></div>
			<div class="weixin-btn" v-if="isweixin">
				<template>
					<wx-open-launch-weapp
						class="vip-btn"
						username="gh_c7ae9c51172b"
						path="src/activity/exchange/index?appkey=5a038226a57546a3b8beee9ec12c6ce6&source=alilo&activityCode=4nalw89m"
					>
						<script type="text/wxtag-template">
												<style>
												.vip-btn-p {width: 141px;
							height: 40px;
							line-height: 40px;
							text-align: center;
							background-color: #e8130a;
							border-radius: 20px;
							font-family: SourceHanSansCN-Medium;
							font-size: 21px;
							color: #fafafa;
							margin: 0 auto;
							border: none;
							 }</style>
							<div class="vip-btn"><p class="vip-btn-p">免费领取</p></div>
						</script>
					</wx-open-launch-weapp>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Axios from 'axios';
import wx from 'weixin-js-sdk';
export default {
	data() {
		return {
			isweixin: false
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		if (this.isWeiXin()) {
			this.isweixin = true;
			this.getWXConfig();
		} else {
			this.isweixin = false;
		}
	},
	methods: {
		getWXConfig() {
			Axios.get('http://wifi.alilo.com.cn/xiaohai/jsconfig', {
				params: {
					url: window.location.href.split('#')[0]
				}
			})
				.then(function(res) {
					wx.config({
						debug: false, // 开启调试模式,
						appId: res.data.appId,
						// 必填，公众号的唯一标识，填自己的！
						timestamp: res.data.timestamp,
						// 必填，生成签名的时间戳，刚才接口拿到的数据
						nonceStr: res.data.nonceStr,
						// 必填，生成签名的随机串
						signature: res.data.signature,
						jsApiList: ['scanQRCode'],
						openTagList: ['wx-open-launch-weapp']
					});
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		//判断是否是微信浏览器的函数
		isWeiXin() {
			var ua = window.navigator.userAgent.toLowerCase();
			//通过正则表达式匹配ua中是否含有MicroMessenger字符串
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		},
		goXmly() {
			try {
				window._czc.push(['_trackEvent', '火火兔APP', '点击', '立即领取喜马拉雅会员']);
				let data = {
					mini_program_id: 'gh_c7ae9c51172b',
					path: 'src/activity/exchange/index?appkey=5a038226a57546a3b8beee9ec12c6ce6&source=alilo&activityCode=4nalw89m'
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.redirectMiniProgram.postMessage(data);
				} else {
					window.android.playCourse('redirectMiniProgram', JSON.stringify(data));
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.vip-bg {
	width: 100%;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
	}
}
.weixin-btn {
	text-align: center;
	width: 100%;
}
.vip-btn {
	width: 100%;
	height: 80px;
	background: transparent;
	position: absolute;
	top: 125px;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	p {
		width: 141px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #e8130a;
		border-radius: 20px;
		font-family: SourceHanSansCN-Medium;
		font-size: 21px;
		color: #fafafa;
	}
}
</style>
