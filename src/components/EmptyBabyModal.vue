<template>
  <van-popup v-model="show" @close="close" class="empty-baby-modal-wrapper">
    <p>添加宝宝信息</p>
    <p>创建宝贝信息, 以生成适合宝贝成长的智慧早教计划</p>
    <div @click="confirm"><p>添加宝贝</p></div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      radio: 0,
      babyList: [],
    }
  },
  created() {},
  methods: {
    confirm() {
      this.$emit('close', 'confirm')
    },
    close() {
      this.$emit('close', false)
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.empty-baby-modal-wrapper {
  width: 270px;
  // height: 158px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p:first-of-type {
    margin-top: 32px;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
  }

  & > p:nth-of-type(2) {
    margin-top: 13px;
    padding: 0 23px;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.74);
  }

  & > div:nth-child(3) {
    width: 100%;
    margin-top: 19px;
    padding: 14px 0;
    // background-color: #ff0000;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #007aff;
    text-align: center;
    border-top: 1px solid #d8d8d8;
  }
}
.baby-box {
  width: 300px;
  height: 600px;
  z-index: 3001;
}
.baby-btn {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  p {
    width: 100%;
    font-size: 16px;
    color: #0088cc;
  }
}
</style>
