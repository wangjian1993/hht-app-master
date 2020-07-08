import Vue from 'vue'
import App from './App.vue'
import axios from './api/index'
import router from './router/index'
import createDialog from "@/plugins/createDialog";
import '@babel/polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import './assets/css/app.css' //公共css
import './assets/css/font.css' //公共css
import 'lib-flexible/flexible'
import store from './store/index'
// import Vconsole from 'vconsole'
import ALLFILTERS from "@/filters/index";

// const vConsole = new Vconsole()
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(createDialog);
// Vue.use(vConsole)
var fundebug = require("fundebug-javascript");
fundebug.apikey = "6d1a5d9d00dc7c115627e4e2d262123af47ceed86c85c8fa81fb08d9b5648859";
require('fundebug-revideo');
//global filters
Object.keys(ALLFILTERS).forEach(key => Vue.filter(key, ALLFILTERS[key]))



import {
  Button,
  NavBar,
  Slider,
  Toast,
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
  RadioGroup,
  Radio,
  CountDown,
  List,
  Collapse,
  CollapseItem,
  Skeleton,
  Empty,
  Row,
  Col,
} from 'vant'
Vue.use(Tab)
  .use(Tabs)
  .use(Button)
  .use(NavBar)
  .use(Slider)
  .use(Toast)
  .use(Popup)
  .use(Field)
  .use(Icon)
  .use(Loading)
  .use(NoticeBar)
  .use(Dialog)
  .use(Picker)
  .use(Cell)
  .use(CellGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(CountDown)
  .use(List)
  .use(Collapse)
  .use(CollapseItem)
  .use(Skeleton)
  .use(Empty)
  .use(Row)
  .use(Col)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
