<template>
  <div class="class">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="content" v-show="isLoading">
      <div class="apply-img">
        <img
          src="http://cloud.alilo.com.cn/down/image/smartedu_intro.png"
          alt=""
        />
      </div>
      <div class="apply-btn" @click="userApply"><p>立刻报名</p></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    }
  },
  created() {
    this.cardBtn()
  },
  methods: {
    cardBtn() {
      this.$axios.userApplyTime().then((res) => {
        if (res.data.data == '该用户还未报名智慧早教课程') {
          this.isLoading = true
        } else {
          this.$router.push({ name: 'education' })
        }
      })
    },
    userApply() {
      this.$axios
        .userApply()
        .then((res) => {
          if (res.data.code == 1) {
            this.$toast('报名成功')
            this.$router.push({ name: 'education' })
            return true
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
  },
  components: {},
  // beforeRouteLeave(to, from, next) {
  // 	console.log('to,', to);
  // 	console.log('from,', from);
  // 	if (to.name === 'education' && from.name == 'apply') {
  // 		// console.log('回到首页');
  // 		// next({
  // 		// 	name: '/'
  // 		// });
  // 	} else {
  // 		next(); // 注意：这边next必须要写
  // 	}
  // }
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
  width: 95%;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  bottom: 5%;
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
