<template>
  <van-popup
    v-bind="$attrs"
    get-container="body"
    :close-on-click-overlay="false"
    :style="popupStyle"
  >
    <div class="overload-course-modal-wrapper">
      <p>添加课程限制</p>
      <p>您添加的课程太多啦，请学完或取消一些课程再来添加哦！</p>
      <button @click="onClose">我知道了</button>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      isFirstEnters: false,
      popupStyle: {
        'background-color': 'transparent',
      },
    }
  },
  computed: {},
  mounted() {},
  filters: {},
  watch: {},
  methods: {
    onClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.overload-course-modal-wrapper {
  width: 270px;
  // height: 158px;
  border-radius: 8px;
  background-color: #fff;
  & > p:first-of-type {
    padding-top: 32px;
    text-align: center;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
  }

  & > p:nth-of-type(2) {
    margin-top: 10px;
    margin-left: 23px;
    margin-right: 23px;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.74);
  }

  & > button:last-of-type {
    width: 100%;
    height: 45px;
    margin-top: 15px;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #007aff;
    border: 0;
    outline: 0;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>
