<template>
	<div class="app">
		<div class="ranking-text">
			<p>昨日成长值排行</p>
			<p v-if="updateTime != ''">更新时间{{ updateTime }}</p>
		</div>
		<div class="ranking-list ranking-box" v-if="topList.length != 0">
			<ul>
				<li v-for="(item, index) in topList" :key="index">
					<div class="list-index">
						<p v-if="index == 0"><img src="../../assets/image/home_rank_icon1st@3x.png" /></p>
						<p v-else-if="index == 1"><img src="../../assets/image/home_rank_icon2nd@3x.png" /></p>
						<p v-else-if="index == 2"><img src="../../assets/image/home_rank_icon3rd@3x.png" /></p>
						<p v-else>{{ index + 1 }}</p>
					</div>
					<div class="list-img">
						<img :src="item.image" alt="" v-if="item.image != ''" />
						<img v-else-if="item.sex == '男'" src="../../assets/image/my_avatar_boy@3x.png" alt="" />
						<img v-else src="../../assets/image/my_avatar_girl@3x.png" alt="" />
					</div>
					<div class="lsit-name">
						<p>
							{{ ameSplip(item.userName) || '火火兔宝宝' }}
							<img v-if="item.sex == '男'" src="../../assets/image/my_navbar_boy@3x.png" alt="" />
							<img v-else src="../../assets/image/my_navbar_girl@3x.png" alt="" />
						</p>
					</div>
					<div class="lsit-time">
						<p>{{ item.score }}</p>
					</div>
				</li>
			</ul>
			<div class="ranking-bottom"></div>
		</div>
		<div v-else class="content-null">
			<p><img src="../../assets/image/img_servererror@3x.png" /></p>
		</div>
		<div class="user-list" v-if="userid != null && userid == userBaby.id && userList.length != 0">
			<div class="ranking-list">
				<ul>
					<li>
						<div class="list-index">
							<p>{{ userScore }}</p>
						</div>
						<div class="list-img">
							<img :src="userList.image" alt="" v-if="userList.image != ''" />
							<img v-else-if="userList.sex == '男'" src="../../assets/image/my_avatar_boy@3x.png" alt="" />
							<img v-else src="../../assets/image/my_avatar_girl@3x.png" alt="" />
						</div>
						<div class="lsit-name">
							<p>
								{{ ameSplip(userList.userName) || '火火兔宝宝' }}
								<img v-if="userList.sex == 0" src="../../assets/image/my_navbar_boy@3x.png" alt="" />
								<img v-else src="../../assets/image/my_navbar_girl@3x.png" alt="" />
							</p>
						</div>
						<div class="lsit-time">
							<p>{{ userList.score }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { timestampToTime } from '../../common/date.js';
export default {
	data() {
		return {
			topList: [],
			currentTime: null,
			currentMouth: null,
			updateTime: 0,
			userid: null,
			userList: [],
			userScore: 0
		};
	},
	computed: {
		...mapState(['userBaby'])
	},
	created() {
		this.current();
		this.getBabyRanking();
		console.log('userBaby===', this.userBaby);
	},
	methods: {
		ameSplip(name) {
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
		getBabyRanking() {
			let self = this;
			this.$axios
				.getBabyRanking(this.currentTime)
				.then(res => {
					this.topList = res.data.data.list;
					let babyArray = res.data.data.list;
					this.updateTime = timestampToTime(res.data.data.updatetime);
					console.log('111', this.updateTime);
					this.userid = localStorage.getItem('babyId');
					babyArray.forEach((value, index) => {
						if (value.babyId == self.userid) {
							self.userList = value;
							self.userScore = index + 1;
						}
					});
				})
				.catch(err => {});
		},
		current() {
			var dd = new Date();
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1; //获取当前月份的日期
			var d = dd.getDate();
			this.currentTime = y + '-' + m + '-' + d;
			this.currentMouth = m;
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.ranking-bottom {
	width: 100%;
	height: 70px;
}
.ranking-text {
	width: 345px;
	margin: 0 auto;
	margin-top: 11px;
	margin-bottom: 22px;
	display: flex;
	position: relative;
	p {
		&:nth-of-type(1) {
			font-size: 12px;
			color: #ff8a66;
		}
		&:nth-of-type(2) {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.3);
			position: absolute;
			right: 0;
		}
	}
}
.ranking-list {
	width: 345px;
	margin: 0 auto;
	ul {
		width: 100%;
		li {
			display: flex;
			height: 40px;
			position: relative;
			margin: 10px 0;
			.list-index {
				width: 36px;
				height: 36px;
				display: flex;
				justify-content: center;
				align-items: center;
				p {
					font-size: 14px;
					color: rgba(0, 0, 0, 0.36);
				}
				img {
					width: 36px;
					height: 36px;
				}
			}
			.list-img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.lsit-name {
				display: flex;
				justify-content: center;
				align-items: center;
				padding-left: 10px;
				p {
					font-size: 15px;
					color: rgba(0, 0, 0, 0.74);
					img {
						width: 14px;
						height: 14px;
					}
				}
			}
			.lsit-time {
				display: flex;
				align-items: center;
				margin-left: auto;
				p {
					font-family: Helvetica-Bold;
					font-size: 28px;
					color: #ff8a66;
				}
			}
		}
	}
}
.user-list {
	width: 100%;
	position: fixed;
	bottom: 0;
	margin: 0 auto;
	background: #fff;
	text-align: center;
	box-shadow: 0px -1px 16px 0px rgba(0, 0, 0, 0.12);
}
.content-null {
	width: 100px;
	height: 100px;
	margin: 0 auto;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
