<template>
  <div class="learning-wrapper">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="learning-content" v-show="isLoading">
      <div class=" mbot learning-top">
        <p>{{ courseData.name }}</p>
        <p>
          共 <span>{{ courseData.classHourCount }}</span> 课时 | 每节课约
          <span>{{ courseData.avgDuration }}</span> 分钟
        </p>
        <p>艾宾浩斯曲线学习计划</p>
      </div>
      <div class="learning-wacth">
        <img src="../../assets/image/course/icon_weixin@2x.png" alt="" />
        <p>点击加入微信专业交流群</p>
        <span>加入</span>
      </div>
      <div class="learnig-list mbot">
        <v-title
          :title="titleNmae"
          top="34"
          bottom="14"
          :courseCount="courseData.classHourCount"
        ></v-title>
        <div class="list-box">
          <ul v-for="titleItem in courseData.classHours" :key="titleItem.id">
            <div class="list-item-title">
              <p>
                <span>第{{ titleItem.index }}课时</span>
              </p>
              <p>
                <span v-if="titleItem.newLearning"
                  >新学{{ titleItem.newLearning | convertCNNum }}首</span
                ><span v-if="titleItem.review">
                  | 复习{{ titleItem.review | convertCNNum }}首</span
                >
              </p>
            </div>
            <li v-for="listItem in titleItem.audios" :key="listItem.name">
              <p class="item-name">{{ listItem.name }}</p>
              <div class="item-time">
                <p>
                  <img src="../../assets/image/course/icon_time@2x.png" />
                  {{ time(listItem.timeLength) }}
                </p>
                <p>
                  <img
                    src="../../assets/image/course/icon_listen备份@2x.png"
                    alt=""
                  />
                  {{ browse(listItem.browseCount, 1) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="retake-course-btn" v-if="isShowRetakeBtn">
      <p @click="onRetakeCourse">重新加入学习</p>
    </div>
  </div>
</template>
<script>
import * as CONSTANTS from '@/constants/index'
import Header from '@/components/Header.vue'
import Title from '@/components/Title.vue'
import { tranNumber, timeCycle } from '../../common/util.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: '',
      isLoading: false,
      titleNmae: '今日课程关键词',
      courseData: [],
      babyid: 0,
    }
  },
  computed: {
    isShowRetakeBtn() {
      return this.courseData && this.courseData.status * 1 === 20
    },
  },
  created() {
    this.babyid = localStorage.getItem('courseBaby')
    this.getCourseDeta(this.$route.query.id)
  },
  methods: {
    getCourseDeta(id) {
      this.$axios
        .getCourseDeta(id, this.babyid)
        .then((res) => {
          if (res.data.code == 1) {
            this.courseData = res.data.data
            this.isLoading = true
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
    browse(num, point) {
      return tranNumber(num, point)
    },
    time(val) {
      return timeCycle(val)
    },
    //重修
    async onRetakeCourse() {
      const { id, courseGroupId } = this.courseData
      let babyId = localStorage.getItem('courseBaby')
      let userId = localStorage.getItem('user')
      babyId = JSON.parse(babyId)
      userId = JSON.parse(userId)
      try {
        const params = {
          babyId,
          userId,
          courseId: id,
          courseGroupId,
        }
        const { data } = await this.$axios.getRetakeCourse(params)
        if (!data.success) throw new Error(data.info)
        const resData = data.data
        this.$toast.success('重新报名成功')
        // this.$router.push({ name: 'course/index' })

        this.$store.dispatch(CONSTANTS.DISPATCH_REDIRECT_HOME, {
          path: '/course/smart-course',
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
  },
  components: {
    'v-header': Header,
    'v-title': Title,
  },
}
</script>

<style lang="less" scoped>
@import './../../assets/css/constants.less';
.learning-wrapper {
  // margin-top: @header-comp-height;
}
.learning-content {
  margin-bottom: 84px;
}
.learning-top {
  width: 345px;
  margin-top: 5px;
  margin-left: 18px;
  p {
    &:nth-of-type(1) {
      font-family: 'SourceHanSansCN-Medium';
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.8);
    }
    &:nth-of-type(2) {
      font-family: 'SourceHanSansCN-Regular';
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.6);
      position: relative;
      top: -7px;

      span {
        font-family: 'SourceHanSansCN-Medium';
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff8a66;
      }
    }
    &:nth-of-type(3) {
      // position: relative;
      // top: -4px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.learning-wacth {
  width: 94%;
  margin: 0 auto;
  padding: 20px 20px;
  display: flex;
  height: 63px;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  img {
    width: 31px;
    height: 24px;
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
.list-box {
  width: 345px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  margin: 0 auto;
  ul {
    width: 100%;
    padding: 18px 15px 18px 24px;
    border-bottom: 1px #f3f3f3 solid;
    // background-color: #fff000;
    .list-item-title {
      width: 100%;
      display: flex;
      align-items: center;
      p {
        &:nth-of-type(1) {
          // font-size: 15px;
          // color: rgba(0, 0, 0, 0.8);

          font-family: 'SourceHanSansCN-Medium';
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.8);
          // vertical-align: bottom;
        }

        &:nth-of-type(2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.3);
          margin-left: auto;
          // background-color: #ff0000;
        }
      }
    }
    li {
      margin-top: 14px;
      .item-name {
        font-family: 'SourceHanSansCN-Normal';
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 0.8);
      }
      .item-time {
        display: flex;
        align-items: center;
        margin-top: 5px;
        img {
          width: 14px;
          height: 14px;
          margin-top: -2px;
        }
        p {
          font-family: 'SourceHanSansCN-Normal';
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.4);
          &:nth-of-type(2) {
            padding-left: 30px;
          }
        }
      }
    }
  }
}
.mbot {
  margin-bottom: 40px;
}

.retake-course-btn {
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
