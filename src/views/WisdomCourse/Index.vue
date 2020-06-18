<template>
  <div class="wisdom-course-index-wrapper">
    <!-- <v-header title=""></v-header> -->

    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中...</van-loading>
    </div>

    <div class="wisdom-course-index-content" v-show="isLoading">
      <p>火火兔智慧早教</p>

      <div class="sign-day">
        <div class="day">
          <p>
            智慧早教第
            <span>{{ applyTime || 0 }}</span>
            天计划
          </p>
          <p>目标30min</p>
        </div>
        <p class="day-sum"><i></i>累计坚持{{ sumDay }}天</p>
      </div>

      <div class="learning-wacth">
        <img src="../../assets/image/course/icon_weixin@2x.png" alt="" />
        <p>点击加入微信专业交流群</p>
        <span>加入</span>
      </div>

      <!-- 今日课程关键词 -->
      <div class="course-key">
        <v-title :title="title[0]"></v-title>
        <div class="key-list">
          <ul v-if="keyArray.length != 0">
            <li v-for="item in keyArray" :key="item">
              <span>{{ item }}</span>
            </li>
          </ul>
          <div v-else class="content-null"><p>暂无关键词</p></div>
        </div>
      </div>

      <!-- 今日强化重点 -->
      <div class="course-emphasis">
        <v-title :title="title[1]"></v-title>
        <div class="key-list" v-if="isPie">
          <v-pie :pieData="keyList"></v-pie>
        </div>
        <div v-else class="content-null"><p>暂无强化重点</p></div>
      </div>

      <!-- 宝宝关键期 -->
      <div class="course-period">
        <v-title
          :title="title[2]"
          :age="countAge(babyYear, babyMonth)"
        ></v-title>
        <div class="period-list" v-if="periodList.length != 0">
          <ul>
            <li v-for="(item, index) in periodList" :key="index">
              <div class="period-img">
                <img :src="item.level1_logo" />
              </div>
              <div class="period-name">
                <p class="an-multi-ellipsis">{{ item.level1 }}</p>
                <p class="van-multi-ellipsis--l2">{{ item.level2 }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="content-null"><p>暂无关键期</p></div>
      </div>
    </div>

    <van-row class="bottom-bar"><p @click="onDelCourse">删除课程</p></van-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import Data from '@/components/Data.vue'
import Pie from '@/components/Pie.vue'
import Header from '@/components/Header.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      isLoading: false,
      title: ['今日课程关键词', '今日强化重点', '宝宝关键期'],
      age: '0个月',
      periodList: [],
      currentTime: null,
      currentMouth: null,
      sumDay: 0,
      keyList: [],
      keyArray: [],
      isPie: false,
      applyTime: 0,
      babyYear: 0,
      babyMonth: 0,
      isSignupWisdom: false,
      babyBox: false,
      isEmptyBabyModal: false,
      babyArray: [],
      babyId: 0,
      defaultBabyArray: [],
      defaultBaby: [],
      isHeader: 0,
      babyList: [], //babies of current user
    }
  },
  computed: {
    ...mapState([
      'system',
      'babyInfo',
      'memberInfoTime',
      'memberInfoVip',
      'userBaby',
    ]),
  },
  created() {
    this.isHeader = this.$route.query.header
    let baby = JSON.parse(localStorage.getItem('babyInfo'))
    this.defaultBaby = this.userBaby.length == 0 ? baby : this.userBaby

    if (localStorage.getItem('cid') == null) return this.getActivity()
    this.getSumTime()
    this.current()
  },
  methods: {
    async getBabyList() {
      try {
        const { data } = await this.$axios.getBabyList()
        if (!data.success) throw new Error(data.info)
        this.babyList = data.data
      } catch (err) {
        console.log(err)
      }
    },
    getActivity() {
      this.$axios
        .userActivityInfo()
        .then((res) => {
          localStorage.setItem('cid', res.data.data.id)
          this.getSumTime()
          this.current()
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
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
        // const resData = data.data;

        self.defaultBabyArray = data
        this.$store.dispatch('defaultBaby', data)
        this.$toast('报名成功')
        this.getUserDayCourse()
        this.getSumTime()
        this.isSignupWisdom = true
        this.babyBox = !this.babyBox
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    countAge(year, month) {
      var sum = year * 12 + month
      // console.log('nianling,', sum);
      if (sum < 13) {
        return month + '-' + (month + 1) + '个月'
      } else if (sum >= 13 && sum < 18) {
        return '1-1.5岁'
      } else if (sum >= 18 && sum < 24) {
        return '1.5-2岁'
      } else if (sum >= 24 && sum < 36) {
        return '2-3岁'
      } else if (sum >= 36 && sum < 48) {
        return '3-4岁'
      } else if (sum >= 48 && sum < 60) {
        return '4-5岁'
      } else if (sum >= 60 && sum < 72) {
        return '5-6岁'
      }
    },
    /**
     * 计算宝宝年龄
     * */
    getGrowAge(birthday) {
      var time
      try {
        time = birthday
          .replace('年', '-')
          .replace('月', '-')
          .replace('日', '')
      } catch (e) {
        time = this.currentTime
      }
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()

      var myDate = new Date(time)
      var myYear = myDate.getFullYear()
      var myMonth = myDate.getMonth() + 1
      var myDay = myDate.getDate()
      var myHour = myDate.getHours()
      var myMinute = myDate.getMinutes()
      var mySecond = myDate.getSeconds()

      var gapSecond = second - mySecond
      if (gapSecond < 0) {
        minute -= 1
        gapSecond = 60 - mySecond + second
      }
      var gapMinute = minute - myMinute
      if (gapMinute < 0) {
        hour -= 1
        gapMinute = 60 - myMinute + minute
      }
      var gapHour = hour - myHour
      if (gapHour < 0) {
        day -= 1
        gapHour = 24 - myHour + hour
      }
      var gapDay = day - myDay
      if (gapDay < 0) {
        month -= 1
        gapDay = this.getDaysOfMonth(time) - myDay + day
      }
      var gapMonth = month - myMonth
      if (gapMonth < 0) {
        year -= 1
        gapMonth = 12 - myMonth + month
      }
      var gapYear = year - myYear
      if (gapYear < 0) {
        gapYear = 0
      }

      var dateStr =
        gapYear +
        '岁' +
        (gapMonth < 10 ? '0' + gapMonth : gapMonth) +
        '月' +
        (gapDay < 10 ? '0' + gapDay : gapDay) +
        '天'
      // console.log('dateStr....', dateStr)
      return dateStr
    },
    getDaysOfMonth(dateStr) {
      var date = new Date(dateStr)
      var year = date.getFullYear()
      var mouth = date.getMonth() + 1
      var day = 0

      if (mouth == 2) {
        day = this.isLeapYear(year) ? 29 : 28
      } else if (
        mouth == 1 ||
        mouth == 3 ||
        mouth == 5 ||
        mouth == 7 ||
        mouth == 8 ||
        mouth == 10 ||
        mouth == 12
      ) {
        day = 31
      } else {
        day = 30
      }
      return day
    },
    isLeapYear(year) {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
    },
    async getUserDayCourse() {
      let self = this
      this.$axios
        .getDayKey(this.currentTime)
        .then((res) => {
          let pieData = res.data.data.emphasis
          pieData.forEach(function(Data, index) {
            let v = Data.rate.replace('%', '')
            let obj = {
              name: Data.ability + Data.rate,
              value: v,
              size: v,
            }
            self.keyList.push(obj)
          })
          let arr = res.data.data.key
          self.keyArray = arr.split('、')
          self.isPie = true
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })

      await this.getAsyncBabyPeriod()
      await this.getAsyncSumTime()
    },
    async getAsyncSumTime() {
      try {
        const { data } = await this.$axios.sumTime(this.currentMouth)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.sumDay = resData.clockDays
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    async getAsyncBabyPeriod() {
      try {
        const { data } = await this.$axios.getBabyPeriod(this.currentTime)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.periodList = resData.list
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    getSumTime() {
      let self = this
      this.$axios
        .userApplyTime(localStorage.getItem('cid'))
        .then((res) => {
          if (res.data.code == 1) {
            try {
              this.applyTime = this.computedTime(res.data.data.createTime)
              let id = localStorage.getItem('babyId')
              this.babyId = res.data.data.babyId
              if (id != this.babyId) {
                localStorage.setItem('babyId', res.data.data.babyId)
              }
              let array = this.babyInfo
              array.forEach(function(item, index) {
                if (res.data.data.babyId == item.id) {
                  self.defaultBaby = item
                  self.$store.dispatch('defaultBaby', item)
                }
              })
              this.getUserDayCourse()
              this.isLoading = true
              this.isSignupWisdom = true
            } catch (e) {
              console.log(e)
            }
          } else {
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
    async onUserApply() {
      if (this.memberInfoVip == 0) {
        this.$router.push({
          name: 'index',
          query: {
            isHeader: 1,
          },
        })
        this.$toast('请先开通会员')
        return
      }

      //filter: 未添加宝贝
      await this.getBabyList()
      if (!this.babyList.length) return this.onRedirectModal()
      this.babyBox = true
    },
    async onRedirectModal() {
      this.isHeader = 0 //隐藏header-icon
      this.isEmptyBabyModal = true
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
        this.$router.push({
          name: 'course/index',
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    computedTime(time) {
      //传入之前的时间  时间格式为(YY-MM-DD HH:MM:SS)
      let t = time.split(' ')
      console.log('t===', t)
      let oldTimeFormat = new Date(t[0])
      let nowDate = new Date()
      if (nowDate.getTime() - oldTimeFormat.getTime() > 0) {
        let times = nowDate.getTime() - oldTimeFormat.getTime()
        let days = parseInt(times / (60 * 60 * 24 * 1000))
        console.log('days', days)
        return days + 1
      }
    },
    current() {
      var dd = new Date()
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1 //获取当前月份的日期
      var d = dd.getDate()
      this.currentTime = y + '-' + m + '-' + d
      this.currentMouth = m
    },
    education() {
      this.$toast.loading({
        message: '获取课程中...',
        forbidClick: true,
      })
      this.$axios
        .getDayCourse(this.currentTime)
        .then((res) => {
          // console.log('点击====')
          let array = {
            title: '智慧早教第' + this.applyTime + '天',
            coursePackId: 0,
            courseId: localStorage.getItem('cid'),
            babyId: localStorage.getItem('babyId'),
            course: [],
          }
          // let array = [];
          if (res.data.code == 1 && res.data.data.length != 0) {
            let item = res.data.data
            item.forEach(function(data, index) {
              let obj = {
                url: data.url,
                id: data.id,
                name: data.name,
              }
              array.course.push(obj)
              // array.push(obj);
            })
            // console.log('array', array)
            try {
              this.$toast('获取早教课程成功')
              if (this.system == 'ios') {
                window.webkit.messageHandlers.course_play.postMessage(array)
              } else if (this.system == 'android') {
                window.android.playCourse('course_play', JSON.stringify(array))
              }
            } catch (e) {
              this.$toast('获取早教课程失败')
              //TODO handle the exception
            }
          } else {
            this.$toast('今天放假一天(*^▽^*)')
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
    // onDelCourse() {
    //   this.$toast('deleting')
    // },
  },
  components: {
    'v-title': Title,
    'v-pie': Pie,
    'v-header': Header,
  },
}
</script>

<style lang="less" scoped>
@import './../../assets/css/constants.less';
.wisdom-course-index-content {
  // margin-top: @header-comp-height;
  margin-bottom: @fixed-bottom-bar;
  height: 100%;
  // background-color: #ff0000;

  & > p:first-of-type {
    width: 345px;
    margin: 0 auto;
    margin-top: 6px;
    font-family: 'SourceHanSansCN-Medium';
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
  }
}

.header {
  width: 100%;
  height: 118px;
  background: url(../../assets/image/vip_smartedu_topimg1@3x.png) no-repeat;
  background-size: 100%;
  position: relative;
  // z-index: 2000;
  .header-ranking {
    position: absolute;
    width: 64px;
    height: 20px;
    right: 0;
    top: 23px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 20px;
    background-image: linear-gradient(5deg, #ffa39f 0%, #ff7a7a 100%);
    border-radius: 12px 0 0px 12px;
  }
  .header-title {
    width: 90%;
    display: flex;
    padding-top: 16px;
    margin: 0 auto;
    .header-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
      }
    }
    .header-name {
      padding-left: 12px;
      p {
        height: 50%;
        display: flex;
        align-items: center;
        &:nth-of-type(1) {
          font-family: 'SourceHanSansCN-Medium';
          font-size: 17px;
          color: rgba(0, 0, 0, 0.7);
          img {
            &:nth-of-type(1) {
              width: 14px;
              height: 14px;
              margin: 0 5px;
            }
            &:nth-of-type(2) {
              width: 16px;
              height: 15px;
            }
          }
        }
        &:nth-of-type(2) {
          font-family: 'SourceHanSansCN-Regular';
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
.sign-day {
  width: 345px;
  margin: 11px auto;
  .day {
    display: flex;
    position: relative;
    height: 30px;

    p {
      color: rgba(0, 0, 0, 0.8);
      height: 24px;
      line-height: 30px;

      font-family: 'SourceHanSansCN-Regular';
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.6);

      &:nth-of-type(1) {
        font-size: 15px;
        color: rgba(0, 0, 0, 0.8);
        span {
          font-size: 24px;
          color: #ff8a66;
        }
      }
      &:nth-of-type(2) {
        position: absolute;
        right: 0;

        font-family: 'SourceHanSansCN-Regular';
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .day-sum {
    margin-top: 16px;
    font-family: 'SourceHanSansCN-Normal';
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
    & > i {
      width: 6px;
      height: 6px;
      display: inline-block;
      font-style: normal;
      background-color: #ff8a66;
      margin-right: 4px;
      border-radius: 50%;
    }
  }
}

.learning-wacth {
  width: 94%;
  margin: 0 auto;
  margin-top: 28px;
  padding: 0 20px;
  display: flex;
  height: 63px;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  img {
    width: 35px;
    height: 28px;
  }
  p {
    // font-size: 16px;
    // color: rgba(0, 0, 0, 0.8);
    padding-left: 18px;

    font-family: 'SourceHanSansCN-Normal';
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
  }
  span {
    margin-left: auto;
    display: inline-block;
    width: 60px;
    height: 25px;
    border-radius: 24px;
    // border: solid 1px #ff6666;
    // font-size: 12px;
    // color: #ff6666;
    text-align: center;
    line-height: 25px;
    vertical-align: middle;
    background-color: #4dc42a;

    font-family: 'SourceHanSansCN-Regular';
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

.music-btn {
  width: 345px;
  height: 48px;
  background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
  border-radius: 24px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: #ffffff;
    font-size: 17px;
  }
}
.key-list {
  width: 95%;
  margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 12px;
      margin: 6px 10px;
      span {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        padding: 5px 7px 4px 9px;
      }
    }
  }
}
.course-period {
  margin-bottom: 40px;
}
.period-list {
  width: 345px;
  margin: 0 auto;
  ul {
    width: 100%;
    li {
      width: 100%;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      margin: 10px 0;
      .period-img {
        width: 48px;
        height: 48px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .period-name {
        p {
          color: rgba(0, 0, 0, 0.8);
          &:nth-of-type(1) {
            font-size: 16px;
          }
          &:nth-of-type(2) {
            font-size: 13px;
            color: rgba(0, 0, 0, 0.3);
          }
        }
      }
      &:last-child {
        margin-bottom: 30px;
      }
    }
  }
}
.bottom-bar {
  width: 100%;
  height: @fixed-bottom-bar;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #fff;
  & > p {
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
