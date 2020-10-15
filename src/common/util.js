// 公共的js
//日期格式转换
export function FromDates(StringDate) {
	let T = "",
		N = "",
		Y = "",
		R = "";
	for (let i = 0; i < StringDate.length; i++) {
		N = StringDate.substring(0, 4) + "-";
		Y = StringDate.substring(4, 6) + "-";
		R = StringDate.substring(6, 8);
		T = N + Y + R;
		return T;
	}
}
//日期时间去横杠
export function FromDatesCancle(StringDate) {
	let CanTime = [];
	for (let i = 0; i < StringDate.length; i++) {
		if (StringDate[i] !== "-") {
			CanTime.push(StringDate[i]);
		}
	}
	return CanTime.join('');
}

/*
 * 点击量转换
 * num:转换值
 * point:保留几位小数
 */
export function tranNumber(num, point) {
	let numStr = num.toString();
	if (numStr.length > 8) {
		let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
		return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
	}
	//大于6位数是十万 (以10W分割 10W以下全部显示)
	else if (numStr.length > 0) {
		let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
		return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
	}
}

/**
 * 音频时间转换
 * val:音频时长秒
 */
export function timeCycle(val) {
	var h = Math.floor(val / 3600);
	var m = Math.floor((val / 60) % 60) >= 10 ? Math.floor((val / 60) % 60) : '0' + Math.floor((val / 60) % 60);
	var s = Math.floor(val % 60) >= 10 ? Math.floor(val % 60) : '0' + Math.floor(val % 60);
	var format = Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s;
	return format;
}

/**
 * 获取今日日期
 * 2020-02-02
 * */
export function getDayTime() {
	let yy = new Date().getFullYear();
	let mm = new Date().getMonth() + 1;
	let dd = new Date().getDate();
	let hh = new Date().getHours();
	let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
	let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
	return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
	// console.log(this.gettime)
	// var dd = new Date();
	// var y = dd.getFullYear();
	// var m = dd.getMonth() + 1; //获取当前月份的日期
	// var d = dd.getDate();
	// return y + '-' + m + '-' + d;
}

// 防抖
export function debounce(func, delay) {
	return function(args) {
		let _args = args,
			that = this;
		clearTimeout(func.id);

		func.id = setTimeout(() => {
			func.call(that, _args);
		}, delay);
	};
}

export function getQueryStringValue(key) {
	let data = {}

	let src = window.location.href
	let index = src.indexOf('?')
	if (index === -1) return data[key]
	let dataStr = src.substring(src.indexOf('?') + 1)
	let dataArray = dataStr.split('&')
	for (let i = 0; i < dataArray.length; i++) {
		let param = dataArray[i].split('=')
		data[param[0]] = param[1]
	}
	return data[key]
}

export function computedTime(time) {
	//传入之前的时间  时间格式为(YY-MM-DD HH:MM:SS)
	let t = time.split(' ')
	// console.log('t===', t)
	let oldTimeFormat = new Date(t[0])
	let nowDate = new Date()
	if (nowDate.getTime() - oldTimeFormat.getTime() > 0) {
		let times = nowDate.getTime() - oldTimeFormat.getTime()
		let days = parseInt(times / (60 * 60 * 24 * 1000))
		console.log('days', days)
		return days + 1
	}
}

//宝宝年龄计算
export function getGrowAge(birthday) {
	var time;
	try {
		time = birthday
			.replace('年', '-')
			.replace('月', '-')
			.replace('日', '');
	} catch (e) {
		//TODO handle the exception
		time = 0;
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

	var dateStr = gapYear + '岁' + (gapMonth < 10 ? '0' + gapMonth : gapMonth) + '月' + (gapDay < 10 ? '0' + gapDay : gapDay) +
		'天';
	// this.babyYear = gapYear;
	// this.babyMonth = gapMonth;
	console.log("gapYear", gapYear);
	console.log("gapMonth", gapMonth);
	return [gapYear, gapMonth];
}
