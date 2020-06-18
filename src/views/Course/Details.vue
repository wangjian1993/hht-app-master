<template>
  <div class="app">
    <v-header title="" v-show="isLoading"></v-header>

    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>

    <div class="content iphonex-bd-top-bg" v-show="isLoading">
      <div class="course-box-top">
        <img :src="detailsList.coverImage" alt="" />
      </div>
      <div class="course-card-details">
        <div class="course-card">
          <div class="course-card-box">
            <div class="card-name">
              <p>{{ detailsList.name }}</p>
            </div>
            <div class="card-time">
              <p>
                <img
                  src="../../assets/image/course/icon_people@2x.png"
                  alt=""
                />
                适合{{ detailsList.suitedMinAge }}-{{
                  detailsList.suitedMaxAge
                }}岁
              </p>
              <p>
                <img src="../../assets/image/course/icon_time@2x.png" alt="" />
                共{{ detailsList.classHour }}课时
              </p>
              <p>
                <img src="../../assets/image/course/icon_study@2x.png" alt="" />
                {{ participants }}人学习
              </p>
            </div>
            <div class="card-lable">
              <span v-for="opt in detailsList.labels" :key="opt.name">{{
                opt.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="details-tab">
        <div class="details-tab-itme">
          <p @click="detalsTab(1)" :class="tabAction == 1 ? 'tabAction' : ''">
            简介
          </p>
          <p @click="detalsTab(2)" :class="tabAction == 2 ? 'tabAction' : ''">
            计划
          </p>
        </div>
        <div class="tab-content">
          <v-details-intro
            v-if="tabAction == 1"
            :list="detailsList"
          ></v-details-intro>
          <v-details-list
            v-if="tabAction == 2"
            :data="detailsList.courseList"
          ></v-details-list>
        </div>
      </div>
      <div
        class="details-btn"
        @click="onAddCourse"
        v-if="detailsList.learningState == 10"
      >
        <p>会员免费加入</p>
      </div>
      <div
        class="details-btn1"
        @click="delCoures"
        v-if="detailsList.learningState == 20"
      >
        <p>从我的课程中删除</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import DetailsIntro from '@/components/DetailsIntro.vue'
import DetailsList from '@/components/DetailsList.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isLoading: false,
      title: '课程详情',
      tabAction: 1,
      detailsList: [],
      babyid: 0,
      babyList: [], //宝宝list
    }
  },
  computed: {
    ...mapState(['memberInfoVip', 'userCourseList', 'system']),
    //学习人数: 初始值+课程实际报名人数*3
    participants() {
      const list = this.detailsList
      return list.participantOpsCount + list.particiPants
    },
    //当前课程包的课程
    courseList() {
      if (!this.detailsList && !this.detailsList.courseList) return []
      return this.detailsList.courseList
    },
  },
  created() {
    this.babyid = localStorage.getItem('courseBaby')
    this.getAsyncCourseDetails()
  },
  methods: {
    detalsTab(index) {
      this.tabAction = index
    },
    //获取该用户所有的宝宝list
    async getBabyList() {
      try {
        const { data } = await this.$axios.getBabyList()
        if (!data.success) throw new Error(data.info)
        this.babyList = data.data
      } catch (err) {
        console.log(err)
      }
    },
    //添加课程
    async onAddCourse() {
      const signupCourseLen = this.courseList.length
      const willCourse = this.userCourseList.filter(
        (item) => item.status * 1 !== 20
      )
      const willCourseLen = willCourse.length
      const courseLength = signupCourseLen * 1 + willCourseLen * 1

      // 添加课程限制
      if (courseLength > 10) return this.showOverloadCourseModal()

      if (this.memberInfoVip == 0) {
        this.$router.push({
          name: 'index',
          query: {
            isHeader: 1,
          },
        })
        return this.$toast('请先开通会员')
      }

      // 验证宝宝id是否有效
      await this.getBabyList()
      if (!this.babyList.length) return this.showLackBabyModal()
      this.$toast.loading({ message: '报名中...', forbidClick: true })

      try {
        const { data } = await this.$axios.courseApply(
          this.$route.query.id,
          this.babyid
        )
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$toast('报名成功')
        this.$router.push({ name: 'course/apply', query: { id: 1 } })
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
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
    // 课程包详情
    async getAsyncCourseDetails() {
      try {
        const { data } = await this.$axios.getCourseDetails(
          this.$route.query.id,
          this.babyid
        )
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.detailsList = resData
        this.isLoading = true
        this.$store.dispatch('setCourseDetails', resData)
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    delCoures() {
      this.$dialog
        .confirm({
          title: '删除课程',
          message: '确认要取消该课程的学习吗？',
        })
        .then(() => {
          // on confirm
          this.$toast.loading({
            message: '删除中...',
            forbidClick: true,
          })
          this.$axios
            .getCourseDel(this.$route.query.id, this.babyid)
            .then((res) => {
              if (res.data.code == 1) {
                this.$toast.success('删除成功')
                this.$router.push({ name: 'course/index' })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$toast.fail(err)
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    //添加课程限制 Modal
    async showOverloadCourseModal() {
      const dialog = await this.$createDialog(
        () => import('@/views/Course/OverloadCourseModal.vue'),
        {
          destroyOnClose: true,
          on: {
            close: (v) => {
              dialog.close()
            },
          },
        }
      )
    },
  },
  components: {
    'v-header': Header,
    'v-details-intro': DetailsIntro,
    'v-details-list': DetailsList,
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/courseDetails.less';
</style>
