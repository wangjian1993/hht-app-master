<template>
  <div class="course-index-wrapper">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>

    <div @click="onLoad">测试服刷新</div>
    <v-card :list="lsit" :eduData="educationData"></v-card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  data() {
    return {
      isLoading: false,
      courseTab: 1,
      courseUserTab: 1,
      lsit: [],
      userList: [],
      learning: true,
      educationData: false,
      status: 0,
      isShow: true,
      babyid: 0,
      isDeviseText: true,
    }
  },
  created() {
    this.babyid = localStorage.getItem('courseBaby')
    this.getSignupTime()
    this.getCourseAll()
  },
  activated() {
    this.getCourseAll()
  },
  mounted() {},
  methods: {
    onLoad() {
      location.reload()
    },
    addCourse() {
      this.courseTab = 1
    },
    deviseText() {
      this.isDeviseText = !this.isDeviseText
    },
    // 获取报名时间
    async getSignupTime() {
      try {
        const cid = localStorage.getItem('cid')
        const { data } = await this.$axios.userApplyTime(cid)
        if (!data.success) throw new Error(data.info)

        this.educationData = true
        this.$store.dispatch('setEduFlag', true)
      } catch (err) {
        this.educationData = false
        this.$store.dispatch('setEduFlag', false)
        console.log(err)
      }
    },
    async getCourseAll() {
      await this.getAsyncCoursePackage()
      await this.getAsyncUserCourse()
    },
    async getAsyncCoursePackage() {
      try {
        const { data } = await this.$axios.getCoursePack(this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.lsit = resData
        this.isLoading = true
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    async getAsyncUserCourse() {
      try {
        const { data } = await this.$axios.getUserCourse(this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$store.dispatch('setUserCourse', resData)
        this.userList = resData
        this.isLoading = true
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
  },
  components: {
    'v-card': Card,
  },
}
</script>

<style lang="less" scoped>
@import './../../assets/css/constants.less';
.course-index-wrapper {
  width: 100%;
}

.content {
  width: 100%;
}

.course-box-top {
  width: 100%;
  height: 187px;
  background-color: #ffc396;
}

.course-header {
  width: 100%;
  background: #fff;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);

  .course-box-tab {
    width: 100%;
    height: 64px;
    z-index: 3000;
    background: #ffffff;

    .course-tab-item {
      width: 60%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      text-align: center;

      div {
        width: 50%;
        line-height: 1;
        margin-top: 37px;

        p {
          width: 100%;
          max-height: 16px;
          font-size: 16px;
          font-family: 'SourceHanSansCN-Medium';
          color: rgba(0, 0, 0, 0.8);
          padding: 0;
          margin: 0;
          display: inline-block;
        }

        span {
          padding: 0;
          margin: 0;
          margin-top: 7px;
          display: inline-block;
          width: 30px;
          height: 4px;
          background-color: #ff6666;
          border-radius: 2px;
        }
      }
    }
  }
}

.course-inactive-tab {
  color: rgba(0, 0, 0, 0.3);
}

.course-card {
  width: 100%;
  background: transparent;
}

.course-user-top {
  width: 375px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff4d0;

  p {
    width: 375px;
    height: 34px;
    line-height: 34px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);
    padding: 0 15px;

    font-family: 'SourceHanSansCN-Normal';
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.5);
  }

  span {
    display: inline-block;
    margin-left: auto;
    width: 16px;
    height: 16px;
    margin-right: 16px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.course-user-day,
.course-user-all {
  width: 345px;
  margin: 20px auto;

  .course-day-title {
    width: 100%;
    display: flex;
    align-items: center;

    font-family: 'SourceHanSansCN-Medium';
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);

    // p {
    // 	font-size: 18px;
    // 	color: rgba(0, 0, 0, 0.8);
    // }

    span {
      margin-left: auto;
      // font-size: 12px;
      // color: rgba(0, 0, 0, 0.5);

      font-family: 'SourceHanSansCN-Regular';
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.5);
      // background-color: #fff000;

      display: flex;
      align-items: center;

      & > i {
        width: 11px;
        height: 10px;
        position: relative;
        top: -2px;
      }
    }
  }
}

.more-img {
  // background-color: #ff0000;
  margin-top: 2px;
  // padding-bottom: 16px;

  text-align: center;

  img {
    display: inline-block;
    width: 13px;
    height: 13px;
    margin: 0 auto;
  }
}

.course-user-tab {
  width: 345px;
  margin: 21px auto 8px auto;
  display: flex;

  p {
    display: inline-block;
    padding-right: 38px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;

    span {
      width: 30px;
      height: 4px;
      display: block;
      background-color: #ff6666;
      border-radius: 2px;
      margin: 0 auto;
    }
  }
}

.course-user-tab p.tabActive {
  color: rgba(0, 0, 0, 0.8);
  font-family: 'SourceHanSansCN-Regular';
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: rgba(0, 0, 0, 0.8);
}

.course-user-null {
  width: 100%;
  margin: 0 auto;
  margin-top: 60px;
  text-align: center;

  p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }

  span {
    margin-top: 24px;
    display: inline-block;
    width: 155px;
    height: 48px;
    background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
    border-radius: 24px;
    font-size: 17px;
    color: #ffffff;
    line-height: 48px;
  }
}

.course-list {
  box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  margin-top: 20px;
}
</style>
