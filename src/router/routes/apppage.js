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
		component: () => import( /* webpackChunkName: "xyjvideo" */ '@/views/AppPage/XyjVideo.vue'),
		meta: {
			keepAlive: true,
			title: '西游记'
		},
	},
	{ //首页
		path: '/apppage/xmvip',
		name: 'xmvip',
		component: () => import( /* webpackChunkName: "xmvip" */ '@/views/AppPage/XmVip.vue'),
		meta: {
			keepAlive: true,
			title: '喜马会员免费领'
		},
	},
	{ //精品推荐
		path: '/apppage/original',
		name: 'original',
		component: () => import( /* webpackChunkName: "original" */ '@/views/AppPage/Original.vue'),
		meta: {
			keepAlive: true,
			title: '原创精品'
		},
	},
	{ //精品推荐
		path: '/apppage/original-more',
		name: 'original-more',
		component: () => import( /* webpackChunkName: "original" */ '@/views/AppPage/OriginalMore.vue'),
		meta: {
			keepAlive: false,
			title: '原创精品'
		},
	},
	{ //精品推荐
		path: '/apppage/patriarch',
		name: 'patriarch',
		component: () => import( /* webpackChunkName: "original" */ '@/views/AppPage/Patriarch.vue'),
		meta: {
			keepAlive: true,
			title: '家长锦囊'
		},
	},
]
