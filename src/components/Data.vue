<template>
	<div class="content-page uk-body">
		<div class="calendar">
			<div class="calender-btn">
				<span @click="prevMonth"><img src="../assets/image/vip_smartedu_premonthwht@3x.png" alt="" /></span>
				<h4>{{ month }}月</h4>
				<span @click="nextMonth"><img src="../assets/image/vip_smartedu_nextmonthwht@3x.png" alt="" /></span>
			</div>
			<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">
				<thead>
					<tr>
						<th>日</th>
						<th>一</th>
						<th>二</th>
						<th>三</th>
						<th>四</th>
						<th>五</th>
						<th>六</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in dateArr" v-if="contains(item, index)">
						<td v-for="data in item">
							<span :class="{ over: data == '' && month == currentMouth, cur_day: data == date && month == currentMouth }">
								{{ data }}
								<img v-if="isCheck(data)" class="clock" src="../assets/image/icon_chosen@3x.png" alt="" />
							</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="showTime" @click="showClick">
				<img v-if="!isUnfold" src="../assets/image/vip_smartedu_spreadoutwht@3x.png" alt="" />
				<img v-else src="../assets/image/vip_smartedu_gatherwht@3x.png" alt="" />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {},
	data() {
		return {
			today: new Date(),
			year: '',
			month: '',
			day: '',
			date: '',
			dateArr: [],
			checkin: [],
			ShowTime: 1,
			currentMouth: null,
			defaultIndex: -1,
			isUnfold: false,
			isMonth: false
		};
	},
	created() {
		this.year = this.today.getFullYear();  //年
		this.month = this.today.getMonth() + 1;   //月
		this.currentMouth = this.today.getMonth() + 1;   //月
		this.day = this.today.getDay(); 
		this.date = this.today.getDate();  //日
		this.getCalendar();
		this.getBabyDay(this.month);
	},
	methods: {
		showClick() {
			this.isUnfold = !this.isUnfold;
		},
		getBabyDay() {
			let self = this;
			self.checkin = [];
			this.$axios
				.getBabyClock(this.month)
				.then(res => {
					if (res.data.code == 1) {
						let list = res.data.data.calendar;
						list.forEach(function(item, index) {
							if (item.is_clocked == '是') {
								let time = self.timestampToTime(item.calc_date);
								console.log(time);
								self.checkin.push(time);
							}
						});
					} else {
						self.checkin = [];
					}
				})
				.catch(err => {});
		},
		timestampToTime(cjsj) {
			var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return D;
		},
		isLeap() {
			const year = this.year;
			if (year % 4 == 0 && year % 100 > 0) {
				return true;
			} else if (year % 400 == 0 && year % 3200 > 0) {
				return true;
			} else {
				return false;
			}
		},
		getLen() {
			const month = this.month;
			if (month == 2) {
				if (this.isLeap) {
					return 29;
				} else {
					return 28;
				}
			} else {
				if (month < 8) {
					if (month % 2 > 0) {
						return 31;
					} else {
						return 30;
					}
				} else {
					if (month % 2 > 0) {
						return 30;
					} else {
						return 31;
					}
				}
			}
		},
		getCalendarTime() {
			return this.year + '-' + this.month + '-' + this.date;
		},
		getCalendar() {
			var len = this.getLen();
			var d = new Date(this.year, this.month - 1, 1);
			var dfw = d.getDay();
			var arr = new Array();
			var tem = 0;
			for (var i = 0; i < 6; i++) {
				arr[i] = new Array();
				for (var j = 0; j < 7; j++) {
					tem++;
					if (tem - dfw > 0 && tem - dfw <= len) {
						arr[i][j] = tem - dfw;
						if (this.date == tem - dfw && this.month == this.currentMouth) {
							this.defaultIndex = i;
							this.isMonth = true;
						}
					} else {
						arr[i][j] = '';
					}
				}
			}
			this.dateArr = arr;
			// console.log(arr);
		},
		nextMonth() {
			if (this.month == 12) {
				this.year++;
				this.month = 1;
			} else {
				this.month++;
			}
			this.defaultIndex = 0;
			this.isMonth = false;
			this.getCalendar();
			this.getBabyDay();
		},
		prevMonth() {
			if (this.month == 1) {
				this.year--;
				this.month = 12;
			} else {
				this.month--;
			}
			this.defaultIndex = 0;
			this.isMonth = false;
			this.getBabyDay();
			this.getCalendar();
		},
		contains(arr, index) {
			if (!this.isUnfold) {
				if (index != this.defaultIndex) {
					return;
				} else {
					if (arr[0] == '' && arr[1] == '' && arr[2] == '' && arr[3] == '' && arr[4] == '' && arr[5] == '' && arr[6] == '') {
						return false;
					} else {
						return true;
					}
				}
			} else {
				if (arr[0] == '' && arr[1] == '' && arr[2] == '' && arr[3] == '' && arr[4] == '' && arr[5] == '' && arr[6] == '') {
					return false;
				} else {
					return true;
				}
			}
		},
		isCheck(index) {
			for (let i in this.checkin) {
				if (index == this.checkin[i]) {
					return true;
				}
			}
			return false;
		}
	}
};
</script>

<style type="text/css" lang="less">
.content-page {
	width: 100%;
	height: 100%;
	/* background: #ff9f80; */
}
.calender-btn {
	width: 100%;
	height: 40px;
	margin-top: -40px;
	background: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		width: 20px;
		height: 20px;
		margin: 0 20px;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
.calendar {
	width: 100%;
	color: #fff;
	position: relative;
	/* margin-top: -40px; */
	z-index: 1100;
	/* background: #ff9f80; */
}
.calendar h4 {
	text-align: center;
	font-size: 15px;
	font-weight: 700;
	margin-bottom: 0px;
	height: 50px;
	line-height: 50px;
}
.calendar span {
}
.calendar .sign_tab {
	width: 100%;
	height: 100%;
	border-collapse: collapse;
	border-top: 0;
	table-layout: fixed;
	background: #ff9f80;
}
.calendar .sign_tab thead {
	border-top: 10px #ff9f80 solid;
}
.calendar .sign_tab tr {
	background: #ff9f80;
}
.calendar .sign_tab th {
	text-align: center;
	height: 15px;
	font-size: 15px;
}
.calendar .sign_tab td {
	width: 15px;
	height: 15px;
	text-align: center;
	font-size: 15px;
	padding: 7px 0;
}
.calendar .sign_tab td.over {
	border-left: 0;
	border-right: 0;
}
.calendar .ui-state-default {
	/* background: url(../assets/image/icon_chosen@3x.png) no-repeat;
	background-size: 12px; */
}
.calendar .sign_tab td span {
	display: inline-block;
	width: 24px;
	height: 24px;
	font-size: 15px;
	position: relative;
}
.calendar .sign_tab td span .clock {
	width: 12px;
	height: 12px;
	position: absolute;
	bottom: 0;
	right: 0;
}
.calendar .sign_tab td span.cur_day {
	width: 24px;
	height: 24px;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 50%;
}
.showTime {
	display: block;
	width: 100%;
	text-align: center;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ff9f80;
	margin: 0 auto;
	img {
		width: 20px;
		height: 20px;
		margin: 0 auto;
	}
}
</style>
