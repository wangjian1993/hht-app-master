<template>
	<div class="recommand-wrap">
		<div class="album-title">
			<p>子专辑</p>
			<p>共4个专辑，81个故事</p>
		</div>
		<div>
			<ul class="cont">
				<li class="cont-item" v-for="item of recommendList" :key="item.id" @click="detalls(item)">
					<div class="cont-img">
						<img class="img" :src="item.img" :alt="item.text" />
						<div class="cout-model" v-if="item.count == 0">
							<img src="../assets/image/icon_suo@3x.png" alt="" />
							<p>敬请期待</p>
						</div>
					</div>
					<div class="cont-dest">{{ item.name }}</div>
					<div class="cont-count">
						<span v-if="item.count != 0">共{{ item.count }}首</span>
						<span v-else>更新中..</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'HomeRecommand',
	props: {
		recommendList: {
			type: Array,
			required: true
		}
	},
	components: {},
	data() {
		return {};
	},
	created() {},
	computed: {
		...mapState(['system'])
	},
	methods: {
		detalls(item) {
			if (item.isBuy) {
				console.log('已经购买');
				let data = {
					audioGroupId: item.id,
					channelId: 95,
					pageNo: 1,
					pageSize: 100
				};
				this.$axios
					.getDetail(data)
					.then(res => {
						if (res.data.code == 1) {
							try {
								let data = {
									audioList: res.data.data.audioVoList,
									playIndex: 0
								};
								window._czc.push(['_trackEvent', '火火兔APP', '西游记点击', item.name]);
								if (this.system == 'ios') {
									window.webkit.messageHandlers.audioPlayerPlay.postMessage(data);
								} else {
									window.android.playCourse('audioPlayerPlay', JSON.stringify(data));
								}
							} catch (e) {
								//TODO handle the exception
								window.location.href = `http://wifi.alilo.com.cn/xiaohai/public/temp-dynamic-channelId/index.html#/content/albumDetail?id=${item.id}&channelId=95`;
							}
						}
					})
					.catch(err => {
						console.error(err);
						this.$toast.fail(err);
					});
			} else {
				if (item.link == '') {
					return;
				}
				try {
					let data = {
						url: item.link,
						isHW: false
					};
					window._czc.push(['_trackEvent', '火火兔APP', '西游记点击', '全部']);
					if (this.system == 'ios') {
						window.webkit.messageHandlers.audioPause.postMessage(null);
						window.webkit.messageHandlers.redirectToYZ.postMessage(data);
					} else {
						window.android.playCourse('redirectToYZ', JSON.stringify(data));
					}
				} catch (e) {
					window._czc.push(['_trackEvent', '火火兔亲子学堂', '西游记点击', name]);
					// this.$toast('请更新新版火火兔APP');
					window.location.href = item.link;
					console.log(e);
				}
			}
		}
	}
};
</script>

<style lang="less" scoped>
.album-title {
	width: 345px;
	margin: 0 auto;
	display: flex;
	margin-top: 37px;
	justify-content: space-between;
	align-items: center;
	p {
		&:nth-of-type(1) {
			font-family: PingFangSC-Semibold;
			font-size: 20px;
			color: #ffffff;
		}
		&:nth-of-type(2) {
			font-family: PingFangSC-Regular;
			font-size: 13px;
			color: #ffffff;
		}
	}
}
.recommand-wrap {
	width: 345px;
	margin: 0 auto;
	.cont {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.cont-item {
			width: 165px;
			position: relative;
			.cont-img {
				width: 165px;
				position: relative;
				margin-top: 17px;
				.cout-model {
					width: 165px;
					position: absolute;
					top: 0;
					left: 0;
					background-color: rgba(0, 0, 0, 0.6);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-radius: 10px;
					img {
						width: 20px;
						height: 20px;
					}
					p {
						font-family: PingFangSC-Medium;
						font-size: 12px;
						color: #fff;
						padding-top: 5px;
					}
				}
				.img {
					width: 165px;
					// height: 109px;
					border-radius: 10px;
				}
				.play-img {
					width: 35px;
					height: 35px;
					position: absolute;
					bottom: 8px;
					right: 8px;
					img {
						width: 35px;
						height: 35px;
					}
				}
			}
			.cont-dest {
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #ffffff;
				margin-top: 10px;
			}
			.cont-count {
				font-family: PingFangSC-Regular;
				font-size: 13px;
				color: rgba(255, 255, 255, 0.5);
				margin-top: 8px;
			}
		}
	}
}
</style>
