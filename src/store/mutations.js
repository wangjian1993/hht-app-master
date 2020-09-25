import * as types from './mutation-type.js';
const mutations = {
	[types.SET_USERINFO](state, data) {
		state.userInfo = data;
		localStorage.setItem("user", data.uid)
	},
	[types.SET_EQUITYLIST](state, data) {
		state.equityList = data;
	},
	[types.SET_BABYINFO](state, data) {
		state.babyInfo = data;
		let bid = localStorage.getItem("babyId");
		data.forEach(function(item, index) {
			if (bid == item.id) {
				state.userBaby = item;
				if (localStorage.getItem("babyInfo") == null) {
					localStorage.setItem("babyInfo", JSON.stringify(item));
				}
				// console.log("宝宝信息mutations====", state.userBaby)
			}
		});
	},
	[types.SET_USERBABY](state, data) {
		state.userBaby = data;
	},
	[types.SET_SYSTEM](state, data) {
		state.system = data;
	},
	[types.SET_MEMBERINFO](state, data) {
		state.memberInfoVip = data.vip
		state.memberInfoTime = data.vipEndTime
	},
	[types.SET_USERCID](state, data) {
		localStorage.setItem("cid", data)
		state.cid = data;
	},
	[types.SET_COURSEDETAILS](state, data) {
		state.courseDetails = data;
	},
	[types.SET_USERCOURSE](state, data) {
		state.userCourseList = data;
		// console.log("state.userCourseList", state.userCourseList)
	},
	[types.SET_ISEDU](state, data) {
		state.isEdu = data;
	},
	[types.SET_POETRYMORE](state, data) {
		state.poetryMore = data;
		localStorage.setItem("albumMore",JSON.stringify(data))
	}
}
export default mutations
