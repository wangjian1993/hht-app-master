<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<!-- <div><p @click="loca()">刷新</p></div> -->
			<div class="apply-content" v-if="isApply">
				<div class="header">
					<div class="header-title">
						<div class="header-img">
							<img :src="defaultBaby.head" alt="" v-if="defaultBaby.head != ''" />
							<img v-else-if="defaultBaby.sex == 1" src="../../assets/image/my_avatar_boy@3x.png" alt="" />
							<img v-else src="../../assets/image/my_avatar_girl@3x.png" alt="" />
						</div>
						<div class="header-name">
							<p>
								<span>{{ nameSplip(defaultBaby.nickName) }}</span>
								<img v-if="defaultBaby.sex == 1" src="../../assets/image/my_navbar_boy@3x.png" alt="" />
								<img v-else src="../../assets/image/my_navbar_girl@3x.png" alt="" />
								<img v-if="memberInfoVip == 1" src="../../assets/image/my_vip_icon@3x.png" alt="" />
							</p>
							<p>{{ getGrowAge(defaultBaby.birthday) }}</p>
						</div>
					</div>
					<div class="header-ranking" @click="setRouter('ranking')">宝宝排名</div>
				</div>
				<v-data></v-data>
				<div class="sign-day">
					<div class="day">
						<p>
							智慧早教第
							<span>{{ applyTime || 0 }}</span>
							天计划
						</p>
						<p>目标30min</p>
					</div>
					<p class="day-sum">累计坚持{{ sumDay }}天</p>
				</div>
				<!-- <p @click="goReport">报告</p> -->
				<div class="music-btn" @click="education()"><p>开始上课</p></div>
				<div class="course-key">
					<v-title :title="title[0]"></v-title>
					<div class="key-list">
						<ul v-if="keyArray.length != 0">
							<li v-for="item in keyArray">
								<span>{{ item }}</span>
							</li>
						</ul>
						<div v-else class="content-null"><p>暂无关键词</p></div>
					</div>
				</div>
				<div class="course-emphasis">
					<v-title :title="title[1]"></v-title>
					<div class="key-list" v-if="isPie"><v-pie :pieData="keyList"></v-pie></div>
					<div v-else class="content-null"><p>暂无强化重点</p></div>
				</div>
				<div class="course-period">
					<v-title :title="title[2]" :age="countAge(babyYear, babyMonth)"></v-title>
					<div class="period-list" v-if="periodList.length != 0">
						<ul>
							<li v-for="(item, index) in periodList" :key="index">
								<div class="period-img"><img :src="item.level1_logo" alt="" /></div>
								<div class="period-name">
									<p class="an-multi-ellipsis">{{ item.level1 }}</p>
									<p class="van-multi-ellipsis--l2">{{ item.level2 }}</p>
								</div>
							</li>
						</ul>
					</div>
					<div v-else class="content-null"><p>暂无关键期</p></div>
				</div>
			</div>
			<div class="noapply-content" v-else>
				<div class="apply-img"><img src="http://cloud.alilo.com.cn/down/image/smartedu_intro.png" alt="" /></div>
				<div class="apply-btn" @click="userApply"><p>立刻报名</p></div>
			</div>
			<v-suspend></v-suspend>
			<v-babaList v-if="babyBox" @setBabyId="setBabyId" @cloneBox="cloneBox"></v-babaList>
		</div>
	</div>
</template>

