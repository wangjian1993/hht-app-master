<template>
  <van-popup
    v-bind="$attrs"
    get-container="body"
    :close-on-click-overlay="false"
    :style="popupStyle"
  >
    <div class="ebbinghaus-modal-wrapper">
      <p>什么是艾宾浩斯曲线</p>
      <p>
        描述了人类大脑对新事物遗忘的规律。人体大脑对新事物遗忘的循序渐进的直观描述，人们可以从遗忘曲线中掌握遗忘规律并加以利用，从而提升自我记忆能力。课程根据大脑的遗忘曲线规律安排学习新课程和复习课程。
      </p>
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
.ebbinghaus-modal-wrapper {
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
