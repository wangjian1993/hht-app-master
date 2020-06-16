<template>
  <div class="app">
    <div class="app-header iphonex-bd-top">
      <div class="app-header-box">
        <div class="header-left" @click="onClickLeft">
          <van-icon name="arrow-left" size="20" />
        </div>
        <div class="header-text">
          <p class="van-ellipsis">{{ title }}</p>
        </div>
        <div class="header-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: null,
  },
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      // Toast('返回');
      this.$router.go(-1) //返回上一层
    },
    onClickRight() {
      // Toast('按钮');
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
@import './../assets/css/constants.less';

.app-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: @header-comp-height;
  background-color: #fff;
  z-index: 2000;
  /* 因为header导航栏是基于屏幕进行定位，所以要做单独的padding挤压处理 */
  // padding-right: constant(safe-area-inset-right);
  // padding-left: constant(safe-area-inset-left);
  // padding-right: env(safe-area-inset-right);
  // padding-left: env(safe-area-inset-left);
  .app-header-box {
    width: 100%;
    height: @header-comp-height;
    display: flex;
    align-items: center;
    z-index: 3000;
    .header-left {
      width: 15%;
      height: @header-comp-height;
      padding-left: 16px;
      display: flex;
      align-items: center;
    }
    .header-text {
      width: 70%;
      padding-left: 16px;
      width: 250px;
      text-align: center;
      p {
        font-size: 17px;
        color: #333333;
      }
    }
  }
}
</style>
