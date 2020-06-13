<template>
  <div class="app">
    <div class="intro-img"><img :src="list.introduce" alt="" /></div>
    <div class="intro-list">
      <v-title :title="title"></v-title>
      <div class="intro-itme">
        <div class="list">
          <ul>
            <li
              v-for="item in courseList"
              :key="item.id"
              @click="goLearning(item.id)"
            >
              <div class="item-img"><img :src="item.coverImage" /></div>
              <div class="item-name">
                <p>{{ item.name }}</p>
                <p>
                  {{ item.audiosCount }}首<span>/</span
                  >{{ item.classHourCount }}课时
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import CradList from '@/components/CardList.vue'
export default {
  props: {
    list: '',
  },
  data() {
    return {
      title: '课程包内容',
      isstatus: 0,
    }
  },
  computed: {
    courseList() {
      if (!this.list || !this.list.courseList) return []
      return this.list.courseList.map((item) => {
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
  created() {},
  methods: {
    goLearning(id) {
      this.$router.push({ name: 'course/learning', query: { id: id } })
    },
  },
  components: {
    'v-title': Title,
    'v-card-list': CradList,
  },
}
</script>

<style lang="less" scoped>
.intro-itme {
  width: 345px;
  margin: 0 auto;
}
.intro-img {
  width: 375px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}

.intro-list {
  // background-color: #fff000;
  margin-top: 40px;
  margin-bottom: 28px;
}
.list {
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
      padding: 10px 0;
      // background-color: #cff;
      .item-img {
        width: 54px;
        height: 54px;
        img {
          width: 100%;
          height: 100%;

          background-image: linear-gradient(90deg),
            linear-gradient(#ffdd84, #ffdd84);
          background-blend-mode: normal, normal;
          border-radius: 8px;
        }
      }
      .item-name {
        padding-left: 12px;
        // background-color: #fff000;
        p {
          &:nth-of-type(1) {
            // font-size: 16px;
            // color: rgba(0, 0, 0, 0.8);

            font-family: 'SourceHanSansCN-Regular';
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.74);
          }
          &:nth-of-type(2) {
            // font-size: 13px;
            // color: rgba(0, 0, 0, 0.4);

            font-family: 'SourceHanSansCN-Normal';
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.5);
            // background-color: #fff000;
            & > span {
              margin: 0 3px;
            }
          }
        }
      }
    }

    // & > li:nth-child(2) {
    //   background-color: #f88;
    // }
  }
}
</style>
