<template>
  <div id="app" class="hhtApp">
    <transition :name="transitionName">
      <keep-alive
        ><router-view v-if="$route.meta.keepAlive"></router-view
      ></keep-alive>
    </transition>
    <transition :name="transitionName"
      ><router-view v-if="!$route.meta.keepAlive"></router-view
    ></transition>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import * as CONSTANTS from '@/constants/index'
export default {
  data() {
    return {
      transitionName: 'slide-right', //初始过渡动画方向
    }
  },
  created() {
    this.type = this.getSystem()
    if (this.type == 'ios') {
      this.$store.dispatch('setBabyInfoAction')
    } else {
      this.$store.dispatch('setBabyInfoADAction')
    }
    this.$store.dispatch('setUserInfoAction')
    this.$store.dispatch('getUserActivityInfo')

    //我的课程-红点cookie
    // setCookiesWithExpiresTime(
    //   CONSTANTS.LABEL_COOKIE_SCHOOLTIME,
    //   {},
    //   CONSTANTS.LABEL_COOKIE_EXPIRES
    // )
  },
  methods: {
    getSystem() {
      let ua = navigator.userAgent.toLowerCase()
      //android终端
      let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1 //ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //ios
        this.$store.dispatch('setSystemAction', 'ios')
        return 'ios'
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //android
        this.$store.dispatch('setSystemAction', 'android')
        return 'android'
      }
    },
  },
  watch: {
    $route(to, from) {
      // 切换动画
      // let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
      // if (isBack) {
      //   this.transitionName = 'slide-left'
      // } else {
      //   this.transitionName = 'slide-right'
      // }
      // this.$router.isBack = false
    },
  },
  components: {},
}
</script>
<style lang="less">
#app {
  width: 100%;
  // height: 100%;
  font-family: 'SourceHanSansCN-Regular', Helvetica, STHeiTi, Arial, sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-size: 62.5%;
  background: #fff;
  // background-color: #00ffff;
}
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform;
//   transition: all 500ms;
//   position: absolute;
// }
// .slide-right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
</style>
