<template>
	<div class="original-content" :style="{ background: originalBg }">
		<div class="original-head-bg"><img :src="headImg" alt="" /></div>
		<div class="original-more">
			<p class="more-sum">共{{ total }}首</p>
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getDetail">
				<div class="music-list" v-for="(item, index) in musicList" :key="index" @click="goDetail(index)">
					<div class="list-img"><img :src="item.coverImage" alt="" /></div>
					<div class="list-name">
						<p class="name van-multi-ellipsis--l2">{{ item.name }}</p>
						<p class="subname">
							<span v-for="(tabItem, indexs) in item.labels" :key="indexs">{{ tabItem }}</span>
						</p>
						<p class="icon">
							<van-icon name="clock-o" color="rgba(0, 0, 0, 0.4)" size="8" />
							<span>{{ setTime(item.timeLength) }}</span>
						</p>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			tabFont: '',
			originalBg: '',
			headImg: 'https://resource.alilo.com.cn/static/img/original1.png',
			musicList: [],
			loading: false,
			finished: false,
			totalPage: 0,
			page: 1,
			total: 0,
			name: ''
		};
	},
	created() {
		try {
			window.android.controlRefresh(false);
		} catch (e) {
			//TODO handle the exception
		}
		// alert(location.href);
		console.log(this.getUrlKey('bg'));
		this.originalBg = this.getUrlKey('bg');
		let i = Number(this.getUrlKey('index'));
		this.headImg = `https://resource.alilo.com.cn/static/img/original${i + 1}.png`;
	},
	computed: {
		...mapState(['system'])
	},
	methods: {
		getUrlKey(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
		},
		setTime(val) {
			var h = Math.floor(val / 3600);
			var m = Math.floor((val / 60) % 60) >= 10 ? Math.floor((val / 60) % 60) : '0' + Math.floor((val / 60) % 60);
			var s = Math.floor(val % 60) >= 10 ? Math.floor(val % 60) : '0' + Math.floor(val % 60);
			var format = Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s;
			return format;
		},
		getDetail() {
			if (this.getUrlKey('id') == '') {
				return;
			}
			let data = {
				audioGroupId: this.getUrlKey('id'),
				channelId: 65,
				pageNo: this.page,
				pageSize: 10
			};
			// 数据全部加载完成
			if (this.totalPage != 0) {
				if (this.page > this.totalPage) {
					console.log('加载完了====');
					this.finished = true;
					return;
				}
			}
			this.$axios
				.getDetail(data)
				.then(res => {
					if (res.data.code == 1) {
						this.musicList = this.musicList.concat(res.data.data.audioVoList);
						this.totalPage = res.data.data.totalPage;
						this.total = res.data.data.total;
						this.name = res.data.data.name;
						this.page += 1;
					} else {
						this.$toast.fail(res.data.info);
					}
					// 加载状态结束
					this.loading = false;
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		},
		goDetail(index) {
			try {
				let data = {
					audioList: this.musicList,
					playIndex: index
				};
				window._czc.push(['_trackEvent', '火火兔原创精品', '点击', this.name]);
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPlayerPlay.postMessage(data);
				} else {
					window.android.playCourse('audioPlayerPlay', JSON.stringify(data));
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	},
	components: {}
};
</script>

<style lang="less">
.original-content {
	position: absolute;
	width: 100%;
}
.original-head-bg {
	width: 10rem;
	height: 4.64rem;
	img {
		width: 100%;
		height: 100%;
	}
}
.original-more {
	width: 9.147rem;
	height: 540px;
	background-color: #ffffff;
	border-radius: 16px;
	margin: 0 auto;
	overflow: auto;
}
.more-sum {
	padding: 12px 16px;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: rgba(0, 0, 0, 0.5);
}
.music-list {
	width: 312px;
	height: 109px;
	margin: 0 auto;
	display: flex;
	// align-items: center;
	margin-bottom: 16px;
	.list-img {
		width: 109px;
		height: 109px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
}
.list-name {
	padding-left: 7px;
	.name {
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.7);
		padding-top: 4px;
	}
	.subname {
		padding: 20px 0;
		span {
			border-radius: 10px;
			border: solid 1px rgba(255, 138, 102, 0.2);
			font-family: PingFangSC-Regular;
			font-size: 10px;
			color: rgba(255, 138, 102, 0.8);
			padding: 2px 8px;
			margin-right: 10px;
		}
	}
	.icon {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		span {
			margin-left: 5px;
		}
	}
}
</style>
