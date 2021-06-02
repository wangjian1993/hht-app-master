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
			.getUserInfo()
			.then(res => {
				if (res.data.code != 1) {
					commit(types.SET_USERINFO, res.data.data);
				} else {

				}
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
			.getVipEquity()
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
		window.webkit.messageHandlers.getUserInfo.postMessage(null);
		window.webkit.messageHandlers.getCurrentBaby.postMessage(null);
		window['getUserInfo'] = res => {
			console.log(res.uid)
			commit(types.SET_USERINFO, res.uid);
		};
		window['getCurrentBaby'] = res => {
			console.log("获取宝宝信息=====", res)
			commit(types.SET_BABYINFO, res);
		}
	},
	setBabyInfoADAction({
		commit
	}, data) {
		let user = window.android.getUserInfo();
		commit(types.SET_USERINFO, user);
		try {
			let baby = window.android.getCurrentBaby();
			commit(types.SET_BABYINFO, baby);
		} catch (e) {
			//TODO handle the exception
		}
	},
	/**
	 * 获取系统版本
	 * */
	setSystemAction({
		commit
	}, data) {
		commit(types.SET_SYSTEM, data)
	},
	/**
	 * 发送给原生方法
	 * */
	setNativeInfo({
		commit
	}, data) {
		console.log("0000")
		try {
			window.webkit.messageHandlers.course_play.postMessage(data);
		} catch (e) {
			//TODO handle the exception
			console.log("请在app中打开11111")
		}
	}
};
