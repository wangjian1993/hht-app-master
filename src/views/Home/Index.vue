<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中...</van-loading></div>
		<div class="content" v-show="isLoading">
			<div><p @click="loca()">刷新</p></div>
			<div @click="xmlay()">喜马拉雅</div>
			<div class="member-user">
				<div class="member-user-bg">
					<div class="member-user-img"><img src="../../assets/image/icon_headportrait@3x.png" alt="" /></div>
					<div class="member-user-name">
						<p>
							<span>{{ setPhone(userInfo.phone) }}</span>
						</p>
						<!-- 	<p>{{ memberInfoVip == 1 ? '会员有效期至:' + memberInfoTime : '您还不是会员，快去开通火火兔会员吧~' }}</p> -->
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
			<div class="member-pay" v-if="memberInfoVip == 1">
				<div class="member-header">
					<p style="color: #fff;">VIP会员权益包</p>
					<p @click="setRouter('membership', true)">使用兑换码</p>
				</div>
				<div class="card-list">
					<div
						class="member-pay-list"
						:class="cardIndex == index ? 'cardAction' : ''"
						v-for="(item, index) in cardList"
						:key="item.id"
						@click="cardClick(index, item.buyLink, item)"
					>
						<p>{{ item.validityDays }}天</p>
						<p>
							¥
							<span>{{ item.price }}</span>
						</p>
						<p>{{ item.expireTip }}</p>
					</div>
				</div>
				<div class="member-pay-btn">
					<!-- <div class="member-pay-btn-text" @click="cardPayBtn" v-if="buyOnePic == 360">
						<p>360元立即开通年卡会员</p>
						<p>赠送价值¥299火火兔G9S故事机</p>
					</div> -->
					<div class="member-pay-btn-text" @click="memberBtn">
						<p>
							立即开通
							<span>赠送早教机</span>
						</p>
					</div>
				</div>
			</div>
			<div class="member-introduce">
				<div class="member-header">
					<p>VIP权益介绍</p>
					<!-- <p @click="setRouter('member-equity', true)">
						查看全部
						<van-icon name="arrow" />
					</p> -->
				</div>
				<div class="member-introduce-list">
					<div class="member-introduce-list-box" v-for="(item, index) in equityList" v-if="index < 5" :key="index">
						<img :src="item.pics" alt="" />
						<p>{{ item.name }}</p>
					</div>
				</div>
			</div>
			<div class="member-exclusive">
				<div class="member-header">
					<p>会员省钱</p>
					<!-- <p @click="setRouter('more', true)">
						查看全部
						<van-icon name="arrow" />
					</p> -->
				</div>
				<div class="member-goods-list">
					<div class="member-goods-list-item" v-for="(item, index) in vipContent" :key="index" @click="musicDaile(item.url)" v-if="index < 3">
						<div class="list-item-img">
							<img :src="item.img" alt="" />
							<!-- <p class="list-item-img-sum">
								<img src="../../assets/image/home_conner_iconalbum@2x.png" alt="" />
								共{{ item.childResCount }}首
							</p> -->
						</div>
						<div class="member-exclusive-pic">
							<p class="goods-name van-ellipsis">{{ item.name }}</p>
							<div class="goods-pic">
								<p>
									¥
									<span>{{ item.subheading }}</span>
								</p>
								<p>
									¥
									<span>{{ item.subheading }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="member-exclusive">
				<div class="member-header">
					<p>VIP专享内容</p>
					<!-- <p @click="setRouter('more', true)">
						查看全部
						<van-icon name="arrow" />
					</p> -->
				</div>
				<div class="member-exclusive-list">
					<div class="member-exclusive-list-item" v-for="(item, index) in vipContent" :key="index" @click="musicDaile(item.url)">
						<div class="list-item-img">
							<img :src="item.img" alt="" />
							<!-- <p class="list-item-img-sum">
								<img src="../../assets/image/home_conner_iconalbum@2x.png" alt="" />
								共{{ item.childResCount }}首
							</p> -->
						</div>
						<div class="member-exclusive-pic">
							<p class="van-multi-ellipsis" :style="{ color: item.color }">{{ item.name }}</p>
							<p>
								<span :style="{ color: item.color }">原价¥{{ item.subheading }}</span>
							</p>
							<p :style="{ background: item.color }">会员畅听</p>
						</div>
					</div>
				</div>
			</div>
			<div class="member-exclusive">
				<div class="member-header"><p>VIP专享课程</p></div>
				<div class="member-early" @click="setRouter('education', true)"><img src="../../assets/image/2.png" alt="" /></div>
				<div class="member-early-text">
					<p>智慧早教课程</p>
					<p>根据宝宝成长关键期，每日更新课程内容</p>
				</div>
			</div>
			<div class="member-introduce" v-if="activeActivityList.length != 0">
				<div class="member-header">
					<p>VIP会员活动</p>
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
			<div class="member-introduce">
				<div class="member-header"><p>VIP专属客服</p></div>
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
					<p>VIP帮助中心</p>
					<p @click="setRouter('member-help', true)">
						查看全部
						<van-icon name="arrow" />
					</p>
				</div>
				<div class="member-help-list">
					<!-- <p v-for="(item, index) in helpList" :key="index">{{ index + 1 }}.{{ item.name }}</p> -->
					<van-collapse v-model="activeName" accordion>
						<van-collapse-item v-for="(item, index) in activeHelp" :key="index" :title="index + 1 + '.' + item.name" :name="index">
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
			message: 'dilidilibao',
			vipContent: [
				{
					name: '火火兔学古诗',
					url: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=1y922shpp6n7k&qr=paidcolumn_1y922shpp6n7k',
					img: require('../../assets/image/content1.png'),
					subheading: '19.90',
					color: '#2a7790'
				},
				{
					name: '火火兔绘本动画馆',
					url: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=3emxmywq5qny8&qr=paidcolumn_3emxmywq5qny8',
					img: require('../../assets/image/content2.png'),
					subheading: '99.00',
					color: '#ba8762'
				},
				{
					name: '火火兔世界艺术启蒙',
					url: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=2xael59ackx3k&qr=paidcolumn_2xael59ackx3k',
					img: require('../../assets/image/content3.png'),
					subheading: '9.90',
					color: '#66a277'
				},
				{
					name: '火火兔幼儿思维课堂',
					url: 'https://shop40802088.youzan.com/wscvis/knowledge/index?kdt_id=40609920&page=columnshow&alias=3et2bnyh42zk0&qr=paidcolumn_3et2bnyh42zk0',
					img: require('../../assets/image/content4.png'),
					subheading: '49.90',
					color: '#ab614f'
				}
			],
			userID: null
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
		xmlay() {
			try {
				let data = {
					albumId: 21051,
					title: '喜马拉雅专辑'
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.redirectXmlyMiniProgram.postMessage(data);
				} else {
					window.android.playCourse('redirectXmlyMiniProgram', JSON.stringify(data));
				}
			} catch (e) {
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
			this.$router.push({ name: val });
		},
		helpClick(index) {
			this.$router.push({ name: 'member-equity', query: { id: index } });
		},
		async getVipAll() {
			console.log('调用接口', localStorage.getItem('user'));
			// await this.$store.dispatch('setUserInfoAction');
			await this.$axios
				.getVipContent(1)
				.then(res => {
					this.audioList = res.data.data.list;
				})
				.catch(err => {});
			await this.$axios
				.getVipActivity()
				.then(res => {
					this.activityList = res.data.data.list;
				})
				.catch(err => {});
			await this.$axios
				.getUserHelp()
				.then(res => {
					this.helpList = res.data.data.list;
				})
				.catch(err => {});
			await this.$axios
				.getMemberCard()
				.then(res => {
					this.cardList = res.data.data.list;
					this.buyLink = this.cardList[0].buyLink;
					this.buyOnePic = this.cardList[0].price;
					this.buyOneArray = this.cardList[0];
					this.$store.dispatch('setEquityAction', this.buyOneArray.id);
				})
				.catch(err => {});
			setTimeout(res => {
				this.isLoading = true;
			}, 300);
		},
		//专属内容
		musicDaile(url) {
			// if (this.memberInfoVip == 0) {
			// 	this.$toast('请先开通会员');
			// 	return;
			// }
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
	components: {},
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
