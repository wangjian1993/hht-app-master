<template>
  <div class="title">
    <p>
      {{ title }}
      <span>{{ age }}</span>
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
  },
}
</script>

<style lang="less" scoped>
.title {
  width: 345px;
  margin: 0 auto;
  margin-top: 36px;
  margin-bottom: 20px;
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
  }
  span {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.3);
    padding-left: 12px;
  }
}
</style>
