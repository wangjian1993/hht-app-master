<template>
  <div class="app">
    <div class="course-card" @click="goEducation()" v-show="list.length">
      <div class="course-card-box">
        <div class="course-img"><img src="../assets/image/2.png" alt="" /></div>
        <div class="card-name"><p>智慧早教课程</p></div>
        <div class="card-name-subhead"><p>智慧早教</p></div>
        <div class="course-state">
          <p class="course-state-btn2" v-if="eduData">已添加</p>
          <p class="course-state-btn1" v-else>会员免费</p>
        </div>
      </div>
    </div>
    <div
      class="course-card"
      @click="detailsRouter(item.id)"
      v-for="(item, index) in list"
      :key="item.id"
    >
      <div class="course-card-box">
        <div class="course-img"><img :src="item.coverImage" alt="" /></div>
        <div class="card-name">
          <p>{{ item.name }}</p>
        </div>
        <div class="card-name-subhead">
          <p>{{ item.description || '暂无描述' }}</p>
        </div>
        <!-- <div class="card-lable">
					<span v-for="opt in item.labels">{{ opt.name }}</span>
				</div> -->
        <div class="card-time">
          <p>
            <img src="../assets/image/course/icon_time@2x.png" alt="" />
            共{{ item.classHour }}课时
          </p>
          <p>
            <!-- <img src="../assets/image/home_conner_iconalbum@2x.png" alt="" /> -->
            <span>{{ item.particiPants }}人</span>正在上课
          </p>
        </div>
        <div class="course-state">
          <p class="course-state-btn2" v-if="item.learningState == 20">
            已添加
          </p>
          <p class="course-state-btn1" v-else>会员免费</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: '',
    eduData: false,
  },
  data() {
    return {
      userId: null,
    }
  },
  created() {
    this.userId = localStorage.getItem('courseBaby')
  },
  methods: {
    detailsRouter(id) {
      // if(this.userId == null){
      // 	this.$toast('请登录火火兔APP');
      // 	return
      // }
      this.$router.push({ name: 'course/details', query: { id: id } })
    },
    goEducation() {
      if (this.userId == null) {
        this.$toast('请登录火火兔APP')
        return
      }
      this.$router.push({ name: 'education', query: { header: 1 } })
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.course-card {
  width: 349px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
  border-radius: 8px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.course-card-box {
  width: 317px;
  margin: 0 auto;
  padding: 10px 0;
  .course-img {
    width: 321px;
    height: 146px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
  .card-name {
    font-family: 'SourceHanSansCN-Medium';
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
    padding-top: 10px;
  }
  .card-name-subhead {
    color: rgba(0, 0, 0, 0.5);
    font-family: 'SourceHanSansCN-Normal';
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.5);
  }
  .card-lable {
    display: flex;
    margin-top: 10px;
    span {
      display: inline-block;
      background-color: rgba(255, 138, 102, 0.08);
      border-radius: 12px;
      color: #ff8a66;
      font-size: 13px;
      padding: 4px 8px;
      margin-right: 11px;
    }
  }
  .card-time {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 13px;
    p {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.3);
      img {
        width: 17px;
        height: 17px;
        margin-top: -2px;
      }
      &:nth-of-type(2) {
        margin-left: auto;
        span {
          color: #ff6666;
        }
      }
    }

    & > p:first-child {
      font-family: 'SourceHanSansCN-Normal';
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.5);
    }

    & > p:nth-of-type(2) {
      font-family: 'SourceHanSansCN-Normal';
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .course-state {
    margin-top: 20px;
    p {
      // width: 104px;
      // height: 30px;
      // border-radius: 15px;
      text-align: center;
      // line-height: 30px;
      // font-size: 16px;
    }
    .course-state-btn1 {
      // background-color: #f9c003;
      // color: #fff;

      width: 104px;
      height: 30px;
      background-color: #f9c003;
      border-radius: 15px;

      font-family: 'SourceHanSansCN-Medium';
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .course-state-btn2 {
      width: 104px;
      height: 30px;
      border-radius: 14px;
      border: solid 1px rgba(0, 0, 0, 0.4);
      // opacity: 0.5;

      font-family: 'SourceHanSansCN-Normal';
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
