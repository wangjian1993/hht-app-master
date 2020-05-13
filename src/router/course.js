import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [{ //首页
			path: '/',
			name: 'index',
			component: () => import( /* webpackChunkName: "home" */ '@/views/Course/Index.vue'),
			meta: {
				keepAlive: true,
			},
		},
		{
			path: '*',
			redirect: '/'
		}, //路由按顺序从上到下，依次匹配。最后一个*能匹配全部，然后重定向到主页面
	]
})
