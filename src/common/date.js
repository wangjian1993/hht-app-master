function timestampToTime(value) {
	let date = new Date(value);
	let y = date.getFullYear();
	let MM = date.getMonth() + 1;
	MM = MM < 10 ? ('0' + MM) : MM;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let m = date.getMinutes();
	m = m < 10 ? ('0' + m) : m;
	let s = date.getSeconds();
	s = s < 10 ? ('0' + s) : s;
	return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

function audioTime(val) {
	var h = Math.floor(val / 3600);
	var m = Math.floor((val / 60 % 60)) >= 10 ? Math.floor((val / 60 % 60)) : ("0" + Math.floor((val / 60 % 60)));
	var s = Math.floor((val % 60)) >= 10 ? Math.floor((val % 60)) : ("0" + Math.floor((val % 60)));
	var format = Math.floor(val / 3600) != 0 ? (h + ":" + m + ":" + s) : (m + ":" + s);
	return format;
}
//导出 {常量名、函数名}
export {
	timestampToTime,
	audioTime
}
