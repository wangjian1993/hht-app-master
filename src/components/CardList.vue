<template>
  <div class="card-list-wrapper">
    <div class="card-list-list">
      <ul>
        <li @click="onRedirect()" v-if="isEdu && status == 0">
          <div class="item-img"><img src="../assets/image/2.png" /></div>
          <div class="item-name">
            <p>智慧早教</p>
            <p>1课时</p>
          </div>
        </li>
        <li
          v-for="item in courseList"
          :key="item.id"
          @click="goLearning(item.id)"
        >
          <div class="item-img"><img :src="item.coverImage" /></div>
          <div class="item-name">
            <p>{{ item.name }}</p>
            <p>{{ item.audiosCount }}首 / {{ item.classHourCount }}课时</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    audioData: '',
    isLearning: '',
    status: 0,
  },
  computed: {
    ...mapState(['isEdu']),
    courseData: function() {
      return this.audioData.filter((item, index) => {
        console.log(this.status)
        if (this.status == 0) {
          return item.status != 20
        } else if (this.status == 30) {
          return item.status == 20
        }
      })
    },
    courseList() {
      if (!this.courseData || !this.courseData) return []
      return this.courseData.map((item) => {
        const { classHours } = item
        const audios = classHours.map((audio) => audio.audios.length)
        const audiosCount = audios.reduce((arr, val) => arr * 1 + val * 1, 0)
        return {
          ...item,
          audiosCount,
        }
      })
    },
  },
  data() {
    return {}
  },
  created() {
    // console.log('this.isEdu', this.isEdu)
  },
  methods: {
    moveErrorImg: function(event) {
      event.currentTarget.src = '../assets/image/course/qsy@2x.png'
    },
    goLearning(id) {
      if (this.isLearning) {
        this.$router.push({ name: 'course/learning', query: { id: id } })
      }
    },
    onRedirect() {
      this.$router.push({
        name: 'wisdom-course/index',
        query: {
          isHeader: 1,
        },
      })
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.card-list-list {
  width: 345px;
  margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      // padding: 10px 0;
      .item-img {
        width: 54px;
        height: 54px;
        img {
          width: 100%;
          height: 100%;
          // border-radius: 8px;

          background-image: linear-gradient(90deg),
            linear-gradient(#ffdd84, #ffdd84);
          background-blend-mode: normal, normal;
          border-radius: 8px;
        }
      }
      .item-name {
        padding-left: 12px;
        p {
          &:nth-of-type(1) {
            font-family: 'SourceHanSansCN-Regular';
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.74);
          }
          &:nth-of-type(2) {
            font-family: 'SourceHanSansCN-Normal';
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
}
</style>
