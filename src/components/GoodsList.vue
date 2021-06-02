<template>
	<div class="list-content">
		<div class="list-box">
			<div class="list-title">
				<p>{{ yzItem.data[0].activityDescribe }}</p>
			</div>
			<div class="list-item">
				<ul :class="listStyle + yzItem.style">
					<li v-for="item in yzItem.data" :key="item.id" @click="goodsDatile(item.alias, item.itemName, item.id)">
						<div class="list-img"><img :src="item.itemJson.pic_url" alt="" /></div>
						<div class="list-info">
							<div class="list-name">
								<p :class="item.activityColumn == 60 ? 'van-ellipsis' : 'van-multi-ellipsis--l2'">{{ item.itemJson.title }}</p>
							</div>
							<div class="list-name-sub" v-if="item.activityColumn == 60">
								<p class="van-ellipsis">{{ item.itemJson.sell_point }}</p>
							</div>
							<div class="list-pic">
								<p>
									<span>¥</span>
									{{ changeMoney(item.itemJson.price) }}
								</p>
								<p v-if="item.activityColumn == 70">已售{{ item.itemJson.sold_num }}</p>
							</div>
							<div class="list-vippic" v-if="item.vipPrice != 0">
								<p>
									会员价
									<span>¥</span>
									{{ item.vipPrice }}
								</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Axios from 'axios';
import { getDayTime } from '../common/util.js';
export default {
	props: {
		yzItem: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			listStyle: 'lsitStyle'
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		console.log('时间===', getDayTime());
	},
	methods: {
		onRedirect() {
			window._czc.push(['_trackEvent', '火火兔APP', '路由', '跳转登陆']);
			if (this.system == 'ios') {
				window.webkit.messageHandlers.web_login.postMessage(null);
			} else {
				window.android.playCourse('web_login', '');
			}
		},
		goodsDatile(url, name, id) {
			let self = this;
			if (localStorage.getItem('user') == '') {
				self.$toast('请先登陆');
				self.onRedirect();
				return;
			}
			window._czc.push(['_trackEvent', '火火兔早教玩具', '点击', '早教玩具:' + name]);
			try {
				let data = {
					url: 'https://shop40802088.m.youzan.com/wscgoods/detail/' + url,
					isHW: false
				};
				let log = {
					event: 'shop_click',
					user_id: localStorage.getItem('user'),
					uuid: localStorage.getItem('user'),
					id: id,
					url: 'https://shop40802088.m.youzan.com/wscgoods/detail/' + url,
					channel_id: 65,
					os: self.system,
					create_time: getDayTime()
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPause.postMessage(null);
					window.webkit.messageHandlers.redirectToYZ.postMessage(data);
				} else {
					window.android.playCourse('redirectToYZ', JSON.stringify(data));
				}
				Axios.post('http://big.data.alilo.com.cn/track/app', log)
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				console.log(e);
				//TODO handle the exception
			}
		},
		changeMoney(num) {
			var regexp = /(?:\.0*|(\.\d+?)0+)$/;
			if (num > 1000000) {
				num = JSON.stringify(num).slice(0, JSON.stringify(num).length - 4) / 100;
				return num + '万';
			} else {
				num = (num / 100).toFixed(2);
				num = num.replace(regexp, '$1');
				return num;
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.list-content {
	width: 345px;
	margin: 0 auto;
}
.list-box {
	width: 100%;
	.list-title {
		p {
			font-family: SourceHanSansCN-Medium;
			font-size: 19px;
			color: rgba(0, 0, 0, 0.8);
		}
	}
}
.list-item {
	width: 100%;
}
.lsitStyle3 {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 22px;
	margin-bottom: 58px;
	li {
		width: 102px;
		.list-img {
			width: 102px;
			height: 102px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}
	}
}
.lsitStyle2 {
	width: 345px;
	margin-top: 22px;
	margin-bottom: 58px;
	li {
		width: 100%;
		display: flex;
		padding-bottom: 16px;
		.list-info {
			padding-left: 16px;
			.list-name {
				width: 220px;
			}
		}
		.list-img {
			width: 102px;
			height: 102px;
			flex-shrink: 0;
			img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}
	}
}
.lsitStyle1 {
	width: 345px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 22px;
	li {
		width: 165px;
		padding-bottom: 20px;
		.list-img {
			width: 165px;
			width: 165px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}
	}
}
.list-name-sub {
	padding-top: 8px;
	p {
		font-family: SourceHanSansCN-Normal;
		font-size: 13px;
		color: rgba(189, 83, 0, 0.5);
	}
}
.list-name {
	padding-top: 8px;
	p {
		font-family: SourceHanSansCN-Regular;
		font-size: 15px;
		color: rgba(0, 0, 0, 0.8);
		line-height: 1.5;
	}
}
.list-pic {
	padding-top: 8px;
	display: flex;
	align-items: center;
	p {
		&:nth-of-type(1) {
			font-family: SourceHanSansCN-Medium;
			font-size: 17px;
			color: #ff6666;
			span {
				font-size: 12px;
			}
		}
		&:nth-of-type(2) {
			margin-left: auto;
			font-family: PingFangSC-Regular;
			font-size: 11px;
			color: rgba(0, 0, 0, 0.3);
		}
	}
}
.list-vippic {
	padding-top: 8px;
	p {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 75px;
		height: 20px;
		background-image: linear-gradient(90deg, #e1aa7f 0%, #f4d1b8 100%);
		border-radius: 0 11px 11px 11px;
		opacity: 0.7;
		color: #8a4920;
		font-size: 11px;
		span {
			font-size: 10px;
		}
	}
}
</style>
