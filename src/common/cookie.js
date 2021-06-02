import Cookies from 'js-cookie'
import * as CONSTANTS from '@/constants/index'

export function getCookies(key) {
  return Cookies.get(key)
}

export function initCookie() {
  // let seconds = expiresTime
  // let expires = new Date(new Date() * 1 + seconds * 1000)
  return Cookies.set(CONSTANTS.LABEL_COOKIE_SCHOOLTIME, {})
}

export function setCookiesWithExpiresTime(key, value, expiresTime) {
  let seconds = expiresTime
  let expires = new Date(new Date() * 1 + seconds * 1000)
  return Cookies.set(key, value, { expires: expires })
}

export function setCookies(key, value, expiresTime) {
  let seconds = expiresTime
  let expires = new Date(new Date() * 1 + seconds * 1000)
  return Cookies.set(key, value)
}

export function removeCookies(key) {
  return Cookies.remove(key)
}
