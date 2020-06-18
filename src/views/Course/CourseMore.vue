<template>
  <div class="app">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="content" v-show="isLoading">
      <div class="course-data">
        <!-- <v-header-icon></v-header-icon> -->
        <div class="header"></div>
        <v-data></v-data>
      </div>
      <div class="course-list mbot">
        <v-course-list
          :isShow="isShow"
          :courseData="userCourseList"
          v-if="userCourseList.lenght != 0"
        ></v-course-list>
        <div class="empty" v-else>
          <van-empty
            class="custom-image"
            :image="emptyImg"
            description="没有学习课程"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Data from '@/components/Data.vue'
import CourseList from '@/components/CourseList.vue'
import HeaderIcon from '@/components/HeaderIcon.vue'
export default {
  data() {
    return {
      isLoading: true,
      emptyImg: require('../../assets/image/course/qsy@2x.png'),
      isShow: false,
    }
  },
  computed: {
    ...mapState(['userCourseList', 'isEdu']),
  },
  created() {},
  components: {
    'v-data': Data,
    'v-course-list': CourseList,
    'v-header-icon': HeaderIcon,
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 118px;
  background: url(../../assets/image/vip_smartedu_topimg1@3x.png) no-repeat;
  background-size: 100%;
  position: relative;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.van-empty__description {
  margin-top: 0;
}
.mbot {
  margin-bottom: 40px;
}
</style>
