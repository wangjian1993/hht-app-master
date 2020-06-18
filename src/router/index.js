import Vue from 'vue'
import Router from 'vue-router'
import MEMBERSHIPROUTE from "./routes/membership";
import COURSEROUTE from "./routes/course";
Vue.use(Router)



const router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [
		...MEMBERSHIPROUTE,
		...COURSEROUTE,
		
	]
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  next();
});

export default router;
