<template>
	<div id="app" class="hhtApp">
		<transition :name="transitionName">
			<keep-alive><router-view v-if="$route.meta.keepAlive" v-wechat-title='$route.meta.title'></router-view></keep-alive>
		</transition>
		<transition :name="transitionName"><router-view v-if="!$route.meta.keepAlive" v-wechat-title='$route.meta.title'></router-view></transition>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import * as CONSTANTS from '@/constants/index';
export default {
	data() {
		return {
			transitionName: 'slide-right' //初始过渡动画方向
		};
	},
	created() {
		this.type = this.getSystem();
		if (this.type == 'ios') {
			this.$store.dispatch('setBabyInfoAction');
		} else {
			this.$store.dispatch('setBabyInfoADAction');
		}
		this.$store.dispatch('setUserInfoAction');
		this.$store.dispatch('getUserActivityInfo');
	},
	mounted() {
		const script = document.createElement('script');
		script.src = 'https://s95.cnzz.com/z_stat.php?id=1279310301&web_id=1279310301';
		script.language = 'JavaScript';
		document.body.appendChild(script);
	},
	methods: {
		getSystem() {
			let ua = navigator.userAgent.toLowerCase();
			//android终端
			let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //ios终端
			let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				//ios
				this.$store.dispatch('setSystemAction', 'ios');
				return 'ios';
			} else if (/(Android)/i.test(navigator.userAgent)) {
				//android
				this.$store.dispatch('setSystemAction', 'android');
				return 'android';
			}
		}
	},
	watch: {
		$route() {
			if (window._czc) {
				console.log(window._czc);
				let location = window.location;
				let contentUrl = location.pathname + location.hash;
				let refererUrl = '/';
				window._czc.push(['_trackPageview', contentUrl, refererUrl]);
			}
		}
	},
	components: {}
};
</script>
<style lang="less">
#app {
	width: 100%;
	// height: 100%;
	font-family: 'SourceHanSansCN-Normal', Helvetica, STHeiTi, Arial, sans-serif;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	font-size: 62.5%;
	background: #fff;
	// background-color: #00ffff;
}
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform;
//   transition: all 500ms;
//   position: absolute;
// }
// .slide-right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
.van-cell {
	font-family: 'SourceHanSansCN-Normal';
	padding: 12px 0;
	color: rgba(0, 0, 0, 0.8);
	border: none;
}
.van-collapse-item__content {
	padding: 0px 0;
	border: none;
}
.van-cell::after {
	border: none;
}
.van-collapse-item--border::after {
	border: none;
}
[class*='van-hairline']::after {
	border: none;
}
</style>
