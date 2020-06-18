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
	var dd = new Date();
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	var d = dd.getDate();
	return y + '-' + m + '-' + d;
}

// 防抖
export function debounce (func, delay) {
  return function (args) {
    let _args = args,
      that = this;
    clearTimeout(func.id);

    func.id = setTimeout(() => {
      func.call(that, _args);
    }, delay);
  };
}
