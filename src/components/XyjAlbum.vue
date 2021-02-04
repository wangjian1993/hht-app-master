<template>
	<div class="content">
		<div class="album-title">
			<p>火火兔姐姐讲西游记(一)</p>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2oqgpdc2g2t7k&qr=paidcolumn_2oqgpdc2g2t7k',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-list">
			<ul>
				<li v-for="(item, index) in xyjList" :key="item.id" class="listStyle2" @click="goodsDatile(item.url, item.name, item.id, index)" v-if="index < 4">
					<div class="list-img">
						<img class="list-cover" :src="item.img" alt="" />
						<div class="list-tag" v-if="index < 2">试听</div>
						<div class="list-time">
							<van-icon name="https://resource.alilo.com.cn/static/img/home_conner_time%403x.png" size="2" />
							<span>{{ item.time }}</span>
						</div>
					</div>
					<div class="list-text">
						<p class="van-multi-ellipsis--l2">{{ item.name }}</p>
					</div>
				</li>
			</ul>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2oqgpdc2g2t7k&qr=paidcolumn_2oqgpdc2g2t7k',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-title">
			<p>火火兔姐姐讲西游记(二)</p>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=1ydyf54ig5vvk&qr=paidcolumn_1ydyf54ig5vvk',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-list">
			<ul>
				<li v-for="(item, index) in xyjList" :key="item.id" class="listStyle2" @click="goodsDatile(item.url, item.name, item.id, index)" v-if="index > 3 && index < 8">
					<div class="list-img">
						<img class="list-cover" :src="item.img" alt="" />
						<div class="list-tag" v-if="index == 4">试听</div>
						<div class="list-time">
							<van-icon name="https://resource.alilo.com.cn/static/img/home_conner_time%403x.png" size="2" />
							<span>{{ item.time }}</span>
						</div>
					</div>
					<div class="list-text">
						<p class="van-multi-ellipsis--l2">{{ item.name }}</p>
					</div>
				</li>
			</ul>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2oqgpdc2g2t7k&qr=paidcolumn_2oqgpdc2g2t7k',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-title">
			<p>火火兔姐姐讲西游记(三)</p>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2fmt4nomiayow&qr=paidcolumn_2fmt4nomiayow',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-list">
			<ul>
				<li v-for="(item, index) in xyjList" :key="item.id" class="listStyle2" @click="goodsDatile(item.url, item.name, item.id, index)" v-if="index > 7 && index < 12">
					<div class="list-img">
						<img class="list-cover" :src="item.img" alt="" />
						<div class="list-tag" v-if="index == 8">试听</div>
						<div class="list-time">
							<van-icon name="https://resource.alilo.com.cn/static/img/home_conner_time%403x.png" size="2" />
							<span>{{ item.time }}</span>
						</div>
					</div>
					<div class="list-text">
						<p class="van-multi-ellipsis--l2">{{ item.name }}</p>
					</div>
				</li>
			</ul>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2oqgpdc2g2t7k&qr=paidcolumn_2oqgpdc2g2t7k',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-title">
			<p>火火兔姐姐讲西游记(四)</p>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=3nrsorv83f7s0&qr=paidcolumn_3nrsorv83f7s0',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-list">
			<ul>
				<li v-for="(item, index) in xyjList" :key="item.id" class="listStyle2" @click="goodsDatile(item.url, item.name, item.id, index)" v-if="index > 11 && index < 16">
					<div class="list-img">
						<img class="list-cover" :src="item.img" alt="" />
						<div class="list-tag" v-if="index == 12">试听</div>
						<div class="list-time">
							<van-icon name="https://resource.alilo.com.cn/static/img/home_conner_time%403x.png" size="2" />
							<span>{{ item.time }}</span>
						</div>
					</div>
					<div class="list-text">
						<p class="">{{ item.name }}</p>
					</div>
				</li>
			</ul>
			<p
				class="album-more"
				@click="
					goodsDatile(
						'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=3nrsorv83f7s0&qr=paidcolumn_3nrsorv83f7s0',
						'查看更多'
					)
				"
			>
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import BScroll from '@better-scroll/core';
var row = 0;
export default {
	props: {
		xyjList: {
			type: Array,
			default: () => {}
		},
		xyjMusic: {
			type: Array,
			default: () => {}
		},
		xyjMusic2: {
			type: Array,
			default: () => {}
		},
		xyjMusic3: {
			type: Array,
			default: () => {}
		},
		xyjMusic4: {
			type: Array,
			default: () => {}
		}
	},
	data() {
		return {};
	},
	computed: {
		...mapState(['system'])
	},
	created() {},
	methods: {
		onRedirect() {
			window._czc.push(['_trackEvent', '火火兔APP', '路由', '跳转登陆']);
			if (this.system == 'ios') {
				window.webkit.messageHandlers.web_login.postMessage(null);
			} else {
				window.android.playCourse('web_login', '');
			}
		},
		goodsDatile(url, name, id, index) {
			let self = this;
			if (localStorage.getItem('user') == '') {
				self.$toast('请先登陆');
				self.onRedirect();
				return;
			}
			if (index == 0 || index == 1 || index == 4 || index == 8 || index == 12) {
				try {
					let data;
					if (index == 4) {
						data = {
							audioList: self.xyjMusic2,
							playIndex: 0
						};
					} else if (index == 0 || index == 1) {
						data = {
							audioList: self.xyjMusic,
							playIndex: index
						};
					} else if (index == 8) {
						data = {
							audioList: self.xyjMusic3,
							playIndex: 0
						};
					}else if(index == 12){
						data = {
							audioList: self.xyjMusic4,
							playIndex: 0
						};
					}
					window._czc.push(['_trackEvent', '火火兔APP', '西游记点击', name]);
					if (this.system == 'ios') {
						window.webkit.messageHandlers.audioPlayerPlay.postMessage(data);
					} else {
						window.android.playCourse('audioPlayerPlay', JSON.stringify(data));
					}
				} catch (e) {
					window._czc.push(['_trackEvent', '火火兔亲子学堂', '西游记点击', name]);
					window.location.href = url;
					//TODO handle the exception
				}
			} else {
				try {
					let data = {
						url: url,
						isHW: false
					};
					window._czc.push(['_trackEvent', '火火兔APP', '西游记点击', name]);
					if (this.system == 'ios') {
						window.webkit.messageHandlers.audioPause.postMessage(null);
						window.webkit.messageHandlers.redirectToYZ.postMessage(data);
					} else {
						window.android.playCourse('redirectToYZ', JSON.stringify(data));
					}
				} catch (e) {
					window._czc.push(['_trackEvent', '火火兔亲子学堂', '西游记点击', name]);
					// this.$toast('请更新新版火火兔APP');
					window.location.href = url;
					console.log(e);
					//TODO handle the exception
				}
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.album-title {
	width: 345px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	margin-top: 37px;
	align-items: center;
	p {
		&:nth-of-type(1) {
			font-family: SourceHanSansCN-Medium;
			font-size: 20px;
			color: #ffffff;
		}
	}
}
.album-more {
	font-family: SourceHanSansCN-Regular;
	font-size: 13px;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.album-list {
	width: 345px;
	margin: 0 auto;
	margin-top: 22px;
	ul {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
}
.listStyle1 {
	width: 345px;
	padding-bottom: 22px;
	display: flex;
	.list-img {
		width: 109px;
		height: 109px;
		position: relative;
		// img {
		// 	width: 100%;
		// 	height: 100%;
		// 	border-radius: 8px;
		// }
	}
}
.album-list1 {
	width: 345px;
	margin: 0 auto;
	overflow: hidden;
	.cont {
		list-style: none;
		white-space: nowrap;
		display: flex;
		margin-top: 17px;
	}
}

.listStyle3 {
	width: 109px;
	padding-bottom: 22px;
	margin-right: 8px;
	.list-img {
		width: 109px;
		height: 109px;
		position: relative;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
}
.listStyle2 {
	width: 165px;
	padding-bottom: 22px;
	.list-img {
		width: 165px;
		height: 165px;
		position: relative;
		.list-cover {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
}
.list-time1 {
	display: flex;
	align-items: center;
	font-size: 12px;
	color: #ffffff;
	font-family: PingFangSC-Regular;
	img {
		width: 20px;
		height: 20px;
	}
	span {
		padding-left: 3px;
	}
}
.list-time {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 5px 8px;
	height: 20px;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 0 8px 0 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: PingFangSC-Regular;
	font-size: 10px;
	color: #fff;
	img {
		width: 20px;
		height: 20px;
	}
	span {
		padding-left: 3px;
	}
}
.text-pad {
	padding-left: 10px;
}
.list-text {
	p {
		&:nth-of-type(1) {
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: #ffffff;
			padding: 10px 0 8px;
			line-height: 1.5;
		}
		&:nth-of-type(2) {
			font-family: PingFangSC-Regular;
			font-size: 13px;
			color: #ffffff;
		}
	}
}
.list-tag {
	width: 44px;
	height: 21px;
	text-align: center;
	line-height: 21px;
	position: absolute;
	left: 0;
	top: 0;
	background: url(../assets/image/tag.png) no-repeat;
	background-size: 100%;
	font-family: PingFangSC-Medium;
	font-size: 14px;
	color: #ffffff;
}
</style>
