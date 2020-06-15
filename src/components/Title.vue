<template>
  <div
    class="title"
    :style="{ 'margin-top': `${top}px`, 'margin-bottom': `${bottom}px` }"
  >
    <p>
      {{ title }}
      <span v-if="age">{{ age }}</span>
      <span v-if="courseCount"
        >共<i>{{ courseCount }}</i
        >课时</span
      >
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    age: {
      type: String,
    },
    top: {
      type: [String, Number],
      default: '36',
    },
    bottom: {
      type: [String, Number],
      default: '20',
    },
    courseCount: [String, Number],
  },
}
</script>

<style lang="less" scoped>
.title {
  width: 345px;
  margin: 0 auto;
  // margin-top: 36px;
  // margin-bottom: 20px;
  position: relative;
  // background-color: #fff000;
  // box-shadow:-4px 0px 0 0 #ff6666;
  // box-shadow:inset 4px 0 0 0 #ff6666;
  &::after {
    content: '';
    width: 4px;
    height: 22px;
    border-radius: 2px;
    position: absolute;
    top: 50%;
    left: 0;
    background: #ff6666;
    transform: translateY(-50%);
  }
  p {
    // font-size: 15px;
    padding-left: 10px;
    // color: rgba(0, 0, 0, 0.8);
    font-family: 'SourceHanSansCN-Medium';
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    display: flex;
    align-items: center;
    position: relative;

    & > span {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.3);
      padding-left: 12px;
    }

    & > span:last-of-type {
      margin-left: auto;

      font-family: 'SourceHanSansCN-Normal';
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.6);
      & > i {
        font-style: normal;

        font-family: 'SourceHanSansCN-Medium';
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
