<template>
	<div class="content">
		<div class="album-title">
			<p>{{ data.name }}</p>
			<p @click="pageMore()">
				查看更多
				<span><van-icon name="arrow" /></span>
			</p>
		</div>
		<div class="album-list">
			<ul>
				<li v-for="(item, index) in albumListFilter" :key="item.id" :class="columnStyle" @click="details(index, item)">
					<div class="list-img">
						<img :src="item.coverImage" alt="" />
						<div class="list-time" v-if="type == 10">
							<van-icon name="clock-o" color="#ffffff" size="8" />
							<span>{{ setTime(item.timeLength) }}</span>
						</div>
						<div class="list-time" v-if="type == 40">
							<van-icon name="clock-o" color="#ffffff" size="8" />
							<span>共{{ item.childResCount }}首</span>
						</div>
					</div>
					<div class="list-text">
						<p class="van-ellipsis">{{ item.name }}</p>
						<p class="van-ellipsis" v-if="type == 40">{{ item.subName }}</p>
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
		data: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			albumList: [],
			listLenght: 0,
			column: 0,
			type: 0
		};
	},
	computed: {
		...mapState(['system']),
		albumListFilter: function() {
			return this.albumList.filter(function(item, index) {
				if (index < row) {
					return item;
				}
			});
		}
	},
	created() {
		this.type = this.data.type;
		this.columnStyle = 'listStyle' + this.data.columnStyle[1].column;
		row = this.data.columnStyle[0].column * this.data.columnStyle.length;
		this.listLenght = this.data.columnStyle;
		this.albumList = this.data.resList;
	},
	methods: {
		pageMore() {
			this.$store.dispatch('setPoetryMore', this.data);
			try {
				let data = {
					url: 'http://h5.alilo.com.cn/member/index.html#/apppage/poetry/more?type=' + this.type
				};
				window._czc.push(['_trackEvent', '火火兔学古诗', '点击', '查看更多']);
				if (this.system == 'ios') {
					window.webkit.messageHandlers.web_navigite.postMessage(data);
				} else {
					window.android.playCourse('web_navigite', JSON.stringify(data));
				}
			} catch (e) {
				this.$router.push({ name: 'poetry-more', query: { type: this.type } });
				//TODO handle the exception
			}
		},
		details(index, item) {
			if (this.type == 10) {
				console.log('单曲');
				try {
					let data = {
						audioList: this.albumList,
						playIndex: index
					};
					console.log('data', data);
					console.log('this.system', this.system);
					window._czc.push(['_trackEvent', '火火兔学古诗', '点击', item.name]);
					if (this.system == 'ios') {
						console.log('ios');
						window.webkit.messageHandlers.audioPlayerPlay.postMessage(data);
					} else {
						window.android.playCourse('audioPlayerPlay', JSON.stringify(data));
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
			if (this.type == 40) {
				console.log('专辑');
				try {
					let data = {
						type: 1,
						id: item.id,
						name: item.name
					};
					console.log('data====222', data);
					window._czc.push(['_trackEvent', '火火兔学古诗', '点击', item.name]);
					if (this.system == 'ios') {
						console.log('ios');
						window.webkit.messageHandlers.share.postMessage(data);
					} else {
						window.android.playCourse('share', JSON.stringify(data));
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
		setTime(val) {
			var h = Math.floor(val / 3600);
			var m = Math.floor((val / 60) % 60) >= 10 ? Math.floor((val / 60) % 60) : '0' + Math.floor((val / 60) % 60);
			var s = Math.floor(val % 60) >= 10 ? Math.floor(val % 60) : '0' + Math.floor(val % 60);
			var format = Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s;
			return format;
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
			color: #fff;
		}
		&:nth-of-type(2) {
			font-family: SourceHanSansCN-Regular;
			font-size: 13px;
			color: rgba(255, 255, 255, 0.8);
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
.listStyle3 {
	width: 101px;
	padding-bottom: 22px;

	.list-img {
		width: 101px;
		height: 98px;
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
	color: #ffffff;
	span {
		padding-left: 3px;
	}
}
.list-text {
	p {
		&:nth-of-type(1) {
			font-family: SourceHanSansCN-Medium;
			font-size: 14px;
			color: #fff;
			padding: 10px 0 8px;
		}
		&:nth-of-type(2) {
			font-family: SourceHanSansCN-Normal;
			font-size: 13px;
			color: #fff;
		}
	}
}
</style>
