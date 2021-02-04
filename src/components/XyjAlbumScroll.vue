<template>
	<div class="recommand-wrap">
		<div class="album-title">
			<p>子专辑</p>
			<p>共4个专辑，81个故事</p>
		</div>
		<div>
			<ul class="cont">
				<li class="cont-item" v-for="item of recommendList" :key="item.id" @click="detalls(item.link)">
					<div class="cont-img">
						<img class="img" :src="item.img" :alt="item.text" />
						<div class="play-img"><img src="https://resource.alilo.com.cn/static/img/xyj/icon_bf@3x.png" alt="" /></div>
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
	created() {
		
	},
	computed: {
		...mapState(['system'])
	},
	methods: {
		detalls(link) {
			if (link == '') {
				return;
			}
			try {
				let data = {
					url: link,
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
				window.location.href = url;
				console.log(e);
				//TODO handle the exception
			}
		},
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
	// width: 345px;
	margin: 0 auto;
	padding-left: 16px;
	.cont {
		list-style: none;
		white-space: nowrap;
		display: flex;
		margin-top: 17px;
		overflow-x: auto;
		overflow-y: hidden;
		.cont-item {
			width: 108px;
			position: relative;
			margin-right: 8px;
			.cont-img {
				width: 108px;
				height: 108px;
				position: relative;
				.cout-model {
					width: 109px;
					height: 109px;
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
					width: 109px;
					height: 109px;
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
				margin-top: 6px;
			}
			.cont-count {
				font-family: PingFangSC-Regular;
				font-size: 13px;
				color: rgba(255, 255, 255, 0.5);
				margin-top: 4px;
			}
		}
	}
}
</style>
