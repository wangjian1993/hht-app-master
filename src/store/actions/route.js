import * as types from "@/store/mutation-type.js";
import $axios from '@/api/index.js';
import ROUTER from '@/router/index';
import STORE from '@/store/index';

const prefix = 'http://twifi.alilo.com.cn/xiaohai/hht/temp/index.html#';

function convertObj (data) {
  var _result = [];
  for (var key in data) {
    var value = data[key];
    if (value.constructor == Array) {
      value.forEach(function (_value) {
        _result.push(key + "=" + _value);
      });
    } else {
      _result.push(key + '=' + value);
    }
  }
  return _result.join('&');
}

export default {
	/*
	 * 路由跳转
	 * */
  redirect ({
    commit
  }, payload) {
    alert('payload: ');
    alert(JSON.stringify(payload));
    const system = STORE.getters['system'];
    const { path, query } = payload;

    let isDev = window.location.href.indexOf('localhost:');
    if (isDev) return ROUTER.push({ path, query });

    // let prefix = 'http://twifi.alilo.com.cn/xiaohai/hht/temp/index.html#/';

    let convertQuery;
    if (query) convertQuery = convertObj(query);
    const params = query ? { url: `${prefix}${path}?${convertQuery}` } : { url: `${prefix}${path}` }

    if (system == 'ios') {
      alert('params: ');
      alert(JSON.stringify(params));
      window.webkit.messageHandlers.web_navigite.postMessage(params)
    } else {
      window.android.playCourse('web_navigite', params)
    }

  },
};
