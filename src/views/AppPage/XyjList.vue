<template>
	<div class="content">
		<div class="xyj-head-img"><img src="https://resource.alilo.com.cn/static/img/xyj/xyj-top-bg.jpg" alt="" /></div>
		<div class="xyj-list">
			<div class="original-more">
				<p class="more-sum">共{{ musicList.length }}首</p>
				<div class="music-list" v-for="(item, index) in musicList" :key="index" @click="goDetail(index, item.name)">
					<div class="list-img"><img :src="item.coverImage" alt="" /></div>
					<div class="list-name">
						<p class="name van-multi-ellipsis--l2">{{ index + 1 }}.{{ item.name }}</p>
						<p class="subname">
							<span v-for="(tabItem, indexs) in item.labels" :key="indexs">{{ tabItem }}</span>
						</p>
						<p class="icon">
							<van-icon name="clock-o" color="rgba(0, 0, 0, 0.4)" size="8" />
							<span>{{ setTime(item.timeLength) }}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			musicList: []
		};
	},
	created() {
		this.getList();
	},
	computed: {
		...mapState(['system'])
	},
	methods: {
		setTime(val) {
			var h = Math.floor(val / 3600);
			var m = Math.floor((val / 60) % 60) >= 10 ? Math.floor((val / 60) % 60) : '0' + Math.floor((val / 60) % 60);
			var s = Math.floor(val % 60) >= 10 ? Math.floor(val % 60) : '0' + Math.floor(val % 60);
			var format = Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s;
			return format;
		},
		getList() {
			let data = {
				audioGroupId: this.$route.query.id,
				channelId: 95,
				pageNo: 1,
				pageSize: 100
			};
			this.$axios
				.getDetail(data)
				.then(res => {
					if (res.data.code == 1) {
						this.musicList = res.data.data.audioVoList;
					}
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		},
		goDetail(index, name) {
			try {
				let data = {
					audioList: this.musicList,
					playIndex: index
				};
				window._czc.push(['_trackEvent', '火火兔APP', '西游记点击', name]);
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPlayerPlay.postMessage(data);
				} else {
					window.android.playCourse('audioPlayerPlay', JSON.stringify(data));
				}
			} catch (e) {
				//TODO handle the exception
				window.location.href = `http://wifi.alilo.com.cn/xiaohai/public/temp-dynamic-channelId/index.html#/content/albumDetail?id=${this.$route.query.id}&channelId=95`;
			}
		}
	},
	components: {}
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
.content {
	background: #568dab;
}
.original-more {
	width: 9.147rem;
	background-color: #ffffff;
	border-radius: 16px;
	margin: 0 auto;
	margin-bottom: 30rpx;
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
		flex-shrink: 0;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
			flex-shrink: 0;
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
