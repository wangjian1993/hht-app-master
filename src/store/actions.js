import * as types from "./mutation-type.js";
import $axios from '../api/index.js';
export default {
	/*
	 * 获取用户信息
	 * */
	setUserInfoAction({
		commit
	}, data) {
		$axios
			.getUserVip()
			.then(res => {
				console.log("会员信息", res);
				commit(types.SET_MEMBERINFO, res.data.data);
			})
			.catch(err => {});
	},
	/*
	 *获取课程id
	 * */
	getUserActivityInfo({
		commit
	}, data) {
		$axios
			.userActivityInfo()
			.then(res => {
				console.log("获取到cid====", res.data.data.id)
				localStorage.setItem("cid", res.data.data.id);
				commit(types.SET_USERCID, res.data.data.id);
			})
			.catch(err => {});
	},
	/*
	 *获取vip权益介绍
	 * */
	setEquityAction({
		commit
	}, data) {
		$axios
			.getVipEquity(data)
			.then(res => {
				commit(types.SET_EQUITYLIST, res.data.data.list);
			})
			.catch(err => {});
	},
	/**
	 * 获取宝贝信息
	 * */
	setBabyInfoAction({
		commit
	}, data) {
		try {
			window.webkit.messageHandlers.getUserInfo.postMessage(null);
			window['getUserInfo'] = res => {
				console.log("获取用户信息", res)
				localStorage.setItem("user", res.uid)
				commit(types.SET_USERINFO, res);
				$axios
					.getBabyList(res.uid)
					.then(res => {
						console.log("获取宝宝类表=========")
						commit(types.SET_BABYINFO, res.data.data);
					})
					.catch(err => {});
			};
		} catch (e) {

		}

	},
	setBabyInfoADAction({
		commit
	}, data) {
		let user = window.android.getUserInfo();
		console.log("用户信息==11111111111", user);
		let userData = JSON.parse(user);
		localStorage.setItem("user", userData.id)
		commit(types.SET_USERINFO, JSON.parse(user));
		$axios
			.getBabyList(userData.id)
			.then(res => {
				console.log("获取宝宝=========")
				commit(types.SET_BABYINFO, res.data.data);
			})
			.catch(err => {});
	},
	/*
	 *设置宝宝信息
	 */
	defaultBaby({
		commit
	}, data) {
		commit(types.SET_USERBABY, data)
	},
	/**
	 * 获取系统版本
	 * */
	setSystemAction({
		commit
	}, data) {
		commit(types.SET_SYSTEM, data)
	},
	/*
	 *设置课程包详情
	 */
	setCourseDetails({
		commit
	}, data) {
		console.log(data)
		commit(types.SET_COURSEDETAILS,data);
	},
	/*
	 *设置用户课程
	 */
	setUserCourse({
		commit
	}, data) {
		console.log(data)
		commit(types.SET_USERCOURSE,data);
	}
};
