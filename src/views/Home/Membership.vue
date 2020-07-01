<template>
  <div class="app">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="content" v-show="isLoading">
      <div class="ship-input">
        <input
          type="text"
          placeholder="请输入会员激活码"
          v-model="code"
          ref="input_description"
          @blur="shipBlur"
          @focus="shipFocus"
          @input="changeInput"
        />
      </div>
      <!-- <div class="ship-tip">注意：刮开会员卡获得激活码</div> -->
      <div class="ship-btn" @click="cardBtn">
        <p :class="isClick ? 'active' : ''">立刻激活</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as CONSTANTS from '@/constants/index';	
export default {
  data() {
    return {
      isLoading: false,
      code: null,
      isClick: false,
    }
  },
  created() {
    let self = this
    setTimeout(function() {
      self.isLoading = true
    }, 500)
  },
  methods: {
    shipBlur() {
      this.setInputShow()
    },
    shipFocus() {
      this.setInputShow()
    },
    changeInput() {
      this.setInputShow()
    },
    setInputShow() {
      if (this.code != null && this.code != '') {
        this.isClick = true
      } else {
        this.isClick = false
      }
    },
    cardBtn() {
      if (!this.isClick) {
        this.$toast('请输入激活码')
        return
      }
      this.$toast.loading({
        message: '正在激活...',
        forbidClick: true,
      })
      let userid = localStorage.getItem('user')
      this.$axios
        .setVipClubCard(this.code, userid)
        .then((res) => {
          if (!res.data.success) {
            this.$toast(res.data.info)
          } else {
            this.$toast.success('激活成功');
			this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
				path: "/index"
			});
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.ship-input {
  width: 311px;
  height: 48px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 40px auto 20px;
  input {
    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 15px;
    color: #919191;
  }
}
.ship-tip {
  text-align: center;
  font-size: 13px;
  color: #919191;
}
.ship-btn {
  width: 95%;
  margin: 0 auto;
  text-align: center;
  margin-top: 138.5px;
  p {
    width: 311px;
    height: 48px;
    line-height: 48px;
    background-color: #d8d8d8;
    border-radius: 24px;
    font-size: 17px;
    color: rgba(0, 0, 0, 0.4);
    margin: 0 auto;
  }
}
.ship-btn p.active {
  background-image: linear-gradient(90deg, #f7bc61 0%, #ffe3a0 100%),
    linear-gradient(#d8d8d8, #d8d8d8);
  color: #64442e;
}
</style>
