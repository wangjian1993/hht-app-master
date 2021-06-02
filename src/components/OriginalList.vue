<template>
	<div class="content">
		<div class="original-boby-head">
			<van-tabs>
				<van-tab v-for="(item, index) in list" :key="item.id">
					<template #title>
						<p
							class="tab-content"
							:style="[{ color: index == tabIndex ? '#fff' : tabFont }, { background: index == tabIndex ? tabFont : '#fff' }]"
							@click="tabClick(item, index)"
						>
							{{ item.title }}
						</p>
					</template>
				</van-tab>
			</van-tabs>
			<div class="head-bg"></div>
		</div>
		<div class="original-boby-border"></div>
		<div class="original-boby-content">
			<div class="list-head">
				<p class="van-ellipsis">{{ musicList.subName }}</p>
				<p @click="showMore">
					查看全部
					<span><van-icon name="arrow" /></span>
				</p>
			</div>
			<div class="list-content">
				<div class="list" v-for="(item, index) in musicList.audioVoList" :key="index" v-if="index < 6" @click="goDetail(index)">
					<div class="list-img">
						<img :src="item.coverImage" alt="" />
						<div class="list-icon">
							<van-icon name="https://resource.alilo.com.cn/static/img/home_conner_time%403x.png" size="2" />
							<span>{{ setTime(item.timeLength) }}</span>
						</div>
					</div>
					<div class="list-name">
						<p class="van-ellipsis">{{ item.name }}</p>
					</div>
					<div class="list-tab">
						<p v-for="(tabItem, indexs) in item.labels" :key="indexs" v-if="indexs < 2">{{ tabItem }}</p>
					</div>
				</div>
			</div>
			<div class="list-more" @click="showMore"><p>查看全部</p></div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	props: ['list', 'musicList', 'tabFont', 'originalBg'],
	data() {
		return {
			tabIndex: 0,
			id: '',
			count: 2,
			msg: ''
		};
	},
	computed: {
		...mapState(['system'])
	},
	methods: {
		onLoda() {
			location.reload();
		},
		setTime(val) {
			var h = Math.floor(val / 3600);
			var m = Math.floor((val / 60) % 60) >= 10 ? Math.floor((val / 60) % 60) : '0' + Math.floor((val / 60) % 60);
			var s = Math.floor(val % 60) >= 10 ? Math.floor(val % 60) : '0' + Math.floor(val % 60);
			var format = Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s;
			return format;
		},
		tabClick(item, index) {
			if (this.tabIndex == index) {
				return;
			}
			this.tabIndex = index;
			this.$emit('tabClick', item, index);
		},
		showMore() {
			let self = this;
			try {
				let cl = self.originalBg.split('#');
				let data = {
					url: 'http://h5.alilo.com.cn/member/index.html#/apppage/original-more?bg=' + cl[1] + '&index=' + self.tabIndex + '&id=' + self.musicList.id
				};
				window._czc.push(['_trackEvent', '火火兔原创精品', '点击', '查看更多']);
				if (self.system == 'ios') {
					window.webkit.messageHandlers.web_navigite.postMessage(data);
				} else {
					window.android.playCourse('web_navigite', JSON.stringify(data));
				}
			} catch (e) {
				self.$router.push({ name: 'original-more', query: { bg: this.originalBg, index: this.tabIndex, id: this.musicList.id } });
				// TODO handle the exception
			}
			// this.$router.push({ name: 'original-more', query: { bg: this.originalBg, index: this.tabIndex, id: this.musicList.id } });
		},
		goDetail(index) {
			try {
				let data = {
					audioList: this.musicList.audioVoList,
					playIndex: index
				};
				console.log(data);
				window._czc.push(['_trackEvent', '火火兔原创精品', '点击', this.musicList.name]);
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPlayerPlay.postMessage(data);
				} else {
					window.android.playCourse('audioPlayerPlay', JSON.stringify(data));
				}
			} catch (e) {
				console.log(e);
				//TODO handle the exception
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
/deep/ .van-tab {
	font-size: rem(16);
	padding: 0;
	margin-right: rem(10);
	flex: 0 0 auto !important;
}
.original-boby-head {
	display: flex;
	justify-content: center;
	width: 375px;
	position: relative;
	margin: 0 auto;
	margin-top: -10px;
}
.original-boby-border {
	width: 9.36rem;
	height: 0.213rem;
	background-color: #d4dce1;
	border-radius: 0.027rem;
	margin: 0 auto;
	margin-top: 3px;
}
.original-more {
	width: 9.147rem;
	height: 540px;
	background-color: #ffffff;
	border-radius: 0 0 0.213rem 0.213rem;
	margin: 0 auto;
}
.original-boby-content {
	width: 9.147rem;
	background-color: #ffffff;
	border-radius: 0 0 0.213rem 0.213rem;
	margin: 0 auto;
}
.tab-content {
	background-color: #fff;
	border-radius: 19px;
	padding: 9px 15px;
	color: #fff;
	position: relative;
}
.tab-content.activeTab {
}
.head-bg {
	width: 343px;
	background-color: #a6b6bf;
	height: 34px;
	border-radius: 0.193rem 0.193rem 0 0;
	margin: 0 auto;
	position: absolute;
	top: 14px;
	z-index: 500;
}
.list-head {
	padding: 20px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	p {
		&:nth-of-type(1) {
			font-family: PingFangSC-Semibold;
			font-size: 21px;
			color: rgba(0, 0, 0, 0.7);
			width: 231px;
		}

		&:nth-of-type(2) {
			font-size: 13px;
			color: rgba(0, 0, 0, 0.3);
			font-family: PingFangSC-Regular;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
.list-content {
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 0 16px;
	.list {
		width: 98px;
		padding-bottom: 20px;
		.list-img {
			width: 98px;
			height: 98px;
			position: relative;
			img {
				border-radius: 8px;
				width: 98px;
				height: 98px;
			}
			.list-icon {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 60px;
				height: 20px;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 0px 8px 0px 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				img{
					 width: 20px;
					 height: 20px;
				}
				span {
					color: #ffffff;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					padding-left: 2px;
				}
			}
		}
		.list-name {
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: rgba(0, 0, 0, 0.7);
			margin-top: 6px;
		}
		.list-tab {
			display: flex;
			flex-wrap: wrap;
			width: 98px;
			margin-top: 6px;
			height: 20px;
			line-height: 20px;
			overflow: hidden;
			p {
				height: 20px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 10px;
				border: solid 1px rgba(255, 138, 102, 0.2);
				font-family: PingFangSC-Regular;
				font-size: 10px;
				color: rgba(255, 138, 102, 0.8);
				padding: 2px 8px;
				margin-right: 4px;
			}
		}
	}
}
.list-more {
	text-align: center;
	padding-bottom: 20px;
	p {
		width: 80px;
		height: 28px;
		background-color: rgba(0, 0, 0, 0.04);
		border-radius: 14px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.49);
		margin: 0 auto;
		line-height: 28px;
	}
}
</style>
