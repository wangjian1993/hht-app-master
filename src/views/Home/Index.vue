<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中...</van-loading></div>
		<div class="content" v-show="isLoading">
			<!-- <debug></debug> -->
			<div class="member-user">
				<div class="member-user-bg">
					<div class="member-user-img"><img src="../../assets/image/icon_headportrait@3x.png" alt="" /></div>
					<div class="member-user-name">
						<p>
							<span>{{ setPhone(userInfo.phone) }}</span>
						</p>
						<p>{{ memberInfoVip == 1 ? memberInfoTime + '到期' : '您还不是会员，快去开通吧～' }}</p>
					</div>
					<div class="member-icon">
						<span>
							<img src="../../assets/image/my_vip_icon@3x.png" v-if="memberInfoVip == 1" alt="" />
							<img src="../../assets/image/my_vip_blkicon@3x.png" v-else alt="" />
						</span>
						<p>{{ memberInfoVip == 1 ? '尊贵会员' : '未开通会员' }}</p>
					</div>
				</div>
			</div>
			<div class="member-pay" v-if="memberInfoVip == 0">
				<div class="member-header" style="margin: 0 auto;padding: 24px 15px 22px 15px;">
					<p style="color: #f7ece6;">会员服务类型</p>
					<p style="color: rgba(247, 236, 230, 0.5);" @click="setRouter('/membership', true, true)">使用兑换码</p>
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
						<p class="card-pic">
							<span>¥</span>
							<span>{{ item.price }}</span>
							<span>¥</span>
						</p>
						<p class="van-multi-ellipsis--l2">{{ item.expireTip }}</p>
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
				<div class="member-header" :class="memberInfoVip == 1 ? 'member-header-active' : 'member-header-active1'"><p>会员权益</p></div>
				<div class="member-introduce-list" :class="memberInfoVip == 1 ? 'member-introduce-list-box-active' : 'member-introduce-list-box-active1'">
					<div class="member-introduce-list-box" v-for="(item, index) in equityList" v-if="index < 6" :key="index" @click="goAnchor('#anchor-' + index)">
						<img :src="item.pics" alt="" />
						<p>{{ item.name }}</p>
					</div>
				</div>
			</div>
			<div class="xmlyimg" @click="getXMLY"><img src="https://resource.alilo.com.cn/static/img/lALPBGKoZ10Ob2t6zQKS_658_122.d268ce0f.png" alt="" /></div>
			<div class="member-exclusive">
				<div class="member-header member-header-pd6">
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
			<div class="member-exclusive" id="anchor-2">
				<div class="member-header member-header-pd1"><p>会员省钱</p></div>
				<div class="member-goods-list">
					<div class="member-goods-list-item" v-for="(item, index) in vipGoods" :key="index" @click="musicDaile(item.url, false)" v-if="index < 3">
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
			<div class="member-exclusive" id="anchor-0">
				<div class="member-header member-header-pd2"><p>会员专享内容</p></div>
				<div class="member-exclusive-list">
					<div class="member-exclusive-list-item" v-for="(item, index) in vipContent" :key="index" @click="musicDaile(item.url, item.name)">
						<div class="list-item-img"><img :src="item.img" alt="" /></div>
					</div>
				</div>
			</div>
			<div class="member-exclusive" id="anchor-1">
				<div class="member-header member-header-pd3"><p>会员专享课程</p></div>
				<div class="member-early" @click="Education()"><img src="../../assets/image/2.png" alt="" /></div>
				<div class="member-early-text">
					<p>智慧早教课程</p>
					<p>根据宝宝成长关键期，每日更新课程内容</p>
				</div>
			</div>
			<div class="member-introduce" id="anchor-3" v-if="activeActivityList.length != 0">
				<div class="member-header member-header-pd2"><p>会员专享活动</p></div>
				<div class="english-activity" @click="activityRouter('https://m.ximalaya.com/ort/router/presale/extraConsume/110?sharerId=147770569', '牛津树英语启蒙课程')">
					<img src="https://resource.alilo.com.cn/static/img/111110000.cf781476.jpg" alt="" />
					<p>牛津树英语启蒙课程</p>
				</div>
				<div class="member-activity-list">
					<div class="member-activity-list-item" v-for="(item, index) in activeActivityList" @click="activityRouter(item.links)">
						<img :src="item.coverImage" alt="" />
						<p>{{ item.name }}</p>
					</div>
				</div>
			</div>
			<div class="member-introduce member-service" id="anchor-4">
				<div class="member-header member-header-pd4"><p>会员专享客服</p></div>
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
			<div class="member-introduce member-help-content" v-if="activeHelp.length != 0" id="anchor-5">
				<div class="member-header member-header-pd5">
					<p>会员帮助中心</p>
					<p @click="setRouter('/member-help', true)">
						查看全部
						<van-icon name="arrow" />
					</p>
				</div>
				<div class="member-help-list">
					<van-collapse v-model="activeName" accordion>
						<!-- <van-collapse-item title="1.购买VIP年卡后如何领取早教机赠品？" name="1" :border="false">
							<div @click="navigite('https://j.youzan.com/9Fm9NM')" style="color: #0088CC;">点此查看VIP年卡激活状态和领取早教机赠品</div>
						</van-collapse-item> -->
						<van-collapse-item v-for="(item, index) in activeHelp" :key="index" :title="index + 1 + '.' + item.name" :name="index + 1" :border="false">
							<div v-html="item.content"></div>
						</van-collapse-item>
					</van-collapse>
				</div>
			</div>
			<div class="footer"><p @click="loca()">已经到底啦~</p></div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Header from '@/components/Header.vue';
