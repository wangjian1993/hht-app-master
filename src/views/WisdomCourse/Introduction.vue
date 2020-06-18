<template>
  <div class="wisdom-course-introduction-wrapper">
    <!-- <v-header title=""></v-header> -->
    <div class="apply-img">
      <img src="http://cloud.alilo.com.cn/down/image/smartedu_intro.png" />
    </div>
    <div class="del-btn" v-if="isSignup">
      <p @click="onDelCourse">从我的课程中删除</p>
    </div>

    <div class="apply-btn" v-else><p @click="onUserApply">立刻报名</p></div>
    <v-babaList
      v-if="babyBox"
      @setBabyId="setBabyId"
      @cloneBox="closeBox"
    ></v-babaList>
  </div>
</template>

<script>
import * as CONSTANTS from '@/constants/index'
import { mapState } from 'vuex'
import BabaList from '@/components/BabyList.vue'
import Header from '@/components/Header.vue'
export default {
  props: {},
  components: {
    'v-babaList': BabaList,
    'v-header': Header,
  },
  data() {
    return {
      isSignup: false,
      babyList: [],
      babyBox: false,
      babyArray: [],
    }
  },
  computed: {
    ...mapState(['system', 'memberInfoVip']),
  },
  created() {
    this.getUserSignupTime()
  },
  mounted() {},
  filters: {},
  watch: {},
  methods: {
    async onUserApply() {
      if (this.memberInfoVip == 0) {
        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, { path: '/' })
        return this.$toast('请先开通会员')
      }

      //filter: 未添加宝贝
      await this.getBabyList()
      if (!this.babyList.length) return this.showLackBabyModal()

      this.babyBox = true
    },

    async showLackBabyModal() {
      const dialog = await this.$createDialog(
        () => import('@/views/Course/LackBabyModal.vue'),
        {
          destroyOnClose: true,
          on: {
            close: (v) => {
              dialog.close()
              if (this.system == 'ios')
                return window.webkit.messageHandlers.addBabys.postMessage(null)
              else return window.android.addBabys('addBabys', '')
            },
          },
        }
      )
    },
    // 取消报名
    async onDelCourse() {
      let cid = window.localStorage.getItem('cid')
      let user = window.localStorage.getItem('user')
      let courseBaby = window.localStorage.getItem('courseBaby')
      cid = JSON.parse(cid)
      user = JSON.parse(user)
      courseBaby = JSON.parse(courseBaby)

      try {
        const params = {
          userId: user,
          babyId: courseBaby,
          courseId: cid,
        }
        const { data } = await this.$axios.getCourseCancel(params)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$toast.success('取消成功')
        // this.$router.push({ name: 'course/index' })

        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
          path: '/course/smart-course',
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },

    //获取用户报名智慧早教的时间
    async getUserSignupTime() {
      let cid = localStorage.getItem('cid')

      try {
        const { data } = await this.$axios.userApplyTime(cid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        const { babyId } = resData
        let courseBaby = window.localStorage.getItem('courseBaby')
        courseBaby = JSON.parse(courseBaby)
        if (babyId * 1 === courseBaby * 1) this.isSignup = true
      } catch (err) {
        console.log(err)
      }
    },

    async getBabyList() {
      try {
        const { data } = await this.$axios.getBabyList()
        if (!data.success) throw new Error(data.info)
        this.babyList = data.data
      } catch (err) {
        console.log(err)
      }
    },

    async setBabyId(list) {
      this.babyArray = list

      this.$toast.loading({
        message: '报名中...',
        forbidClick: true,
      })

      try {
        const { id } = list
        const { data } = await this.$axios.userApply(id)
        if (!data.success) throw new Error(data.info)

        this.$store.dispatch('defaultBaby', data)
        this.$toast('报名成功')
        this.isSignup = true

        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
          path: '/course/apply',
        })
        this.babyBox = !this.babyBox
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },

    closeBox() {
      this.babyBox = false
    },
  },
}
</script>

<style lang="less" scoped>
@import './../../assets/css/constants.less';
.apply-img {
  width: 100%;
  height: 100%;
  // margin-top: @header-comp-height;
  margin-bottom: 84px;
  img {
    width: 100%;
    height: 100%;
  }
}
.apply-btn {
  width: 100%;
  height: 84px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #fff;
  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    background-color: #ff9f80;
    border-radius: 24px;
    margin: 14px 15px;
    background-image: linear-gradient(90deg, #ff9043 0%, #ff6666 100%);
    font-family: 'SourceHanSansCN-Medium';
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

.del-btn {
  width: 100%;
  height: 84px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #fff;

  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    margin: 14px 15px;
    // font-family: 'SourceHanSansCN-Medium';
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    border-radius: 24px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    // opacity: 0.5;
    font-family: 'SourceHanSansCN-Medium';
    font-size: 17px;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
