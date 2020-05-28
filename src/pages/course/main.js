import Vue from 'vue'
import App from './App.vue';
import axios from "../../api/index";
import '@babel/polyfill';
import router from '../../router/course';
import Es6Promise from 'es6-promise'
import store from '../../store/index'
Es6Promise.polyfill()
import '../../assets/css/app.css' //公共css
import 'lib-flexible/flexible'
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(vConsole)
import {
	Button,
	Toast,
	Popup,
	Icon,
	Loading,
	NoticeBar,
	Dialog,
	Cell,
	CellGroup,
	List,
	Collapse,
	CollapseItem,
	NavBar,
	Tab,
	Tabs,
	Empty,
	Lazyload
} from 'vant';
Vue.use(Button).use(Toast).use(Popup).use(
	Icon).use(Loading).use(NoticeBar).use(Dialog).use(Cell).use(CellGroup).use(List).use(Collapse).use(CollapseItem).use(
	NavBar).use(Tab).use(Tabs).use(Empty).use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
