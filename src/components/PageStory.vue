<template>
	<div class="story-content">
		<div class="story-swipe" v-if="pageList.type == 70">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(image, index) in pageList.resList" :key="index"><img @click="banner(image)" :src="image.coverImage" /></van-swipe-item>
			</van-swipe>
		</div>
		<div class="story-list" v-if="pageList.type == 40">
			<div class="album-title">
				<p>{{ pageList.name }}</p>
				<p class="album-more" @click="more(pageList.id)">
					查看全部
					<span><van-icon name="arrow" /></span>
				</p>
			</div>
			<div class="album-list">
				<ul>
					<li
						v-for="(item, index) in pageList.resList"
						:key="item.id"
						v-if="index < pageList.columnStyle[0].column * pageList.columnStyle.length"
						:class="'listStyle' + pageList.columnStyle[0].column"
						@click="details(item.id)"
					>
						<div class="list-img">
							<img class="list-cover" :src="item.coverImage" alt="" />
							<div class="list-tag" v-if="item.isPay == 1"><span>付费</span></div>
							<div class="list-time">
								<van-icon name="https://resource.alilo.com.cn/static/img/home_conner_iconalbum%402x.png" size="8" />
								<span>{{ item.childResCount }}首</span>
							</div>
						</div>
						<div class="list-text">
							<p class="van-multi-ellipsis--l2">{{ item.name }}</p>
							<p class="van-multi-ellipsis--l2">{{ item.subName }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: ['pageList'],
	data() {
		return {};
	},
	created() {
		console.log(this.pageList);
	},
	computed: {
		...mapState(['system'])
	},
	methods: {
		banner(item) {
			console.log(item.links);
			let id = item.links.split('+');
			console.log(id);
			if (id[0] == 40) {
				try {
					let data = {
						albumId: id[1],
						channelId: 95
					};
					// window._czc.push(['_trackEvent', '火火兔学古诗', '点击', item.name]);
					if (this.system == 'ios') {
						console.log('ios');
						console.log(data);
						window.webkit.messageHandlers.albumDetail_paid.postMessage(data);
					} else {
						window.android.playCourse('albumDetail_paid', JSON.stringify(data));
					}
				} catch (e) {
					//TODO handle the exception
					this.$toast('请更新APP');
				}
			} else {
				try {
					let data = {
						url: item.links
					};
					window._czc.push(['_trackEvent', '火火兔付费专区', '点击', '轮播图']);
					if (this.system == 'ios') {
						window.webkit.messageHandlers.web_navigite.postMessage(data);
					} else {
						window.android.playCourse('web_navigite', JSON.stringify(data));
					}
				} catch (e) {
					window.location.href = item.links;
					// this.$router.push({ name: 'story-more', query: { id: id } });
					//TODO handle the exception
				}
			}
		},
		onRedirect() {
			window._czc.push(['_trackEvent', '火火兔APP', '路由', '跳转登陆']);
			if (this.system == 'ios') {
				window.webkit.messageHandlers.web_login.postMessage(null);
			} else {
				window.android.playCourse('web_login', '');
			}
		},
		more(id) {
			try {
				let data = {
					url: 'http://h5.alilo.com.cn/member/index.html#/apppage/story-more?id=' + id
				};
				window._czc.push(['_trackEvent', '火火兔付费专区', '点击', '查看更多']);
				if (this.system == 'ios') {
					window.webkit.messageHandlers.web_navigite.postMessage(data);
				} else {
					window.android.playCourse('web_navigite', JSON.stringify(data));
				}
			} catch (e) {
				this.$router.push({ name: 'story-more', query: { id: id } });
				//TODO handle the exception
			}
		},
		details(id) {
			// if (localStorage.getItem('user') == '') {
			// 	this.$toast('请先登陆');
			// 	this.onRedirect();
			// 	return;
			// }
			try {
				let data = {
					albumId: id,
					channelId: 95
				};
				// window._czc.push(['_trackEvent', '火火兔学古诗', '点击', item.name]);
				if (this.system == 'ios') {
					console.log('ios');
					console.log(data);
					window.webkit.messageHandlers.albumDetail_paid.postMessage(data);
				} else {
					window.android.playCourse('albumDetail_paid', JSON.stringify(data));
				}
			} catch (e) {
				//TODO handle the exception
				this.$toast('请更新APP');
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.story-swipe {
	width: 346px;
	height: 146px;
	margin: 0 auto;
	padding-top: 10px;
	img {
		width: 346px;
		height: 146px;
		border-radius: 10px;
	}
}
.album-more {
	font-size: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgba(0, 0, 0, 0.5);
	font-family: PingFangSC-Regular;
	span {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.album-title {
	width: 345px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	margin-top: 37px;
	align-items: center;
	p {
		&:nth-of-type(1) {
			font-family: PingFangSC-Semibold;
			font-size: 18px;
			color: rgba(0, 0, 0, 0.7);
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
	padding-bottom: 21px;
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
.listStyle3 {
	width: 109px;
	padding-bottom: 22px;
	.list-img {
		width: 109px;
		width: 109px;
		position: relative;
		.list-cover {
			width: 109px;
			width: 109px;
			border-radius: 8px;
		}
	}
}
.list-text {
	p {
		&:nth-of-type(1) {
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: rgba(0, 0, 0, 0.7);
			padding: 6px 0;
			line-height: 1.5;
		}
		&:nth-of-type(2) {
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: rgba(0, 0, 0, 0.3);
			line-height: 1.5;
		}
	}
}
.list-time {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 5px 8px;
	height: 20px;
	// background-color: rgba(0, 0, 0, 0.2);
	// border-radius: 0 8px 0 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 20px;
		height: 20px;
	}
	span {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		padding-left: 3px;
		color: #ffffff;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
	}
}
.list-tag {
	width: 36px;
	height: 18px;
	position: absolute;
	top: 0;
	right: 0;
	background-image: linear-gradient(142deg, #ff5656 0%, #ff6087 100%);
	box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04);
	border-radius: 0px 8px 0px 8px;
	text-align: center;
	line-height: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	span {
		color: #fff;
		font-size: 10px;
	}
}
</style>
