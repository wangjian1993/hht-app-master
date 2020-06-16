<template>
  <div class="wisdom-course-introduction-wrapper">
    <div class="apply-img">
      <img
        src="http://cloud.alilo.com.cn/down/image/smartedu_intro.png"
        alt=""
      />
    </div>
    <div class="apply-btn" @click="onUserApply"><p>立刻报名</p></div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  filters: {},
  watch: {},
  methods: {
    onUserApply() {},
    getUserSignupTime() {
      let self = this
      this.$axios
        .userApplyTime(localStorage.getItem('cid'))
        .then((res) => {
          if (res.data.code == 1) {
            try {
              // this.applyTime = this.computedTime(res.data.data.createTime)
              // let id = localStorage.getItem('babyId')
              // this.babyId = res.data.data.babyId
              // if (id != this.babyId) {
              //   localStorage.setItem('babyId', res.data.data.babyId)
              // }
              // let array = this.babyInfo
              // array.forEach(function(item, index) {
              //   if (res.data.data.babyId == item.id) {
              //     self.defaultBaby = item
              //     self.$store.dispatch('defaultBaby', item)
              //   }
              // })
              // this.getUserDayCourse()
              // this.isLoading = true
              // this.isSignupWisdom = true
            } catch (e) {
              console.log(e)
              //TODO handle the exception
            }
          } else {
            // console.log('还没有报名====')
            localStorage.removeItem('babyInfo')
            localStorage.removeItem('babyId')
            this.isLoading = true
            this.isSignupWisdom = false
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.apply-img {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.apply-btn {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 5%;
  left: 0;
  text-align: center;
  p {
    width: 311px;
    height: 48px;
    line-height: 48px;
    background-color: #ff9f80;
    border-radius: 24px;
    font-size: 17px;
    color: #fff;
    margin: 0 auto;
  }
}
</style>