<script>
import Title from '@/components/Title.vue';
import Data from '@/components/Data.vue';
import Pie from '@/components/Pie.vue';
import Suspend from '@/components/Suspend.vue';
import BabaList from '@/components/BabyList.vue';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			isLoading: false,
			title: ['今日知识点', '今日强化点', '宝宝关键期'],
			age: '0个月',
			periodList: [],
			currentTime: null,
			currentMouth: null,
			sumDay: 0,
			keyList: [],
			keyArray: [],
			isPie: false,
			applyTime: 0,
			babyYear: 0,
			babyMonth: 0,
			isApply: false,
			babyBox: false,
			babyArray: [],
			babyId: 0,
			defaultBabyArray: [],
			defaultBaby: []
		};
	},
	computed: {
		...mapState(['system', 'babyInfo', 'memberInfoTime', 'memberInfoVip', 'userBaby'])
	},
	created() {
		let baby = JSON.parse(localStorage.getItem('babyInfo'));
		this.defaultBaby = this.userBaby.length == 0 ? baby : this.userBaby;
		if (localStorage.getItem('cid') == null) {
			console.log('没有cid========');
			this.getActivity();
			return;
		}
		this.getSumTime();
		this.current();
	},
	methods: {
		goReport() {
			this.$router.push({ name: 'report' });
		},
		loca() {
			location.reload();
		},
		setRouter(val) {
			this.$router.push({ name: val });
		},
		cloneBox() {
			this.babyBox = false;
		},
		nameSplip(name) {
			try {
				if (name.length > 10) {
					return name.slice(0, 10) + '...';
				} else {
					return name;
				}
			} catch (e) {
				console.log('宝宝名称', name);
				//TODO handle the exception
			}
		},
		getActivity() {
			this.$axios
				.userActivityInfo()
				.then(res => {
					localStorage.setItem('cid', res.data.data.id);
					this.getSumTime();
					this.current();
				})
				.catch(err => {});
		},
		setBabyId(data) {
			this.babyArray = data;
			// console.log('报名的宝宝==========', this.babyArray);
			this.$toast.loading({
				message: '报名中...',
				forbidClick: true
			});
			// console.log('报名id=========', data.id);
			this.$axios
				.userApply(data.id)
				.then(res => {
					if (res.data.code == 1) {
						self.defaultBabyArray = data;
						this.$store.dispatch('defaultBaby', data);
						this.$toast('报名成功');
						this.getUserDayCourse();
						this.getSumTime();
						this.isApply = true;
						this.babyBox = !this.babyBox;
						return true;
					}
				})
				.catch(err => {});
		},
		countAge(year, month) {
			var sum = year * 12 + month;
			// console.log('nianling,', sum);
			if (sum < 13) {
				return month + '-' + (month + 1) + '个月';
			} else if (sum >= 13 && sum < 18) {
				return '1-1.5岁';
			} else if (sum >= 18 && sum < 24) {
				return '1.5-2岁';
			} else if (sum >= 24 && sum < 36) {
				return '2-3岁';
			} else if (sum >= 36 && sum < 48) {
				return '3-4岁';
			} else if (sum >= 48 && sum < 60) {
				return '4-5岁';
			} else if (sum >= 60 && sum < 72) {
				return '5-6岁';
			}
		},
		//计算宝宝多少天
		getBirthSlot(date) {
			var time;
			try {
				time = date
					.replace('年', '-')
					.replace('月', '-')
					.replace('日', '');
			} catch (e) {
				//TODO handle the exception
				time = this.currentTime;
			}
			this.getGrowAge(time);
			console.log('宝宝年龄111111111111', time);
			let birthDay = new Date(time);
			let nowDate = new Date();
			let date1 = Date.parse(birthDay);
			let date2 = Date.parse(nowDate);
			let day = Math.floor((date2 - date1) / (60 * 60 * 1000 * 24));
			let age = '';
			let year = Math.floor(day / 365);
			let y = day % 365;
			let month = Math.floor(y / 30);
			let d = Math.floor((day % 365) % 30);
			age += year + '岁' + month + '月' + d + '天';
			this.babyYear = year;
			this.babyMonth = month;
			console.log('宝宝年龄==============', age);
			return age;
		},
		getGrowAge(birthday) {
			var time;
			try {
				time = birthday
					.replace('年', '-')
					.replace('月', '-')
					.replace('日', '');
			} catch (e) {
				//TODO handle the exception
				time = this.currentTime;
			}
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();
			var hour = now.getHours();
			var minute = now.getMinutes();
			var second = now.getSeconds();

			var myDate = new Date(time);
			var myYear = myDate.getFullYear();
			var myMonth = myDate.getMonth() + 1;
			var myDay = myDate.getDate();
			var myHour = myDate.getHours();
			var myMinute = myDate.getMinutes();
			var mySecond = myDate.getSeconds();

			var gapSecond = second - mySecond;
			if (gapSecond < 0) {
				minute -= 1;
				gapSecond = 60 - mySecond + second;
			}
			var gapMinute = minute - myMinute;
			if (gapMinute < 0) {
				hour -= 1;
				gapMinute = 60 - myMinute + minute;
			}
			var gapHour = hour - myHour;
			if (gapHour < 0) {
				day -= 1;
				gapHour = 24 - myHour + hour;
			}
			var gapDay = day - myDay;
			if (gapDay < 0) {
				month -= 1;
				gapDay = this.getDaysOfMonth(time) - myDay + day;
			}
			var gapMonth = month - myMonth;
			if (gapMonth < 0) {
				year -= 1;
				gapMonth = 12 - myMonth + month;
			}
			var gapYear = year - myYear;
			if (gapYear < 0) {
				gapYear = 0;
			}

			var dateStr = gapYear + '岁' + (gapMonth < 10 ? '0' + gapMonth : gapMonth) + '月' + (gapDay < 10 ? '0' + gapDay : gapDay) + '天';
			console.log('dateStr....', dateStr);
			return dateStr;
		},
		getDaysOfMonth(dateStr) {
			var date = new Date(dateStr);
			var year = date.getFullYear();
			var mouth = date.getMonth() + 1;
			var day = 0;

			if (mouth == 2) {
				day = this.isLeapYear(year) ? 29 : 28;
			} else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
				day = 31;
			} else {
				day = 30;
			}
			return day;
		},
		isLeapYear(year) {
			return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
		},
		getUserDayCourse() {
			let self = this;
			this.$axios
				.getDayKey(this.currentTime)
				.then(res => {
					let pieData = res.data.data.emphasis;
					pieData.forEach(function(Data, index) {
						let v = Data.rate.replace('%', '');
						let obj = {
							name: Data.ability + Data.rate,
							value: v,
							size: v
						};
						self.keyList.push(obj);
					});
					let arr = res.data.data.key;
					self.keyArray = arr.split('、');
					self.isPie = true;
				})
				.catch(err => {});
			this.$axios
				.getBabyPeriod(this.currentTime)
				.then(res => {
					this.periodList = res.data.data.list;
				})
				.catch(err => {});
			this.$axios
				.sumTime(this.currentMouth)
				.then(res => {
					this.sumDay = res.data.data.clockDays;
				})
				.catch(err => {});
		},
		getSumTime() {
			let self = this;
			this.$axios
				.userApplyTime(localStorage.getItem('cid'))
				.then(res => {
					if (res.data.code == 1) {
						console.log('已经报名=====');
						try {
							this.applyTime = this.computedTime(res.data.data.createTime);
							let id = localStorage.getItem('babyId');
							this.babyId = res.data.data.babyId;
							if (id != this.babyId) {
								console.log('新宝宝======');
								localStorage.setItem('babyId', res.data.data.babyId);
							}
							let array = this.babyInfo;
							console.log('array=======', array);
							array.forEach(function(item, index) {
								if (res.data.data.babyId == item.id) {
									self.defaultBaby = item;
									console.log('self.defaultBaby==========', self.defaultBaby);
									self.$store.dispatch('defaultBaby', item);
								}
							});
							this.getUserDayCourse();
							this.isLoading = true;
							this.isApply = true;
						} catch (e) {
							console.log(e);
							//TODO handle the exception
						}
					} else {
						console.log('还没有报名====');
						localStorage.removeItem('babyInfo');
						localStorage.removeItem('babyId');
						this.isLoading = true;
						this.isApply = false;
					}
				})
				.catch(err => {});
		},
		userApply() {
			if (this.memberInfoVip == 0) {
				this.$router.push({ name: 'index' });
				this.$toast('请先开通会员');
				return;
			}
			this.babyBox = true;
		},
		computedTime(time) {
			//传入之前的时间  时间格式为(YY-MM-DD HH:MM:SS)
			let t = time.split(' ');
			console.log('t===', t);
			let oldTimeFormat = new Date(t[0]);
			let nowDate = new Date();
			console.log('oldTimeFormat', oldTimeFormat);
			console.log('nowDate', nowDate);
			if (nowDate.getTime() - oldTimeFormat.getTime() > 0) {
				console.log('111111111');
				let times = nowDate.getTime() - oldTimeFormat.getTime();
				let days = parseInt(times / (60 * 60 * 24 * 1000));
				console.log('days', days);
				return days + 1;
			}
		},
		current() {
			var dd = new Date();
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1; //获取当前月份的日期
			var d = dd.getDate();
			this.currentTime = y + '-' + m + '-' + d;
			this.currentMouth = m;
		},
		education() {
			this.$toast.loading({
				message: '获取课程中...',
				forbidClick: true
			});
			this.$axios
				.getDayCourse(this.currentTime)
				.then(res => {
					console.log('点击====');
					let array = {
						title: '智慧早教第' + this.applyTime + '天',
						coursePackId: 0,
						courseId: localStorage.getItem('cid'),
						babyId: localStorage.getItem('babyId'),
						course: []
					};
					// let array = [];
					if (res.data.code == 1 && res.data.data.length != 0) {
						let item = res.data.data;
						item.forEach(function(data, index) {
							let obj = {
								url: data.url,
								id: data.id,
								name: data.name
							};
							array.course.push(obj);
							// array.push(obj);
						});
						console.log('array', array);
						try {
							this.$toast('获取早教课程成功');
							if (this.system == 'ios') {
								window.webkit.messageHandlers.course_play.postMessage(array);
							} else if (this.system == 'android') {
								window.android.playCourse('course_play', JSON.stringify(array));
							}
						} catch (e) {
							this.$toast('获取早教课程失败');
							//TODO handle the exception
						}
					} else {
						this.$toast('暂无今日早教课程');
					}
				})
				.catch(err => {});
		}
	},
	components: {
		'v-data': Data,
		'v-title': Title,
		'v-pie': Pie,
		'v-suspend': Suspend,
		'v-babaList': BabaList
	}
};
</script>

<style lang="less" scoped>
@import '../../assets/css/education.less';
.apply-img {
	width: 100%;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
	}
}
.apply-btn {
	width: 100%;
	text-align: center;
	position: fixed;
	bottom: 5%;
	left: 0;
	text-align: center;
	p {
		width: 311px;
		height: 48px;
		line-height: 48px;
		background-color: #ff9f80;
		border-radius: 24px;
		font-size: 17px;
		color: #fff;
		margin: 0 auto;
	}
}
</style>
