import Vue from 'vue'
import App from './App.vue';
import axios from "../api/index";
import '@babel/polyfill';
import Es6Promise from 'es6-promise'
import store from '../store/index'
Es6Promise.polyfill()
import '../assets/css/app.css' //公共css
import 'lib-flexible/flexible'
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(vConsole)
import {
	Button,
	NavBar,
	Slider,
	Toast,
	DatetimePicker,
	Popup,
	Field,
	Swipe,
	SwipeItem,
	Tab,
	Tabs,
	Icon,
	Loading,
	NoticeBar,
	Dialog,
	Picker,
	Cell,
	CellGroup,
	CheckboxGroup,
	Checkbox,
	RadioGroup,
	Radio,
	CountDown,
	List,
	Collapse,
	CollapseItem,
	Skeleton
} from 'vant';
Vue.use(Tab).use(Tabs).use(Button).use(NavBar).use(Slider).use(Toast).use(DatetimePicker).use(Popup).use(Field).use(
	Icon).use(Loading).use(NoticeBar).use(Dialog).use(Picker).use(Cell).use(CellGroup).use(CheckboxGroup).use(Checkbox).use(
	RadioGroup).use(Radio).use(CountDown).use(List).use(Collapse).use(CollapseItem).use(Skeleton);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
