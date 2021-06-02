<template>
	<div class="content" v-wechat-title="($route.meta.title = titleName)">
		<div class="list" v-for="(item, index) in list" :key="item.id" @click="details(item.id)">
			<div class="list-img"><img :src="item.coverImage" alt="" /></div>
			<div class="list-name">
				<p>{{ item.name }}</p>
				<p>
					<van-icon name="https://resource.alilo.com.cn/static/img/app/home_search_album%403x.png" size="18" />
					<span>共{{ item.childResCount }}首</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { timeCycle } from '@/common/util.js';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			list: [],
			id: 0,
			titleName: ''
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		this.id = this.$route.query.id;
		this.getMoreList();
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
		},
		getMoreList() {
			let data = {
				pageId: 97,
				channelId: 95
			};
			this.$axios
				.getAppPage(data)
				.then(res => {
					if (res.data.code == 1) {
						let list = res.data.data.activityVoList;
						list.forEach((item, index) => {
							if (item.id == this.id) {
								console.log(item);
								this.titleName = item.name;
								this.list = item.resList;
							}
						});
					} else {
						this.$toast.fail(res.data.info);
					}
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.content {
	padding-top: 20px;
}
.list {
	width: 345px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	padding-bottom: 13px;
	margin-bottom: 13px;
	border-bottom: 1px rgba(0, 0, 0, 0.04) solid;
	.list-img {
		width: 54px;
		height: 54px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
	.list-name {
		padding-left: 8px;
		p {
			display: flex;
			align-items: center;
			// justify-content: center;
			font-family: SourceHanSansCN-Regular;
			font-size: 15px;
			color: rgba(0, 0, 0, 0.74);
			padding: 5px 0;
			&:nth-of-type(2) {
				i {
					display: flex;
					align-items: center;
				}
				span {
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(0, 0, 0, 0.3);
					display: flex;
					align-items: center;
				}
			}
		}
	}
}
</style>
