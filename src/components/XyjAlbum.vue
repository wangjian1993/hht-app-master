<template>
	<div class="content">
		<div class="album-title">
			<p>火火兔姐姐讲西游记</p>
			<p
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
				<li v-for="(item, index) in xyjList" :key="item.id" class="listStyle2" @click="goodsDatile(item.url, item.name, item.id)">
					<div class="list-img">
						<img :src="item.img" alt="" />
						<div class="list-time">
							<van-icon name="clock-o" color="#ffffff" size="8" />
							<span>{{ item.time }}</span>
						</div>
					</div>
					<div class="list-text">
						<p class="van-multi-ellipsis--l2">{{ index + 1 + '.' + item.name }}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
var row = 0;
export default {
	props: {
		xyjList: {
			type: Object,
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
		goodsDatile(url, name, id) {
			let self = this;
			if (localStorage.getItem('user') == '') {
				self.$toast('请先登陆');
				self.onRedirect();
				return;
			}
			window._czc.push(['_trackEvent', '火火兔APP', '西游记点击', name]);
			try {
				let data = {
					url: url,
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
	margin-top: 37px;
	align-items: center;
	p {
		&:nth-of-type(1) {
			font-family: SourceHanSansCN-Medium;
			font-size: 20px;
			color: #433b30;
		}
		&:nth-of-type(2) {
			font-family: SourceHanSansCN-Regular;
			font-size: 13px;
			color: #433b30;
			margin-left: auto;
			display: flex;
			align-items: center;
		}
	}
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
.listStyle2 {
	width: 165px;
	padding-bottom: 22px;
	.list-img {
		width: 165px;
		height: 165px;
		position: relative;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
}
.list-time {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 5px 8px;
	height: 20px;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 0 8px 0 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: SourceHanSansCN-Regular;
	font-size: 10px;
	color: #fff;
	span {
		padding-left: 3px;
	}
}
.list-text {
	p {
		&:nth-of-type(1) {
			font-family: SourceHanSansCN-Medium;
			font-size: 16px;
			color: #433b30;
			padding: 10px 0 8px;
			line-height: 1.5;
		}
		&:nth-of-type(2) {
			font-family: SourceHanSansCN-Normal;
			font-size: 13px;
			color: #433b30;
		}
	}
}
</style>
