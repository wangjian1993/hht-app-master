<template>
  <div class="app">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>

    <div class="content" v-show="isLoading">
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
        @click="onDelCourse"
        v-if="detailsList.learningState == 20"
      >
        <p>从我的课程中删除</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as CONSTANTS from '@/constants/index'
import Header from '@/components/Header.vue'
import DetailsIntro from '@/components/DetailsIntro.vue'
import DetailsList from '@/components/DetailsList.vue'
import { getQueryStringValue } from '@/common/util'
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
    //课程包ID
    coursePackageId() {
      let isDev = window.location.href.indexOf('localhost:') > -1
      if (isDev) return this.$route.query.id
      return getQueryStringValue('id')
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
        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, { path: '/' })
        return this.$toast('请先开通会员')
      }

      // 验证宝宝id是否有效
      await this.getBabyList()
      if (!this.babyList.length) return this.showLackBabyModal()
      this.$toast.loading({ message: '报名中...', forbidClick: true })

      try {
        const id = this.coursePackageId
        const { data } = await this.$axios.courseApply(id, this.babyid)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$toast('报名成功')

        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
          path: '/course/apply',
        })
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
        const id = this.coursePackageId
        const { data } = await this.$axios.getCourseDetails(id, this.babyid)
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
    onDelCourse() {
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
          const id = this.coursePackageId
          this.$axios
            .getCourseDel(id, this.babyid)
            .then((res) => {
              if (res.data.code == 1) {
                this.$toast.success('删除成功')

                this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT, {
                  path: '/course/smart-course',
                })
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
// @import "./constants.less";

.content {
  width: 100%;
  background: #fff;
}

.course-box-top {
  width: 100%;
  height: 187px;

  img {
    width: 100%;
    height: 100%;
  }
}

.course-card-details {
  width: 100%;
  background: #fff;
  padding-top: 22px;

  .course-card {
    width: 349px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
  }

  .course-card-box {
    width: 100%;
    // height: 123px;
    margin: 0 auto;
    position: relative;

    .card-name {
      // font-size: 20px;
      // color: rgba(0, 0, 0, 0.8);
      font-family: 'SourceHanSansCN-Medium';
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }

    .card-name-subhead {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.5);
    }

    .card-lable {
      display: flex;
      margin-top: 10px;
      font-family: 'SourceHanSansCN-Normal';
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ff6666;

      span {
        display: inline-block;
        background-color: rgba(255, 138, 102, 0.08);
        border-radius: 12px;
        color: #ff8a66;
        font-size: 13px;
        padding: 0px 8px;
        margin-right: 11px;
      }
    }

    .card-time {
      width: 100%;
      display: flex;
      align-items: center;

      p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        // background-color: #fff000;

        img {
          width: 15px;
          height: 15px;
          margin-right: 6px;
        }

        &:nth-of-type(2) {
          margin-left: 16px;
        }

        &:nth-of-type(3) {
          margin-left: 16px;
        }
      }
    }
  }
}

.details-tab {
  width: 100%;
  padding-top: 50px;
  margin-bottom: 84px;
  background: #fff;

  .details-tab-itme {
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-family: 'SourceHanSansCN-Bold';
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;

    p {
      width: 50%;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.3);
      text-align: center;
    }
  }
}

.details-tab-itme p.tabAction {
  color: rgba(0, 0, 0, 0.8);
}

.tab-content {
  margin-top: 20px;
}

.details-btn {
  width: 100%;
  height: 84px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  margin-top: 28px;
  padding-top: 14px;
  border-top: solid 1px rgba(0, 0, 0, 0.08);
  background-color: #fff;

  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
    border-radius: 24px;
    font-size: 17px;
    color: #ffffff;
    margin: 0 auto;
  }
}

.details-btn1 {
  width: 100%;
  height: 84px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  // margin-top: 28px;
  padding-top: 14px;
  // margin-bottom: 34px;
  background-color: #fff;
  border-top: solid 1px rgba(0, 0, 0, 0.08);

  p {
    width: 345px;
    height: 48px;
    line-height: 48px;
    background: #fff;
    border-radius: 24px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    font-size: 17px;
    color: rgba(0, 0, 0, 0.6);
    margin: 0 auto;
  }
}

.mbot {
  margin-bottom: 40px;
}

.header {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;

  p {
    width: 100%;
    height: 44px;
    background: #006699;
    line-height: 44px;
  }
}
</style>
