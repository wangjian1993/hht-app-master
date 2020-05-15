<template>
	<div id="app" class="hhtApp">
		<transition :name="transitionName">
			<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Header from '@/components/Header.vue';
export default {
	data() {
		return {
			transitionName: ''
		};
	},
	created() {},
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
		// 使用watch 监听$router的变化
		$route(to, from) {
			// 如果to索引大于from索引,判断为前进状态,反之则为后退状态
			if (to.meta.index > from.meta.index) {
				// 设置动画名称
				this.transitionName = 'slide-left';
			} else {
				this.transitionName = 'slide-right';
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
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	will-change: transform;
	transition: all 500ms;
	position: absolute; //这里的定位使用relative可以解决切换时页面残影
}
.slide-right-enter {
	opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
	opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
</style>
