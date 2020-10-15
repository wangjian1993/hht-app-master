import axios from "axios";
import qs from "qs";
import Router from '@/router/index';
let AUTH_TOKEN = (function() {
	return localStorage.getItem("token");
})();
//渠道id
let USER = (function() {
	return localStorage.getItem("user");
	// return 5079819;
})();
let CLId = (function() {
	return 65;
})();
let babyId = (function() {
	return localStorage.getItem("babyId");
})();
//课程id
let CID = (function() {
	// console.log("Cid1111", localStorage.getItem("cid"))
	return localStorage.getItem("cid");
})();
export function fetch(options) {
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			//instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
			//所有的请求都会带上这些配置，比如全局都要用的身份信息等。
			headers: {
				"Content-Type": "application/json",
				// 'token':"eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJleHAiOjE1ODc0OTA5NTcsIm5iZiI6MTU4Mzg5MDk1N30.4uO3puLj52psZgbfTQgNPkeqzk_pn9-M2-eziyx1WhU",//token从全局变量那里传过来
			},
			timeout: 30 * 1000 // 30秒超时
		});
		instance.defaults.headers.common["token"] = AUTH_TOKEN;
		instance.interceptors.request.use(function(config) {
			// console.log("AUTH_TOKEN")
			if (AUTH_TOKEN == null) {
				let promisefresh = new Promise(function(resolve, reject) {
					//刷新token
					axios.get("http://api.cloud.alilo.com.cn/api/v4/login/get-token?appKey=hht&appSecret=hht").then(response => {
						config.headers.token = response.data.data;
						localStorage.setItem('token', response.data.data);
						resolve(config);
					})
				});
				return promisefresh;
			}
			let url = config.url;
			if (url.indexOf("login") > -1) {
				localStorage.setItem('token', "");
				config.headers.token = "";
			}
			if (url.indexOf("user") > -1 && url.indexOf("login") < 0) {
				config.headers.token = localStorage.getItem("token");
			}
			return config;
		}, function(err) {
			return Promise.reject(err);
		});
		instance.interceptors.response.use(function(res) {
			// console.log(res)
			if (res.data.code == 2) {
				// console.log("token过期了", Router);
				Router.push({
					name: 'login'
				})
			}
			return res;
		}, function(err) {
			return err;
		});
		instance(options)
			.then(response => {
				//then 请求成功之后进行什么操作
				resolve(response); //把请求到的数据发到引用请求的地方
			})
			.catch(error => {
				// console.log("请求异常信息：" + error);
				reject(error);
			});
	});
}
const cloudUrl = "https://cloud.alilo.com.cn/baby/api/wx/";
const aliloUrl = "http://api.cloud.alilo.com.cn/api/v4/";
// const aliloUrl = "http://hhtv3.api.zhishangsoft.com/api/v4/"
//banner轮播图
export default {
	/**
	 * 获取学习报告
	 */
	getUserReport(month, babyId) {
		return fetch({
			url: aliloUrl + "course/study-report",
			method: "post",
			params: {
				babyId: babyId,
				courseId: CID,
				month: month
			}
		});
	},
	/**
	 * 获取用户token
	 * */
	userLogin() {
		return fetch({
			url: "http://api.cloud.alilo.com.cn/api/v4/login/get-token",
			method: "get",
			params: {
				appKey: "hht",
				appSecret: "hht"
			}
		});
	},
	/*
	 *累计学习时长
	 */
	sumTime(month, babyId) {
		return fetch({
			url: aliloUrl + "course/study-total-time",
			method: "POST",
			params: {
				babyId: babyId,
				courseId: localStorage.getItem("cid"),
				month: month
			}
		});
	},
	/**
	 * 排行榜
	 * */
	getBabyRanking(mouth) {
		return fetch({
			url: aliloUrl + "course/get-top",
			method: "POST",
			params: {
				// userId: USER || localStorage.getItem("user"),
				courseId: CID || localStorage.getItem("cid"),
				// currentDate: mouth,
				pageNo: 1,
				pageSize: 200
			}
		});
	},
	/**
	 * 会员专属内容
	 * */
	getVipContent(page) {
		return fetch({
			url: aliloUrl + "audio-group/search-vip",
			method: "POST",
			params: {
				channelId: CLId,
				pageNo: page,
				pageSize: 10
			}
		});
	},
	/**
	 * 会员专属活动
	 * */
	getVipActivity() {
		return fetch({
			url: aliloUrl + "vip-activity/search",
			method: "POST",
			params: {
				channelId: CLId,
				pageNo: 1,
				pageSize: 10
			}
		});
	},
	/**
	 * 会员卡激活
	 * */
	setVipClubCard(code, userId) {
		return fetch({
			url: aliloUrl + "activation-code/activate",
			method: "POST",
			params: {
				activationCode: code,
				userId: userId,
				channelId: CLId,
				devid: 111
			}
		});
	},
	/**
	 * 会员用户信息
	 * */
	getUserInfo(userId) {
		return fetch({
			url: aliloUrl + "member-card/get",
			method: "POST",
			params: {
				userId: userId,
				channelId: CLId
			}
		});
	},
	/**
	 * 会员帮助
	 * */
	getUserHelp() {
		return fetch({
			url: aliloUrl + "member-help/search",
			method: "POST",
			params: {
				channelId: CLId,
				pageNo: 1,
				pageSize: 10
			}
		});
	},
	/**
	 * 权益介绍
	 */
	getVipEquity(id, userId) {
		return fetch({
			url: aliloUrl + "member-rights/search",
			method: "POST",
			params: {
				channelId: CLId,
				userId: userId,
				cardId: id,
				pageNo: 1,
				pageSize: 10
			}
		});
	},
	/**
	 * 获取宝宝打卡信息
	 * */
	getBabyClock(month) {
		return fetch({
			url: aliloUrl + "course/punch-in-list",
			method: "POST",
			params: {
				babyId: localStorage.getItem("babyId"),
				courseId: localStorage.getItem("cid"),
				month: month
			}
		});
	},
	/*
	 * 每日课程
	 * */
	getDayCourse(time) {
		return fetch({
			url: aliloUrl + "course/today-course-data",
			method: "POST",
			params: {
				babyId: localStorage.getItem("babyId"),
				// userId: USER || localStorage.getItem("user"),
				courseId: localStorage.getItem("cid"),
				currentDate: time
			}
		});
	},
	/**
	 * 课程关键字
	 */
	getDayKey(time) {
		return fetch({
			url: aliloUrl + "course/today-key",
			method: "POST",
			params: {
				babyId: localStorage.getItem("babyId"),
				courseId: localStorage.getItem("cid"),
				currentDate: time
			}
		});
	},
	/**
	 * 宝宝关键期
	 */
	getBabyPeriod() {
		return fetch({
			url: aliloUrl + "course/get-critical-period",
			method: "POST",
			params: {
				babyId: localStorage.getItem("babyId"),
			}
		});
	},
	/*
	 * 查询会员卡
	 */
	getMemberCard() {
		return fetch({
			url: aliloUrl + "member-card/search",
			method: "POST",
			params: {
				channelId: CLId,
				pageNo: 1,
				pageSize: 10
			}
		});
	},
	/*
	 * 报名
	 */
	userApply(id) {
		// console.log("报名id=========", id)
		return fetch({
			url: aliloUrl + "course/apply",
			method: "POST",
			params: {
				courseId: localStorage.getItem("cid"),
				userId: localStorage.getItem("user"),
				babyId: id
			}
		});
	},
	/*
	 * 获取报名时间
	 */
	userApplyTime(cid) {
		return fetch({
			url: aliloUrl + "course/apply-time",
			method: "POST",
			params: {
				courseId: cid,
				userId: localStorage.getItem("user"),
			}
		});
	},
	/*
	 * 获取课程id
	 */
	userActivityInfo() {
		return fetch({
			url: aliloUrl + "course/get-introduce",
			method: "POST",
			params: {
				channelId: CLId,
			}
		});
	},
	/*
	 *获取悬浮
	 */
	getSuspend() {
		return fetch({
			url: aliloUrl + "switch-set/get",
			method: "POST",
			params: {
				channelId: CLId,
				userId: localStorage.getItem("user"),
			}
		});
	},
	/**
	 * 获取宝宝列表
	 * */
	getBabyList(id) {
		return fetch({
			url: aliloUrl + "user/baby/query",
			method: "GET",
			params: {
				userId: id || localStorage.getItem("user")
			}
		});
	},
	getUserVip() {
		return fetch({
			url: aliloUrl + "user/get-vip",
			method: "GET",
			params: {
				userId: localStorage.getItem("user")
			}
		});
	},

	/*课包----------------------------------------------*/
	getXMLYVip(uid, day) {
		return fetch({
			url: aliloUrl + "xmly-vip/grant-code",
			method: "POST",
			params: {
				userId: uid,
				termDay: day
			}
		});
	},
	addSite(site) {
		return fetch({
			url: aliloUrl + "huawei/address/add",
			method: "PUT",
			params: site
		});
	},
	getAppPage(data) {
		return fetch({
			url: aliloUrl + "page-manage/get-page",
			method: "POST",
			params: data
		});
	},
	getYzGoods() {
		return fetch({
			url: "http://api.dcloud.alilo.com.cn/api/v1/youzan/search",
			method: "GET",
			params: ""
		});
	},
	uploadingLog(data) {
		return fetch({
			url: "http://big.data.alilo.com.cn/track/app",
			method: "POST",
			params: data
		});
	}
};
