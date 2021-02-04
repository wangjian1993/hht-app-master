<template>
	<div :class="system == 'ios' ? 'goods-content' : 'content'">
		<div class="goods-banner" @click="goodsDatile()"><img src="https://resource.alilo.com.cn/static/img/788CA1FB-7E4F-4A8A-9D73-FBDB23E9D978-5980-00000492B163E441-2.png" alt="" /></div>
		<div class="goods-divder"><van-divider>推荐适合宝宝的产品</van-divider></div>
		<div v-if="isList" v-for="item in list"><goods-list :yzItem="item"></goods-list></div>
	</div>
</template>

<script>
import GoodsList from '../../components/GoodsList.vue';
import Debug from '../../components/debug.vue';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import { getGrowAge, getDayTime } from '../../common/util.js';
import Axios from 'axios';
export default {
	data() {
		return {
			ageGoodsList: [],
			age1GoodsList: [],
			age2GoodsList: [],
			age3GoodsList: [],
			age6GoodsList: [],
			topGoodsList: [],
			newGoodsList: [],
			list: {
				age: {
					data: [],
					style: 3
				},
				top: {
					data: [],
					style: 2
				},
				new: {
					data: [],
					style: 1
				}
			},
			isList: false,
			msg: null,
			age: 0,
			text: null
		};
	},
	computed: {
		...mapState(['system', 'userBaby'])
	},
	created() {
		this.getYzGoods();
		let baby = JSON.parse(localStorage.getItem('babyText'));
		this.msg = getGrowAge(baby.birthday);
		this.age = this.countAge(this.msg[0], this.msg[1]);
		this.text = baby;
	},
	methods: {
		countAge(year, month) {
			var sum = year * 12 + month;
			// console.log('nianling,', sum);
			if (sum < 13) {
				return 1;
			} else if (sum >= 13 && sum < 24) {
				return 2;
			} else if (sum >= 24 && sum < 36) {
				return 3;
			} else if (sum >= 36 && sum < 72) {
				return 6;
			} else {
				return 0;
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
		goodsDatile(url, name) {
			if (localStorage.getItem('user') == '') {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			let log = {
				event: 'shop_click',
				user_id: localStorage.getItem('user'),
				uuid: localStorage.getItem('user'),
				id: 13,
				url: 'https://shop40802088.m.youzan.com/wscgoods/detail/2ogllifx66840?step=2',
				channel_id: 65,
				os: this.system,
				create_time: getDayTime()
			};
			window._czc.push(['_trackEvent', '火火兔早教玩具', '点击', '早教玩具banner']);
			try {
				let data = {
					url: 'https://shop40802088.m.youzan.com/wscgoods/detail/2ogllifx66840?step=2',
					isHW: false
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPause.postMessage(null);
					window.webkit.messageHandlers.redirectToYZ.postMessage(data);
				} else {
					window.android.playCourse('redirectToYZ', JSON.stringify(data));
				}
				Axios.post('http://big.data.alilo.com.cn/track/app', log)
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				console.log(e);
				//TODO handle the exception
			}
		},
		getYzGoods() {
			let self = this;
			self.$axios
				.getYzGoods()
				.then(res => {
					if (res.data.code == 1) {
						let yzList = res.data.data.list;
						yzList.forEach(function(item) {
							switch (item.activityColumn) {
								case 10:
									self.age1GoodsList.push(item);
									break;
								case 20:
									self.age2GoodsList.push(item);
									break;
								case 30:
									self.age3GoodsList.push(item);
									break;
								case 40:
									self.age6GoodsList.push(item);
									break;
								case 50:
									self.ageGoodsList.push(item);
									break;
								case 60:
									self.topGoodsList.push(item);
									break;
								case 70:
									self.newGoodsList.push(item);
									break;
								default:
									break;
							}
						});
						if (self.age != 0) {
							let listName = 'age' + self.age + 'GoodsList';
							console.log('结果====', eval('self.' + listName)); // 这个函数返回的就是数组test
							let list = eval('self.' + listName);
							self.list.age.data = list;
						} else {
							self.list.age.data = self.ageGoodsList;
						}
						self.list.top.data = self.topGoodsList;
						self.list.new.data = self.newGoodsList;
						console.log(self.list);
						self.isList = true;
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
	components: {
		GoodsList,
		Debug
	}
};
</script>

<style lang="less" scoped>
.content{
	padding-bottom: 20px;
}
.goods-divder{
	width: 345px;
	margin: 0 auto;
}
.goods-content {
	padding-bottom: 144px;
}
.goods-banner {
	width: 345px;
	height: 160px;
	margin: 0 auto;
	img {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
}
</style>
