import Vue from 'vue'
import App from './App.vue'
import axios from '@/api/index'
import router from '@/router/index'
import createDialog from "@/plugins/createDialog";
import '@babel/polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import '@/assets/css/app.css' //公共css
import 'lib-flexible/flexible'
import store from '@/store/index'
import ALLFILTERS from "@/filters/index";
import VueClipboard from 'vue-clipboard2'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.use(VueClipboard);
Vue.use(createDialog);
// 开发环境下面使用vConsole进行调试
localStorage.setItem('vConsole_switch_x', 50)
localStorage.setItem('vConsole_switch_x', 50)
if (process.env.NODE_ENV === 'development') {
	const VConsole = require('vconsole')
	new VConsole()
}
//fundebug检测
var fundebug = require("fundebug-javascript");
fundebug.apikey = "6d1a5d9d00dc7c115627e4e2d262123af47ceed86c85c8fa81fb08d9b5648859";
require('fundebug-revideo');
Object.keys(ALLFILTERS).forEach(key => Vue.filter(key, ALLFILTERS[key]))
//vant组件
import elementComponent from '@/plugins/vantComponent.js.js'
import VideoPlayer from 'vue-video-player'
import '@/assets/css/common.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(elementComponent)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
// router.afterEach(route => {
// 	// 从路由的元信息中获取 title 属性
// 	if (route.meta.title) {
// 		document.title = route.meta.title;
// 		// 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
// 		if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
// 			const hackIframe = document.createElement('iframe');
// 			hackIframe.style.display = 'none';
// 			hackIframe.src = './common/html/fixIosTitle.html?r=' + Math.random();
// 			document.body.appendChild(hackIframe);
// 			setTimeout(_ => {
// 				document.body.removeChild(hackIframe)
// 			}, 300)
// 		}
// 	}
// });
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
