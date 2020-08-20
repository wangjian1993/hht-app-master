import * as types from '@/store/mutation-type.js'
import * as CONSTANTS from "@/constants/index"
import $axios from '@/api/index.js'
import ROUTER from '@/router/index'
import STORE from '@/store/index'

const prefix = 'http://wifi.alilo.com.cn/xiaohai/hht/app/index.html#'

function convertObj(data) {
  var _result = []
  for (var key in data) {
    var value = data[key]
    if (value.constructor == Array) {
      value.forEach(function(_value) {
        _result.push(key + '=' + _value)
      })
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.join('&')
}

export default {
  /*
   * 路由跳转
   * */
  redirect({ commit }, payload) {
    const { path, query } = payload
    const isDev = window.location.href.indexOf('localhost:') > -1
    if (isDev) return ROUTER.push({ path, query })

    let convertQuery
    if (query) convertQuery = convertObj(query)
    const params = query
      ? { url: `${prefix}${path}?${convertQuery}` }
      : { url: `${prefix}${path}` }

    let system
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      system = 'ios'
    } else if (/(Android)/i.test(navigator.userAgent)) {
      system = 'android'
    }

    if (system == 'ios') {
      window.webkit.messageHandlers.web_navigite.postMessage(params)
    } else {
      window.android.playCourse('web_navigite', JSON.stringify(params))
    }
  },

  [CONSTANTS.DISPATCH_REDIRECT_HOME]: async ({ commit }, payload) => {
    alert('go home');
    const { path, query } = payload
    const isDev = window.location.href.indexOf('localhost:') > -1
    if (isDev) return ROUTER.push({ path, query })

    let convertQuery
    if (query) convertQuery = convertObj(query)
    const params = query
      ? { url: `${prefix}${path}?${convertQuery}` }
      : { url: `${prefix}${path}` }

    let system
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      system = 'ios'
    } else if (/(Android)/i.test(navigator.userAgent)) {
      system = 'android'
    }

    if (system == 'ios') {
      window.webkit.messageHandlers.web_nav_popToRoot.postMessage(null)
    } else {
      window.android.playCourse('web_nav_popToRoot', "")
    }
  },
}
