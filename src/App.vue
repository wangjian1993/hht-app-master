<template>
	<div id="app" class="hhtApp">
		<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {};
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
		script.src = 'https://s95.cnzz.com/z_stat.php?id=1278964945&web_id=1278964945';
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
			console.log("window._czc=====",window._czc)
			if (window._czc) {
				console.log(window._czc);
				let location = window.location;
				let contentUrl = location.pathname + location.hash;
				let refererUrl = '/';
				window._czc.push(['_trackPageview', contentUrl, refererUrl]);
				// window._czc.push(﻿["_trackEvent",category,action,label,value,nodeid]);
			}
		}
	},
	components: {}
};
</script>
<style lang="less">
#app {
	font-family: 'SourceHanSansCN-Regular', Helvetica, STHeiTi, Arial, sans-serif;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	font-size: 62.5%;
	background: #fff;
}
</style>