import Global from '@/common/global.js';
import HeaderIcon from '@/components/HeaderIcon.vue';
import debug from '@/components/debug.vue';
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
			hwUrl: null,
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
			xmlyContent: Global.xmlyContent,
			isSite: false
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
		// if (this.system == 'ios' && localStorage.getItem('user') == '') {
		// 	this.$toast('请先登陆');
		// 	window.webkit.messageHandlers.web_login.postMessage(null);
		// 	return;
		// }
		try {
			if (this.system == 'android') {
				this.isSite = window.android.isHWChannel();
				console.log('this.isSite ', this.isSite);
			}
		} catch (e) {
			//TODO handle the exception
		}
		//判断是否有用户id
		this.userID = localStorage.getItem('user');
		this.getVipAll();
	},
	mounted() {},
	methods: {
		goAnchor(selector) {
			let anchor = this.$el.querySelector(selector);
			//document.documentElement.scrollTop = anchor.offsetTop;
			let total = anchor.offsetTop;
			// 平滑滚动，时长500ms，每10ms一跳，共50跳
			// 获取当前滚动条与窗体顶部的距离
			let distance = document.documentElement.scrollTop || document.body.scrollTop;
			// 计算每一小段的距离
			let step = total / 50;
			(function smoothDown() {
				if (distance < total) {
					distance += step; // 移动一小段
					document.body.scrollTop = distance;
					document.documentElement.scrollTop = distance; // 设定每一次跳动的时间间隔为10ms
					setTimeout(smoothDown, 10);
				} else {
					// 限制滚动停止时的距离
					document.body.scrollTop = total;
					document.documentElement.scrollTop = total;
				}
			})();
		},
		Education() {
			let self = this;
			this.$axios
				.userApplyTime(localStorage.getItem('cid'))
				.then(res => {
					if (res.data.code == 1) {
						console.log('已经报名=====', res.data);
						if (localStorage.getItem('babyId') == res.data.babyId) {
							this.navigite('http://wifi.alilo.com.cn/xiaohai/hht/course/index.html#/wisdom-course/index');
						} else {
							this.navigite('http://wifi.alilo.com.cn/xiaohai/hht/course/index.html#/course/smart-course');
						}
					} else {
						this.navigite('http://wifi.alilo.com.cn/xiaohai/hht/course/index.html#/wisdom-course/introduction');
					}
				})
				.catch(err => {});
		},
		navigite(url) {
			if (localStorage.getItem('user') == '') {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			if (this.memberInfoVip == 0) {
				this.$toast('请先开通会员');
				return;
			}
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '智慧早教']);
			try {
				let data = {
					url: url
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.web_navigite.postMessage(data);
				} else {
					window.android.playCourse('web_navigite', JSON.stringify(data));
				}
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				//TODO handle the exception
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
		// ...mapActions(['setUserInfoAction', 'setEquityAction']),
		cardClick(index, url, data) {
			console.log(':data', data);
			this.cardIndex = index;
			this.buyLink = url;
			this.buyArray = data;
			this.hwUrl = data.youzanProductNumber;
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
			if (localStorage.getItem('user') == '') {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			window._czc.push(['_trackEvent', '火火兔APP', '路由', '进入喜马拉雅', name]);
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
			if (localStorage.getItem('user') == '') {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '开通会员' + this.buyOnePic]);
			if (this.buyOnePic == 360) {
				console.log('华为====');
				this.cardPayBtn();
			} else {
				console.log('不是华为====');
				try {
					let data = {
						url: this.buyLink,
						hwUrl: 'vip_' + this.hwUrl,
						productType: 0,
						isHW: true
					};
					console.log(data);
					if (this.system == 'ios') {
						window.webkit.messageHandlers.redirectToYZ.postMessage(data);
					} else {
						window.android.playCourse('redirectToYZ', JSON.stringify(data));
					}
				} catch (e) {
					this.$toast('请更新新版火火兔APP');
					//TODO handle the exception
				}
			}
		},
		//客服
		serviceBox() {
			// if (this.memberInfoVip == 0) {
			// 	this.$toast('请先开通会员');
			// 	return;
			// }
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '客服']);
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
			if (localStorage.getItem('user') == '') {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			if (this.memberInfoVip == 0) {
				this.$toast('请先开通会员');
				return;
			}
			// location.href = url;
			try {
				let data = {
					url: url
				};
				console.log('跳转地址====', url);
				if (this.system == 'ios') {
					window.webkit.messageHandlers.web_navigite.postMessage(data);
				} else {
					window.android.playCourse('web_navigite', JSON.stringify(data));
				}
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				//TODO handle the exception
			}
			// console.log('跳转地址', url);
			// this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
			// 	path: url
			// });
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
			// location.reload();
			location.href = 'http://h5.alilo.com.cn/membert/index.html';
			// this.$router.push({ name: 'course/index' });
		},
		cardPayBtn() {
			try {
				let data = {
					url: 'http://h5.alilo.com.cn/member/index.html#/add-site?buyLink=' + this.buyLink + '&hwUrl=' + this.hwUrl
				};
				// if (this.system == 'ios') {
				// 	// console.log('跳转地址', url);
				// 	this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
				// 		path: '/add-site',
				// 		query: {
				// 			buyLink: this.buyLink,
				// 			hwUrl: this.hwUrl
				// 		}
				// 	});
				// 	// window.webkit.messageHandlers.web_navigite.postMessage(data);
				// } else {
				// 	window.android.playCourse('web_navigite', JSON.stringify(data));
				// }
				this.$router.push({ name: 'add-site', query: { buyLink: this.buyLink, hwUrl: this.hwUrl } });
			} catch (e) {
				console.log(e);
				this.$toast('请更新新版火火兔APP');
				//TODO handle the exception
			}
		},
		/*
		 * @val :跳转地址
		 * flag: 非会员是否能进入
		 * islogin :是否需要登录
		 */
		setRouter(val, flag, islogin) {
			if (localStorage.getItem('user') == '' && islogin) {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			if (this.memberInfoVip == 0 && !flag) {
				this.$toast('请先开通会员');
				return;
			}
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '跳转页面']);
			this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
				path: val
			});
		},
		helpClick(index) {
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '帮助更多']);
			this.$router.push({ name: 'member-equity', query: { id: index } });
		},
		getXMLY() {
			if (localStorage.getItem('user') == '') {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			if (this.memberInfoVip == 0) {
				this.$toast('请先开通会员');
				return;
			}
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '领取喜马拉雅会员']);
			this.$axios
				.getXMLYVip(this.userID, 30)
				.then(res => {
					if (res.data.code == 1) {
						let msg;
						if (res.data.info == '用户已领取') {
							msg = '你已经领取过喜马拉雅会员!';
						} else {
							msg = '你已成功领取30天喜马拉雅会员！';
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
					this.hwUrl = this.cardList[0].youzanProductNumber;
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
		musicDaile(url, name) {
			if (localStorage.getItem('user') == '') {
				this.$toast('请先登陆');
				this.onRedirect();
				return;
			}
			// if (this.memberInfoVip == 0) {
			// 	this.$toast('请先开通会员');
			// 	return;
			// }
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '专属内容' + name]);
			try {
				let data = {
					url: url,
					isHW: false
				};
				if (this.system == 'ios') {
					window.webkit.messageHandlers.audioPause.postMessage(null);
					window.webkit.messageHandlers.redirectToYZ.postMessage(data);
				} else {
					window.android.playCourse('redirectToYZ', JSON.stringify(data));
				}
			} catch (e) {
				this.$toast('请更新新版火火兔APP');
				console.log(e);
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
		'v-header-icon': HeaderIcon,
		debug
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
