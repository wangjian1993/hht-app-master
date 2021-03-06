export default [
  { //首页
    path: '/',
    name: 'index',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Home/Index.vue'),
    meta: {
      keepAlive: false,
	  title: '会员中心'
    },
  },
  { //排行榜
    path: '/ranking',
    name: 'ranking',
    component: () => import( /* webpackChunkName: "ranking" */ '@/views/Home/Ranking.vue'),
    meta: {
      keepAlive: true,
	  title: '排行榜'
    },
  },
  { //报告
    path: '/report',
    name: 'report',
    component: () => import( /* webpackChunkName: "report" */ '@/views/Home/Report.vue'),
    meta: {
      keepAlive: true,
	  title: '月报告'
    },
  },
  { //登陆
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '@/views/Login/Login.vue'),
    meta: {
      keepAlive: true,
	  title: '登陆'
    },
  },
  { //vip
    path: '/education',
    name: 'education',
    component: () => import( /* webpackChunkName: "member" */ '@/views/Home/Education.vue'),
    meta: {
      keepAlive: true,
	  title: '智慧早教'
    },
  },
  { //会员激活
    path: '/membership',
    name: 'membership',
    component: () => import( /* webpackChunkName: "membership" */ '@/views/Home/Membership.vue'),
    meta: {
      keepAlive: true,
	  title: '激活会员'
    },
  },
  { //会员激活
    path: '/purchase-help',
    name: 'purchase-help',
    component: () => import( /* webpackChunkName: "purchase-help" */ '@/views/Home/PurchaseHelp.vue'),
    meta: {
      keepAlive: true,
	  title:'会员帮助'
    },
  },
  { //会员激活
    path: '/member-activity',
    name: 'member-activity',
    component: () => import( /* webpackChunkName: "member-activity" */ '@/views/Home/MemberActivity.vue'),
    meta: {
      keepAlive: true,
	  title: '活动'
    },
  },
  { //会员帮助
    path: '/member-help',
    name: 'member-help',
    component: () => import( /* webpackChunkName: "member-help" */ '@/views/Home/MemberHelp.vue'),
    meta: {
      keepAlive: true,
	  title: '会员帮助'
    },
  },
  { //会员权益
    path: '/member-equity',
    name: 'member-equity',
    component: () => import( /* webpackChunkName: "member-equity" */ '@/views/Home/MemberEquity.vue'),
    meta: {
      keepAlive: true,
	   title: '会员权益'
    }
  },
  { //会员权益
    path: '/apply',
    name: 'apply',
    component: () => import( /* webpackChunkName: "member-equity" */ '@/views/Home/Apply.vue'),
    meta: {
      keepAlive: false,
	  title: '报名'
    }
  },
  { //专享内容
    path: '/more',
    name: 'more',
    component: () => import( /* webpackChunkName: "more" */ '@/views/Home/more.vue'),
    meta: {
      keepAlive: true,
	  title: '专享内容'
    }
  },
  { //添加地址
    path: '/add-site',
    name: 'add-site',
    component: () => import( /* webpackChunkName: "more" */ '@/views/Home/AddSite.vue'),
    meta: {
      keepAlive: true,
	  title: '添加地址'
    }
  },
  { //学习中详情
    path: '/not-bound',
    name: 'not-bound',
    component: () => import( /* webpackChunkName: "apply" */ '@/views/Home/NotBound.vue'),
    meta: {
      keepAlive: true,
	  title: '以旧换新'
    }
  },
  { //学习中详情
    path: '/error',
    name: 'error',
    component: () => import( /* webpackChunkName: "apply" */ '@/views/Common/Error.vue'),
    meta: {
      keepAlive: true,
    }
  }
  // {
  //   path: '*',
  //   redirect: '/'
  // }, //路由按顺序从上到下，依次匹配。最后一个*能匹配全部，然后重定向到主页面
]