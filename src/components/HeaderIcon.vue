<template>
  <div class="app">
    <div class="app-header">
      <div class="header-left" @click="onClickLeft">
        <van-icon name="arrow-left" color="#ffffff" size="20" />
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
.app-header {
  width: 100%;
  position: fixed;
  top: 30px;
  left: 16px;
  z-index: 3000;
  .header-left {
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
