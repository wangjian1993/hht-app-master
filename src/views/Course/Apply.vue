<template>
  <div class="app">
    <v-header title=""></v-header>
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="course-apply-wrapper iphonex-bd-top" v-show="isLoading">
      <div class="apply-img">
        <img src="../../assets/image/course/icon_chosen@2x.png" alt="" />
        <p>报名成功</p>
        <p>请在我的课程中查看上课信息，一起努力哦～</p>
      </div>
      <div class="apply-wacht">
        <div class="wacht-img">
          <img src="../../assets/image/content1.png" alt="" />
        </div>
        <div class="wacht-text">
          <p>用微信扫码加入专业交流群， 在线宝爸宝妈互吐心声一起 养娃～</p>
          <span>加入微信群</span>
        </div>
      </div>
      <!-- <div class="details-btn" @click="routerHome"><p>确定</p></div> -->

      <div class="details-btn1" @click="routerHome">
        <p>完成</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  data() {
    return {
      title: '报名成功',
      isLoading: true,
    }
  },
  methods: {
    routerHome() {
      this.$router.push({ name: 'course/index' })
    },
  },
  components: {
    'v-header': Header,
  },
}
</script>

<style lang="less" scoped>
.course-apply-wrapper {
  margin-top: 42px;
  padding-top: 47px;
}
.apply-img {
  width: 100%;
  margin: 0 auto;
  // margin-top: 40px;
  text-align: center;
  img {
    width: 26px;
    height: 26px;
  }
  p {
    &:nth-of-type(1) {
      // font-size: 18px;
      // color: rgba(0, 0, 0, 0.8);
      padding-top: 9px;

      font-family: 'SourceHanSansCN-Medium';
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }
    &:nth-of-type(2) {
      margin-top: 32px;
      // font-size: 15px;
      // color: rgba(0, 0, 0, 0.5);

      font-family: 'SourceHanSansCN-Normal';
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.apply-wacht {
  width: 345px;
  margin: 0 auto;
  margin-top: 54px;
  display: flex;

  background-color: #ffffff;
  box-shadow: 0px 0px 2px 2px rgba(76, 76, 76, 0.03);
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0.06);
  // align-items: center;
  .wacht-img {
    width: 113px;
    height: 105px;
    border-radius: 2px;
    margin: 22px 16px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wacht-text {
    width: 182px;
    height: 105px;
    margin-top: 22px;
    position: relative;
    p {
      // font-size: 14px;
      // color: rgba(0, 0, 0, 0.8);

      font-family: 'SourceHanSansCN-Normal';
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }
    span {
      width: 104px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      display: inline-block;
      background-color: #4dc42a;
      border-radius: 19px;
      color: #ffffff;
      font-size: 13px;
      position: absolute;
      right: 0;
      bottom: 0;

      // width: 104px;
      // height: 32px;
      // background-color: #4dc42a;
      // border-radius: 19px;
      font-family: 'SourceHanSansCN-Regular';
      // font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
.details-btn {
  position: fixed;
  bottom: 34px;
  width: 100%;
  text-align: center;
  margin: 34px 0;
  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
    border-radius: 24px;
    font-size: 17px;
    color: #ffffff;
    margin: 0 auto;
  }
}

.details-btn1 {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  margin-top: 28px;
  padding-top: 14px;
  margin-bottom: 34px;
  background-color: #ff0000;
  border-top: solid 1px rgba(0, 0, 0, 0.08);

  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    background: #fff;
    border-radius: 24px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    font-size: 17px;
    color: rgba(0, 0, 0, 0.6);
    margin: 0 auto;

    font-family: 'SourceHanSansCN-Medium';
    // font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    // color: rgba(0, 0, 0, 0.6);
  }
}
</style>
