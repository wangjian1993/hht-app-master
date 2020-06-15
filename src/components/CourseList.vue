<template>
  <div class="course-list-wrapper">
    <div class="empty" v-if="courseData.length == 0 && !isEdu">
      <van-empty
        class="custom-image"
        :image="emptyImg"
        description="你今天没有课程安排哦～"
      />
    </div>
    <div class="list" v-else>
      <ul>
        <li v-if="isEdu">
          <div class="list-name">
            <p>智慧早教课程</p>
            <p>共<span>30</span>课时 | <span>30</span>分钟</p>
          </div>
          <div class="list-btn" @click="schooltime('', 1)">
            <span>上课</span>
          </div>
        </li>
        <li v-for="item in dataFilter" :key="item.id">
          <div class="list-name">
            <p>
              {{ item.name }}
              <span v-if="item.status == 20">已完成</span>
            </p>
            <p>
              共<span>{{ item.classHourCount }}</span
              >课时 | <span>{{ item.avgDuration }}</span
              >分钟
            </p>
          </div>
          <div class="list-btn" @click="schooltime(item, 0)">
            <span>上课</span>
          </div>
        </li>
      </ul>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDayTime } from '../common/util.js'
export default {
  props: {
    courseData: '',
    isShow: false,
  },
  data() {
    return {
      emptyImg: require('../assets/image/course/qsy@2x.png'),
      babyid: 0,
    }
  },
  computed: {
    ...mapState(['isEdu', 'system']),
    dataFilter: function() {
      return this.courseData.filter((item, index) => {
        if (this.isShow) {
          return index < 3
        } else {
          return item
        }
      })
    },
  },
  created() {
    this.babyid = localStorage.getItem('courseBaby')
  },
  methods: {
    schooltime(item, type) {
      if (type == 0) {
        this.$axios
          .getCourseData(item.courseGroupId, item.id, this.babyid)
          .then((res) => {
            if (res.data.code == 1) {
              let array = {
                title: '智慧早教第0天',
                coursePackId: item.courseGroupId,
                courseId: item.id,
                babyId: this.babyid,
                course: [],
              }
              let audioData = res.data.data.audios
              this.setAudioData(audioData, array)
            }
          })
          .catch((err) => {
            console.error(err)
            this.$toast.fail(err)
          })
      } else if (type == 1) {
        let currentTime = getDayTime()
        this.$axios
          .getDayCourse(currentTime)
          .then((res) => {
            console.log('点击====')
            let array = {
              title: '智慧早教第' + this.applyTime + '天',
              coursePackId: 0,
              courseId: localStorage.getItem('cid'),
              babyId: localStorage.getItem('babyId'),
              course: [],
            }
            // let array = [];
            if (res.data.code == 1) {
              let audioData = res.data.data
              this.setAudioData(audioData, array)
            } else {
              this.$toast('暂无今日早教课程')
            }
          })
          .catch((err) => {
            console.error(err)
            this.$toast.fail(err)
          })
      }
    },
    setAudioData(audioData, array) {
      audioData.forEach(function(data, index) {
        let obj = {
          url: data.url,
          id: data.id,
          name: data.name,
        }
        array.course.push(obj)
      })
      console.log(array)
      try {
        this.$toast('获取课程成功')
        if (this.system == 'ios') {
          window.webkit.messageHandlers.course_play.postMessage(array)
        } else if (this.system == 'android') {
          window.android.playCourse('course_play', JSON.stringify(array))
        }
      } catch (e) {
        this.$toast('获取课程失败')
        //TODO handle the exception
      }
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.course-list-wrapper {
  padding-top: 21px;
  padding-bottom: 16px;
  background-color: #ffffff;
  // box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
}
.list {
  width: 100%;
  // padding: 10px 0;
  ul {
    width: 345px;
    margin: 0 auto;
    // background-color: #fff000;
    li {
      // height: 41px;
      margin: 14px 12px;
      display: flex;
      align-items: center;
      .list-name {
        p {
          &:nth-of-type(1) {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
            span {
              font-size: 12px;
              color: #26b8ef;
              padding-left: 10px;
            }
          }
          &:nth-of-type(2) {
            font-size: 13px;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .list-btn {
        margin-left: auto;
        width: 67px;
        height: 26px;
        line-height: 26px;
        border-radius: 13px;
        border: solid 1px #ff985b;
        font-size: 15px;
        color: #ff985b;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    & > li:first-child {
      margin-top: 0;
    }
  }
}
</style>
