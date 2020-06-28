<template>
	<div class="app">
		<v-header-icon v-if="isHeader == 1"></v-header-icon>
		<!-- <v-header :title="title" v-if="isHeader == 1"></v-header> -->
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中...</van-loading></div>
		<div class="content" v-show="isLoading">
			<div><button @click="loca()">刷新</button></div>
			<div class="member-user">
				<div class="member-user-bg">
					<div class="member-user-img"><img src="../../assets/image/icon_headportrait@3x.png" alt="" /></div>
					<div class="member-user-name">
						<p>
							<span>{{ setPhone(userInfo.phone) }}</span>
						</p>
					</div>
					<div class="member-icon">
						<span>
							<img src="../../assets/image/my_vip_icon@3x.png" v-if="memberInfoVip == 1" alt="" />
							<img src="../../assets/image/my_vip_blkicon@3x.png" v-else alt="" />
						</span>
						<p>{{ memberInfoVip == 1 ? '尊享会员' : '未开通会员' }}</p>
					</div>
				</div>
			</div>
			<div class="member-pay" v-if="memberInfoVip == 0">
				<div class="member-header" style="margin: 0 auto;padding: 24px 15px 22px 15px;">
					<p style="color: #f7ece6;">会员服务类型</p>
					<p style="color: rgba(247, 236, 230, 0.5);" @click="setRouter('membership', true)">使用兑换码</p>
				</div>
				<div class="card-list">
					<div
						class="member-pay-list"
						:class="cardIndex == index ? 'cardAction' : ''"
						v-for="(item, index) in cardList"
						:key="item.id"
						@click="cardClick(index, item.buyLink, item)"
					>
						<div class="card-limit" v-if="ToText(item.introduce) == '限时'">限时</div>
						<p>{{ item.validityDays }}天</p>
						<p>
							¥
							<span>{{ item.price }}</span>
						</p>
						<p>{{ item.expireTip }}</p>
					</div>
				</div>
				<div class="member-pay-btn">
					<div class="member-pay-btn-text" @click="memberBtn">
						<p>
							立即开通
							<span v-if="buyOnePic == '360'">赠送早教机</span>
						</p>
					</div>
				</div>
			</div>
			<div class="member-introduce" :class="memberInfoVip == 1 ? 'member-introduce-top' : ''">
				<div class="member-header" style="padding: 24px 15px 22px 15px;margin: 0 auto;"><p>会员权益</p></div>
				<div class="member-introduce-list">
					<div class="member-introduce-list-box" v-for="(item, index) in equityList" v-if="index < 6" :key="index">
						<img :src="item.pics" alt="" />
						<p>{{ item.name }}</p>
					</div>
				</div>
			</div>
			<div class="xmlyimg" @click="getXMLY"><img src="../../assets/image/lALPBGKoZ10Ob2t6zQKS_658_122.png" alt="" /></div>
			<div class="member-exclusive">
				<div class="member-header">
					<p>火火兔x喜马拉雅儿童专区</p>
					<p @click="xmlay()">
						查看全部
						<van-icon name="arrow" />
					</p>
				</div>
				<div class="member-goods-list">
					<div class="member-goods-list-item" v-for="(item, index) in xmlyContent" :key="index" @click="xmlay(item.id, item.name, 0)" v-if="index < 3">
						<div class="list-item-img"><img :src="item.img" alt="" /></div>
						<div class="member-exclusive-pic">
							<p class="goods-name van-multi-ellipsis--l2">{{ item.name }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="member-exclusive">
				<div class="member-header"><p>会员省钱</p></div>
				<div class="member-goods-list">
					<div class="member-goods-list-item" v-for="(item, index) in vipGoods" :key="index" @click="musicDaile(item.url, true)" v-if="index < 3">
						<div class="list-item-img"><img :src="item.img" alt="" /></div>
						<div class="member-exclusive-pic">
							<p class="goods-name van-ellipsis">{{ item.name }}</p>
							<div class="goods-pic">
								<p>
									¥
									<span>{{ item.currentprice }}</span>
								</p>
								<p>
									¥
									<span>{{ item.originalprice }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="member-exclusive">
				<div class="member-header"><p>会员专享内容</p></div>
				<div class="member-exclusive-list">
					<div class="member-exclusive-list-item" v-for="(item, index) in vipContent" :key="index" @click="musicDaile(item.url)">
						<div class="list-item-img"><img :src="item.img" alt="" /></div>
						<!-- <div class="member-exclusive-pic">
							<p class="van-multi-ellipsis" :style="{ color: item.color }">{{ item.name }}</p>
							<p :style="{ color: item.color }">
								原价¥{{ item.subheading }}
							</p>
							<span class="exclusive-btn" :style="{ background: item.color }">会员畅听</span>
						</div> -->
					</div>
				</div>
			</div>
			<div class="member-exclusive">
				<div class="member-header"><p>会员专享课程</p></div>
				<div class="member-early" @click="setRouter('/education', true)"><img src="../../assets/image/2.png" alt="" /></div>
				<div class="member-early-text">
					<p>智慧早教课程</p>
					<p>根据宝宝成长关键期，每日更新课程内容</p>
				</div>
			</div>
			<div class="member-introduce" v-if="activeActivityList.length != 0">
				<div class="member-header">
					<p>会员专享活动</p>
					<p @click="setRouter('member-activity')" v-if="activeActivityList.length > 2">
						查看全部
						<van-icon name="arrow" />
					</p>
				</div>
				<div class="member-activity-list">
					<div class="member-activity-list-item" v-for="(item, index) in activeActivityList" @click="activityRouter(item.links)">
						<img :src="item.coverImage" alt="" />
						<p>{{ item.name }}</p>
					</div>
				</div>
			</div>
			<div class="member-introduce member-service">
				<div class="member-header" style="padding: 24px 12px 22px 12px;margin: 0 auto;"><p>会员专享客服</p></div>
				<div class="member-service-list">
					<div class="member-service-list-item" @click="serviceBox()">
						<img src="../../assets/image/boy_customer@3x.png" alt="" />
						<p>
							<span>火火兔客服</span>
							<span>工作日 8:30—18:00在线</span>
						</p>
						<p>咨询</p>
					</div>
				</div>
			</div>
			<div class="member-introduce member-help-content" v-if="activeHelp.length != 0">
				<div class="member-header">
					<p>会员帮助中心</p>
					<p @click="setRouter('member-help', true)">
						查看全部
						<van-icon name="arrow" />
					</p>
				</div>
				<div class="member-help-list">
					<!-- <p v-for="(item, index) in helpList" :key="index">{{ index + 1 }}.{{ item.name }}</p> -->
					<van-collapse v-model="activeName" accordion>
						<van-collapse-item v-for="(item, index) in activeHelp" :key="index" :title="index + 1 + '.' + item.name" :name="index" :border="false">
							<div v-html="item.content"></div>
						</van-collapse-item>
					</van-collapse>
				</div>
			</div>
			<div class="member-buy" v-if="memberInfoVip == 0 && buyArray.length != 0">
				<div class="member-buy-box">
					<div class="member-buy-left">
						<p>{{ buyArray.name }}</p>
						<p>
							<span>¥ {{ buyArray.price }}</span>
							{{ buyArray.giftName }}
						</p>
					</div>
					<div class="member-buy-right"><p>立刻开通</p></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Header from '@/components/Header.vue';
import Global from '@/common/global.js';
import HeaderIcon from '@/components/HeaderIcon.vue';
import * as CONSTANTS from '@/constants/index';
export default {
	data() {
		return {
			isLoading: false,
			activityList: [],
			helpList: [],
			audioList: [],
			cardList: [],
			cardIndex: 0,
			buyLink: null,
			buyOnePic: null,
			buyArray: [],
			buyOneArray: [],
			activeName: '0',
			isHeader: 0,
			message: 'dilidilibao',
			userID: null,
			title: '会员中心',
			vipGoods: Global.vipGoods,
			vipContent: Global.vipContent,
			xmlyContent: Global.xmlyContent
		};
	},
	computed: {
		...mapState(['equityList', 'system', 'babyInfo', 'memberInfoVip', 'userInfo', 'memberInfoTime']),
		activeHelp: function() {
			return this.helpList.filter(function(item, index) {
				return index < 4;
			});
		},
		activeActivityList: function() {
			var idx = 0;
			return this.activityList.filter(function(item, index, array) {
				if (item.activityStateStr == '进行中') {
					idx += 1;
					if (idx < 3) {
						return item;
					}
				}
			});
		}
	},
	created() {
		const { isHeader } = this.$route.query;
		this.isHeader = isHeader;

		console.warn('isHeader');
		console.log(isHeader);
		console.log('\n');

		//判断是否有用户id
		this.userID = localStorage.getItem('user');
		if (this.userID == null) {
			this.$router.push({ name: 'error' });
			return;
		}
		this.getVipAll();
	},
	mounted() {},
	methods: {
		// ...mapActions(['setUserInfoAction', 'setEquityAction']),
		cardClick(index, url, data) {
			this.cardIndex = index;
			this.buyLink = url;
			this.buyArray = data;
			this.buyOneArray = data;
			this.buyOnePic = data.price;
			this.$store.dispatch('setEquityAction', this.buyOneArray.id);
		},
		timestampToTime(cjsj) {
			var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return Y + M + D + h + m + s;
		},
		/**
		 *跳转喜马拉雅小程序
		 */
		xmlay(id, name, type) {
			let userid = localStorage.getItem('user');
			console.log('id==', id);
			console.log('name==', name);
			console.log('type==', type);
			try {
				let data;
				if (type == 0) {
					data = {
						mini_program_id: 'gh_c7ae9c51172b',
						path: '/src/xxmPages/album/index?type=23&supplier=xxm&source=alilo&appkey=5a038226a57546a3b8beee9ec12c6ce6&id=' + id + '&title=' + name + '&huid=' + userid
					};
				} else {
					data = {
						mini_program_id: 'gh_c7ae9c51172b',
						path: '/src/pages/home/index?appkey=5a038226a57546a3b8beee9ec12c6ce6&huid=' + userid
					};
				}
				// console.log('跳转喜马拉雅===', data)
				if (this.system == 'ios') {
					window.webkit.messageHandlers.redirectMiniProgram.postMessage(data);
				} else {
					window.android.playCourse('redirectMiniProgram', JSON.stringify(data));
				}
			} catch (e) {
				console.log('e====', e);
				this.$toast('请更新新版火火兔APP');
				//TODO handle the exception
			}
		},
		/**
		 * 开通会员卡跳转有赞
		 * */
		memberBtn() {
			try {
				let data = {
					url: this.buyLink
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.redirectToYZ.postMessage(data);
				} else {
					window.android.playCourse('redirectToYZ', JSON.stringify(data));
				}
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				//TODO handle the exception
			}
		},
		//客服
		serviceBox() {
			if (this.memberInfoVip == 0) {
				this.$toast('请先开通会员');
				return;
			}
			this.$dialog
				.alert({
					title: '客服',
					message: '添加客服微信：dilidilibao'
				})
				.then(() => {
					// on close
					this.$copyText(this.message).then(
						res => {
							this.$toast('微信号复制成功!');
						},
						err => {
							// alert('Can not copy');
						}
					);
				});
		},
		activityRouter(url) {
			console.log(this.memberInfoVip);
			if (this.memberInfoVip == 0) {
				this.$toast('请先开通会员');
				return;
			}
			location.href = url;
		},
		setPhone(tel) {
			try {
				return tel.replace(tel.substring(3, 7), '****');
			} catch (e) {
				return '火火兔用户';
				//TODO handle the exception
			}
		},
		loca() {
			location.reload();
			// this.$router.push({ name: 'course/index' });
		},
		cardPayBtn() {
			console.log('调用支付===========', this.babyInfo);
			if (this.buyLink == null) {
				this.$toast('请选择要开通的会员卡');
				return;
			}
			this.$router.push({ name: 'purchase-help', query: { url: this.buyLink } });
		},
		setRouter(val, flag) {
			if (this.memberInfoVip == 0 && !flag) {
				this.$toast('请先开通会员');
				return;
			}
			// this.$router.push({ name: val })
			this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
				path: val
			});
		},
		helpClick(index) {
			this.$router.push({ name: 'member-equity', query: { id: index } });
		},
		getXMLY() {
			if (this.memberInfoVip == 0) {
				this.$toast('请先开通会员');
				return;
			}
			this.$axios
				.getXMLYVip(this.userID, 7)
				.then(res => {
					if (res.data.code == 1) {
						let msg;
						if (res.data.info == '用户已领取') {
							msg = '你已经领取过喜马拉雅会员!';
						} else {
							msg = '你已成功领取7天喜马拉雅会员！';
						}
						this.$dialog
							.confirm({
								message: msg,
								confirmButtonText: '立即查看'
							})
							.then(() => {
								this.xmlay();
							})
							.catch(() => {
								// on cancel
							});
					}
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		},
		async getVipAll() {
			console.log('调用接口', localStorage.getItem('user'));
			// await this.$store.dispatch('setUserInfoAction');
			await this.$axios
				.getVipContent(1)
				.then(res => {
					this.audioList = res.data.data.list;
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
			await this.$axios
				.getVipActivity()
				.then(res => {
					this.activityList = res.data.data.list;
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
			await this.$axios
				.getUserHelp()
				.then(res => {
					this.helpList = res.data.data.list;
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
			await this.$axios
				.getMemberCard()
				.then(res => {
					this.cardList = res.data.data.list;
					this.buyLink = this.cardList[0].buyLink;
					this.buyOnePic = this.cardList[0].price;
					this.buyOneArray = this.cardList[0];
					this.$store.dispatch('setEquityAction', this.buyOneArray.id);
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
			setTimeout(res => {
				this.isLoading = true;
			}, 300);
		},
		//专属内容
		musicDaile(url, isVip) {
			if (this.memberInfoVip == 0 && isVip) {
				this.$toast('请先开通会员');
				return;
			}
			try {
				let data = {
					url: url
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPause.postMessage(null);
					window.webkit.messageHandlers.redirectToYZ.postMessage(data);
				} else {
					window.android.playCourse('redirectToYZ', JSON.stringify(data));
				}
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				//TODO handle the exception
			}
		},
		ToText(HTML) {
			var input = HTML;
			return input
				.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
				.replace(/<[^>]+?>/g, '')
				.replace(/\s+/g, ' ')
				.replace(/ /g, ' ')
				.replace(/>/g, ' ');
		}
	},
	components: {
		'v-header': Header,
		'v-header-icon': HeaderIcon
	},
	watch: {
		a(val, oldVal) {
			//普通的watch监听
			console.log('a:===========' + val, oldVal);
		}
	}
};
</script>
<style lang="less" scoped>
@import '../../assets/css/index.less';
</style>
