<template>
	<div class="content">
		<div class="not-bound-img"><img src="../../assets/image/nobind.png" alt="" /></div>
		<p class="not-bound-text">啊哦，这款故事机还不支持连接APP~</p>
		<div class="not-bound-btn" @click="addWeChat">了解以旧换新活动</div>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';	
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['system']),
	},
	methods: {
		addWeChat() {
			window._czc.push(['_trackEvent', '火火兔APP', '点击', '了解以旧换新']);
			location.href="https://www.maka.im/danyeviewer/13045418/KFTCES6NW13045418?t=1607303897361"
			// let data = {
			// 	mini_program_id: 'gh_1f54dd7d30fe',
			// 	path: '/pages/share/share'
			// };
			// if (this.system == 'ios') {
			// 	window.webkit.messageHandlers.redirectMiniProgram.postMessage(data);
			// } else {
			// 	window.android.playCourse('redirectMiniProgram', JSON.stringify(data));
			// }
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.not-bound-img {
	width: 100%;
	text-align: center;
	margin: 0 auto;
	padding-top: 100px;
	img {
		width: 144px;
		height: 145px;
	}
}
.not-bound-text {
	width: 100%;
	text-align: center;
	font-family: SourceHanSansCN-Normal;
	font-size: 15px;
	color: #7d7d7d;
	margin: 0 auto;
	padding-top: 21px;
}
.not-bound-btn {
	width: 345px;
	height: 47px;
	line-height: 47px;
	margin: 0 auto;
	margin-top: 46px;
	font-family: SourceHanSansCN-Normal;
	font-size: 17px;
	color: #ffffff;
	text-align: center;
	background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
	border-radius: 24px;
}
</style>
