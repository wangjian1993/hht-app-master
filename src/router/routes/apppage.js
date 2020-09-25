export default [
  { //首页
    path: '/apppage/poetry',
    name: 'poetry',
    component: () => import( /* webpackChunkName: "home" */ '@/views/AppPage/Poetry.vue'),
    meta: {
      keepAlive: true,
	  title: '火火兔学古诗'
    },
  },
  { //首页
    path: '/apppage/poetry/more',
    name: 'poetry-more',
    component: () => import( /* webpackChunkName: "home" */ '@/views/AppPage/PoetryMore.vue'),
    meta: {
      keepAlive: false,
	  title: '更多'
    },
  },
]