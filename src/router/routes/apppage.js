export default [{ //首页
		path: '/apppage/poetry',
		name: 'poetry',
		component: () => import( /* webpackChunkName: "poetry" */ '@/views/AppPage/Poetry.vue'),
		meta: {
			keepAlive: true,
			title: '火火兔学古诗'
		},
	},
	{ //首页
		path: '/apppage/poetry/more',
		name: 'poetry-more',
		component: () => import( /* webpackChunkName: "poetry-more" */ '@/views/AppPage/PoetryMore.vue'),
		meta: {
			keepAlive: false,
			title: '更多'
		},
	},
	{ //首页
		path: '/apppage/yzgoods',
		name: 'yzgoods',
		component: () => import( /* webpackChunkName: "yzgoods" */ '@/views/AppPage/YzGoods.vue'),
		meta: {
			keepAlive: true,
			title: '早教玩具'
		},
	},
	{ //首页
		path: '/apppage/xyjvideo',
		name: 'xyjvideo',
		component: () => import( /* webpackChunkName: "yzgoods" */ '@/views/AppPage/XyjVideo.vue'),
		meta: {
			keepAlive: true,
			title: '西游记'
		},
	},
]
