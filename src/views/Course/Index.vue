<template>
  <div class="course-index-wrapper">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <!-- <v-pull-down @load-data="loaddata"> -->
    <div class="content">
      <div class="course-header iphonex-bd-top">
        <div class="course-box-tab">
          <div class="course-tab-item">
            <div @click="courstTab(1)">
              <p
                :style="{
                  color: courseTab !== 1 ? 'rgba(0, 0, 0, 0.3)' : '',
                }"
              >
                智慧早教
              </p>
              <span v-if="courseTab == 1"></span>
            </div>
            <div @click="courstTab(2)">
              <p
                :style="{
                  color: courseTab !== 2 ? 'rgba(0, 0, 0, 0.3)' : '',
                }"
              >
                我的课程
              </p>
              <span v-if="courseTab == 2"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="course-content mbot iphonex-bd-top">
        <div class="course-card mbot" v-if="courseTab == 1">
          <!-- <div class="course-box-top"></div> -->

          <v-card :list="lsit" :eduData="educationData"></v-card>

          <div @click="load()">测试服刷新</div>
        </div>
        <div v-if="courseTab == 2">
          <div
            class="course-user-top"
            @click="deviseText()"
            v-if="isDeviseText"
          >
            <p>绑定故事机开机，即可播放今日课程哦！</p>
            <span
              ><img
                src="../../assets/image/course/icon_popup_close@2x.png"
                alt=""
            /></span>
          </div>
          <div class="course-user-day">
            <div class="course-day-title">
              <p>今日学习</p>
              <span @click="courseMore" v-if="userList.length != 0">
                查看更多
                <van-icon name="arrow" />
              </span>
            </div>
            <div class="course-list">
              <v-course-list
                :isShow="isShow"
                :courseData="userList"
                :eduData="educationData"
              >
                <div class="more-img" v-if="userList.length != 0">
                  <img
                    src="../../assets/image/course/icon_device_spreadoutblue@2x.png"
                    @click="courseMore"
                  />
                </div>
              </v-course-list>
            </div>
          </div>
          <div class="course-user-all mbot">
            <div class="course-day-title"><p>我的全部课程</p></div>
            <div class="course-user-tab">
              <p
                :class="courseUserTab == 1 ? 'tabActive' : ''"
                @click="courseTabCLick(1)"
              >
                学习中
                <!-- <span v-if="courseUserTab == 1"></span> -->
              </p>
              <p
                :class="courseUserTab == 2 ? 'tabActive' : ''"
                @click="courseTabCLick(2)"
              >
                已完成
                <!-- <span v-if="courseUserTab == 2"></span> -->
              </p>
            </div>
            <div
              class="course-user-null"
              v-if="userList.length == 0 && !educationData"
            >
              <p>没有正在学习课程噢，快去添加吧～</p>
              <span @click="addCourse">添加课程</span>
            </div>
            <div class="course-user-list" v-else>
              <v-card-list
                :status="status"
                :audioData="userList"
                :isLearning="learning"
              ></v-card-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </v-pull-down> -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import CourseList from '@/components/CourseList.vue'
import CradList from '@/components/CardList.vue'
import Card from '@/components/Card.vue'
import PullDown from '@/components/Loadmore/PullDown.vue'

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
    // console.log(this.babyid)
    this.getUserApply()
    this.getCourseAll()
  },
  activated() {
    this.getCourseAll()
  },
  mounted() {},
  methods: {
    loaddata() {
      // location.reload()
      alert(`time: ${new Date()}`)
    },
    load() {
      location.reload()
    },
    onClickLeft() {
      // Toast('返回');
    },
    onClickRight() {
      // Toast('按钮');
    },
    router() {
      location.href = './course.html'
    },
    addCourse() {
      this.courseTab = 1
    },
    deviseText() {
      console.log('111')
      this.isDeviseText = !this.isDeviseText
    },
    getUserApply() {
      this.$axios
        .userApplyTime(localStorage.getItem('cid'))
        .then((res) => {
          console.warn('getUserApply - res')
          console.log(res)
          console.log('\n')

          if (res.data.code == 1) {
            this.educationData = true
            this.$store.dispatch('setEduFlag', true)
          } else {
            this.educationData = false
            this.$store.dispatch('setEduFlag', false)
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
    getCourseAll() {
      this.$axios
        .getCoursePack(this.babyid)
        .then((res) => {
          console.warn('res')
          console.log(res)
          console.log('\n')

          if (res.data.code == 1) {
            this.lsit = res.data.data
            this.isLoading = true
          } else {
            this.$toast(res.data.info)
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
      this.$axios
        .getUserCourse(this.babyid)
        .then((res) => {
          if (res.data.code == 1) {
            this.$store.dispatch('setUserCourse', res.data.data)
            this.userList = res.data.data
            this.isLoading = true
          } else {
            this.$toast(res.data.info)
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
    courstTab(index) {
      this.isLoading = false
      this.courseTab = index
      setTimeout(() => {
        this.isLoading = true
      }, 200)
    },
    courseTabCLick(index) {
      this.courseUserTab = index
      if (index == 2) {
        this.status = 30
      } else {
        this.status = 0
      }
    },
    courseMore() {
      this.$router.push({ name: 'course/courseMore' })
    },
  },
  components: {
    'v-header': Header,
    'v-card': Card,
    'v-course-list': CourseList,
    'v-card-list': CradList,
    'v-pull-down': PullDown,
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/courseIndex.less';
</style>
